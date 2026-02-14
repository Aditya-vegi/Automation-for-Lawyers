"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Filter, RefreshCw, MapPin, Calendar, Tag, AlertCircle } from "lucide-react"

const searchResults = [
  {
    id: "result-001",
    title: "Interview Transcript - Witness Statement",
    type: "document",
    case: "Smith vs. Jones",
    relevance: 0.98,
    excerpt:
      "...the defendant was present at the location on January 15th at approximately 2:00 PM...",
    tags: ["witness", "statement", "timeline"],
    date: "2025-01-18",
  },
  {
    id: "result-002",
    title: "CCTV Recording Analysis",
    type: "video",
    case: "Smith vs. Jones",
    relevance: 0.94,
    excerpt: "Frame-by-frame analysis shows three individuals entering the building at 2:15 PM",
    tags: ["video", "evidence", "timeline"],
    date: "2025-01-18",
  },
  {
    id: "result-003",
    title: "Financial Records - Transaction Log",
    type: "document",
    case: "ABC Corp v. XYZ Inc",
    relevance: 0.87,
    excerpt: "Transaction ID #4521 - $50,000 transfer on February 1st to account ending in 5678",
    tags: ["financial", "transaction"],
    date: "2025-01-15",
  },
  {
    id: "result-004",
    title: "Email Correspondence Chain",
    type: "document",
    case: "ABC Corp v. XYZ Inc",
    relevance: 0.82,
    excerpt: "...regarding the proposed settlement amount of $250,000 as discussed in prior meetings...",
    tags: ["correspondence", "settlement"],
    date: "2025-01-14",
  },
  {
    id: "result-005",
    title: "Phone Call Recording Transcript",
    type: "audio",
    case: "Johnson Estate Dispute",
    relevance: 0.76,
    excerpt: "Discussion about the will amendments and specific bequests made in January 2024",
    tags: ["audio", "will", "testimony"],
    date: "2025-01-10",
  },
]

const filters = [
  { label: "Document", value: "document", count: 342 },
  { label: "Audio", value: "audio", count: 87 },
  { label: "Video", value: "video", count: 45 },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [caseFilter, setCaseFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [showAdvanced, setShowAdvanced] = useState(false)

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // This will be connected to API later
    console.log("Searching for:", searchQuery)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Evidence Search</h1>
        <p className="text-muted-foreground">
          Search and retrieve evidence across all cases
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 space-y-6">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Main Search */}
          <div className="relative">
            <Input
              placeholder="Search evidence by keyword, case name, or testimony..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-base"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="case">Case</Label>
              <select
                id="case"
                value={caseFilter}
                onChange={(e) => setCaseFilter(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-slate-950 text-foreground"
              >
                <option value="all">All Cases</option>
                <option value="smith-jones">Smith vs. Jones</option>
                <option value="abc-xyz">ABC Corp v. XYZ Inc</option>
                <option value="johnson">Johnson Estate Dispute</option>
                <option value="state-davis">Criminal State v. Davis</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFrom">From Date</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateTo">To Date</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>

            <div className="flex items-end gap-2">
              <Button className="flex-1">
                <Search size={16} className="mr-2" />
                Search
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Filter size={16} />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <Card className="border-primary/50 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-base">Advanced Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-base mb-3 block">Evidence Type</Label>
                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                      <button
                        key={filter.value}
                        onClick={() => toggleFilter(filter.value)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          selectedFilters.includes(filter.value)
                            ? "bg-primary text-white border-primary"
                            : "border-border text-foreground hover:border-primary"
                        }`}
                      >
                        {filter.label}
                        <span className="text-xs ml-2 opacity-75">({filter.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Confidence Level</Label>
                    <select className="w-full h-10 px-3 rounded-lg border border-border bg-slate-950 text-foreground">
                      <option>Any</option>
                      <option>High (80%+)</option>
                      <option>Medium (60-80%)</option>
                      <option>Low (&lt;60%)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Analysis Status</Label>
                    <select className="w-full h-10 px-3 rounded-lg border border-border bg-slate-950 text-foreground">
                      <option>Any</option>
                      <option>Analyzed</option>
                      <option>Analyzing</option>
                      <option>Pending</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Sort By</Label>
                    <select className="w-full h-10 px-3 rounded-lg border border-border bg-slate-950 text-foreground">
                      <option>Relevance</option>
                      <option>Date (Newest)</option>
                      <option>Date (Oldest)</option>
                      <option>Confidence</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <RefreshCw size={16} className="mr-2" />
                    Apply Filters
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedFilters([])
                      setDateFrom("")
                      setDateTo("")
                      setCaseFilter("all")
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>

        {/* Results Info */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Search Results
            </h2>
            <p className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">5</span> matching items
            </p>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>

        {/* Search Results */}
        <div className="grid gap-4">
          {searchResults.map((result) => (
            <Card
              key={result.id}
              className="hover:border-primary/50 transition-colors hover:bg-slate-900/20 cursor-pointer"
            >
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {/* Result Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold text-foreground">
                          {result.title}
                        </h3>
                        <span className="text-xs px-2 py-1 rounded bg-slate-900 text-muted-foreground">
                          {result.type}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 italic">
                        {result.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {result.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded bg-slate-900 border border-border text-foreground hover:border-primary transition-colors cursor-pointer"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Tag size={14} />
                          <span>{result.case}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{result.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Relevance Score */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">
                        {Math.round(result.relevance * 100)}%
                      </div>
                      <p className="text-xs text-muted-foreground">Relevance</p>

                      {result.relevance >= 0.9 && (
                        <div className="mt-2 flex items-center justify-end gap-1 text-green-400">
                          <AlertCircle size={14} />
                          <span className="text-xs">High Match</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Add to Collection
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
