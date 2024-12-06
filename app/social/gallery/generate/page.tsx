'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ImageIcon, Wand2, Sparkles, RotateCcw, Download, Share2 } from 'lucide-react';
import Image from 'next/image';

export default function GenerateArtPage() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [model, setModel] = useState('dalle3');
  const [size, setSize] = useState('1024x1024');
  const [style, setStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const aiModels = [
    { value: 'dalle3', label: 'DALL-E 3' },
    { value: 'dalle2', label: 'DALL-E 2' },
    { value: 'sdxl', label: 'Stable Diffusion XL' },
  ];

  const imageSizes = [
    { value: '1024x1024', label: '1024×1024 - Square' },
    { value: '1792x1024', label: '1792×1024 - Landscape' },
    { value: '1024x1792', label: '1024×1792 - Portrait' },
  ];

  const stylePresets = [
    'Photographic', 'Digital Art', 'Cinematic', 'Anime',
    'Fantasy', 'Abstract', 'Watercolor', 'Oil Painting'
  ];

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    try {
      // Mock generation - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setGeneratedImage('/placeholder-1.jpg');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container py-8 max-w-6xl">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Generate AI Art</h1>
          <p className="text-muted-foreground">
            Create stunning artwork using advanced AI models
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-6">
          {/* Input Section */}
          <Card>
            <CardContent className="p-6 space-y-6">
              {/* Model Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">AI Model</label>
                <Select value={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI Model" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map(model => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Prompt Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Prompt</label>
                <Textarea
                  placeholder="Describe the image you want to create..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Negative Prompt */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Negative Prompt</label>
                <Textarea
                  placeholder="Describe what you don't want in the image..."
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                />
              </div>

              {/* Image Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Image Size</label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {imageSizes.map(size => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Style Presets */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Style</label>
                <div className="flex flex-wrap gap-2">
                  {stylePresets.map((preset) => (
                    <Badge
                      key={preset}
                      variant={style === preset ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setStyle(preset)}
                    >
                      {preset}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {generatedImage ? (
                <div className="space-y-4">
                  <div className="relative aspect-square rounded-lg overflow-hidden border">
                    <Image
                      src={generatedImage}
                      alt="Generated artwork"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" variant="outline">
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                    <Button className="flex-1">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                    <p>Your generated image will appear here</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 