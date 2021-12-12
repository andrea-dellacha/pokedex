<template>
  <div>
    <div v-if="isOpen" class="p-disableBg">
      <div class="c-modal" :class="errorsData.criticality === 1 ? '-border_lvl1' : '-border_lvl2'">
        <div class="m-title" :class="errorsData.criticality === 1 ? '-color_lvl1' : '-color_lvl2'">
          <ExclamationMarkRound v-if="errorsData.criticality === 1" class="a-title__icon" color="#DF0000" />
          {{ errorsData.title }}
        </div>
        <div class="m-msg">
          {{ errorsData.message | capitalize }}
        </div>
        <div class="m-actions">
          <button class="btn -dark -noRightMargin" @click="closeModal">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ExclamationMarkRound from '@/assets/icon/round-exclamation-mark'


/**
 * @vuese
 * I'm an alert modal page
 * I display a box who contain an error, a confirmation or an information
 */
export default {
  name: 'ErrorsModal',
  components: {
    ExclamationMarkRound
  },
  layout: 'default',
  data() {
    return {
      isOpen: false,
      errorsData: { title: '', criticality: 1, message: '' }
    }
  },
  computed: {
    ...mapGetters({
      errorGeneral: 'error/getError'
    })
  },
  watch: {
    errorGeneral (val) {
      this.isOpen = true
      this.errorsData = val
    }
  },
  methods: {
    closeModal() {
      this.isOpen = false
      this.errorsData = { title: '', criticality: 1, message: '' }
    }
  }
}
</script>

<style lang="css" scoped>
.p-disableBg {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
  background-color: var(--absolute-modal-bg);
  cursor: no-drop;
  z-index: 999;
}

.c-modal {
  --borderWidth: 3px;
  background-color: var(--bg-color);
  min-width: 20vw;
  max-width: 60vw;
  min-height: 20vh;
  border-radius: var(--borderWidth);
  cursor: default;
  box-sizing: border-box !important;
  position: relative;
  display: grid;
  padding: 10px;
  grid-template-areas:
  "title title"
  "msg msg"
  "infos actions" ;
  grid-template-rows: 60px auto auto;
  grid-template-columns: auto 50px;
}

/* A box a little bit bigger than the parent to create an animated border */
.c-modal:after {
  content: '';
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  -webkit-animation: animatedgradient 3s ease alternate infinite;
          animation: animatedgradient 3s ease alternate infinite;
}

/******* Border color *********/
.c-modal.-border_lvl1:after {
  background: linear-gradient(90deg, rgb(201, 37, 37) 0%, rgb(214, 78, 78) 50%, rgb(230, 102, 102) 100%);
  background-size: 300% 300%;
}

.c-modal.-border_lvl2:after {
  background: linear-gradient(90deg, rgb(34,120,15) 0%, rgb(50,205,50) 50%, rgb(127,255,0) 100%);
  background-size: 300% 300%;
}

/***** Border animation *******/
@-webkit-keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/***** Templates *******/
.m-title {
  grid-area: title;
  display: flex;
  place-items: center;
  font-size: 20px;
}

.a-title__icon {
  margin-right: 10px;
}
.-color_lvl1 {
  color: rgb(201, 37, 37);
}
.-color_lvl2 {
  color: #32CD32;
}

.m-msg {
  grid-area: msg;
  padding: 10px 0;
  min-height: 50px;
  max-height: 50vh;
}

.m-actions {
  grid-area: actions;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.-noRightMargin {
  margin-right: 0;
}
</style>
