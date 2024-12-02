import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { audioTranscription } = await request.json();

    // Get chat completion
    const completionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that acts like Super Mario.' },
          { role: 'user', content: audioTranscription }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!completionResponse.ok) {
      throw new Error(`Completion failed: ${completionResponse.statusText}`);
    }

    const completion = await completionResponse.json();
    const responseText = completion.choices[0]?.message?.content || '';

    // Convert response to speech
    const speechResponse = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'alloy',
        input: responseText
      })
    });

    if (!speechResponse.ok) {
      throw new Error(`Speech synthesis failed: ${speechResponse.statusText}`);
    }

    const audioBuffer = await speechResponse.arrayBuffer();
    
    // Calculate cost (approximate)
    const inputTokens = audioTranscription.split(' ').length;
    const outputTokens = responseText.split(' ').length;
    const cost = ((inputTokens + outputTokens) / 1000) * 0.015;

    return new NextResponse(JSON.stringify({
      responseText,
      audioBuffer: Array.from(new Uint8Array(audioBuffer)),
      cost
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error in chat-audio API:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to process audio' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
