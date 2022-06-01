export type DropEffectTypes = 'link' | 'none' | 'copy' | 'move'

export type DragEffectAllowedTypes = 'link' | 'none' | 'copy' | 'move'
class VarletDnd {
  dragStatus = false

  // TODO：这里应该需要收集依赖，我打算放在Drag onMounted里，方便后续dragStatus为true 屏蔽 enter
  // 会产生一些问题，屏蔽后，slot就等于失效了，需要讨论
  dragArray = ref<any[]>()

  // TODO：这里也许需要两个DataTransfer， 一个Drag的，另一个Drop的，需要讨论设计，可能涉及到dom event存储
  currentDataTransfer = ref<DataTransfer>()

  setDropEffect = (type: DropEffectTypes) => {
    this.currentDataTransfer.value!.dropEffect = type
  }

  setDragEffectAllowed = (type: DragEffectAllowedTypes) => {
    this.currentDataTransfer.value!.effectAllowed = type
  }
}

export default new VarletDnd()
