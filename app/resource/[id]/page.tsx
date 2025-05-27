import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Download, Star, Eye, Calendar, FileText, Heart, Share2, Flag, ArrowLeft, Clock, Users } from "lucide-react"
import Link from "next/link"
import { ResourceQuality } from "@/components/resource-management/resource-quality"

// Mock data - in a real app, this would come from your database
const resourceData = {
  id: 1,
  title: "Advanced Calculus Textbook - Complete Edition",
  description:
    "Comprehensive textbook covering differential and integral calculus with detailed explanations, examples, and practice problems. Perfect for university-level mathematics courses.",
  subject: "Mathematics",
  type: "PDF",
  level: "University",
  fileSize: "15.2 MB",
  pages: 450,
  downloads: 1250,
  views: 3420,
  rating: 4.8,
  totalRatings: 156,
  uploadDate: "2024-01-15",
  uploader: {
    name: "Sarah Johnson",
    initials: "SJ",
    university: "MIT",
  },
  tags: ["Calculus", "Textbook", "2nd Year", "Differential", "Integral"],
  preview: "/placeholder.svg?height=600&width=400",
}

const comments = [
  {
    id: 1,
    user: "Alex Chen",
    initials: "AC",
    rating: 5,
    comment: "Excellent resource! Very comprehensive and well-organized. Helped me ace my calculus exam.",
    date: "2024-01-20",
  },
  {
    id: 2,
    user: "Maria Garcia",
    initials: "MG",
    rating: 4,
    comment: "Good textbook with clear explanations. Some sections could use more examples.",
    date: "2024-01-18",
  },
]

const relatedResources = [
  {
    id: 2,
    title: "Calculus Practice Problems",
    type: "PDF",
    downloads: 890,
    rating: 4.6,
  },
  {
    id: 3,
    title: "Linear Algebra Notes",
    type: "PDF",
    downloads: 675,
    rating: 4.5,
  },
]

export default function ResourceDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="pt-14 sm:pt-16">
      <div className="container-responsive py-6 sm:py-8">
        {/* Back Button */}
        <div className="mb-6 animate-fadeInUp">
          <Button variant="ghost" asChild className="hover-lift">
            <Link href="/search">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Search
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="animate-fadeInLeft">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="text-xs sm:text-sm">
                  {resourceData.type}
                </Badge>
                <Badge variant="outline" className="text-xs sm:text-sm">
                  {resourceData.level}
                </Badge>
                <Badge variant="outline" className="text-xs sm:text-sm">
                  {resourceData.subject}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">{resourceData.title}</h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 leading-relaxed">
                {resourceData.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{resourceData.downloads.toLocaleString()}</span>
                  <span className="hidden sm:inline">downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{resourceData.views.toLocaleString()}</span>
                  <span className="hidden sm:inline">views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{resourceData.rating}</span>
                  <span className="hidden sm:inline">({resourceData.totalRatings})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span className="font-medium">{new Date(resourceData.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="animate-fadeInLeft stagger-1">
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {resourceData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="hover-scale cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* File Preview */}
            <Card className="animate-fadeInLeft stagger-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  File Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg p-6 sm:p-8 text-center hover-lift transition-all duration-300">
                  <FileText className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Preview not available. Download to view the full document.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {resourceData.pages} pages • {resourceData.fileSize}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="animate-fadeInLeft stagger-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Reviews & Comments
                </CardTitle>
                <CardDescription>What other students are saying about this resource</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {comments.map((comment, index) => (
                    <div key={comment.id} className={`animate-fadeInUp stagger-${index + 1}`}>
                      <div className="flex items-start gap-3 sm:gap-4">
                        <Avatar className="shrink-0">
                          <AvatarFallback>{comment.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <span className="font-semibold text-sm sm:text-base">{comment.user}</span>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                      i < comment.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(comment.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                      {comment.id !== comments[comments.length - 1].id && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Quality & Management */}
            <div className="mt-8">
              <ResourceQuality resourceId={params.id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Download Card */}
            <Card className="sticky top-24 animate-fadeInRight">
              <CardHeader>
                <CardTitle>Download Resource</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="flex justify-between">
                    <span>File size:</span>
                    <span className="font-medium">{resourceData.fileSize}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Pages:</span>
                    <span className="font-medium">{resourceData.pages}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-medium">{resourceData.type}</span>
                  </p>
                </div>
                <Button className="w-full hover-lift" size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  Download {resourceData.type}
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="hover-scale">
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Save</span>
                  </Button>
                  <Button variant="outline" size="sm" className="hover-scale">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button variant="outline" size="sm" className="hover-scale">
                    <Flag className="h-4 w-4" />
                    <span className="sr-only">Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Uploader Info */}
            <Card className="animate-fadeInRight stagger-1">
              <CardHeader>
                <CardTitle>Uploaded by</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="hover-scale cursor-pointer">
                    <AvatarFallback>{resourceData.uploader.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{resourceData.uploader.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{resourceData.uploader.university}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Resources */}
            <Card className="animate-fadeInRight stagger-2">
              <CardHeader>
                <CardTitle>Related Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedResources.map((resource, index) => (
                    <div
                      key={resource.id}
                      className={`group hover-lift p-3 rounded-lg border transition-all duration-200 animate-fadeInUp stagger-${index + 1}`}
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/resource/${resource.id}`}
                            className="text-sm font-medium hover:text-primary transition-colors duration-200 line-clamp-2"
                          >
                            {resource.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              {resource.downloads}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {resource.rating}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs shrink-0">
                          {resource.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
