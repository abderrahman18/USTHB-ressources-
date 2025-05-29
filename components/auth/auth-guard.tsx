"use client"

import type React from "react"

import { useAuth } from "./auth-provider"
import { LoginDialog } from "./login-dialog"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, User } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, fallback, requireAuth = true }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return (
      <>
        {fallback || (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Authentication Required</h3>
              <p className="text-muted-foreground max-w-md">
                You need to sign in to access this feature. Create an account to upload resources, save favorites, and
                more.
              </p>
            </div>
            <Button onClick={() => setShowLogin(true)} className="mt-4">
              <User className="mr-2 h-4 w-4" />
              Sign In / Sign Up
            </Button>
          </div>
        )}
        <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
      </>
    )
  }

  return <>{children}</>
}

// Component for features that work better with auth but don't require it
export function AuthPrompt({ feature }: { feature: string }) {
  const { isAuthenticated } = useAuth()
  const [showLogin, setShowLogin] = useState(false)

  if (isAuthenticated) return null

  return (
    <>
      <Alert className="mb-4">
        <User className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>Sign in to {feature} and access personalized features</span>
          <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>
            Sign In
          </Button>
        </AlertDescription>
      </Alert>
      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </>
  )
}
