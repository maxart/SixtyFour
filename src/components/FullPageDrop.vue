<script setup>
import IconUpload from '@/icons/IconUpload.vue'

const emit = defineEmits(['drop'])

function onDrop(e) {
  e.preventDefault()
  const file = e.dataTransfer?.files?.[0]
  if (file) {
    emit('drop', file)
  }
}

function onDragOver(e) {
  e.preventDefault()
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-primary-500/90 backdrop-blur-sm"
    @drop="onDrop"
    @dragover="onDragOver"
  >
    <div class="flex flex-col items-center gap-4 text-white pointer-events-none">
      <div class="w-24 h-24 animate-bounce">
        <IconUpload />
      </div>
      <span class="text-2xl font-medium tracking-wide opacity-90">Drop anywhere</span>
    </div>
  </div>
</template>
