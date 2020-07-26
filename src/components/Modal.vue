<script>
export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  render() {
    return (
      this.show && (
        <div class="modal-wrapper">
          <div class="modal" id="modal">
            <div class="modal__head">
              <div />
              <div />
              <img src="/greet.png" height="225" style="height: 225px;" />
              <a href="#" class="no-underline" onClick={this.close}>
                <i class="material-icons text-grey-darker">close</i>
              </a>
            </div>
            <div class="modal__body">{this.$slots.default}</div>
          </div>
        </div>
      )
    );
  },
};
</script>
<style scoped>
.modal {
  border-radius: 12px;
  min-width: 350px;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  @apply absolute bg-white shadow-lg;
}

.modal .modal__head {
  border-radius: inherit;
  height: 238px;
  overflow: hidden;
  @apply relative;
}

.modal .modal__head div:nth-child(1) {
  margin-bottom: -2px;
  height: 130px;
  @apply bg-yellow-dark;
}

.modal .modal__head div:nth-child(2) {
  margin-top: 1px;
  height: 110px;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  @apply bg-yellow-dark;
}

.modal .modal__head img {
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: auto;
}

.modal .modal__head a {
  right: 1rem;
  top: 0.5rem;
  @apply absolute;
}

.modal .modal__body {
  @apply p-4;
}

.modal-wrapper::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(37, 37, 37, 0.8);
  z-index: 999;
}

@media screen and (min-width: 728px) {
  .modal {
    min-width: 400px;
  }
}

@media screen and (max-width: 349px) {
  .modal {
    min-width: initial;
    max-width: 100vw;
  }
}
</style>
