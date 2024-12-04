'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView } from '@/lib/analytics'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname && searchParams) {
      // Track the page view with the full URL (including search params)
      const url = searchParams?.size > 0 
        ? `${pathname}?${searchParams.toString()}`
        : pathname
      
      trackPageView(url)
    }
  }, [pathname, searchParams])

  return null
}
