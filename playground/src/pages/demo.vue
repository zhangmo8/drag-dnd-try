<script setup lang="ts">
const renderSchema = reactive<string[]>([])
const dropType = ref('copy')
const dropDom = ref()

const onDrop = (e: DragEvent, data: any) => {
  data && renderSchema.push(data)
}

const onDragStart = (item: any) => {
  dropType.value = 'move'
  dropDom.value = item
}

const onDragEnd = (item: any) => {
  // renderSchema.splice(dropDom.value, 1)
}

const onDropEnter = () => { }

const onSortDrag = (el: any, i: number) => {
  if (dropDom.value !== el) {
    const index = renderSchema.findIndex(item => item === dropDom.value)
    renderSchema.splice(index, 1)
    renderSchema.splice(i, 0, dropDom.value)
  }
}
</script>

<template>
  <div flex>
    <div w-80 flex justify-around gap-1 flex-wrap items-center h-screen bg-red m-r-10>
      <Drag
        v-for="item in 16"
        :key="item"
        :drag-data="item"
        draggable="true" w-20 h-20 lh-20 text-center bg-yellow transition-opacity
      >
        {{ item }}
      </Drag>
    </div>
    <Drop
      flex-1 bg-blue transition-colors
      :type="dropType"
      @drop="onDrop"
      @dragenter="onDropEnter"
    >
      <transition-group name="drag" tag="div" class="move-list">
        <Drag
          v-for="(item, i) in renderSchema"
          :key="item"
          flex-inline
          bg-yellow
          w-30 h-30 lh-30
          border b-red
          justify-center
          items-center
          cursor-move
          @dragstart="onDragStart(item)"
          @dragend="onDragEnd(item)"
          @dragenter.stop="onSortDrag(item, i)"
        >
          {{ item }}
        </Drag>
      </transition-group>
    </Drop>
    <div w-80 h-screen w-40 h-40 bg-pink m-l-10 />
  </div>
</template>

<style>
.drag-move{
  transition: transform .5s;
}
</style>
