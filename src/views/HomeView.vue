<script setup>
import Day from '../components/Day.vue'
import MoreInfo from '../components/MoreInfo.vue';
import Temperature from '../components/Temperature.vue'
</script>

<script>
import config from '../../conf.json';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import axios from 'axios';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  async mounted() {
    await this.obtenirInfosMeteo();
  },
  methods: {
    async obtenirInfosMeteo() {
        const infosVilles = [];
        const villes = ['Paris', 'London', 'New York', 'Tokyo', 'Sydney', 'Strasbourg'];
        const colors = ['#FFE142', '#FFB142', '#FF7D42', '#FF4242', '#FF42B1', '#FF42F1'];
        const apiKey = config.apikey;
        const mappingTemps = {
            'clear sky': 'Ciel dégagé',
            'few clouds': 'Quelques nuages',
            'scattered clouds': 'Nuages épars',
            'overcast clouds': 'Couvert',
            'broken clouds': 'Nuages dispersés',
            'shower rain': 'Averses',
            'rain': 'Pluie',
            'thunderstorm': 'Orage',
            'snow': 'Neige',
            'mist': 'Brume',
            'light rain': 'Pluie légère',
        };
        for (const ville of villes) {
            try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${apiKey}`);
            const { dt, weather, main, wind, visibility, humidity  } = response.data;
            const date = new Date(dt * 1000);
            const tempsEnAnglais = weather[0].description;
            const temps = mappingTemps[tempsEnAnglais.toLowerCase()] || tempsEnAnglais;
            const temperature = Math.round(main.temp - 273.15).toString();
            const vent = `${(Math.round(wind.speed * 3.6))} km/h`;
            const visibilite = visibility >= 1000 ? `${(Math.round(visibility / 1000))} km` : `${Math.round(visibility)} m`;
            const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
            const dateLocale = date.toLocaleDateString('fr-FR', options).charAt(0).toUpperCase() + date.toLocaleDateString('fr-FR', options).slice(1);
            const humidite = `${main.humidity}%`;
            const infoVille = {
                ville,
                jour: dateLocale,
                temps,
                temperature: temperature,
                vent: vent,
                humidite: humidite,
                visibilite,
                color: colors[villes.indexOf(ville)],
            };

            infosVilles.push(infoVille);
            } catch (error) {
            console.log(`Une erreur s'est produite lors de la récupération des informations pour ${ville}: ${error.message}`);
            }
        }

        this.infosVilles = infosVilles;
        }
    },
  data() {
    return {
      infosVilles: [],
    };
  }
};
</script>

<template>
    <swiper :loop='true' :grabCursor="true" class="mySwiper">        
      <swiper-slide v-for="(infoVille, index) in infosVilles" :key="index" class="sliderItem" :style="{ background: infoVille.color }">
        <Day :location="infoVille.ville" :day="infoVille.jour" :state="infoVille.temps" :color="infoVille.color" />
        <Temperature :temperature="infoVille.temperature" />
        <MoreInfo :wind="infoVille.vent" :humidity="infoVille.humidite" :visibility="infoVille.visibilite" :color="infoVille.color" />
      </swiper-slide>
    </swiper>
</template>
