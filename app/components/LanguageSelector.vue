<template>
  <div class="language-selector">
    <button 
      class="language-button"
      @click="toggleDropdown"
      :style="{ backgroundColor: backgroundColor }"
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
// Props
const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'rgba(255, 255, 255, 0.1)'
  }
})

// i18n
const { locale, locales, setLocale } = useI18n()
const localePath = useLocalePath()

// État local
const isOpen = ref(false)

// Computed
const availableLocales = computed(() => locales.value || [])
const currentLocale = computed(() => 
  availableLocales.value.find(l => l.code === locale.value) || availableLocales.value[0]
)

// Méthodes
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const changeLanguage = async (newLocale) => {
  try {
    await navigateTo(localePath('/', newLocale))
    isOpen.value = false
  } catch (error) {
    // Fallback: changer juste la locale
    await setLocale(newLocale)
    isOpen.value = false
  }
}

// Fermer le dropdown quand on clique en dehors
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
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  background-color: rgba(0, 0, 0, 0.2);
  color: rgba(0, 0, 0, 0.8);
  font-family: 'SF Compact Display Medium', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.language-button:hover {
  background-color: rgba(0, 0, 0, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
}

.current-language {
  white-space: nowrap;
}

.chevron {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: rgba(0, 0, 0, 0.6);
}

.chevron-open {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 15px;
  backdrop-filter: blur(20px);
  overflow: hidden;
  z-index: 1000;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.language-option {
  display: block;
  width: 100%;
  padding: 14px 20px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'SF Compact Display Medium', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 15px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.language-option:last-child {
  border-bottom: none;
}

.language-option:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 1);
  transform: translateX(4px);
}

.language-option.active {
  background-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 1);
  font-weight: 700;
  position: relative;
}

.language-option.active:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #FFE142, #42C6FF, #FF64D4);
  border-radius: 0 2px 2px 0;
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