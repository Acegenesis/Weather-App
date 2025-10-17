export default function useActiveColor() {
  const activeSlideIndex = useState('activeSlideIndex', () => 0)
  const weatherData = useState('weatherData', () => [])
  
  const currentColor = computed(() => {
    if (weatherData.value.length > 0 && weatherData.value[activeSlideIndex.value]) {
      return weatherData.value[activeSlideIndex.value].color
    }
    return '#42C6FF'
  })
  
  const setActiveSlide = (index) => {
    activeSlideIndex.value = index
  }
  
  const setWeatherData = (data) => {
    weatherData.value = data
  }
  
  return {
    activeSlideIndex: readonly(activeSlideIndex),
    currentColor: readonly(currentColor),
    weatherData: readonly(weatherData),
    setActiveSlide,
    setWeatherData
  }
}