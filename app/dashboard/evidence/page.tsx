"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Clock,
  Filter,
  File,
  Volume2,
  Video,
} from "lucide-react"

// Sample data
const sampleEvidence = [
  {
    id: "ev-001",
    name: "Interview Transcript - John Smith",
    type: "document",
    case: "Smith vs. Jones",
    uploadedAt: "2025-01-20",
    size: "2.4 MB",
    status: "analyzed",
    confidence: 0.95,
  },
  {
    id: "ev-002",
    name: "CCTV Recording - Jan 15",
    type: "video",
    case: "Smith vs. Jones",
    uploadedAt: "2025-01-18",
    size: "450 MB",
    status: "pending",
    confidence: null,
  },
  {
    id: "ev-003",
    name: "Financial Records Q3 2024",
    type: "document",
    case: "ABC Corp v. XYZ Inc",
    uploadedAt: "2025-01-15",
    size: "15.2 MB",
    status: "analyzed",
    confidence: 0.87,
  },
  {
    id: "ev-004",
    name: "Phone Call Recording - Feb 1",
    type: "audio",
    case: "Johnson Estate Dispute",
    uploadedAt: "2025-01-10",
    size: "8.5 MB",
    status: "analyzed",
    confidence: 0.92,
  },
  {
    id: "ev-005",
    name: "Security Log Analysis",
    type: "document",
    case: "Criminal State v. Davis",
    uploadedAt: "2025-01-08",
    size: "3.7 MB",
    status: "analyzing",
    confidence: null,
  },
]

export default function EvidencePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isUploadOpen, setIsUploadOpen] = useState(false)

  const filteredEvidence = sampleEvidence.filter((ev) => {
    const matchesSearch = ev.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || ev.type === filterType
    return matchesSearch && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText size={16} className="text-blue-400" />
      case "audio":
        return <Volume2 size={16} className="text-green-400" />
      case "video":
        return <Video size={16} className="text-purple-400" />
      default:
        return <File size={16} className="text-gray-400" />
    }
  }

  const getStatusBadge = (status: string, confidence: number | null) => {
    if (status === "analyzed") {
      return (
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-1 rounded bg-green-900/20 text-green-200">
            Analyzed
          </span>
          {confidence && (
            <span className="text-xs text-muted-foreground">
              {Math.round(confidence * 100)}% confidence
            </span>
          )}
        </div>
      )
    } else if (status === "analyzing") {
      return (
        <span className="text-xs font-medium px-2 py-1 rounded bg-blue-900/20 text-blue-200">
          Analyzing...
        </span>
      )
    } else {
      return (
        <span className="text-xs font-medium px-2 py-1 rounded bg-yellow-900/20 text-yellow-200">
          Pending
        </span>
      )
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Evidence</h1>
          <p className="text-muted-foreground">Manage documents, audio, and video evidence</p>
        </div>
        <Button onClick={() => setIsUploadOpen(!isUploadOpen)}>
          <Plus size={18} className="mr-2" />
          Upload Evidence
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 space-y-6">
        {/* Upload Form */}
        {isUploadOpen && (
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle>Upload Evidence</CardTitle>
              <CardDescription>
                Upload documents, audio, or video files for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <p className="text-muted-foreground">
                    Drag and drop files here or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported: PDF, DOCX, MP3, MP4, WAV
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Select Files
                </Button>
                <Button onClick={() => setIsUploadOpen(false)}>Upload</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-64 space-y-2">
            <Label htmlFor="search">Search Evidence</Label>
            <Input
              id="search"
              placeholder="Search by name or case..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="filter">Type</Label>
            <select
              id="filter"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-10 px-3 rounded-lg border border-border bg-slate-950 text-foreground"
            >
              <option value="all">All Types</option>
              <option value="document">Documents</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>

        {/* Evidence List */}
        <div className="grid gap-4">
          {filteredEvidence.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText size={48} className="text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No evidence found</h3>
                <p className="text-muted-foreground text-sm">
                  {searchTerm ? "Try a different search term" : "Upload evidence to get started"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredEvidence.map((evidence) => (
              <Card key={evidence.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-slate-900 rounded-lg mt-1">
                        {getTypeIcon(evidence.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold text-foreground mb-2">
                          {evidence.name}
                        </h3>
                        <div className="space-y-1 text-sm">
                          <p className="text-muted-foreground">
                            Case: <span className="text-foreground">{evidence.case}</span>
                          </p>
                          <p className="text-muted-foreground">
                            Size: <span className="text-foreground">{evidence.size}</span>
                          </p>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock size={14} />
                            <span>Uploaded {evidence.uploadedAt}</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          {getStatusBadge(evidence.status, evidence.confidence)}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download size={16} />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
