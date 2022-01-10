<script setup lang="ts">
import { ref, computed, reactive, toRaw } from 'vue'
import { generate_problem } from '../composables/generator'
// defineProps<{ msg: string }>()
const problem_data = reactive(generate_problem())
let history = [
  {
    operations: problem_data.operations,
    cards: problem_data.cards,
    solution: problem_data.solution
  }
]
let cur_history = 0
const is_show = ref(false)
const counter = ref(0)
setInterval(() => counter.value++, 1000)
const time_str = computed(() =>
  new Date(counter.value * 1000).toTimeString().substring(3, 8)
)
const update = (
  operations: typeof problem_data.operations,
  cards: typeof problem_data.cards,
  solution: typeof problem_data.solution
) => {
  problem_data.operations = operations
  problem_data.cards = cards
  problem_data.solution = solution
  counter.value = 0
  is_show.value = false
}
const new_one = () => {
  const { operations, cards, solution } = generate_problem()
  update(operations, cards, solution)
  while (history.length > cur_history + 1) history.pop()
  history.push({ operations, cards, solution })
  cur_history++
}
const rollback = () => {
  if (cur_history === 0) return
  const { operations, cards, solution } = history[--cur_history]!!
  update(operations, cards, solution)
}
const forward = () => {
  if (cur_history === history.length - 1) {
    new_one()
    return
  }
  const { operations, cards, solution } = history[++cur_history]!!
  update(operations, cards, solution)
}
</script>

<template>
  <div class="bg-slate-800">
    <p>
      <code>{{ problem_data.operations }}</code>
    </p>
    <p>
      <code>{{ problem_data.cards }}</code>
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
        @click="new_one"
      >
        new one
      </button>
    </p>
    <p v-if="is_show">
      <code>{{ problem_data.solution }}</code>
    </p>
    <button
      class="triangle_left hover:cursor-pointer absolute top-20 -left-15"
      @click="rollback"
    ></button>
    <button
      class="triangle_right hover:cursor-pointer absolute top-20 -right-15"
      @click="forward"
    ></button>
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
.triangle_left {
  border: 88px solid;
  background-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
}
.triangle_left:hover {
  border-right-color: #334155;
}

.triangle_right {
  border: 88px solid;
  background-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
}
.triangle_right:hover {
  border-left-color: #334155;
}
</style>
