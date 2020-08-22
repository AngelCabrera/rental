<template>
  <div class="default-layout">
    <header-partial></header-partial>
    <section class="section__hero py-6 bg-black bg-cover bg-center">
      <div class="container">
        <div class="section__form bg-white p-4 w-1/2 shadow-md rounded-xl">
          <h1 class="mb-2 text-4xl font-light text-grey-darkest">
            Find homes on Getaround
          </h1>
          <h2 class="mb-6 text-base text-grey-dark font-normal">
            Discover entire homes and private rooms perfect for any trip.
          </h2>
          <form class="form__search" submit.prevent="">
            <div class="mb-4">
              <label class="input__label" for="where">Where</label>
              <div class="form__field relative">
                <i class="input-icon material-icons absolute text-grey-darker">
                  search
                </i>
                <input
                  class="input__search"
                  id="where"
                  type="text"
                  placeholder="Buenos Aires, Argentina"
                  required
                />
              </div>
            </div>
            <vs-button warn class="general-button w-full" style="--vs-button-margin: 0px;">
              Search
            </vs-button>
          </form>
        </div>
      </div>
    </section>
    <main class="main">
      <slot></slot>
    </main>
    <footer-partial></footer-partial>
    <div class="modals">
      <modal
        :show="modals.login"
        class="login-modal"
        @close="closeModal({ name: 'login', value: false })"
      >
        <div class="text-center mb-4">
          <h3 class="text-grey-darkest tracking-wider">Sign in</h3>
          <h1 class="mb-4">Welcome again</h1>
        </div>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="input__label">Email</label>
            <input
              type="email"
              class="input__field"
              placeholder="your@email.address"
              required
              v-model="formLogin.email"
            />
          </div>
          <div class="mb-4">
            <label class="input__label">Password</label>
            <input
              type="password"
              class="input__field"
              placeholder="*********"
              required
              v-model="formLogin.password"
            />
          </div>
          <div class="mb-4">
            <label class="input__label">Remember me</label>
            <toggle-input v-model="formLogin.rememberMe"></toggle-input>
          </div>
          <vs-button warn class="w-full general-button">
            Sign in
          </vs-button>
        </form>
      </modal>
      <modal
        :show="modals.register"
        class="register-modal"
        @close="closeModal({ name: 'register', value: false })"
      >
        <div class="text-center mb-4">
          <h3 class="text-grey-darkest tracking-wider">Sign up</h3>
          <h1 class="mb-4">Welcome</h1>
        </div>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label class="input__label">Name</label>
            <input
              type="text"
              class="input__field"
              placeholder="Jhon Doe"
              required
              v-model="formRegister.name"
            />
          </div>
          <div class="mb-4">
            <label class="input__label">Email</label>
            <input
              type="email"
              class="input__field"
              placeholder="your@email.address"
              required
              v-model="formRegister.email"
            />
          </div>
          <div class="mb-4">
            <label class="input__label">Password</label>
            <input
              type="password"
              class="input__field"
              placeholder="*********"
              required
              v-model="formRegister.password"
            />
          </div>
          <vs-button warn class="w-full general-button">
            Sign up
          </vs-button>
        </form>
      </modal>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import HeaderPartial from "@/partials/HeaderPartial.vue";
import FooterPartial from "@/partials/FooterPartial.vue";
import Modal from "@/components/Modal.vue";
import ToggleInput from "@/components/ToggleInput.vue";

export default {
  name: "DefaultLayout",

  data() {
    return {
      formLogin: {
        email: "",
        password: "",
        rememberMe: false
      },
      formRegister: {
        name: "",
        email: "",
        password: ""
      }
    };
  },

  components: {
    HeaderPartial,
    FooterPartial,
    Modal,
    ToggleInput
  },

  methods: {
    ...mapMutations({
      closeModal: "SET_MODAL_STATE"
    }),
    login() {
      this.$store
        .dispatch("signin", {
          email: this.formLogin.email,
          password: this.formLogin.password
        })
        .then(() => {
          this.closeModal({ name: "login", value: false });
        });
    },
    register() {
      this.$store
        .dispatch("createUser", this.formRegister)
        .then(() => this.closeModal({ name: "register", value: false }));
    }
  },

  computed: {
    ...mapGetters(["modals"])
  }
};
</script>

<style>
.section__hero {
  min-height: 450px;
  background-image: url("https://images.unsplash.com/photo-1504202302068-15fc2055f7f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80");
}

.form__field .input-icon {
  top: 7px;
  left: 9px;
}

.form__field > .input__search {
  @apply pl-10;
}

@media (max-width: 576px) {
  .section__hero {
    min-height: 250px;
  }

  .section__form {
    @apply w-full;
  }
}
</style>
