import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import countObjectProperties from './utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: {},
    users: {},
    services: {},
    authId: null,
    // authId: '38St7Q8Zi2N1SPa5ahzssq9kbyp1',
    modals: {
      login: false,
      register: false,
    },
  },
  mutations: {
    SET_MODAL_STATE(state, { name, value }) {
      // eslint-disable-next-line
      state.modals[name] = value;
    },
    SET_ROOM(state, { newRoom, roomId }) {
      Vue.set(state.rooms, roomId, newRoom);
    },
    APPEND_ROOM_TO_USER(state, { roomId, userId }) {
      Vue.set(state.users[userId].rooms, roomId, roomId);
    },
    SET_ITEM(state, { item, id, resource }) {
      const newItem = item;
      newItem['.key'] = id;
      Vue.set(state[resource], id, newItem);
    },
    SET_AUTHID(state, id) {
      // eslint-disable-next-line
      state.authId = id;
    },
  },
  actions: {
    createRoom({ state, commit }, room) {
      const newRoom = room;
      const roomId = firebase
        .database()
        .ref('rooms')
        .push().key;
      newRoom.userId = state.authId;
      newRoom.plublishedAt = Math.floor(Date.now() / 1000);
      newRoom.meta = { likes: 0 };

      const updates = {};
      updates[`rooms/${roomId}`] = newRoom;
      updates[`users/${newRoom.userId}/rooms/${roomId}`] = roomId;

      firebase
        .database()
        .ref()
        .update(updates)
        .then(() => {
          commit('SET_ROOM', { newRoom, roomId });
          commit('APPEND_ROOM_TO_USER', { roomId, userId: newRoom.userId });
          return Promise.resolve(state.rooms[roomId]);
        });
    },
    createUser({ state, commit }, { email, name, password }) {
      return new Promise((resolve) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((account) => {
            const id = account.user.uid;
            const registeredAt = Math.round(Date.now() / 1000);
            const newUser = { email, name, registeredAt };
            firebase
              .database()
              .ref('users')
              .child(id)
              .set(newUser)
              .then(() => {
                commit('SET_ITEM', { resource: 'users', id, item: newUser });
                resolve(state.users[id]);
              });
          });
      });
    },
    fetchRooms({ state, commit }, limit) {
      return new Promise((resolve) => {
        let instance = firebase.database().ref('rooms');
        if (limit) {
          instance = instance.limitToFirst(limit);
        }

        instance.once('value', (snapshot) => {
          const rooms = snapshot.val();
          Object.keys(rooms).forEach((roomId) => {
            const room = rooms[roomId];
            commit('SET_ITEM', { item: room, id: roomId, resource: 'rooms' });
          });

          resolve(Object.values(state.rooms));
        });
      });
    },
    fetchServices({ state, commit }) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('services')
          .once('value', (snapshot) => {
            const services = snapshot.val();
            Object.keys(services).forEach((serviceId) => {
              const service = services[serviceId];
              commit('SET_ITEM', {
                item: service,
                id: serviceId,
                resource: 'services',
              });
            });

            resolve(Object.values(state.services));
          });
      });
    },
    fetchUser({ state, commit }, { id }) {
      return new Promise((resolve) => {
        firebase
          .database()
          .ref('users')
          .child(id)
          .once('value', (snapshot) => {
            commit('SET_ITEM', {
              resource: 'users',
              id: snapshot.key,
              item: snapshot.val(),
            });
            resolve(state.users[id]);
          });
      });
    },
    fetchAuthUser({ commit, dispatch }) {
      const userId = firebase.auth().currentUser.uid;
      return dispatch('fetchUser', { id: userId }).then(() => {
        commit('SET_AUTHID', userId);
      });
    },
    signin(context, { email, password }) {
      firebase.auth().signInWithEmailAndPassword(email, password);
    },
    logout({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('SET_AUTHID', null);
        });
    },
  },
  getters: {
    modals: (state) => state.modals,
    authUser: (state) => (state.authId ? state.users[state.authId] : null),
    rooms: (state) => state.rooms,
    services: (state) => state.services,
    userRoomsCount: (state) => (id) =>
      // eslint-disable-next-line
      countObjectProperties(state.users[id].rooms),
  },
});
