import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateChatResponse(messages: { role: 'user' | 'assistant', content: string }[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",  // Latest GPT-4 model
      messages: messages,
      temperature: 0.7,              // Balanced between creative and focused
      max_tokens: 250,             // Increased token limit for longer responses
      top_p: 0.9,                   // Nucleus sampling for more natural responses
      frequency_penalty: 0.5,        // Reduce repetition
      presence_penalty: 0.5,         // Encourage topic exploration
    });

    return completion.choices[0].message;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
}
