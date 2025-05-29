import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthPrompt } from "@/components/auth/auth-guard"
import {
  Search,
  Upload,
  Download,
  Star,
  TrendingUp,
  BookOpen,
  FileText,
  Calculator,
  Users,
  User,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

const featuredResources = [
  {
    id: 1,
    title: "Complete Algorithms Course",
    subject: "Computer Science",
    type: "PDF",
    downloads: 1250,
    rating: 4.8,
    level: "University",
    tags: ["L2", "Algorithms", "Course"],
  },
  {
    id: 2,
    title: "Java Exams and Solutions",
    subject: "Computer Science",
    type: "PDF",
    downloads: 890,
    rating: 4.6,
    level: "University",
    tags: ["Programming", "Exams", "Java"],
  },
  {
    id: 3,
    title: "Physics Lab Manual",
    subject: "Physics",
    type: "PDF",
    downloads: 675,
    rating: 4.7,
    level: "University",
    tags: ["Lab", "Experiments", "Physics"],
  },
]

const subjects = [
  { name: "Mathematics", icon: Calculator, count: 245, color: "bg-blue-500" },
  { name: "Computer Science", icon: FileText, count: 189, color: "bg-green-500" },
  { name: "Physics", icon: BookOpen, count: 156, color: "bg-purple-500" },
  { name: "Chemistry", icon: BookOpen, count: 134, color: "bg-orange-500" },
  { name: "Biology", icon: BookOpen, count: 98, color: "bg-emerald-500" },
  { name: "Earth Sciences", icon: BookOpen, count: 87, color: "bg-pink-500" },
]

export default function HomePage() {
  return (
    <div className="pt-14 sm:pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/10">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                ACAD Resources
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto">
              Your centralized hub for academic resources at USTHB. Find courses, notes, exams and study guides shared
              by students.
            </p>

            {/* Auth Prompt for better experience */}
            <div className="max-w-2xl mx-auto mb-6">
              <AuthPrompt feature="save your favorite resources" />
            </div>

            {/* Quick Search */}
            <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <Input
                  placeholder="Search by subject, file name or type..."
                  className="text-base sm:text-lg h-12 sm:h-14 transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:bg-background/50"
                />
                <Button
                  size="lg"
                  asChild
                  className="h-12 sm:h-14 px-6 sm:px-8 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
                >
                  <Link href="/search">
                    <Search className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Search</span>
                    <span className="sm:hidden">Go</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="px-6 sm:px-8 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Link href="/upload">
                  <Upload className="h-5 w-5 mr-2" />
                  Upload Resources
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-6 sm:px-8 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Link href="/search">
                  <Download className="h-5 w-5 mr-2" />
                  Browse Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Stats Section */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: FileText, value: "2,847", label: "Total Resources", color: "text-blue-500" },
              { icon: Download, value: "15,692", label: "Downloads This Month", color: "text-green-500" },
              { icon: Users, value: "1,234", label: "Active Students", color: "text-purple-500" },
              { icon: Star, value: "4.7", label: "Average Rating", color: "text-yellow-500" },
            ].map((stat) => (
              <Card
                key={stat.label}
                className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-card/50 dark:hover:bg-card/70"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-center gap-2 text-xl sm:text-2xl">
                    <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    {stat.value}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Resources */}
        <section className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex items-center gap-2 mb-6 sm:mb-8">
            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Popular Resources</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {featuredResources.map((resource) => (
              <Card
                key={resource.id}
                className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-card/50 dark:hover:bg-card/70"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.level}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors duration-200">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">{resource.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {resource.downloads.toLocaleString()}
                    </span>
                    <Button size="sm" asChild className="transition-transform duration-200 hover:scale-105">
                      <Link href={`/resource/${resource.id}`}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Popular Subjects */}
        <section>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8">USTHB Faculties</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {subjects.map((subject) => (
              <Card
                key={subject.name}
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-card/50 dark:hover:bg-card/70"
              >
                <CardContent className="p-3 sm:p-4 text-center">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${subject.color} rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <subject.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm mb-1 group-hover:text-primary transition-colors duration-200">
                    {subject.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{subject.count} resources</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 sm:mt-20 lg:mt-24 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/20 dark:via-primary/10 dark:to-primary/20 rounded-2xl p-8 sm:p-12 lg:p-16">
            <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">Ready to Share Your Knowledge?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of USTHB students helping each other succeed. Upload your resources and make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="px-8 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Link href="/upload">
                  <Upload className="h-5 w-5 mr-2" />
                  Start Uploading
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="px-8 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Link href="/dashboard">
                  <User className="h-5 w-5 mr-2" />
                  Join Community
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
