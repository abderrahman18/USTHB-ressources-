"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  TrendingUp,
  Users,
  FileText,
  Download,
  Upload,
  Star,
  Activity,
  Eye,
  Clock,
  ArrowUp,
  ArrowDown,
  Zap,
  BookOpen,
  MessageCircle,
  RefreshCw,
  GraduationCap,
  Building,
  Calendar,
} from "lucide-react"
import Link from "next/link"

// Initial state with zeros
const initialData = {
  totalResources: 0,
  totalDownloads: 0,
  activeUsers: 0,
  averageRating: 0,
  uploadsToday: 0,
  downloadsToday: 0,
  onlineNow: 0,
  newUsers: 0,
}

// Simulated real-time data for USTHB
const generateLiveData = (currentData: typeof initialData) => ({
  totalResources: Math.max(0, currentData.totalResources + Math.floor(Math.random() * 3)),
  totalDownloads: Math.max(0, currentData.totalDownloads + Math.floor(Math.random() * 10)),
  activeUsers: Math.max(0, currentData.activeUsers + Math.floor(Math.random() * 5) - 2),
  averageRating: Math.max(0, Math.min(5, currentData.averageRating + (Math.random() - 0.5) * 0.1)),
  uploadsToday: Math.max(0, currentData.uploadsToday + Math.floor(Math.random() * 2)),
  downloadsToday: Math.max(0, currentData.downloadsToday + Math.floor(Math.random() * 8)),
  onlineNow: Math.max(0, currentData.onlineNow + Math.floor(Math.random() * 3) - 1),
  newUsers: Math.max(0, currentData.newUsers + Math.floor(Math.random() * 2)),
})

const generateRecentActivity = () => {
  const usthbStudents = [
    { name: "Ahmed Benali", avatar: "AB", faculty: "Computer Science" },
    { name: "Fatima Khelifi", avatar: "FK", faculty: "Mathematics" },
    { name: "Youcef Mammeri", avatar: "YM", faculty: "Physics" },
    { name: "Amina Boudiaf", avatar: "AB", faculty: "Chemistry" },
    { name: "Karim Zidane", avatar: "KZ", faculty: "Computer Science" },
    { name: "Nadia Hamidi", avatar: "NH", faculty: "Biology" },
  ]

  const resources = [
    "Advanced Algorithms Course",
    "Database Lab Work",
    "Mathematical Analysis L2",
    "Quantum Physics",
    "Organic Chemistry",
    "Molecular Genetics",
    "Computer Networks",
    "Applied Statistics",
  ]

  const activities = [
    { type: "upload", action: "uploaded" },
    { type: "download", action: "downloaded" },
    { type: "rating", action: "rated 5 stars" },
    { type: "comment", action: "commented on" },
  ]

  return Array.from({ length: 6 }, (_, i) => {
    const student = usthbStudents[Math.floor(Math.random() * usthbStudents.length)]
    const resource = resources[Math.floor(Math.random() * resources.length)]
    const activity = activities[Math.floor(Math.random() * activities.length)]

    return {
      type: activity.type,
      user: student.name,
      action: activity.action,
      resource: resource,
      time: `${Math.floor(Math.random() * 30) + 1} min`,
      avatar: student.avatar,
      faculty: student.faculty,
    }
  })
}

const generateTrendingResources = () => {
  const resources = [
    { id: 1, title: "Algorithms and Data Structures", downloads: 0, trend: "up", change: "+0%" },
    { id: 2, title: "General Physics Course", downloads: 0, trend: "up", change: "+0%" },
    { id: 3, title: "Discrete Mathematics", downloads: 0, trend: "down", change: "+0%" },
    { id: 4, title: "Object-Oriented Programming", downloads: 0, trend: "up", change: "+0%" },
    { id: 5, title: "Numerical Analysis", downloads: 0, trend: "up", change: "+0%" },
  ]

  return resources.map((resource) => ({
    ...resource,
    downloads: Math.max(0, resource.downloads + Math.floor(Math.random() * 5)),
    change: (Math.random() > 0.7 ? "-" : "+") + Math.floor(Math.random() * 10) + "%",
  }))
}

const generateUSThBStats = () => ({
  faculties: 7, // USTHB has 7 faculties
  departments: 32, // Approximate number of departments
  students: Math.floor(Math.random() * 100) + 25000, // Approximate student count
  professors: Math.floor(Math.random() * 50) + 1200, // Approximate professor count
})

