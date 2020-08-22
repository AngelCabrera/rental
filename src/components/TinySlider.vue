<template>
  <div class="slider-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import { tns } from "tiny-slider/src/tiny-slider";
import "tiny-slider/dist/tiny-slider.css";

export default {
  name: "tinySlider",
  data() {
    return {
      $slider: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const settings = {
        container: this.$el,
        mode: "gallery",
        controlsText: ["<", ">"]
      };

      this.$slider = tns(settings);
    }
  },
  beforeDestroy() {
    if (this.$slider) {
      this.$slider.destroy();
    }
  }
};
</script>

<style>
.tns-outer {
  position: relative;
}
.tns-controls {
  position: absolute;
  top: calc(50% - 3rem);
  color: #fff !important;
  font-size: 6rem;
  z-index: 999;
  display: flex;
  justify-content: space-between;

  left: 1rem;
  right: 1rem;
}

.tns-controls button {
  color: #ffffff !important;
  opacity: 0.6 !important;
}
/*
.tns-controls button {
  visibility: hidden;
}

.tns-controls button:first-child:before {
  content: "<";
  visibility: visible;
  display: block;
}

.tns-controls button:nth-child(2):before {
  content: " >";
  visibility: visible;
}
*/
.tns-nav {
  height: 0;
}
</style>
