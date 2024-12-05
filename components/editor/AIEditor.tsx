import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Heading from '@tiptap/extension-heading';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import CodeBlock from '@tiptap/extension-code-block';
import { toast } from 'react-hot-toast';
import { User, Session } from '@supabase/supabase-js';

interface AIEditorProps {
  user: User;
  session: Session;
}

const AIEditor: React.FC<AIEditorProps> = ({ session }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [editorReady, setEditorReady] = useState(false);
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Heading,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
    ],
    content: '<p>Start writing here...</p>',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[500px] px-8 py-6',
      },
    },
    onCreate: () => {
      setEditorReady(true);
    },
  });

  const handleAIAssist = async (prompt: string) => {
    if (!editor?.isEditable) {
      console.error('Editor not ready');
      return;
    }
    
    setIsProcessing(true);
    try {
      const response = await fetch('/api/ai/assist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          prompt,
          context: editor.getHTML(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI assistance');
      }

      const data = await response.json();
      setAiSuggestion(data.suggestion);
    } catch (error) {
      console.error('AI assist error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to get AI assistance. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!editorReady) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { label: '✍️ Continue writing', prompt: 'Continue writing from here' },
            { label: '🔄 Rephrase', prompt: 'Rephrase this text' },
            { label: '📝 Summarize', prompt: 'Summarize this text' },
            { label: '✨ Make longer', prompt: 'Make this text longer and more detailed' },
            { label: '📏 Make shorter', prompt: 'Make this text more concise' },
            { label: '🎯 Fix spelling & grammar', prompt: 'Fix spelling and grammar' },
          ].map((command) => (
            <button
              key={command.label}
              onClick={() => handleAIAssist(command.prompt)}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {command.label}
            </button>
          ))}
        </div>
      </div>

      <EditorContent editor={editor} className="relative" />

      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-center mt-4 text-gray-600 dark:text-gray-300">Processing with AI...</p>
          </div>
        </div>
      )}

      {aiSuggestion && !isProcessing && (
        <div className="fixed bottom-8 right-8 max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">AI Suggestion</h3>
          <p className="text-gray-600 dark:text-gray-300">{aiSuggestion}</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => {
                if (editor) {
                  editor.commands.setContent(aiSuggestion);
                }
                setAiSuggestion('');
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Apply
            </button>
            <button
              onClick={() => setAiSuggestion('')}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIEditor;
