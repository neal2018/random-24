<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { generate_problem } from '../composables/generator'
// defineProps<{ msg: string }>()
const data = reactive(generate_problem())
const is_show = ref(false)
const counter = ref(0)
setInterval(() => counter.value++, 1000)
const time_str = computed(() =>
  new Date(counter.value * 1000).toTimeString().substring(3, 8)
)
const update = () => {
  const { operations, cards, solution } = generate_problem()
  data.operations = operations
  data.cards = cards
  data.solution = solution
  counter.value = 0
}
</script>

<template>
  <div class="bg-slate-800">
    <p>
      <code>{{ data.operations }}</code>
    </p>
    <p>
      <code>{{ data.cards }}</code>
    </p>
    <p>
      <button class="font-mono bg-blue-gray-500 rounded-lg border-0 px-3 mt-10">
        {{ time_str }}
      </button>
    </p>
    <p>
      <button
        class="font-mono bg-blue-gray-500 rounded-lg border-0 hover:cursor-pointer"
        @click="is_show = !is_show"
      >
        {{ is_show ? 'hide' : 'show' }} solution
      </button>
      <button
        class="font-mono bg-blue-gray-500 rounded-lg border-0 hover:cursor-pointer mx-5"
        @click="update"
      >
        new one
      </button>
    </p>
    <p v-if="is_show">
      <code>{{ data.solution }}</code>
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
