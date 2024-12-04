'use client'

import { useEffect, useState } from 'react'

export default function TestOpenAIPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function testOpenAI() {
      try {
        const response = await fetch('/api/test-openai')
        const data = await response.json()
        
        if (data.success) {
          setStatus('success')
          setMessage(`API is working! Response: ${data.message}`)
        } else {
          setStatus('error')
          setMessage(`API error: ${data.error}`)
        }
      } catch (error) {
        setStatus('error')
        setMessage(`Error testing API: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }

    testOpenAI()
  }, [])

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">OpenAI API Test</h1>
        
        <div className="p-4 rounded-lg border">
          {status === 'loading' && (
            <p>Testing OpenAI API...</p>
          )}
          
          {status === 'success' && (
            <p className="text-green-500">{message}</p>
          )}
          
          {status === 'error' && (
            <p className="text-red-500">{message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
