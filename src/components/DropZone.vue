<script setup>
import { ref } from 'vue'
import { useBase64 } from '@/composables/useBase64'
import IconUpload from '@/icons/IconUpload.vue'
import IconFile from '@/icons/IconFile.vue'

const { fileData, isProcessing, processFile } = useBase64()

const isDragOver = ref(false)
const fileInput = ref(null)

function onDragEnter(e) {
  e.preventDefault()
  isDragOver.value = true
}

function onDragLeave(e) {
  e.preventDefault()
  isDragOver.value = false
}

function onDragOver(e) {
  e.preventDefault()
}

function onDrop(e) {
  e.preventDefault()
  isDragOver.value = false
  const file = e.dataTransfer?.files?.[0]
  if (file) processFile(file)
}

function onClick() {
  fileInput.value?.click()
}

function onFileChange(e) {
  const file = e.target.files?.[0]
  if (file) processFile(file)
  e.target.value = ''
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

const isImage = (type) => type?.startsWith('image/')
</script>

<template>
  <div
    class="flex-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer select-none"
    :class="[
      isDragOver
        ? 'border-primary-400 bg-primary-50 dark:bg-primary-500/10 scale-[1.01]'
        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-slate-50 dark:hover:bg-slate-750',
    ]"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @dragover="onDragOver"
    @drop="onDrop"
    @click="onClick"
  >
    <input ref="fileInput" type="file" class="hidden" @change="onFileChange" />

    <template v-if="isProcessing">
      <div class="w-10 h-10 border-3 border-primary-300 dark:border-primary-700 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin" />
    </template>

    <template v-else-if="fileData">
      <div class="flex flex-col items-center gap-3 px-6 py-4 max-w-full">
        <img
          v-if="isImage(fileData.type)"
          :src="fileData.dataUri"
          :alt="fileData.name"
          class="max-h-32 max-w-48 rounded-lg shadow-sm object-contain"
        />
        <div v-else class="w-12 h-12 text-primary-400">
          <IconFile />
        </div>
        <div class="text-center min-w-0 max-w-full">
          <p class="text-sm font-medium text-slate-700 dark:text-slate-200 truncate max-w-64">{{ fileData.name }}</p>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {{ fileData.type }} &middot; {{ formatSize(fileData.size) }}
          </p>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="flex flex-col items-center gap-3 text-slate-400 dark:text-slate-500">
        <div class="w-12 h-12">
          <IconUpload />
        </div>
        <span class="text-sm">Drop file or click to browse</span>
      </div>
    </template>
  </div>
</template>
