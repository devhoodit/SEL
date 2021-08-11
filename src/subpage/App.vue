<template>
    <body>
        <div class="logo_box" id="logo_box">
            <img :src='logo' alt="UpdateLogo" class="logo_img">
        </div>
        <div class="logo_char" id="logo_char">
          <div id="s" class="char">
            <img :src='logo_s' alt="logo_s" class="char_img">
          </div>
          <div id="e" class="char">
            <img :src='logo_e' alt="logo_e" class="char_img">
          </div>
          <div id="l" class="char">
            <img :src='logo_l' alt="logo_l" class="char_img">
          </div>
        </div>
        <div class="shading_glass" id="shading-glass">
          <div class="checkbox" id="tip__box">
            <div class="contents__box">
              <h1> TIPS! </h1>
              <p> First time use this app? you can connect 3rd party application or plugins, your scheduler data is store in current directory (/data/scheduler.db) If u already have ur scheduler, just change it.</p>
            </div>
            <div class="sign__btn" id="sign-btn">
              <p> I read this </p>
            </div>
          </div>
        </div>
        <div id="wave">
          <img :src='wave' alt="">
        </div>
    </body>
</template>

<script>
import logo from './assets/img/logo_sel.png'
import logoS from './assets/img/logo_s.png'
import logoE from './assets/img/logo_e.png'
import logoL from './assets/img/logo_l.png'
import wave from './assets/img/wave.svg'
import { ipcRenderer } from 'electron'

let firstExcute = false

ipcRenderer.once('check-update-done', (event) => {
  if (!firstExcute) checkDone()
})

ipcRenderer.once('first-execute', (event) => {
  firstExcute = true
  console.log('first excute')
  boxsizing()
})

function boxsizing () {
  const tipbox = document.getElementById('tip__box')
  const signbox = document.getElementById('sign-btn')
  const shadingGlass = document.getElementById('shading-glass')
  shadingGlass.webkitAnimation = 'fadein 1s forwards'
  shadingGlass.style.visibility = 'visible'
  tipbox.style.display = 'block'
  tipbox.style.webkitAnimation = 'boxsizing 1s forwards'
  signbox.addEventListener('click', (event) => {
    tipbox.addEventListener('animationend', () => {
      tipbox.style.display = 'none'
      shadingGlass.style.display = 'none'
      if (firstExcute) checkDone()
    })
    tipbox.style.webkitAnimation = 'boxsizing2 0.7s ease-in-out forwards'
    shadingGlass.style.webkitAnimation = 'fadeout 1s forwards'
  })
}

function logoChange () {
  document.getElementById('logo_box').style.animation = 'fadein 1s forwards'
  document.getElementById('logo_char').style.animation = 'fadeout 1s forwards'
}

function waveChange () {
  const wave = document.getElementById('wave')
  wave.addEventListener('transitionend', () => {
    ipcRenderer.send('window-quit')
  })
  wave.style.transform = 'rotate(30deg) translate(0, -10%)'
}

function checkDone () {
  waveChange()
  logoChange()
}
window.onload = () => {
  ipcRenderer.send('ready-to-check')
}

export default {
  data () {
    return {
      logo: logo,
      logo_s: logoS,
      logo_e: logoE,
      logo_l: logoL,
      wave: wave
    }
  }
}
</script>

<style>
:root {
  --checkbox-border-radius: 15px;
}

* {
  margin: 0px;
  box-sizing: border-box;
}

body {
  overflow: hidden;
  margin: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo_box {
  opacity: 0;
  width: 220px;
  height: 125px;
  animation-delay: 0.9s;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.logo_img {
  width: 100%;
  height: 100%;
}

.logo_char {
  position: absolute;
  width: 220px;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  animation-delay: 0.9s;
}

.char {
  width: 70px;
  height: 125px;
}

.char_img {
  width: 100%;
  height: 100%;
}

.shading_glass {
  position: absolute;
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: hsla(131, 0%, 65%, 0.69);
}

.checkbox {
  display: none;
  position: absolute;
  width: 90vw;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.788);
  border-radius: var(--checkbox-border-radius);
  border: 5px solid rgb(0, 0, 0);
  color: white;
  overflow: hidden;
}

@keyframes boxsizing {
  from {
    transform: scale(0, 0);
  }
  to {
    transform: scale(1,1);
  }
}

@keyframes boxsizing2 {
  form {
    transform: scale(1, 1);
  }
  to {
    transform: scale(0, 0);
  }
}

.contents__box {
  position: absolute;
  font-family: sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 85%;
  padding: 20px 15px 15px 15px;
}

.sign__btn {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15%;
  text-align: center;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: var(--checkbox-border-radius);
  border-bottom-right-radius: var(--checkbox-border-radius);
  overflow: hidden;
  cursor: pointer;
}

.sign__btn:hover {
  background-color: rgb(0, 0, 0);
}

.sign__btn:hover::after {
  left: 0;
}

.sign__btn::after {
  display: block;
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  content: ' ';
  border-top: 5px solid yellowgreen;
  transition: 1s cubic-bezier(0.58, 0.07, 0.32, 0.89);
}

#wave {
  position: absolute;
  display: block;
  transform: rotate(30deg) translate(0%, 100%);
  z-index: -1;
  transition: 1.8s cubic-bezier(0.35, 0.71, 0.32, 0.99);
}
</style>
