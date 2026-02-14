"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, BarChart3, Clock, AlertCircle } from "lucide-react"

const stats = [
  {
    title: "Active Cases",
    value: "12",
    description: "Cases in progress",
    icon: FileText,
    color: "text-blue-400",
  },
  {
    title: "Evidence Items",
    value: "248",
    description: "Total evidence collected",
    icon: BarChart3,
    color: "text-amber-400",
  },
  {
    title: "Pending Analysis",
    value: "8",
    description: "Awaiting AI analysis",
    icon: Clock,
    color: "text-orange-400",
  },
  {
    title: "Contradictions Found",
    value: "3",
    description: "Requires review",
    icon: AlertCircle,
    color: "text-red-400",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the Legal Evidence OS</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="hover:border-primary transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`${stat.color} h-4 w-4`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText size={16} className="mr-2" />
                Create New Case
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 size={16} className="mr-2" />
                Upload Evidence
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock size={16} className="mr-2" />
                View Analysis Queue
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest changes and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Case "Smith vs. Jones" updated</p>
                <p className="text-xs mt-1">2 hours ago</p>
              </div>
              <div className="text-sm text-muted-foreground border-t border-border pt-3">
                <p className="font-medium text-foreground">3 evidence items analyzed</p>
                <p className="text-xs mt-1">4 hours ago</p>
              </div>
              <div className="text-sm text-muted-foreground border-t border-border pt-3">
                <p className="font-medium text-foreground">Precedent search completed</p>
                <p className="text-xs mt-1">1 day ago</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documentation */}
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Learn how to use the Legal Evidence OS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              The Legal Evidence OS helps law firms manage and analyze complex evidence across multiple formats.
              Start by creating a case, then upload evidence items for analysis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-slate-900 border border-border">
                <h4 className="font-medium text-sm text-foreground mb-1">Cases</h4>
                <p className="text-xs text-muted-foreground">Organize your legal matters and evidence by case</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-border">
                <h4 className="font-medium text-sm text-foreground mb-1">Evidence</h4>
                <p className="text-xs text-muted-foreground">Upload and manage documents, audio, and video</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-border">
                <h4 className="font-medium text-sm text-foreground mb-1">Analysis</h4>
                <p className="text-xs text-muted-foreground">AI-powered insights and contradiction detection</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
