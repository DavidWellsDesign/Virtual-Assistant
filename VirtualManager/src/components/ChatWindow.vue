<script setup>
import { ref } from 'vue'
import { getAIResponse } from '../services/aiService'

const props = defineProps(['chatHistory', 'tasks'])
const emit = defineEmits(['sendMessage'])

const newMessage = ref('')
const isLoading = ref(false)

const sendMessage = async () => {
  if (newMessage.value.trim()) {
    const userMessage = { role: 'user', content: newMessage.value }
    emit('sendMessage', userMessage)
    newMessage.value = ''
    
    isLoading.value = true
    try {
      const aiResponse = await getAIResponse(userMessage.content, props.chatHistory, props.tasks)
      emit('sendMessage', { role: 'assistant', content: aiResponse })
    } catch (error) {
      console.error('Error getting AI response:', error)
      console.error('Error details:', error.response?.data || error.message)
      emit('sendMessage', { role: 'assistant', content: `Error: ${error.message}. Please try again.` })
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <div class="chat-window">
    <h2>Chat Window</h2>
    <div class="chat-messages">
      <div v-for="(message, index) in chatHistory" :key="index" :class="message.role">
        {{ message.content }}
      </div>
    </div>
    <div class="chat-input">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type your message..." :disabled="isLoading" />
      <button @click="sendMessage" :disabled="isLoading">Send</button>
    </div>
    <div v-if="isLoading" class="loading-indicator">AI is thinking...</div>
  </div>
</template>

<style scoped>
.chat-window {
  flex: 2;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
  padding: 1rem;
}

.chat-messages {
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  max-height: 400px;
}

.chat-messages > div {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.chat-messages .user {
  background-color: rgba(64, 224, 208, 0.2);
  align-self: flex-end;
  text-align: right;
}

.chat-messages .assistant {
  background-color: rgba(255, 0, 255, 0.2);
  align-self: flex-start;
}

.chat-input {
  display: flex;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
}

.chat-input input {
  flex-grow: 1;
  margin-right: 1rem;
}

.loading-indicator {
  text-align: center;
  color: var(--turquoise);
  padding: 0.5rem;
}

@media (max-width: 768px) {
  .chat-window {
    flex: 1;
  }
}

</style>
