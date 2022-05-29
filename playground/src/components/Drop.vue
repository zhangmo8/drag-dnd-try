<script setup lang="ts">
import type { Ref } from 'vue'

interface DropProps {
  type?: 'link' | 'none' | 'copy' | 'move'
}

interface DropEmit {
  (e: 'dragenter', event: DragEvent): void
  (e: 'dragover', event: DragEvent): void
  (e: 'dragleave', event: DragEvent): void
  (e: 'drop', event: DragEvent, data: any): void
}

const { type = 'copy' } = defineProps<DropProps>()
const emits = defineEmits<DropEmit>()

const dropStatus: Ref<'enter' | 'none'> = ref('none')

const onDragEnter = (e: DragEvent) => {
  dropStatus.value = 'enter'
  emits('dragenter', e)
}

const onDragLeave = (e: DragEvent) => {
  dropStatus.value = 'none'
  emits('dragleave', e)
}

const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  e.dataTransfer!.dropEffect = type
  emits('dragover', e)
}

const onDrop = (e: DragEvent) => {
  dropStatus.value = 'none'
  const data = e.dataTransfer!.getData('text/plain')
  emits('drop', e, data)
}
</script>

<template>
  <div
    @dragenter="onDragEnter"
    @dragleave.self="onDragLeave"
    @dragover.prevent="onDragOver"
    @drop="onDrop"
  >
    <slot />
  </div>
</template>
