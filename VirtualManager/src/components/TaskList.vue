<script setup>
import { ref } from 'vue'

const props = defineProps(['tasks'])
const emit = defineEmits(['addTask'])

const newTask = ref({ title: '', notes: '', deadline: '' })

const addTask = () => {
  if (newTask.value.title.trim()) {
    emit('addTask', { ...newTask.value, id: Date.now() })
    newTask.value = { title: '', notes: '', deadline: '' }
  }
}
</script>

<template>
  <div class="task-list">
    <h2>Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <h3>{{ task.title }}</h3>
        <p>{{ task.notes }}</p>
        <p>Deadline: {{ task.deadline }}</p>
      </li>
    </ul>
    <div class="new-task-form">
      <input v-model="newTask.title" placeholder="Task title" />
      <textarea v-model="newTask.notes" placeholder="Notes"></textarea>
      <input v-model="newTask.deadline" type="date" />
      <button @click="addTask">Add Task</button>
    </div>
  </div>
</template>

<style scoped>
.task-list {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  max-width: 400px;
}

h2 {
  color: var(--turquoise);
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: rgba(255, 255, 255, 0.1);
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 4px;
}

li h3 {
  color: var(--neon-pink);
  margin-top: 0;
}

.new-task-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.new-task-form input,
.new-task-form textarea {
  width: 100%;
}

@media (max-width: 768px) {
  .task-list {
    max-width: none;
  }
}
</style>
