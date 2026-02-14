<script setup>
import { useBase64 } from '@/composables/useBase64'

const { textInput } = useBase64()
</script>

<template>
  <div class="flex-1 flex flex-col rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-200">
    <textarea
      v-model="textInput"
      placeholder="Paste or type text..."
      spellcheck="false"
      class="flex-1 w-full resize-none p-4 text-sm font-mono text-slate-700 dark:text-slate-200 bg-transparent outline-none placeholder:text-slate-300 dark:placeholder:text-slate-600"
    />
  </div>
</template>
