<script setup>
import { watch } from 'vue'
import { getAIResponse } from '../services/aiService'

const props = defineProps(['tasks', 'chatHistory'])
const emit = defineEmits(['sendMessage'])

// Watch for changes in tasks and prompt the user about progress
watch(() => props.tasks, async (newTasks) => {
  if (newTasks.length > 0) {
    const latestTask = newTasks[newTasks.length - 1]
    const message = `I see you've added a new task: "${latestTask.title}". How's your progress on this task?`
    try {
      const aiResponse = await getAIResponse(message, props.chatHistory, newTasks)
      emit('sendMessage', { role: 'assistant', content: aiResponse })
    } catch (error) {
      console.error('Error getting AI response:', error)
      console.error('Error details:', error.response?.data || error.message)
    }
  }
}, { deep: true })

// Add more AI logic here, such as analyzing task deadlines and providing reminders
</script>

<template>
  <!-- This component doesn't have a visual representation -->
</template>
