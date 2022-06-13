<script setup lang="ts">
const renderSchema = reactive<string[]>([])
const dropType = ref('copy')
const dragType = ref('add')

const dropEnterStatus = ref<'enter' | 'leave' | 'none'>('none')
const dropDom = ref()

const onDragStart = (el: any) => {
  dropDom.value = el
  dragType.value = 'add'
  dropEnterStatus.value = 'none'
}

const onDragSortStart = (item: any) => {
  dropType.value = 'move'
  dropDom.value = item
  dragType.value = 'sort'
}

const onDragSortEnter = (el: any, i: number) => {
  dragType.value = 'sort'
  const index = renderSchema.findIndex(item => item === dropDom.value)
  if (index !== -1)
    renderSchema.splice(index, 1)

  else dropEnterStatus.value = 'enter'
  renderSchema.splice(i, 0, dropDom.value)
}

const onDragSortEnd = (item: any) => {
  dropDom.value = null
  dragType.value = 'none'
  dropEnterStatus.value = 'none'
}

const onDrop = (e: DragEvent, data: any) => {
  dropDom.value = null
  dragType.value = 'none'
  dropEnterStatus.value = 'none'
}

const onDropEnter = (item: any) => {
  if (dragType.value !== 'sort') {
    dropEnterStatus.value = 'enter'
    dragType.value = 'sort'
    dropDom.value && renderSchema.push(dropDom.value)
  }
}

const onDropLeave = (item: any) => {
  if (dragType.value === 'add') {
    dropEnterStatus.value = 'leave'
    const index = renderSchema.findIndex(item => item === dropDom.value)
    renderSchema.splice(index, 1)
  }
}
</script>

<template>
  <div flex>
    <div w-80 flex justify-around gap-1 flex-wrap items-center h-screen bg-red m-r-10>
      <Drag
        v-for="item in 18" :key="item" :drag-data="item" w-20 h-20 lh-20 text-center bg-yellow transition-opacity
        @dragstart="onDragStart(item)"
      >
        {{ item }}
      </Drag>
    </div>
    <Drop
      flex-1 bg-blue transition-colors :type="dropType" @drop="onDrop" @dragenter="onDropEnter"
      @dragleave="onDropLeave"
    >
      <transition-group name="drag" tag="div" class="move-list">
        <Drag
          v-for="(item, i) in renderSchema" :key="item" flex-inline bg-yellow w-30 h-30 lh-30 border b-red
          justify-center items-center cursor-move @dragstart="onDragSortStart(item)"
          @dragenter="onDragSortEnter(item, i)" @dragend="onDragSortEnd"
        >
          <!-- @dragenter.stop="onSortDrag(item, i)" -->
          {{ item }}
        </Drag>
      </transition-group>
    </Drop>
    <div w-80 h-screen w-40 h-40 bg-pink m-l-10 />
  </div>
</template>

<style>
.drag-move {
  transition: transform .5s;
  pointer-events: none;
}
</style>
