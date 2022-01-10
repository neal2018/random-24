<script setup lang="ts">
import { ref } from 'vue'
import { generate_problem } from '../composables/generator'
// defineProps<{ msg: string }>()
const { operations, cards, solution } = generate_problem()
const is_show = ref(false)
</script>

<template>
  <p>
    <code>{{ operations }}</code>
  </p>
  <p>
    <code>{{ cards }}</code>
  </p>
  <button class="font-mono" @click="is_show = !is_show">
    {{ is_show ? 'hide' : 'show' }} solution
  </button>
  <p v-if="is_show">{{ solution }}</p>
</template>

<style scoped>
* {
  font-size: 40px;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
