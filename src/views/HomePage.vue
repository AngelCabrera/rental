<template>
  <default-layout>
    <section class="container py-6">
      <h1 class="text-3xl font-light text-grey-darkest mb-3">Recommended</h1>
      <div class="section border-2 border-red-100">
        <tiny-slider>
          <div class="slider-item">
            <img
              src="http://source.unsplash.com/1440x700/?room"
              alt="Source
            image"
            />
          </div>
          <div class="slider-item">
            <img
              src="http://source.unsplash.com/1440x700/?home"
              alt="Source
            image"
            />
          </div>
          <div class="slider-item">
            <img
              src="http://source.unsplash.com/1500x720/?dining room"
              alt="Source
            image"
            />
          </div>
          <div class="slider-item">
            <img
              src="http://source.unsplash.com/1600x1080/?bedroom"
              alt="Source
            image"
            />
          </div>
          <div class="slider-item">
            <img
              src="http://source.unsplash.com/1380x880/?living-room"
              alt="Source
            image"
            />
          </div>
        </tiny-slider>
      </div>
    </section>
    <section class="container py-6">
      <h1 class="text-3xl font-light text-grey-darkest mb-3">Explore</h1>
      <div class="section__explore grid-container mb-8">
        <div
          class="house__card rounded-xl mb-3"
          v-for="room in rooms"
          :key="room['.key']"
        >
          <div class="house__thumbnail relative overflow-hidden">
            <img
              class="house__image absolute w-full"
              width="250"
              :src="room.featured_image"
            />
          </div>
          <div class="house__content bg-white p-3 border">
            <div
              class="house__type font-semibold text-xs uppercase text-teal-dark mb-1"
            >
              {{ room.type }}
            </div>
            <div class="house__title font-bold mb-2">
              {{ room.title }}
            </div>
            <div class="house__price text-xs">
              <span class="font-bold">${{ room.price }} USD</span> per night
            </div>
            <div class="flex">
              <vs-button
                warn
                border
                v-for="(service, key, index) in room.services"
                :key="key"
                class="cursor-default"
                :active="false"
                style="cursor: default"
                v-show="index < 3"
              >
                <span class="text-grey-darkest">
                  {{ services[key] && services[key].name }}
                </span>
              </vs-button>
            </div>
          </div>
        </div>
      </div>
      <router-link :to="{ name: 'SearchPage' }" class="no-underline mx-auto">
        <div class="flex justify-center">
          <vs-button class="general-button" warn>
            Show all
          </vs-button>
        </div>
      </router-link>
    </section>
  </default-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import TinySlider from '@/components/TinySlider.vue';

export default {
  name: 'HomePage',
  beforeCreate() {
    this.$store.dispatch('fetchRooms', 12);
    this.$store.dispatch('fetchServices');
  },
  computed: {
    ...mapGetters(['rooms', 'services']),
  },
  components: {
    DefaultLayout,
    TinySlider,
  },
};
</script>

<style lang="css">
.section__explore {
  grid-template-columns: repeat(4, 1fr);
}

.house__card > .house__thumbnail {
  height: 170px;
}

.house__thumbnail > .house__image {
  width: 100%;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

@media(max-width: 992px) {
  .house__card > .house__thumbnail {
    height: 150px;
  }
  .section__explore {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media(max-width: 576px) {
  .section__explore {
    grid-template-columns: repeat(1, 1fr);
  }

  .house__card > .house__thumbnail {
    height: 120px;
  }
}
</style>
