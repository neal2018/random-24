<script setup lang="ts">
import { ref } from 'vue'
import { generate_problem } from '../composables/generator'
// defineProps<{ msg: string }>()
const { operations, cards, solution } = generate_problem()
const is_show = ref(false)
</script>

<template>
  <div class="bg-slate-800">
    <p>
      <code>{{ operations }}</code>
    </p>
    <p>
      <code>{{ cards }}</code>
    </p>
    <button
      class="font-mono bg-blue-gray-500 rounded-lg border-0 hover:cursor-pointer m-3"
      @click="is_show = !is_show"
    >
      {{ is_show ? 'hide' : 'show' }} solution
    </button>
    <p v-if="is_show">
      <code>{{ solution }}</code>
    </p>
  </div>
</template>

<style scoped>
p,
button {
  font-size: 40px;
}

code {
  /* background-color: #eee; */
  padding: 2px 4px;
  border-radius: 4px;
  color: #d4d4d4;
}
</style>
