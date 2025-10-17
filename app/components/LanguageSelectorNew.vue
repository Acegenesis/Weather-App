<template>
  <div class="language-selector">
    <button 
      class="language-button"
      @click="toggleDropdown"
      :style="{ backgroundColor: backgroundColor }"
    >
      <span class="current-language">{{ currentLocale?.name || 'FR' }}</span>
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
    
    <div v-if="isOpen" class="language-dropdown">
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
const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.1)'
  }
})

const { locale, locales } = useI18n()
const localePath = useLocalePath()

const isOpen = ref(false)

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
    console.error('Error changing language:', error)
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
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  font-family: 'SF Compact Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.language-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.current-language {
  white-space: nowrap;
}

.chevron {
  transition: transform 0.2s ease;
}

.chevron-open {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  overflow: hidden;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.language-option {
  display: block;
  width: 100%;
  padding: 12px;
  border: none;
  background: transparent;
  color: white;
  font-family: 'SF Compact Display', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.language-option:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.language-option.active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .language-button {
    font-size: 13px;
    padding: 6px 10px;
  }
  
  .language-option {
    padding: 10px;
    font-size: 13px;
  }
}
</style>