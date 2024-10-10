import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Be cautious with this in production!
});

const SYSTEM_MESSAGE = `You are a virtual AI assistant named Claude. Your role is to help manage tasks, provide reminders, and offer advice on productivity. You should be friendly, professional, and always aim to help the user stay organized and motivated.`;

export async function getAIResponse(message, chatHistory, tasks) {
  try {
    const taskContext = tasks.length > 0 
      ? `Current tasks:\n${tasks.map(t => `- ${t.title} (Deadline: ${t.deadline})`).join('\n')}`
      : 'No current tasks.';

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_MESSAGE },
        { role: "system", content: taskContext },
        ...chatHistory,
        { role: "user", content: message }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
}
