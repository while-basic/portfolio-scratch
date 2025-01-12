'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, StopCircle } from 'lucide-react'

interface Message {
  role: string;
  content: string;
  audioUrl?: string;
  cost?: number;
}

export function RealtimeChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    }
  }, [])

  const processAudioChunk = async (audioData: Blob) => {
    try {
      setError(null);
      
      // Create form data for the transcription request
      const formData = new FormData();
      formData.append('file', audioData, 'audio.webm');
      formData.append('model', 'whisper-1');

      // First, get the transcription
      const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
        },
        body: formData
      });

      if (!transcriptionResponse.ok) {
        throw new Error(`Transcription failed: ${transcriptionResponse.statusText}`);
      }

      const { text: transcription } = await transcriptionResponse.json();

      if (!transcription.trim()) {
        console.log('No speech detected in audio');
        return;
      }

      // Process the transcription through our API route
      const chatResponse = await fetch('/api/chat-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          audioTranscription: transcription
        })
      });

      if (!chatResponse.ok) {
        throw new Error('Failed to process chat response');
      }

      const { responseText, audioBuffer, cost } = await chatResponse.json();

      // Convert the audio buffer back to a Blob
      const audioBlob = new Blob([new Uint8Array(audioBuffer)], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responseText,
        audioUrl,
        cost
      }]);

    } catch (error) {
      console.error('Error processing audio:', error);
      setError('Failed to process audio. Please try again.');
    }
  };

  const startRecording = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 24000,
          sampleSize: 16
        } 
      });

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      setIsRecording(true);

      chunksRef.current = [];

      // Start collecting audio data
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm;codecs=opus' });
        await processAudioChunk(audioBlob);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      setError('Failed to start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = async () => {
    try {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      setError('Failed to stop recording.');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-3 mb-4 rounded">
          {error}
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`rounded-lg p-4 max-w-[80%] ${
                message.role === 'assistant'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              <p className="mb-2">{message.content}</p>
              {message.audioUrl && (
                <div className="mt-2 space-y-2">
                  <audio
                    controls
                    src={message.audioUrl}
                    className="w-full"
                    onPlay={() => {
                      // Pause all other audio elements when one starts playing
                      document.querySelectorAll('audio').forEach(audio => {
                        if (audio.src !== message.audioUrl) {
                          audio.pause();
                        }
                      });
                    }}
                  />
                  <div className="flex justify-between text-sm">
                    <a
                      href={message.audioUrl}
                      download={`response-${index}.wav`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Download Audio
                    </a>
                    <span className="text-gray-500">
                      Cost: ${message.cost?.toFixed(4)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button
                onClick={startRecording}
                disabled={isRecording}
                className="bg-green-500 hover:bg-green-600"
              >
                <Mic className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Total Cost: $0.0000
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={stopRecording}
              disabled={!isRecording}
              className="bg-red-500 hover:bg-red-600"
            >
              <StopCircle className="h-4 w-4 mr-2" />
              Stop Recording
            </Button>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}
