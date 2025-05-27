"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Search, Filter, X, Sparkles, User, Star, FileText, Save, History, Zap } from "lucide-react"

interface SearchFilters {
  query: string
  subject: string
  fileType: string
  level: string
  professor: string
  semester: string
  difficulty: number[]
  minRating: number[]
  dateRange: string
  hasExamples: boolean
  hasExercises: boolean
  language: string
  semanticSearch: boolean
}

interface SavedSearch {
  id: string
  name: string
  filters: SearchFilters
  timestamp: Date
}

const initialFilters: SearchFilters = {
  query: "",
  subject: "All",
  fileType: "All",
  level: "All",
  professor: "All",
  semester: "All",
  difficulty: [1],
  minRating: [0],
  dateRange: "",
  hasExamples: false,
  hasExercises: false,
  language: "",
  semanticSearch: false,
}

const subjects = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Earth Sciences",
  "Literature",
  "History",
  "Economics",
]

const professors = [
  "Dr. Ahmed Benali",
  "Prof. Fatima Khelifi",
  "Dr. Youcef Mammeri",
  "Prof. Amina Boudiaf",
  "Dr. Karim Zidane",
  "Prof. Nadia Hamidi",
]

const semesters = ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"]

export function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters)
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([])
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Generate search suggestions based on query
  const generateSuggestions = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchSuggestions([])
      return
    }

    const suggestions = [
      `${query} complete course`,
      `${query} solved exercises`,
      `${query} past exams`,
      `${query} practical labs`,
      `${query} summary`,
      `${query} presentation slides`,
    ].filter((s) => s.toLowerCase().includes(query.toLowerCase()))

    setSearchSuggestions(suggestions.slice(0, 5))
  }, [])

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters(initialFilters)
  }

  const saveCurrentSearch = () => {
    const name = prompt("Saved search name:")
    if (name) {
      const newSearch: SavedSearch = {
        id: Date.now().toString(),
        name,
        filters: { ...filters },
        timestamp: new Date(),
      }
      setSavedSearches((prev) => [newSearch, ...prev].slice(0, 10))
    }
  }

  const loadSavedSearch = (search: SavedSearch) => {
    setFilters(search.filters)
  }

  const deleteSavedSearch = (id: string) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Main Search Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Smart search... (e.g., 'algorithms course with exercises')"
                    value={filters.query}
                    onChange={(e) => {
                      updateFilter("query", e.target.value)
                      generateSuggestions(e.target.value)
                      setShowSuggestions(true)
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="text-base h-12"
                  />

                  {/* Search Suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-10 mt-1">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          className="w-full text-left px-4 py-2 hover:bg-muted transition-colors text-sm"
                          onClick={() => {
                            updateFilter("query", suggestion)
                            setShowSuggestions(false)
                          }}
                        >
                          <Search className="h-3 w-3 inline mr-2 text-muted-foreground" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <Button size="lg" className="px-6">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {/* Semantic Search Toggle */}
            <div className="flex items-center space-x-2">
              <Switch
                id="semantic-search"
                checked={filters.semanticSearch}
                onCheckedChange={(checked) => updateFilter("semanticSearch", checked)}
              />
              <Label htmlFor="semantic-search" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Semantic search (AI)
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Advanced Filters */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Advanced Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Filters */}
              <div className="space-y-4">
                <div>
                  <Label>Subject</Label>
                  <Select value={filters.subject} onValueChange={(value) => updateFilter("subject", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>File Type</Label>
                  <Select value={filters.fileType} onValueChange={(value) => updateFilter("fileType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All types</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">DOCX</SelectItem>
                      <SelectItem value="pptx">PPTX</SelectItem>
                      <SelectItem value="zip">ZIP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Level</Label>
                  <Select value={filters.level} onValueChange={(value) => updateFilter("level", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All levels</SelectItem>
                      <SelectItem value="L1">Bachelor 1</SelectItem>
                      <SelectItem value="L2">Bachelor 2</SelectItem>
                      <SelectItem value="L3">Bachelor 3</SelectItem>
                      <SelectItem value="M1">Master 1</SelectItem>
                      <SelectItem value="M2">Master 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <Label>Professor</Label>
                  <Select value={filters.professor} onValueChange={(value) => updateFilter("professor", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All professors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All professors</SelectItem>
                      {professors.map((prof) => (
                        <SelectItem key={prof} value={prof}>
                          {prof}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Semester</Label>
                  <Select value={filters.semester} onValueChange={(value) => updateFilter("semester", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All semesters" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All semesters</SelectItem>
                      {semesters.map((sem) => (
                        <SelectItem key={sem} value={sem}>
                          {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Difficulty: {filters.difficulty[0]}/5</Label>
                  <Slider
                    value={filters.difficulty}
                    onValueChange={(value) => updateFilter("difficulty", value)}
                    max={5}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Minimum rating: {filters.minRating[0]}/5</Label>
                  <Slider
                    value={filters.minRating}
                    onValueChange={(value) => updateFilter("minRating", value)}
                    max={5}
                    min={0}
                    step={0.5}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Content Filters */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="has-examples"
                    checked={filters.hasExamples}
                    onCheckedChange={(checked) => updateFilter("hasExamples", checked)}
                  />
                  <Label htmlFor="has-examples">With examples</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="has-exercises"
                    checked={filters.hasExercises}
                    onCheckedChange={(checked) => updateFilter("hasExercises", checked)}
                  />
                  <Label htmlFor="has-exercises">With exercises</Label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={clearFilters} className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
                <Button variant="outline" onClick={saveCurrentSearch}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Saved Searches */}
          {savedSearches.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Saved Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {savedSearches.map((search) => (
                    <div
                      key={search.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <button
                        onClick={() => loadSavedSearch(search)}
                        className="flex-1 text-left text-sm font-medium hover:text-primary transition-colors"
                      >
                        {search.name}
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSavedSearch(search.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Search Results */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Search Results</span>
                <Badge variant="secondary">4 results found</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample search results */}
                {[
                  {
                    title: "Complete Advanced Algorithms Course",
                    description: "Detailed course with examples and solved exercises",
                    subject: "Computer Science",
                    professor: "Dr. Ahmed Benali",
                    rating: 4.8,
                    downloads: 1250,
                    type: "PDF",
                    difficulty: 4,
                    hasExamples: true,
                    hasExercises: true,
                  },
                  {
                    title: "Database Lab - Practical Exercises",
                    description: "Lab work with detailed solutions",
                    subject: "Computer Science",
                    professor: "Prof. Fatima Khelifi",
                    rating: 4.6,
                    downloads: 890,
                    type: "ZIP",
                    difficulty: 3,
                    hasExamples: true,
                    hasExercises: true,
                  },
                ].map((result, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex gap-2">
                        <Badge variant="secondary">{result.type}</Badge>
                        <Badge variant="outline">{result.subject}</Badge>
                        {result.hasExamples && <Badge variant="outline">Examples</Badge>}
                        {result.hasExercises && <Badge variant="outline">Exercises</Badge>}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{result.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors cursor-pointer">
                      {result.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">{result.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {result.professor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          Difficulty {result.difficulty}/5
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {result.downloads} downloads
                        </span>
                      </div>
                      <Button size="sm">View Details</Button>
                    </div>
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
