<template>
  <h1>Hello World</h1>
  <div class="schedule__container">
    <div class="calender__container">
      <div v-for="(date, id) in calender" v-bind:key="date" v-on:click="openTodaySchedule($event, id, date)" class="calender__id">{{ date }}</div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import { reactive } from '@vue/reactivity'

// calender=month numbers scheduleData=daily schedule data
var calender = reactive([])
var scheduleData = []
let todaySchedule

for (var i = 0; i < 42; i++) {
  calender.push(i)
  scheduleData.push(i)
}

function getMontlyData () {
  ipcRenderer.send('get-db')
}

// id = index that have unique value, date = it can have same value in 1 list
function openTodaySchedule (event, id, date) {
  calender[id] = 1
}

ipcRenderer.on('monlty-data', (calenderData, montlySchedule) => {
  calender = calenderData
  scheduleData = montlySchedule
})

export default {
  data () {
    return {
      calender: calender,
      scheduleData: scheduleData,
      todaySchedule: todaySchedule
    }
  },
  methods: {
    getMontlyData: getMontlyData,
    openTodaySchedule: openTodaySchedule
  }
}

</script>

<style>
* {
  box-sizing: border-box;
}

:root {
  --calender-background: hsla(155, 100%, 69%, 1);
  --calender-border: hsla(155, 100%, 78%, 1);
  --calender-color: hsla(246, 100%, 74%, 1);
  --calender-background-hover: hsla(155, 100%, 53%, 1);
}

.calender__container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(7, 1fr);
  width: 600px;
  height: 450px;
}

.calender__id {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--calender-background);
  color: var(--calender-color);
  border: 1px solid var(--calender-border);
}

.calender__id:hover {
  background-color: var(--calender-background-hover);
}
</style>
