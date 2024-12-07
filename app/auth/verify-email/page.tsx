"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.target as HTMLFormElement)
      const code = formData.get("code")

      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        body: JSON.stringify({ code }),
      })

      if (!response.ok) {
        throw new Error("Verification failed")
      }

      toast.success("Email verified successfully")
      router.push("/dashboard")
    } catch {
      toast.error("Invalid verification code")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Verify Email</CardTitle>
          <CardDescription>
            We&apos;ve sent a verification code to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  name="code"
                  placeholder="Enter the code from your email"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="off"
                  autoCorrect="off"
                  disabled={isLoading}
                  required
                />
              </div>
              <Button disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Didn&apos;t receive the code?{" "}
                <Button variant="link" className="p-0 h-auto">
                  Resend
                </Button>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 