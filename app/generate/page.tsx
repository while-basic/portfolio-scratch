import { ImageGenerationContainer } from "@/components/chat/image-generation-container"

export default function GeneratePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 text-center">AI Image Generation</h1>
        <ImageGenerationContainer />
      </div>
    </main>
  )
}
