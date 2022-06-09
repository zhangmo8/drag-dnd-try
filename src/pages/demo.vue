<script setup lang="ts">
const renderSchema = reactive<string[]>([])
const dropType = ref('copy')
const dropDom = ref()

const onDrop = (e: DragEvent, data: any) => {
  if (data) {
    if (dropDom.value) {
      const index = renderSchema.findIndex(item => item === dropDom.value)
      renderSchema.splice(index, 0, data)
    }
    else { renderSchema.push(data) }
    dropDom.value = null
  }
}

const onDragStart = (item: any) => {
  dropType.value = 'move'
}

const onDragEnd = (el: any, i: number) => {
  const index = renderSchema.findIndex(item => item === dropDom.value)
  renderSchema.splice(i, 1)
  renderSchema.splice(index, 0, el)
  dropDom.value = null

  // renderSchema.splice(dropDom.value, 1)
}

const onDragEnter = (item: any) => {
  dropDom.value = item.toString()
}

// TODO: 去除中间态排序，放下时才真正change
const onDropEnter = (item: any) => { }
</script>

<template>
  <div flex>
    <div w-80 flex justify-around gap-1 flex-wrap items-center h-screen bg-red m-r-10>
      <Drag v-for="item in 18" :key="item" :drag-data="item" w-20 h-20 lh-20 text-center bg-yellow transition-opacity>
        {{ item }}
      </Drag>
    </div>
    <Drop flex-1 bg-blue transition-colors :type="dropType" @drop="onDrop" @dragenter="onDropEnter">
      <!-- TODO:这里考虑是否需要重新加入一个DragGroup来兼容排序情况 -->
      <transition-group name="drag" tag="div" class="move-list">
        <Drag
          v-for="(item, i) in renderSchema" :key="item" flex-inline bg-yellow w-30 h-30 lh-30 border b-red
          justify-center items-center cursor-move @dragstart="onDragStart(item)" @dragenter="onDragEnter(item)"
          @dragend.prevent="onDragEnd(item, i)"
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
