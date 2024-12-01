import * as React from "react"
import { Slider } from "@/components/ui/slider"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface LLMSettings {
  temperature: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
  maxTokens: number
}

interface LLMControlsProps {
  settings: LLMSettings
  onSettingsChange: (settings: LLMSettings) => void
}

export function LLMControls({ settings, onSettingsChange }: LLMControlsProps) {
  const handleSettingChange = (key: keyof LLMSettings, value: number[]) => {
    onSettingsChange({
      ...settings,
      [key]: value[0],
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>LLM Parameters</CardTitle>
        <CardDescription>
          Adjust the parameters to control the AI&apos;s response behavior
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Temperature</label>
            <span className="text-sm text-muted-foreground">{settings.temperature}</span>
          </div>
          <Slider
            value={[settings.temperature]}
            min={0}
            max={2}
            step={0.1}
            onValueChange={(value) => handleSettingChange("temperature", value)}
          />
          <p className="text-xs text-muted-foreground">
            Controls randomness: Lower values make responses more focused and deterministic
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Top P</label>
            <span className="text-sm text-muted-foreground">{settings.topP}</span>
          </div>
          <Slider
            value={[settings.topP]}
            min={0}
            max={1}
            step={0.05}
            onValueChange={(value) => handleSettingChange("topP", value)}
          />
          <p className="text-xs text-muted-foreground">
            Controls diversity via nucleus sampling
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Frequency Penalty</label>
            <span className="text-sm text-muted-foreground">{settings.frequencyPenalty}</span>
          </div>
          <Slider
            value={[settings.frequencyPenalty]}
            min={-2}
            max={2}
            step={0.1}
            onValueChange={(value) => handleSettingChange("frequencyPenalty", value)}
          />
          <p className="text-xs text-muted-foreground">
            Reduces repetition of token sequences
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Presence Penalty</label>
            <span className="text-sm text-muted-foreground">{settings.presencePenalty}</span>
          </div>
          <Slider
            value={[settings.presencePenalty]}
            min={-2}
            max={2}
            step={0.1}
            onValueChange={(value) => handleSettingChange("presencePenalty", value)}
          />
          <p className="text-xs text-muted-foreground">
            Encourages discussing new topics
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-medium">Max Tokens</label>
            <span className="text-sm text-muted-foreground">{settings.maxTokens}</span>
          </div>
          <Slider
            value={[settings.maxTokens]}
            min={100}
            max={4000}
            step={100}
            onValueChange={(value) => handleSettingChange("maxTokens", value)}
          />
          <p className="text-xs text-muted-foreground">
            Maximum length of the response
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
