"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, Plus, Trash2, Clock, AlertCircle } from "lucide-react"

// Sample data
const sampleCases = [
  {
    id: "case-001",
    name: "Smith vs. Jones",
    status: "active",
    createdAt: "2025-01-15",
    evidence: 42,
    contradictions: 2,
    nextReview: "2025-02-15",
  },
  {
    id: "case-002",
    name: "Johnson Estate Dispute",
    status: "active",
    createdAt: "2025-01-10",
    evidence: 28,
    contradictions: 0,
    nextReview: "2025-02-20",
  },
  {
    id: "case-003",
    name: "ABC Corp v. XYZ Inc",
    status: "in-progress",
    createdAt: "2024-12-20",
    evidence: 156,
    contradictions: 5,
    nextReview: "2025-02-10",
  },
  {
    id: "case-004",
    name: "Criminal State v. Davis",
    status: "pending",
    createdAt: "2024-11-30",
    evidence: 89,
    contradictions: 3,
    nextReview: "2025-02-28",
  },
]

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newCaseName, setNewCaseName] = useState("")

  const filteredCases = sampleCases.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault()
    // This will be connected to API later
    setNewCaseName("")
    setIsCreateOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-900/20 text-green-200 border-green-700"
      case "in-progress":
        return "bg-blue-900/20 text-blue-200 border-blue-700"
      case "pending":
        return "bg-yellow-900/20 text-yellow-200 border-yellow-700"
      default:
        return "bg-gray-900/20 text-gray-200 border-gray-700"
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Cases</h1>
          <p className="text-muted-foreground">Manage your legal cases and evidence</p>
        </div>
        <Button onClick={() => setIsCreateOpen(!isCreateOpen)}>
          <Plus size={18} className="mr-2" />
          New Case
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 space-y-6">
        {/* Create Case Form */}
        {isCreateOpen && (
          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <CardTitle>Create New Case</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCase} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="caseName">Case Name</Label>
                  <Input
                    id="caseName"
                    placeholder="Enter case name (e.g., Smith vs. Jones)"
                    value={newCaseName}
                    onChange={(e) => setNewCaseName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Create Case</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Cases</Label>
          <Input
            id="search"
            placeholder="Search by case name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Cases List */}
        <div className="grid gap-4">
          {filteredCases.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText size={48} className="text-muted-foreground mb-4" />
                <h3 className="font-semibold text-foreground mb-2">No cases found</h3>
                <p className="text-muted-foreground text-sm">
                  {searchTerm ? "Try a different search term" : "Create a new case to get started"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredCases.map((caseItem) => (
              <Card
                key={caseItem.id}
                className="hover:border-primary/50 transition-colors cursor-pointer hover:bg-slate-900/30"
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-foreground">
                          {caseItem.name}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                            caseItem.status
                          )}`}
                        >
                          {caseItem.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Evidence Items</p>
                          <p className="text-lg font-semibold text-foreground">
                            {caseItem.evidence}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Contradictions</p>
                          <div className="flex items-center gap-1">
                            {caseItem.contradictions > 0 && (
                              <AlertCircle size={18} className="text-red-400" />
                            )}
                            <p className="text-lg font-semibold text-foreground">
                              {caseItem.contradictions}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Created</p>
                          <p className="text-sm text-foreground">{caseItem.createdAt}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Next Review</p>
                          <div className="flex items-center gap-1">
                            <Clock size={16} className="text-accent" />
                            <p className="text-sm text-foreground">{caseItem.nextReview}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
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
