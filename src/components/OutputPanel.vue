<script setup>
import { ref, watch, nextTick } from 'vue'
import { useBase64 } from '@/composables/useBase64'
import IconCopy from '@/icons/IconCopy.vue'
import IconCheck from '@/icons/IconCheck.vue'

const { output, outputSize } = useBase64()

const copied = ref(false)
const outputEl = ref(null)
let copyTimeout = null

async function copyToClipboard() {
  if (!output.value) return
  try {
    await navigator.clipboard.writeText(output.value)
    copied.value = true
    clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = output.value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

function formatSize(chars) {
  if (chars < 1024) return chars + ' chars'
  if (chars < 1024 * 1024) return (chars / 1024).toFixed(1) + 'K chars'
  return (chars / (1024 * 1024)).toFixed(1) + 'M chars'
}

watch(output, () => {
  nextTick(() => {
    if (outputEl.value) {
      outputEl.value.scrollTop = 0
    }
  })
})
</script>

<template>
  <div class="flex flex-col h-full rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-200">
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 dark:border-slate-700 shrink-0">
      <span class="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">Base64</span>
      <div class="flex items-center gap-3">
        <span v-if="output" class="text-xs text-slate-400 dark:text-slate-500">{{ formatSize(outputSize) }}</span>
        <button
          :disabled="!output"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
          :class="[
            copied
              ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : output
                ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-500/20 active:scale-95'
                : 'bg-slate-50 dark:bg-slate-700 text-slate-300 dark:text-slate-600 cursor-not-allowed',
          ]"
          @click="copyToClipboard"
        >
          <div class="w-4 h-4">
            <IconCheck v-if="copied" />
            <IconCopy v-else />
          </div>
        </button>
      </div>
    </div>
    <div ref="outputEl" class="flex-1 overflow-auto p-4 min-h-0">
      <pre
        v-if="output"
        class="text-xs font-mono text-slate-600 dark:text-slate-300 whitespace-pre-wrap break-all leading-relaxed"
      >{{ output }}</pre>
      <div v-else class="flex items-center justify-center h-full text-slate-300 dark:text-slate-600 text-sm">
        Encoded output will appear here
      </div>
    </div>
  </div>
</template>
