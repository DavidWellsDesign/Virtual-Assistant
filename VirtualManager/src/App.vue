<script setup>
import { ref } from 'vue'
import TaskList from './components/TaskList.vue'
import ChatWindow from './components/ChatWindow.vue'
import AIManager from './components/AIManager.vue'

const tasks = ref([])
const chatHistory = ref([])

const addTask = (task) => {
  tasks.value.push(task)
}

const updateChatHistory = (message) => {
  chatHistory.value.push(message)
}

console.log('App.vue script executed');
</script>

<template>
  <div class="app-container">
    <header>
      <h1>Virtual AI Manager</h1>
    </header>
    <main>
      <div class="content-wrapper">
        <TaskList :tasks="tasks" @add-task="addTask" />
        <ChatWindow :chatHistory="chatHistory" :tasks="tasks" @send-message="updateChatHistory" />
      </div>
      <AIManager :tasks="tasks" :chatHistory="chatHistory" @send-message="updateChatHistory" />
    </main>
  </div>
</template>

<style>
:root {
  --dark-blue: #0a192f;
  --neon-pink: #ff00ff;
  --turquoise: #40e0d0;
  --text-color: #e6f1ff;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background-color: var(--dark-blue);
  color: var(--text-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  flex-grow: 1;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.app-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--dark-blue), #1a2a4a);
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
  z-index: -1;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

header {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 3rem;
  color: var(--turquoise);
  text-shadow: 0 0 10px var(--neon-pink);
}

.content-wrapper {
  display: flex;
  gap: 2rem;
  flex-grow: 1;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }
}

button {
  background-color: var(--turquoise);
  color: var(--dark-blue);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background-color: var(--neon-pink);
  color: var(--text-color);
}

input, textarea {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--turquoise);
  color: var(--text-color);
  padding: 0.5rem;
  border-radius: 4px;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--neon-pink);
  box-shadow: 0 0 5px var(--neon-pink);
}
</style>
