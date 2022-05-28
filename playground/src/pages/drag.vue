<script setup lang="ts">
import type { Ref } from 'vue'

const dragStatus: Ref<'drag' | 'none'> = ref('none')
const dropStatus: Ref<'enter' | 'none'> = ref('none')

const renderSchema = reactive<string[]>([])

const onDragStart = (e: DragEvent) => {
  dragStatus.value = 'drag'
  e.dataTransfer!.effectAllowed = 'copy'
  e.dataTransfer!.setData('text/plain', 'bbb')
}

const onDragEnd = (e: DragEvent) => {
  dragStatus.value = 'none'
}

const onDragEnter = (e: DragEvent) => {
  dropStatus.value = 'enter'
}

const onDragLeave = (e: DragEvent) => {
  dropStatus.value = 'none'
}

const onDragOver = (e: DragEvent) => {
}

const onDrop = (e: DragEvent) => {
  dropStatus.value = 'none'
  const data = e.dataTransfer!.getData('text/plain')
  renderSchema.push(data)
}
</script>

<template>
  <div flex>
    <div w-80 flex justify-around flex-wrap items-center h-screen bg-red m-r-10>
      <div
        draggable="true" w-30 h-30 bg-yellow transition-opacity :class="{ 'op-20': dragStatus === 'drag' }"
        @dragstart="onDragStart" @dragend="onDragEnd"
      />
      <div draggable="true" w-30 h-30 bg-yellow />
      <div draggable="true" w-30 h-30 bg-yellow />
      <div draggable="true" w-30 h-30 bg-yellow />
      <div draggable="true" w-30 h-30 bg-yellow />
      <div draggable="true" w-30 h-30 bg-yellow />
    </div>
    <div
      flex-1 flex h-screen flex-gap-2 justify-around flex-wrap bg-blue transition-colors
      :class="{ 'bg-op-30': dropStatus === 'enter' }"
      @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent="onDragOver"
      @drop="onDrop"
    >
      <div v-for="(index) in renderSchema" :key="index" w-30 h-30 bg-yellow />
    </div>
    <div w-80 h-screen w-40 h-40 bg-pink m-l-10 />
  </div>
</template>
