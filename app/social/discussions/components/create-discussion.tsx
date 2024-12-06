'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Bot, Sparkles, Code, Palette } from 'lucide-react';

const categories = [
  { id: 'general', name: 'General Discussion', icon: MessageSquare },
  { id: 'image-gen', name: 'Image Generation', icon: Palette },
  { id: 'prompts', name: 'Prompt Engineering', icon: Sparkles },
  { id: 'integrations', name: 'API & Integrations', icon: Code },
  { id: 'chatbots', name: 'Chatbots & Agents', icon: Bot },
];

interface CreateDiscussionProps {
  onSubmit?: (data: {
    title: string;
    content: string;
    category: string;
    tags: string[];
  }) => void;
  onCancel?: () => void;
}

export function CreateDiscussion({ onSubmit, onCancel }: CreateDiscussionProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !category) return;

    setIsSubmitting(true);
    try {
      const formattedTags = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      await onSubmit?.({
        title: title.trim(),
        content: content.trim(),
        category,
        tags: formattedTags,
      });

      // Reset form
      setTitle('');
      setContent('');
      setCategory('');
      setTags('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Create New Discussion</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What would you like to discuss?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    <div className="flex items-center">
                      <cat.icon className="h-4 w-4 mr-2" />
                      {cat.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Share your thoughts, questions, or ideas..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
              required
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags separated by commas (e.g., api, tutorial, help)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Add relevant tags to help others find your discussion
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Discussion'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 