export default function LiveDashboardPage() {
  const [liveData, setLiveData] = useState(initialData)
  const [recentActivity, setRecentActivity] = useState(generateRecentActivity())
  const [trendingResources, setTrendingResources] = useState(generateTrendingResources())
  const [usthbStats, setUSThBStats] = useState(generateUSThBStats())
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  const updateData = useCallback(() => {
    if (isLive) {
      setLiveData((current) => generateLiveData(current))
      setRecentActivity(generateRecentActivity())
      setTrendingResources(generateTrendingResources())
      setUSThBStats(generateUSThBStats())
      setLastUpdate(new Date())
    }
  }, [isLive])

  useEffect(() => {
    const interval = setInterval(updateData, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [updateData])

  const toggleLiveUpdates = () => {
    setIsLive(!isLive)
  }

  const resetStats = () => {
    setLiveData(initialData)
    setLastUpdate(new Date())
  }

  return (
    <div className="pt-14 sm:pt-16 min-h-screen bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/10">
      <div className="container-responsive py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-3">
              <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
              Live Dashboard
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Real-time statistics for ACAD Resources - USTHB
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Last update: {lastUpdate.toLocaleTimeString()}
            </div>
            <Button
              variant={isLive ? "default" : "outline"}
              size="sm"
              onClick={toggleLiveUpdates}
              className="hover-scale"
            >
              <Zap className={`h-4 w-4 mr-2 ${isLive ? "animate-pulse" : ""}`} />
              {isLive ? "Live" : "Paused"}
            </Button>
            <Button variant="outline" size="sm" onClick={resetStats} className="hover-scale">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm">
            <div className={`h-2 w-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
            <span className={isLive ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
              {isLive ? "Live updates active" : "Live updates paused"}
            </span>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          {[
            {
              title: "Total Resources",
              value: liveData.totalResources.toLocaleString(),
              icon: FileText,
              color: "text-blue-500",
              bgColor: "bg-blue-500/10 dark:bg-blue-500/20",
              change: `+${liveData.uploadsToday} today`,
            },
            {
              title: "Total Downloads",
              value: liveData.totalDownloads.toLocaleString(),
              icon: Download,
              color: "text-green-500",
              bgColor: "bg-green-500/10 dark:bg-green-500/20",
              change: `+${liveData.downloadsToday} today`,
            },
            {
              title: "Active Users",
              value: liveData.activeUsers.toLocaleString(),
              icon: Users,
              color: "text-purple-500",
              bgColor: "bg-purple-500/10 dark:bg-purple-500/20",
              change: `${liveData.onlineNow} online`,
            },
            {
              title: "Average Rating",
              value: liveData.averageRating.toFixed(1),
              icon: Star,
              color: "text-yellow-500",
              bgColor: "bg-yellow-500/10 dark:bg-yellow-500/20",
              change: "Based on reviews",
            },
          ].map((stat, index) => (
            <Card
              key={stat.title}
              className="hover-lift transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary dark:bg-card/50 dark:hover:bg-card/70"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
                  </div>
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-medium text-muted-foreground line-clamp-1">{stat.title}</p>
                  <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="h-fit dark:bg-card/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Live Activity
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={updateData} className="hover-scale">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={`${activity.user}-${index}`}
                    className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-muted/50 dark:hover:bg-muted/30"
                  >
                    <Avatar className="h-8 w-8 hover-scale">
                      <AvatarFallback className="text-xs bg-primary/10 dark:bg-primary/20">
                        {activity.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{activity.user}</span>
                        <Badge
                          variant={
                            activity.type === "upload"
                              ? "default"
                              : activity.type === "download"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs"
                        >
                          {activity.faculty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {activity.action} <span className="font-medium">"{activity.resource}"</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time} ago
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {activity.type === "upload" && <Upload className="h-4 w-4 text-blue-500" />}
                      {activity.type === "download" && <Download className="h-4 w-4 text-green-500" />}
                      {activity.type === "rating" && <Star className="h-4 w-4 text-yellow-500" />}
                      {activity.type === "comment" && <MessageCircle className="h-4 w-4 text-purple-500" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Trending Resources */}
            <Card className="dark:bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Current Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingResources.map((resource, index) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 dark:hover:bg-muted/30 transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{resource.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {resource.downloads} downloads
                      </p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {resource.change.startsWith("+") ? (
                        <ArrowUp className="h-3 w-3 text-green-500" />
                      ) : (
                        <ArrowDown className="h-3 w-3 text-red-500" />
                      )}
                      <span
                        className={`text-xs font-medium ${
                          resource.change.startsWith("+") ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {resource.change}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* USTHB Stats */}
            <Card className="dark:bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  USTHB Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Faculties", value: usthbStats.faculties, icon: Building },
                  { label: "Departments", value: usthbStats.departments, icon: BookOpen },
                  { label: "Students", value: usthbStats.students.toLocaleString(), icon: Users },
                  { label: "Professors", value: usthbStats.professors.toLocaleString(), icon: GraduationCap },
                ].map((item, index) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold">{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="dark:bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full hover-lift" size="sm">
                  <Link href="/upload">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resource
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full hover-lift" size="sm">
                  <Link href="/search">
                    <Eye className="h-4 w-4 mr-2" />
                    Browse Resources
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full hover-lift" size="sm">
                  <Link href="/dashboard">
                    <Users className="h-4 w-4 mr-2" />
                    My Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Today's Highlights */}
        <div className="mt-8">
          <Card className="dark:bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "New Uploads",
                    value: liveData.uploadsToday,
                    icon: Upload,
                    color: "text-blue-500",
                  },
                  {
                    label: "Downloads Today",
                    value: liveData.downloadsToday,
                    icon: Download,
                    color: "text-green-500",
                  },
                  {
                    label: "New Users",
                    value: liveData.newUsers,
                    icon: Users,
                    color: "text-purple-500",
                  },
                  {
                    label: "Currently Active",
                    value: liveData.onlineNow,
                    icon: Activity,
                    color: "text-orange-500",
                  },
                ].map((highlight, index) => (
                  <div
                    key={highlight.label}
                    className="text-center p-4 rounded-lg bg-muted/50 dark:bg-muted/30 hover:bg-muted dark:hover:bg-muted/50 transition-all duration-200"
                  >
                    <highlight.icon className={`h-6 w-6 mx-auto mb-2 ${highlight.color}`} />
                    <p className="text-2xl font-bold mb-1">{highlight.value}</p>
                    <p className="text-sm text-muted-foreground">{highlight.label}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
