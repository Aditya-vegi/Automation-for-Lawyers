"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Volume2,
  Video,
  Download,
  Copy,
  Flag,
  MessageSquare,
  Share2,
  Settings,
  SkipBack,
  Play,
  SkipForward,
  Volume,
  Maximize,
} from "lucide-react"

export default function EvidenceViewerPage() {
  const [viewerType] = useState<"document" | "audio" | "video">("document")
  const [highlightedText, setHighlightedText] = useState<string>("")
  const [annotation, setAnnotation] = useState("")

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Evidence Viewer
          </h1>
          <p className="text-sm text-muted-foreground">
            Interview Transcript - John Smith (Case: Smith vs. Jones)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Share2 size={16} className="mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Document Viewer */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText size={20} />
                  Document Content
                </CardTitle>
              </CardHeader>
              <CardContent className="max-h-[600px] overflow-y-auto space-y-4">
                <div className="prose prose-invert max-w-none text-sm space-y-4">
                  <p>
                    <span className="font-semibold text-primary">Q:</span> Please state your name for the record.
                  </p>
                  <p>
                    <span className="font-semibold text-primary">A:</span> My name is John Smith.
                  </p>
                  <p>
                    <span className="font-semibold text-primary">Q:</span> Were you present at 425 Main Street on
                    January 15, 2025?
                  </p>
                  <p className="bg-blue-900/20 border-l-4 border-blue-400 px-4 py-2 rounded">
                    <span className="font-semibold text-blue-200 text-primary">A:</span>{" "}
                    <mark className="bg-yellow-600/30 text-inherit">
                      Yes, I was there around 2:00 PM that afternoon
                    </mark>
                    .
                  </p>
                  <p>
                    <span className="font-semibold text-primary">Q:</span> What was the purpose of your visit?
                  </p>
                  <p className="bg-amber-900/20 border-l-4 border-amber-400 px-4 py-2 rounded">
                    <span className="font-semibold text-amber-200">A:</span>{" "}
                    <mark className="bg-red-600/30 text-inherit">
                      I went to meet with the defendant to discuss the pending contract
                    </mark>
                    .
                  </p>
                  <p>
                    <span className="font-semibold text-primary">Q:</span> How long did you stay?
                  </p>
                  <p>
                    <span className="font-semibold text-primary">A:</span> Approximately 30 minutes.
                  </p>
                  <p>
                    <span className="font-semibold text-primary">Q:</span> Did anything unusual occur during
                    this meeting?
                  </p>
                  <p>
                    <span className="font-semibold text-primary">A:</span> The defendant seemed agitated and
                    reluctant to discuss the terms we had previously agreed upon.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis Highlights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">AI-Detected Highlights</CardTitle>
                <CardDescription>
                  Key statements and potential contradictions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
                  <p className="text-sm text-yellow-200">
                    <span className="font-semibold">Key Statement:</span> Witness placed at location on January
                    15, 2025 at 2:00 PM
                  </p>
                </div>
                <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg">
                  <p className="text-sm text-red-200">
                    <span className="font-semibold">Contradiction Found:</span> CCTV shows 3 people
                    entering at 2:15 PM (not 2:00 PM)
                  </p>
                </div>
                <div className="p-3 bg-blue-900/20 border border-blue-700 rounded-lg">
                  <p className="text-sm text-blue-200">
                    <span className="font-semibold">Context Match:</span> Aligns with financial records showing
                    contract negotiations
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel - Annotations & Tools */}
          <div className="space-y-4">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Flag size={16} className="mr-2" />
                  Flag Evidence
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Copy size={16} className="mr-2" />
                  Copy Text
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare size={16} className="mr-2" />
                  Add Note
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </CardContent>
            </Card>

            {/* Add Annotation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Annotations</CardTitle>
                <CardDescription>Add notes and highlights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <textarea
                  placeholder="Add an annotation..."
                  value={annotation}
                  onChange={(e) => setAnnotation(e.target.value)}
                  className="w-full h-24 px-3 py-2 rounded-lg border border-border bg-slate-950 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="w-full" size="sm">
                  Save Annotation
                </Button>
              </CardContent>
            </Card>

            {/* Related Evidence */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Related Evidence</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full text-left p-2 rounded-lg bg-slate-900 border border-border hover:border-primary transition-colors">
                  <p className="text-sm font-medium text-foreground">CCTV Recording</p>
                  <p className="text-xs text-muted-foreground">Jan 15, 2:15 PM</p>
                </button>
                <button className="w-full text-left p-2 rounded-lg bg-slate-900 border border-border hover:border-primary transition-colors">
                  <p className="text-sm font-medium text-foreground">Financial Records</p>
                  <p className="text-xs text-muted-foreground">Contract details</p>
                </button>
                <button className="w-full text-left p-2 rounded-lg bg-slate-900 border border-border hover:border-primary transition-colors">
                  <p className="text-sm font-medium text-foreground">Phone Log Analysis</p>
                  <p className="text-xs text-muted-foreground">Jan 15, calls logged</p>
                </button>
              </CardContent>
            </Card>

            {/* View Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="text-foreground font-medium">Document (PDF)</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Uploaded</p>
                  <p className="text-foreground font-medium">January 18, 2025</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p className="text-foreground font-medium">2.4 MB</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Analysis Status</p>
                  <p className="text-green-400 font-medium">Analyzed (95%)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
