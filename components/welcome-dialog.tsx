"use client"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react"
import Image from "next/image"

export function WelcomeDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if the welcome dialog has been shown before
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
    if (!hasSeenWelcome) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    // Mark the welcome dialog as seen
    localStorage.setItem('hasSeenWelcome', 'true')
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Welcome to Your Dashboard! 🎉</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1920&auto=format&fit=crop"
                alt="Welcome celebration"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="text-lg mt-4">
              We&apos;re thrilled to have you here! This is your personal space where you can manage your profile, 
              track your activities, and explore all the features we have to offer.
            </p>
            <p className="text-muted-foreground">
              Feel free to look around and make yourself at home. If you need any help, 
              don&apos;t hesitate to reach out to our support team.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClose} className="w-full">
            Get Started
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
