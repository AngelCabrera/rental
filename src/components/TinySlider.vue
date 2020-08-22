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
  color: #fff !important;
  display: flex;
  font-size: 6rem;
  justify-content: space-between;
  left: 1rem;
  outline: none !important;
  position: absolute;
  right: 1rem;
  top: calc(50% - 3rem);
  z-index: 999;
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
