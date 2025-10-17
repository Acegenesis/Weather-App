<template>
  <div class="language-selector">
    <button 
      class="language-button"
      @click="toggleDropdown"
      :style="glassStyles"
    >
      <span class="current-language">{{ currentLocale.name }}</span>
      <svg 
        class="chevron" 
        :class="{ 'chevron-open': isOpen }"
        width="12" 
        height="8" 
        viewBox="0 0 12 8" 
        fill="none"
      >
        <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    
    <div v-if="isOpen" class="language-dropdown" :style="dropdownGlassStyles">
      <button 
        v-for="loc in availableLocales" 
        :key="loc.code"
        class="language-option"
        @click="changeLanguage(loc.code)"
        :class="{ 'active': loc.code === locale }"
      >
        {{ loc.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import useGlassmorphism from '@/composables/useGlassmorphism'

const props = defineProps({
  currentColor: {
    type: String,
    default: '#42C6FF'
  }
})

const { getGlassStyle } = useGlassmorphism()

const glassStyles = computed(() => {
  console.log('LanguageSelector received color:', props.currentColor)
  return getGlassStyle(props.currentColor, 'button')
})

const dropdownGlassStyles = computed(() => {
  return getGlassStyle(props.currentColor, 'card')
})

const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

const isOpen = ref(false)

watch(() => props.currentColor, (newColor, oldColor) => {
  console.log('LanguageSelector color changed from', oldColor, 'to', newColor)
}, { immediate: true })

const availableLocales = computed(() => locales.value || [])
const currentLocale = computed(() => 
  availableLocales.value.find(l => l.code === locale.value) || availableLocales.value[0]
)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const changeLanguage = async (newLocale) => {
  try {
    await navigateTo(localePath('/', newLocale))
    isOpen.value = false
  } catch (error) {
    await setLocale(newLocale)
    isOpen.value = false
  }
}

onMounted(() => {
  const handleClickOutside = (event) => {
    const target = event.target
    if (!target?.closest?.('.language-selector')) {
      isOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
}

.language-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: none;
  border-radius: 20px;
  font-family: 'SF Compact Display Medium', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.language-button:hover {
  transform: translateY(-1px);
}

.current-language {
  white-space: nowrap;
}

.chevron {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: rgba(0, 0, 0, 0.5);
}

.chevron-open {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 6px;
  border-radius: 12px;
  overflow: hidden;
  z-index: 1000;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.15);
}

.language-option {
  display: block;
  width: 100%;
  padding: 14px 20px;
  border: none;
  background: transparent;
  color: rgba(0, 0, 0, 0.8);
  font-family: 'SF Compact Display Medium', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.language-option:last-child {
  border-bottom: none;
}

.language-option:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 1);
}

.language-option.active {
  background-color: rgba(0, 0, 0, 0.15);
  color: rgba(0, 0, 0, 1);
  font-weight: 700;
  position: relative;
}

/* Responsive */
@media (max-width: 768px) {
  .language-button {
    font-size: 14px;
    padding: 10px 16px;
  }
  
  .language-option {
    padding: 12px 16px;
    font-size: 14px;
  }
}
</style>