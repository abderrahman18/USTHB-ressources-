"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Download,
  Upload,
  Star,
  Eye,
  Heart,
  Trash2,
  Edit,
  TrendingUp,
  BookOpen,
  ArrowLeft,
  Calendar,
} from "lucide-react"
import Link from "next/link"

const userStats = {
  totalDownloads: 45,
  totalUploads: 8,
  totalViews: 1250,
  averageRating: 4.6,
}

const savedResources = [
  {
    id: 1,
    title: "Advanced Calculus Textbook",
    subject: "Mathematics",
    type: "PDF",
    savedDate: "2024-01-20",
    downloads: 1250,
  },
  {
    id: 2,
    title: "Java Programming Guide",
    subject: "Computer Science",
    type: "PDF",
    savedDate: "2024-01-18",
    downloads: 890,
  },
]

const uploadedResources = [
  {
    id: 1,
    title: "Linear Algebra Notes",
    subject: "Mathematics",
    type: "PDF",
    uploadDate: "2024-01-15",
    downloads: 234,
    views: 567,
    rating: 4.7,
    status: "Published",
  },
  {
    id: 2,
    title: "Chemistry Lab Report Template",
    subject: "Chemistry",
    type: "DOCX",
    uploadDate: "2024-01-10",
    downloads: 156,
    views: 289,
    rating: 4.5,
    status: "Published",
  },
]

const recommendations = [
  {
    id: 3,
    title: "Differential Equations Handbook",
    subject: "Mathematics",
    type: "PDF",
    reason: "Based on your interest in Mathematics",
  },
  {
    id: 4,
    title: "Data Structures and Algorithms",
    subject: "Computer Science",
    type: "PDF",
    reason: "Popular in Computer Science",
  },
]

const recentActivity = [
  {
    id: 1,
    action: "Downloaded",
    resource: "Advanced Calculus Textbook",
    time: "2 hours ago",
    type: "download",
  },
  {
    id: 2,
    action: "Uploaded",
    resource: "Chemistry Lab Report Template",
    time: "1 day ago",
    type: "upload",
  },
  {
    id: 3,
    action: "Received 5-star rating on",
    resource: "Linear Algebra Notes",
    time: "2 days ago",
    type: "rating",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="pt-14 sm:pt-16">
      <div className="container-responsive py-6 sm:py-8">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16 hover-scale">
              <AvatarFallback className="text-lg sm:text-xl">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Welcome back, John!</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Computer Science Student at MIT</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 animate-fadeInUp stagger-2">
            <TabsTrigger value="overview" className="text-xs sm:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="saved" className="text-xs sm:text-sm">
              Saved
            </TabsTrigger>
            <TabsTrigger value="uploads" className="text-xs sm:text-sm">
              My Uploads
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xs sm:text-sm">
              For You
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {[
                {
                  title: "Total Downloads",
                  value: userStats.totalDownloads,
                  icon: Download,
                  change: "+12%",
                  color: "text-green-500",
                },
                {
                  title: "Resources Uploaded",
                  value: userStats.totalUploads,
                  icon: Upload,
                  change: "+2 this month",
                  color: "text-blue-500",
                },
                {
                  title: "Total Views",
                  value: userStats.totalViews,
                  icon: Eye,
                  change: "+180 this week",
                  color: "text-purple-500",
                },
                {
                  title: "Average Rating",
                  value: userStats.averageRating,
                  icon: Star,
                  change: "Based on 23 reviews",
                  color: "text-yellow-500",
                },
              ].map((stat, index) => (
                <Card key={stat.title} className={`hover-lift animate-scaleIn stagger-${index + 1}`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xs sm:text-sm font-medium line-clamp-2">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="animate-fadeInUp stagger-5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={activity.id}
                      className={`flex items-center gap-3 sm:gap-4 animate-fadeInLeft stagger-${index + 1}`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          activity.type === "download"
                            ? "bg-green-500"
                            : activity.type === "upload"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm">
                          {activity.action} <span className="font-medium">"{activity.resource}"</span>
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fadeInUp">
              <h2 className="text-xl sm:text-2xl font-bold">Saved Resources</h2>
              <Button variant="outline" className="hover-lift">
                <Heart className="h-4 w-4 mr-2" />
                View All Saved
              </Button>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {savedResources.map((resource, index) => (
                <Card key={resource.id} className={`hover-lift animate-fadeInUp stagger-${index + 1}`}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {resource.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.subject}
                          </Badge>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{resource.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Saved on {new Date(resource.savedDate).toLocaleDateString()} •
                          {resource.downloads.toLocaleString()} downloads
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" asChild className="hover-scale">
                          <Link href={`/resource/${resource.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">View</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="hover-scale">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="uploads" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fadeInUp">
              <h2 className="text-xl sm:text-2xl font-bold">My Uploads</h2>
              <Button asChild className="hover-lift">
                <Link href="/upload">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New Resource
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {uploadedResources.map((resource, index) => (
                <Card key={resource.id} className={`hover-lift animate-fadeInUp stagger-${index + 1}`}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {resource.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.subject}
                          </Badge>
                          <Badge variant="default" className="text-xs">
                            {resource.status}
                          </Badge>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{resource.title}</h3>
                        <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            {resource.downloads}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {resource.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {resource.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(resource.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button variant="outline" size="sm" className="hover-scale">
                          <Edit className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                        <Button size="sm" asChild className="hover-scale">
                          <Link href={`/resource/${resource.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">View</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fadeInUp">
              <h2 className="text-xl sm:text-2xl font-bold">Recommended for You</h2>
              <Button variant="outline" className="hover-lift">
                <BookOpen className="h-4 w-4 mr-2" />
                Explore More
              </Button>
            </div>

            <div className="grid gap-4 sm:gap-6">
              {recommendations.map((resource, index) => (
                <Card key={resource.id} className={`hover-lift animate-fadeInUp stagger-${index + 1}`}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {resource.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.subject}
                          </Badge>
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold mb-2 line-clamp-2">{resource.title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{resource.reason}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button variant="outline" size="sm" className="hover-scale">
                          <Heart className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Save</span>
                        </Button>
                        <Button size="sm" asChild className="hover-scale">
                          <Link href={`/resource/${resource.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">View</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
