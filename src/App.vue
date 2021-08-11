<template>
  <div class="window__bar" id="window__bar">
    <div class="admin__btn" id="window-close" v-on:click="windowclose"></div>
    <div class="admin__btn" id="window-fullscreen" v-on:click="window_fullscreen"></div>
    <div class="admin__btn" id="window-minimum" v-on:click="window_minimum"></div>
    <div id="window-drag"></div>
    <div id="window-title">scheduler</div>
  </div>
  <div id="router-view">
    <router-view/>
  </div>
  <div class="menu__bar">
    <router-link to="/scheduler" class="menu-link">
      <div class="menu__box" id="to-scheduler"></div>
    </router-link>
    <router-link to="/currentProcess" class="menu-link">
      <div class="menu__box" id="to-currentProcess"></div>
    </router-link>
    <router-link to="/setting" class="menu-link">
      <div class="menu__box" id="to-setting"></div>
    </router-link>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  methods: {
    windowclose: () => {
      ipcRenderer.send('window-close')
    },
    window_fullscreen: function windowClose () {
      ipcRenderer.send('window-fullscreen')
    },
    window_minimum: function windowMinimum () {
      ipcRenderer.send('window-minimum')
    }
  }
}
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

.test {
  height: 50px;
  width: 50px;
  background-color: black;
  -webkit-app-region: drag;
}

.admin__btn {
  position: relative;
  z-index: 99999;
}

#window-title {
  position: absolute;
  top: 0;
  left: 50%;
  height: 25px;
  text-align: center;
  display: grid;
  place-items: center;
  transform: translateX(-50%);
  background: none;
  color: white;
}

.window__bar {
  height: 25px;
  width: 100vw;
  display: flex;
  flex-direction: row-reverse;
}

#window-close {
  height: 25px;
  width: 25px;
  background-color: black;
}

#window-close:hover {
  background-color: bisque;
}

#window-fullscreen {
  height: 25px;
  width: 25px;
  background-color: violet;
}

#window-minimum {
  height: 25px;
  width: 25px;
  background-color: aquamarine;
}

#window-drag {
  height: 25px;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: blue;
  -webkit-app-region: drag;
}

#temp__bar {
  height: 25px;
  width: 100%;
}

#router-view {
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  overflow-x: hidden;
}

.menu__bar {
  height: 40px;
  width: 100%;
  background-color: black;
  display: flex;
  flex-direction: row;
}

.menu__box {
  height: 40px;
  width: 40px;
  background-color: yellow;
  display: inline-block;
}
</style>
