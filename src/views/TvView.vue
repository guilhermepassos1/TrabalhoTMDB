<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import genreStore from '@/store/genre'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false);
const tvs = ref([]);
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

function openTv(tvId) {
  router.push({ name: 'TvDetails', params: { tvId } });
}

const listTv = async (genreId) => {
  genreStore.setCurrentGenreId(genreId);
  isLoading.value = true;
  const response = await api.get('discover/tv', {
    params: {
      with_genres: genreId,
      language: 'pt-BR',
    },
  });
  tvs.value = response.data.results;
  isLoading.value = false;
};

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('tv')
  isLoading.value = false
})

</script>

<template >
  <h1>Séries</h1>
  <ul class="genre-list">
    <loading v-model:active="isLoading" is-full-page />
    <li
    v-for="genre in genreStore.genres"
    :key="genre.id"
    @click="listTv(genre.id)"
    class="genre-item"
    :class="{ active: genre.id === genreStore.currentGenreId }"
  >
    {{  genre.name }}
  </li>
  </ul>
  
  <div class="tv-list">
  <div v-for="tv in tvs" :key="tv.id" class="tv-card">
    
    <img
  :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`"
  :alt="tv.title"
  @click="openTv(tv.id)"/>
    <div class="tv-details">
      <p class="tv-title">{{ tv.title }}</p>
      <p class="tv-release-date">{{ formatDate(tv.release_date) }}</p>
      <p class="tv-genres">
        <span v-for="genre_id in tv.genre_ids" :key="genre_id" @click="listTv(genre_id)">
    {{ genreStore.getGenreName(genre_id) }}
  </span>
</p>
    </div>
    
  </div>
</div>

</template>

<style scoped>
.tv-release-date{
  text-align: center;
}
.backPreto{
  background-color: #000;
}
.active {
  background-color: #000000;
  font-weight: bolder;
}

.tv-genres span.active {
  background-color: #c32258;
  color: #000;
  font-weight: bolder;
}
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #ee6d03;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #ffab66;
  box-shadow: 0 0 0.5rem #ee6d03;
}
.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #353131;
  background-color: #000;
  color: #fff;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.tv-details {
  padding: 0 0.5rem;
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #ee6d03;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #000000;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #cc7a36;
  box-shadow: 0 0 0.5rem #e7eb0010;
}
</style>