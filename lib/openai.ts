import OpenAI from 'openai';
import { type LLMSettings } from '@/components/chat/llm-controls';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface OpenAIError extends Error {
  code?: string;
}

// Implement exponential backoff for rate limiting
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let retries = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      const openAIError = error as OpenAIError;
      if (openAIError.code === 'rate_limit_exceeded' && retries < maxRetries) {
        retries++;
        const delay = initialDelay * Math.pow(2, retries - 1);
        console.log(`Rate limit exceeded. Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}

export async function generateChatResponse(
  messages: { role: 'user' | 'assistant', content: string }[],
  settings?: LLMSettings
) {
  const defaultSettings: LLMSettings = {
    temperature: 0.7,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    maxTokens: 1000,
  };

  const finalSettings = { ...defaultSettings, ...settings };

  // Map model names to OpenAI model IDs
  const modelMap: { [key: string]: string } = {
    'GPT 4o mini': 'gpt-3.5-turbo',
    'GPT-4': 'gpt-4',
  };

  try {
    const modelName = modelMap[settings?.model || 'GPT 4o mini'] || 'gpt-3.5-turbo';
    
    const completion = await withRetry(() => 
      openai.chat.completions.create({
        model: modelName,
        messages: messages,
        temperature: finalSettings.temperature,
        max_tokens: finalSettings.maxTokens,
        top_p: finalSettings.topP,
        frequency_penalty: finalSettings.frequencyPenalty,
        presence_penalty: finalSettings.presencePenalty,
      })
    );

    return {
      content: completion.choices[0].message.content,
      role: 'assistant' as const
    };
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    const openAIError = error as OpenAIError;
    if (openAIError.code === 'rate_limit_exceeded') {
      throw new Error('Rate limit exceeded. Please try again in a few minutes.');
    }
    throw error;
  }
}
