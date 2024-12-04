import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Settings2 } from "lucide-react"
import { LLMSettings } from "@/lib/openai"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AVAILABLE_MODELS = [
  { id: "gpt-4o", name: "GPT-4o" },
  { id: "gpt-4o-mini", name: "GPT-4o mini" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
  { id: "gpt-4", name: "GPT-4" },
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo (Latest)" },
];

interface ConfigControlsProps {
  settings: LLMSettings;
  onSettingsChange: (settings: LLMSettings) => void;
}

export function ConfigControls({ settings, onSettingsChange }: ConfigControlsProps) {
  const handleChange = (key: keyof LLMSettings, value: number | string) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings2 className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Model Configuration</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select
                value={settings.model || "gpt-3.5-turbo"}
                onValueChange={(value) => handleChange("model", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_MODELS.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="temperature">Temperature: {settings.temperature?.toFixed(2)}</Label>
              </div>
              <Slider
                id="temperature"
                min={0}
                max={2}
                step={0.1}
                value={[settings.temperature || 1.0]}
                onValueChange={([value]) => handleChange("temperature", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="maxTokens">Max Tokens: {settings.maxTokens}</Label>
              </div>
              <Slider
                id="maxTokens"
                min={1}
                max={4096}
                step={1}
                value={[settings.maxTokens || 2048]}
                onValueChange={([value]) => handleChange("maxTokens", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="topP">Top P: {settings.topP?.toFixed(2)}</Label>
              </div>
              <Slider
                id="topP"
                min={0}
                max={1}
                step={0.1}
                value={[settings.topP || 1.0]}
                onValueChange={([value]) => handleChange("topP", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="frequencyPenalty">Frequency Penalty: {settings.frequencyPenalty?.toFixed(2)}</Label>
              </div>
              <Slider
                id="frequencyPenalty"
                min={-2}
                max={2}
                step={0.1}
                value={[settings.frequencyPenalty || 0.0]}
                onValueChange={([value]) => handleChange("frequencyPenalty", value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="presencePenalty">Presence Penalty: {settings.presencePenalty?.toFixed(2)}</Label>
              </div>
              <Slider
                id="presencePenalty"
                min={-2}
                max={2}
                step={0.1}
                value={[settings.presencePenalty || 0.0]}
                onValueChange={([value]) => handleChange("presencePenalty", value)}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
