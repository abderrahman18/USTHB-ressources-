"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, FileText, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { AuthGuard } from "@/components/auth/auth-guard"

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [fileType, setFileType] = useState("")
  const [level, setLevel] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const subjects = [
    "Mathematics",
    "Computer Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Literature",
    "History",
    "Economics",
    "Psychology",
  ]

  const fileTypes = ["PDF", "DOCX", "ZIP", "PPT", "TXT"]
  const levels = ["High School", "University"]

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 10) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    // Handle form submission here
    console.log({
      title,
      description,
      subject,
      fileType,
      level,
      tags,
      file,
    })

    setIsUploading(false)
  }

  return (
    <AuthGuard>
      <div className="pt-14 sm:pt-16">
        <div className="container-responsive py-6 sm:py-8 max-w-6xl">
          {/* Back Button */}
          <div className="mb-6 animate-fadeInUp">
            <Button variant="ghost" asChild className="hover-lift">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="mb-6 sm:mb-8 animate-fadeInUp stagger-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Upload Resource</h1>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
              Share your academic materials with fellow students. Help others learn and succeed!
            </p>
          </div>

          {/* Guidelines Alert */}
          <Alert className="mb-6 sm:mb-8 animate-fadeInUp stagger-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm sm:text-base">
              Please ensure you have the right to share this material and that it doesn't violate any copyright laws.
            </AlertDescription>
          </Alert>

          {/* Upload Progress */}
          {isUploading && (
            <Card className="mb-6 animate-fadeInUp">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Upload className="h-5 w-5 text-primary animate-bounce" />
                  <span className="font-medium">Uploading your resource...</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-muted-foreground mt-2">{uploadProgress}% complete</p>
              </CardContent>
            </Card>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <Card className="animate-fadeInLeft">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Provide basic details about your resource</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="animate-fadeInUp">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Title *
                      </Label>
                      <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Advanced Calculus Textbook"
                        className="mt-1 focus-ring transition-all duration-200 hover:shadow-sm"
                        required
                      />
                    </div>

                    <div className="animate-fadeInUp stagger-1">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Provide a detailed description of the resource..."
                        rows={4}
                        className="mt-1 focus-ring transition-all duration-200 hover:shadow-sm resize-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="animate-fadeInUp stagger-2">
                        <Label htmlFor="subject" className="text-sm font-medium">
                          Subject *
                        </Label>
                        <Select value={subject} onValueChange={setSubject} required>
                          <SelectTrigger className="mt-1 focus-ring">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subj) => (
                              <SelectItem key={subj} value={subj}>
                                {subj}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="animate-fadeInUp stagger-3">
                        <Label htmlFor="level" className="text-sm font-medium">
                          Education Level *
                        </Label>
                        <Select value={level} onValueChange={setLevel} required>
                          <SelectTrigger className="mt-1 focus-ring">
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                          <SelectContent>
                            {levels.map((lvl) => (
                              <SelectItem key={lvl} value={lvl}>
                                {lvl}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-fadeInLeft stagger-1">
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                    <CardDescription>Add relevant tags to help others find your resource (max 10)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2 animate-fadeInUp">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag..."
                          className="focus-ring transition-all duration-200 hover:shadow-sm"
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                          disabled={tags.length >= 10}
                        />
                        <Button
                          type="button"
                          onClick={addTag}
                          variant="outline"
                          className="hover-lift shrink-0"
                          disabled={tags.length >= 10}
                        >
                          Add
                        </Button>
                      </div>

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 animate-fadeInUp stagger-1">
                          {tags.map((tag, index) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className={`flex items-center gap-1 hover-scale animate-scaleIn stagger-${index + 1}`}
                            >
                              {tag}
                              <X
                                className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors duration-200"
                                onClick={() => removeTag(tag)}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">{tags.length}/10 tags used</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <Card className="animate-fadeInRight">
                  <CardHeader>
                    <CardTitle>File Upload</CardTitle>
                    <CardDescription>Upload your academic resource file</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="animate-fadeInUp">
                      <Label htmlFor="fileType" className="text-sm font-medium">
                        File Type *
                      </Label>
                      <Select value={fileType} onValueChange={setFileType} required>
                        <SelectTrigger className="mt-1 focus-ring">
                          <SelectValue placeholder="Select file type" />
                        </SelectTrigger>
                        <SelectContent>
                          {fileTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="animate-fadeInUp stagger-1">
                      <Label htmlFor="file" className="text-sm font-medium">
                        File *
                      </Label>
                      <div className="relative mt-1">
                        <div
                          className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all duration-300 hover:border-primary/50 hover:bg-muted/50 ${
                            file ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "border-muted-foreground/25"
                          }`}
                        >
                          {file ? (
                            <div className="flex flex-col items-center justify-center gap-3 animate-scaleIn">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                                </div>
                                <FileText className="h-8 w-8 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-sm sm:text-base">{file.name}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setFile(null)}
                                className="hover-scale"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <div className="animate-fadeInUp">
                              <Upload className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 text-muted-foreground animate-bounce-slow" />
                              <p className="text-muted-foreground mb-2 text-sm sm:text-base">
                                Click to upload or drag and drop
                              </p>
                              <p className="text-xs sm:text-sm text-muted-foreground">
                                PDF, DOCX, ZIP, PPT files up to 50MB
                              </p>
                            </div>
                          )}
                          <input
                            id="file"
                            type="file"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept=".pdf,.docx,.zip,.ppt,.pptx,.txt"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="animate-fadeInRight stagger-1">
                  <CardHeader>
                    <CardTitle>Upload Guidelines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-xs sm:text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2 animate-fadeInUp">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        Ensure you have permission to share the material
                      </li>
                      <li className="flex items-start gap-2 animate-fadeInUp stagger-1">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        Use descriptive titles and detailed descriptions
                      </li>
                      <li className="flex items-start gap-2 animate-fadeInUp stagger-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        Add relevant tags for better discoverability
                      </li>
                      <li className="flex items-start gap-2 animate-fadeInUp stagger-3">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        Maximum file size: 50MB
                      </li>
                      <li className="flex items-start gap-2 animate-fadeInUp stagger-4">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        Supported formats: PDF, DOCX, ZIP, PPT, TXT
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* File Size Warning */}
                {file && file.size > 50 * 1024 * 1024 && (
                  <Alert className="animate-fadeInUp border-destructive">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <AlertDescription className="text-destructive">
                      File size exceeds 50MB limit. Please choose a smaller file.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 animate-fadeInUp">
              <Button
                type="submit"
                size="lg"
                className="flex-1 hover-lift px-8"
                disabled={isUploading || (file && file.size > 50 * 1024 * 1024)}
              >
                {isUploading ? (
                  <>
                    <Upload className="h-5 w-5 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Resource
                  </>
                )}
              </Button>
              <Button type="button" variant="outline" size="lg" className="hover-lift px-8" disabled={isUploading}>
                Save as Draft
              </Button>
            </div>

            {/* Form Validation Summary */}
            <div className="text-xs text-muted-foreground animate-fadeInUp stagger-1">
              <p>* Required fields</p>
              <p className="mt-1">
                By uploading, you agree to our terms of service and confirm you have the right to share this content.
              </p>
            </div>
          </form>
        </div>
      </div>
    </AuthGuard>
  )
}
