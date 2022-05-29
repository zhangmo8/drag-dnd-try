<script setup lang="ts">
const renderSchema = reactive<string[]>([])
const dropType = ref('copy')
const dropDom = ref()

const onDrop = (e: DragEvent, data: any) => {
  data && renderSchema.push(data)
}

const onDragStart = (item: any) => {
  dropType.value = 'move'
  dropDom.value = renderSchema.findIndex(ele => ele === item)
}

const onDragEnd = (item: any) => {
  dropType.value = 'copy'
  renderSchema.splice(dropDom.value, 1)
}
</script>

<template>
  <div flex>
    <div w-80 flex justify-around flex-wrap items-center h-screen bg-red m-r-10>
      <Drag
        v-for="item in 6"
        :key="item"
        :drag-data="item"
        draggable="true" w-30 h-30 lh-30 text-center bg-yellow transition-opacity
      >
        {{ item }}
      </Drag>
    </div>
    <Drop
      flex-1 bg-blue transition-colors
      :type="dropType"
      @drop="onDrop"
    >
      <Drag
        v-for="(item) in renderSchema"
        :key="item"
        flex-inline
        bg-yellow
        w-30 h-30 lh-30
        border b-red
        justify-center
        items-center
        @dragstart="onDragStart(item)"
        @dragend="onDragEnd(item)"
      >
        {{ item }}
      </Drag>
    </Drop>
    <div w-80 h-screen w-40 h-40 bg-pink m-l-10 />
  </div>
</template>
