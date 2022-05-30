<script setup lang="ts">
import type { Ref } from 'vue'

interface DragProps {
  dragData?: any
  dragImg?: Element
  disabled?: boolean
  type?: 'link' | 'none' | 'copy' | 'move' | 'copyLink' | 'copyMove' | 'linkMove' | 'all' | 'uninitialized'
}

interface DragEmits {
  (e: 'drag', event: DragEvent): void
  (e: 'dragstart', event: DragEvent): void
  (e: 'dragend', event: DragEvent): void
  (e: 'dragenter', event: DragEvent): void
}

const { disabled = false, dragImg, dragData, type = 'all' } = defineProps<DragProps>()

const emit = defineEmits<DragEmits>()

const dragStatus: Ref<'drag' | 'none'> = ref('none')

const onDragStart = (e: DragEvent) => {
  // 此处作为鼠标拖拽时设置图片使用，可canvas / images 偏移量针对鼠标位置进行偏移
  dragImg && e.dataTransfer!.setDragImage(dragImg, 0, 0)
  dragStatus.value = 'drag'
  e.dataTransfer!.effectAllowed = type
  dragData && e.dataTransfer!.setData('text/plain', dragData)
  emit('dragstart', e)
}

const onDrag = (e: DragEvent) => {
  emit('drag', e)
}

const onDragEnter = (e: DragEvent) => {
  emit('dragenter', e)
}

const onDragEnd = (e: DragEvent) => {
  dragStatus.value = 'none'
  emit('dragend', e)
}
</script>

<template>
  <div
    :draggable="!disabled" transition-opacity :class="{ 'op-70': dragStatus === 'drag' }"
    @dragstart.passive="onDragStart"
    @drag="onDrag"
    @dragover.prevent=""
    @dragenter.stop="onDragEnter"
    @dragend="onDragEnd"
  >
    <slot />
  </div>
</template>
