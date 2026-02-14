"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  AlertTriangle,
  TrendingUp,
  Brain,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react"

const contradictionData = [
  { name: "Smith vs. Jones", contradictions: 2, confidence: 95 },
  { name: "Johnson Estate", contradictions: 0, confidence: 87 },
  { name: "ABC Corp v. XYZ", contradictions: 5, confidence: 76 },
  { name: "State v. Davis", contradictions: 3, confidence: 82 },
]

const timelineData = [
  { date: "Jan 1", analyzed: 12, verified: 8, flagged: 2 },
  { date: "Jan 8", analyzed: 28, verified: 22, flagged: 3 },
  { date: "Jan 15", analyzed: 45, verified: 38, flagged: 5 },
  { date: "Jan 22", analyzed: 67, verified: 58, flagged: 7 },
]

const analysisBreakdown = [
  { name: "High Confidence", value: 65, color: "#10b981" },
  { name: "Medium Confidence", value: 25, color: "#f59e0b" },
  { name: "Low Confidence", value: 10, color: "#ef4444" },
]

const insights = [
  {
    type: "contradiction",
    title: "Contradiction Detected",
    description: "Statement in interview conflicts with security log",
    severity: "high",
    case: "ABC Corp v. XYZ Inc",
    timestamp: "2 hours ago",
  },
  {
    type: "pattern",
    title: "Pattern Recognition",
    description: "Recurring testimony pattern across 3 depositions",
    severity: "medium",
    case: "Criminal State v. Davis",
    timestamp: "4 hours ago",
  },
  {
    type: "precedent",
    title: "Precedent Match",
    description: "Similar case outcome found: Johnson v. Smith (2020)",
    severity: "low",
    case: "Smith vs. Jones",
    timestamp: "1 day ago",
  },
]

export default function AnalysisPage() {
  const getIconForInsight = (type: string) => {
    switch (type) {
      case "contradiction":
        return <AlertTriangle className="text-red-400" size={20} />
      case "pattern":
        return <Brain className="text-blue-400" size={20} />
      case "precedent":
        return <Eye className="text-green-400" size={20} />
      default:
        return <CheckCircle className="text-gray-400" size={20} />
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-900/20 text-red-200 border-red-700"
      case "medium":
        return "bg-yellow-900/20 text-yellow-200 border-yellow-700"
      case "low":
        return "bg-green-900/20 text-green-200 border-green-700"
      default:
        return "bg-gray-900/20 text-gray-200 border-gray-700"
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analysis & Insights</h1>
        <p className="text-muted-foreground">
          AI-powered legal reasoning and evidence analysis
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Analyzed</CardTitle>
              <CheckCircle className="text-green-400 h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">248</div>
              <p className="text-xs text-muted-foreground mt-1">Evidence items</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contradictions</CardTitle>
              <AlertTriangle className="text-red-400 h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">12</div>
              <p className="text-xs text-muted-foreground mt-1">Requires review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Confidence</CardTitle>
              <TrendingUp className="text-blue-400 h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">87%</div>
              <p className="text-xs text-muted-foreground mt-1">Analysis quality</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Insights Generated</CardTitle>
              <Brain className="text-purple-400 h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">34</div>
              <p className="text-xs text-muted-foreground mt-1">Actionable findings</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contradiction Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Contradictions by Case</CardTitle>
              <CardDescription>
                Inconsistencies detected in evidence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={contradictionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                    }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                  <Legend />
                  <Bar dataKey="contradictions" fill="#ef4444" name="Contradictions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Analysis Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Analysis Timeline</CardTitle>
              <CardDescription>
                Evidence processing progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                    }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="analyzed"
                    stroke="#2563eb"
                    name="Analyzed"
                  />
                  <Line
                    type="monotone"
                    dataKey="verified"
                    stroke="#10b981"
                    name="Verified"
                  />
                  <Line
                    type="monotone"
                    dataKey="flagged"
                    stroke="#ef4444"
                    name="Flagged"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Confidence Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Confidence Distribution</CardTitle>
              <CardDescription>
                Analysis result quality breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analysisBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analysisBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                    }}
                    labelStyle={{ color: "#f1f5f9" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* AI Insights Queue */}
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>
                Recent AI-generated findings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-80 overflow-y-auto">
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${getSeverityColor(
                    insight.severity
                  )} space-y-2`}
                >
                  <div className="flex items-start gap-3">
                    {getIconForInsight(insight.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-xs text-inherit/80 mt-1">
                        {insight.description}
                      </p>
                      <p className="text-xs mt-2 opacity-75">
                        {insight.case} · {insight.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Legal Reasoning Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Legal Reasoning Engine</CardTitle>
            <CardDescription>
              Machine learning models analyzing case evidence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  Contradiction Detection
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Identifies inconsistencies in witness statements and evidence
                </p>
                <div className="space-y-1 text-xs">
                  <p>
                    <span className="text-foreground font-medium">12</span>{" "}
                    <span className="text-muted-foreground">contradictions found</span>
                  </p>
                  <p>
                    <span className="text-foreground font-medium">95%</span>{" "}
                    <span className="text-muted-foreground">detection accuracy</span>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  Timeline Reconstruction
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Builds coherent timelines from evidence chronology
                </p>
                <div className="space-y-1 text-xs">
                  <p>
                    <span className="text-foreground font-medium">8</span>{" "}
                    <span className="text-muted-foreground">timelines created</span>
                  </p>
                  <p>
                    <span className="text-foreground font-medium">87%</span>{" "}
                    <span className="text-muted-foreground">coverage</span>
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-lg border border-border">
                <h4 className="font-semibold text-foreground mb-2">
                  Risk Scoring
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Evaluates case strength and vulnerability factors
                </p>
                <div className="space-y-1 text-xs">
                  <p>
                    <span className="text-foreground font-medium">34</span>{" "}
                    <span className="text-muted-foreground">cases evaluated</span>
                  </p>
                  <p>
                    <span className="text-foreground font-medium">92%</span>{" "}
                    <span className="text-muted-foreground">consistency</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
