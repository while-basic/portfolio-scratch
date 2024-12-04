'use client'

import { MaintenanceBanner } from "../shared/maintenance-banner"

export function ImageGenerationContainer() {
  return (
    <div className="flex flex-col h-full">
      <MaintenanceBanner 
        title="AI Image Generation Coming Soon!"
        message="We're enhancing our AI image generation capabilities. Stay tuned for an amazing visual experience!" 
      />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center p-8 max-w-2xl mx-auto">
          <div className="animate-pulse mb-6">
            <div className="w-64 h-64 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            Our AI artists are preparing their digital brushes...
          </p>
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
