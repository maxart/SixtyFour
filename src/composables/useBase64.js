import { ref, computed, readonly } from 'vue'

const mode = ref('file')
const textInput = ref('')
const fileData = ref(null)
const isProcessing = ref(false)

const output = computed(() => {
  if (mode.value === 'text' && textInput.value) {
    return textToBase64(textInput.value)
  }
  if (mode.value === 'file' && fileData.value) {
    return fileData.value.dataUri
  }
  return ''
})

const outputSize = computed(() => {
  return output.value.length
})

function textToBase64(text) {
  const bytes = new TextEncoder().encode(text)
  const binStr = Array.from(bytes, (b) => String.fromCodePoint(b)).join('')
  return btoa(binStr)
}

function processFile(file) {
  isProcessing.value = true
  const reader = new FileReader()
  reader.onload = (e) => {
    const dataUri = e.target.result
    fileData.value = {
      name: file.name,
      type: file.type || 'application/octet-stream',
      size: file.size,
      dataUri,
    }
    mode.value = 'file'
    isProcessing.value = false
  }
  reader.onerror = () => {
    isProcessing.value = false
  }
  reader.readAsDataURL(file)
}

function clear() {
  textInput.value = ''
  fileData.value = null
}

function setMode(m) {
  mode.value = m
}

export function useBase64() {
  return {
    mode: readonly(mode),
    textInput,
    fileData: readonly(fileData),
    isProcessing: readonly(isProcessing),
    output,
    outputSize,
    processFile,
    clear,
    setMode,
  }
}
