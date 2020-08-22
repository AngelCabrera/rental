<template>
  <page-layout>
    <section class="py-4 bg-teal-dark">
      <div class="container">
        <form class="form" submit.prevent="">
          <div class="form__field relative">
            <i class="input-icon material-icons absolute text-grey-darker"
              >search</i
            >
            <input
              class="input__search"
              id="where"
              type="text"
              placeholder="Mexico City, Mexico"
              required
            />
          </div>
        </form>
      </div>
    </section>
    <section class="section__create py-6">
      <div class="container mx-auto">
        <div class="mb-4">
          <h1 class="text-3xl">Publish a new room</h1>
        </div>
        <form @submit.prevent="save">
          <div class="mb-4">
            <label class="input__label">Title</label>
            <input
              type="text"
              class="input__field"
              placeholder="Beautiful room in Miami beach"
              required
              v-model="publication.title"
            />
          </div>
          <div class="mb-4">
            <label class="input__label">Description</label>
            <textarea
              class="input__field"
              placeholder="Beautiful room in Miami beach"
              rows="10"
              required
              v-model="publication.description"
            ></textarea>
          </div>
          <div class="mb-4">
            <label class="input__label">Featured image</label>
            <input
              type="text"
              class="input__field"
              placeholder="https://images.unsplash.com/photo-1501183638710-841dd1904471"
              required
              v-model="publication.featuredImage"
            />
          </div>
          <div class="mb-4">
            <label class="input__label">Services</label>
            <ul class="flex justify-between list-none p-0">
              <li v-for="service in services" :key="service['.key']">
                <vs-checkbox
                  warn
                  :val="service['.key']"
                  v-model="publication.services[service['.key']]"
                >
                  {{ service.name }}
                </vs-checkbox>
              </li>
            </ul>
          </div>
          <div class="mb-4">
            <vs-button warn class="general-button w-full">
              Publish
            </vs-button>
          </div>
        </form>
      </div>
    </section>
  </page-layout>
</template>
<script>
import PageLayout from '@/layouts/PageLayout.vue';

export default {
  name: 'CreateHousePage',
  beforeCreate() {
    this.$store.dispatch('fetchServices');
  },
  data() {
    return {
      publication: {
        title: '',
        description: '',
        featuredImage: '',
        services: {},
      },
    };
  },
  computed: {
    services() {
      return this.$store.state.services;
    },
  },
  methods: {
    save() {
      const {
        title, description, featuredImage, services,
      } = this.publication;
      const room = {
        title,
        description,
        featured_image: featuredImage,
        services,
      };

      this.$store.dispatch('createRoom', room).then(() => {
        this.$router.push({ name: 'SearchPage' });
      });
    },
  },
  components: {
    PageLayout,
  },
};
</script>
