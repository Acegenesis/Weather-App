<script setup>
import Day from '../components/Day.vue'
import MoreInfo from '../components/MoreInfo.vue';
import Temperature from '../components/Temperature.vue'
</script>

<template>
    <Day location="Paris" day="Vendredi 20 janvier" state="Il fait beau"/>
    <Temperature temperature="31"/>
    <MoreInfo />
</template>
