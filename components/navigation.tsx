"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Search, Upload, User, Menu, Moon, Sun, X, Activity } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth/auth-provider"
import { UserMenu } from "@/components/auth/user-menu"
import { LoginDialog } from "@/components/auth/login-dialog"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, isLoading } = useAuth()

  const navItems = [
    { href: "/", label: "Home", icon: BookOpen },
    { href: "/search", label: "Search", icon: Search },
    { href: "/upload", label: "Upload", icon: Upload, requireAuth: true },
    { href: "/dashboard", label: "Dashboard", icon: User, requireAuth: true },
    { href: "/live-dashboard", label: "Live", icon: Activity },
  ]

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <span className="text-lg sm:text-xl font-bold">ACAD Resources</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Sun className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden h-8 w-8">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  const handleNavClick = (item: (typeof navItems)[0], e: React.MouseEvent) => {
    if (item.requireAuth && !isAuthenticated) {
      e.preventDefault()
      setShowLogin(true)
    }
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
            : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 group transition-transform duration-200 hover:scale-105"
            >
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary transition-transform duration-200 group-hover:rotate-12" />
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                ACAD Resources
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item, e)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-105"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.label}</span>
                  {item.requireAuth && !isAuthenticated && <div className="h-1 w-1 bg-primary rounded-full ml-1" />}
                </Link>
              ))}
            </div>

            {/* Theme Toggle & Auth */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:scale-110 transition-transform duration-200"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              {/* Auth Section */}
              {isLoading ? (
                <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
              ) : isAuthenticated ? (
                <UserMenu />
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowLogin(true)} className="hidden sm:flex">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              )}

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-200">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-6 w-6 text-primary" />
                      <span className="text-lg font-bold">ACAD Resources</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="hover:scale-110 transition-transform duration-200"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-3">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(item, e)
                          setIsOpen(false)
                        }}
                        className="flex items-center space-x-3 text-lg font-medium p-3 rounded-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-2"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                        {item.href === "/live-dashboard" && (
                          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse ml-auto"></div>
                        )}
                        {item.requireAuth && !isAuthenticated && (
                          <div className="h-2 w-2 bg-primary rounded-full ml-auto" />
                        )}
                      </Link>
                    ))}

                    {!isAuthenticated && (
                      <>
                        <div className="border-t my-2" />
                        <Button
                          onClick={() => {
                            setShowLogin(true)
                            setIsOpen(false)
                          }}
                          className="w-full"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Sign In / Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </>
  )
}
