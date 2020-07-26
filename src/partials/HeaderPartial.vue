<template>
  <header class="bg-white py-5 shadow">
    <div class="container">
      <div class="flex items-center justify-between flex-wrap">
        <div class="flex items-center flex-no-shrink mr-6">
          <router-link
            class="text-black hover:text-grey-darkest no-underline font-semibold text-lg"
            to="/"
          >
            Olimpoo Rooms
          </router-link>
        </div>
        <div class="flex items-center w-auto">
          <current-user>
            <template slot-scope="{ user }">
              <div class="items__controls">
                <div class="flex" v-if="user">
                  <router-link
                    :to="{ name: 'CreateHousePage' }"
                    class="mr-2 flex items-center text no-underline text-black"
                  >
                    <i class="material-icons">add</i>
                  </router-link>
                  <button class="mr-4 flex items-center">
                    <i class="material-icons">notifications</i>
                  </button>
                  <div class="flex items-center">
                    <img
                      class="w-8 h-8 rounded-full mr-2"
                      :src="
                        user.avatar
                          ? user.avatar
                          : 'https://avatars2.githubusercontent.com/u/27207751?s=460&u=e312027dae7252496dfbb03a1d7e96f2bb053730&v=4'
                      "
                      alt="Avatar of Ángel Cabrera"
                    />
                    <div class="text-sm">
                      <!-- <router-link
                        :to="{ name: 'ProfilePage' }"
                        class="no-underline hover:underline"
                      > -->
                      <p class="text-black leading-none">
                        {{ user.name }}
                      </p>
                      <!-- </router-link> -->
                      <p class="text-grey-dark">Online</p>
                    </div>
                  </div>
                  <button
                    class="flex items-center ml-4"
                    @click.prevent="logout"
                  >
                    <i class="material-icons">exit_to_app</i>
                  </button>
                </div>
                <div v-else>
                  <div class="flex">
                    <vs-button
                      dark
                      shadow
                      :flat="false"
                      class="rounded-xl general-button border border-yellow-dark"
                      @click="showModal({ name: 'login', value: true })"
                      style="border: 2px solid rgb(255, 186, 0); "
                    >
                      Login
                    </vs-button>
                    <vs-button
                      warn
                      class="rounded-xl general-button ml-3"
                      @click="showModal({ name: 'register', value: true })"
                    >
                      Register
                    </vs-button>
                  </div>
                </div>
              </div>
            </template>
          </current-user>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex';
import CurrentUser from '@/components/CurrentUser.vue';

export default {
  name: 'HeaderPartial',
  components: { CurrentUser },
  methods: {
    ...mapMutations({
      showModal: 'SET_MODAL_STATE',
    }),
    signUp() {
      console.log('Sign Up Click');
    },
    logout() {
      this.$store.dispatch('logout');
    },
  },
};
</script>
