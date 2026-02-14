<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useBase64 } from '@/composables/useBase64'
import { useTheme } from '@/composables/useTheme'
import FullPageDrop from '@/components/FullPageDrop.vue'
import DropZone from '@/components/DropZone.vue'
import TextInput from '@/components/TextInput.vue'
import OutputPanel from '@/components/OutputPanel.vue'
import IconFile from '@/icons/IconFile.vue'
import IconText from '@/icons/IconText.vue'
import IconClear from '@/icons/IconClear.vue'
import IconSun from '@/icons/IconSun.vue'
import IconMoon from '@/icons/IconMoon.vue'

const { mode, output, setMode, processFile, clear } = useBase64()
const { isDark, toggle: toggleTheme } = useTheme()

const isDraggingOverPage = ref(false)
let dragCounter = 0

function onDragEnter(e) {
  e.preventDefault()
  if (e.dataTransfer?.types?.includes('Files')) {
    dragCounter++
    isDraggingOverPage.value = true
  }
}

function onDragLeave(e) {
  e.preventDefault()
  dragCounter--
  if (dragCounter <= 0) {
    dragCounter = 0
    isDraggingOverPage.value = false
  }
}

function onDragOver(e) {
  e.preventDefault()
}

function onDrop(e) {
  e.preventDefault()
  dragCounter = 0
  isDraggingOverPage.value = false
}

function onFullPageDrop(file) {
  isDraggingOverPage.value = false
  dragCounter = 0
  processFile(file)
}

onMounted(() => {
  document.addEventListener('dragenter', onDragEnter)
  document.addEventListener('dragleave', onDragLeave)
  document.addEventListener('dragover', onDragOver)
  document.addEventListener('drop', onDrop)
})

onUnmounted(() => {
  document.removeEventListener('dragenter', onDragEnter)
  document.removeEventListener('dragleave', onDragLeave)
  document.removeEventListener('dragover', onDragOver)
  document.removeEventListener('drop', onDrop)
})
</script>

<template>
  <div class="h-full flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-200">
    <!-- Header -->
    <header class="flex items-center justify-between px-5 py-3 shrink-0">
      <h1 class="text-2xl tracking-wider text-primary-500 dark:text-primary-400 select-none" style="font-family: 'Martian Mono', monospace; font-weight: 800; font-stretch: 112.5%">64</h1>

      <div class="flex items-center gap-1">
        <!-- Mode tabs -->
        <div class="flex bg-slate-200/60 dark:bg-slate-700/60 rounded-xl p-1 gap-0.5">
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            :class="[
              mode === 'file'
                ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
            ]"
            @click="setMode('file')"
          >
            <div class="w-4 h-4"><IconFile /></div>
          </button>
          <button
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
            :class="[
              mode === 'text'
                ? 'bg-white dark:bg-slate-600 text-primary-600 dark:text-primary-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
            ]"
            @click="setMode('text')"
          >
            <div class="w-4 h-4"><IconText /></div>
          </button>
        </div>

        <!-- Theme toggle -->
        <button
          class="ml-1 p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all duration-200 active:scale-95"
          @click="toggleTheme"
        >
          <div class="w-4 h-4">
            <IconSun v-if="isDark" />
            <IconMoon v-else />
          </div>
        </button>

        <!-- Clear button -->
        <button
          v-if="output"
          class="p-2 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 active:scale-95"
          @click="clear"
        >
          <div class="w-4 h-4"><IconClear /></div>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col md:flex-row gap-3 px-4 pb-4 min-h-0">
      <!-- Input Panel -->
      <div class="flex flex-col md:w-1/2 min-h-0 h-1/2 md:h-auto">
        <DropZone v-if="mode === 'file'" />
        <TextInput v-else />
      </div>

      <!-- Output Panel -->
      <div class="flex flex-col md:w-1/2 min-h-0 h-1/2 md:h-auto">
        <OutputPanel />
      </div>
    </main>

    <!-- Full-page drop overlay -->
    <Transition
      enter-active-class="transition-opacity duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <FullPageDrop v-if="isDraggingOverPage" @drop="onFullPageDrop" />
    </Transition>
  </div>
</template>
