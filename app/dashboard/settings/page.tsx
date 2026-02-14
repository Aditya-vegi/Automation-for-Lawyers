"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell, Lock, User, Zap, FileText } from "lucide-react"

export default function SettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-8 py-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Configure your Legal Evidence OS preferences</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-8 space-y-6 max-w-4xl">
        {/* Success Message */}
        {saveSuccess && (
          <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-200">
            Settings saved successfully
          </div>
        )}

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} />
              Profile Settings
            </CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="firm">Law Firm</Label>
              <Input id="firm" defaultValue="Doe & Associates" />
            </div>
            <Button onClick={handleSave}>Save Profile</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock size={20} />
              Security
            </CardTitle>
            <CardDescription>Manage password and security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" />
            </div>
            <div className="pt-2">
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-border mb-4">
                <span className="text-sm text-foreground">Two-Factor Authentication</span>
                <span className="text-xs px-2 py-1 rounded bg-green-900/20 text-green-200">
                  Enabled
                </span>
              </div>
            </div>
            <Button onClick={handleSave}>Update Password</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={20} />
              Notifications
            </CardTitle>
            <CardDescription>Configure alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                <span className="text-sm text-foreground">Analysis Complete</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                <span className="text-sm text-foreground">Contradictions Found</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                <span className="text-sm text-foreground">New Precedent Match</span>
                <input type="checkbox" className="w-4 h-4 rounded" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                <span className="text-sm text-foreground">Case Review Reminder</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              </div>
            </div>
            <Button onClick={handleSave}>Save Preferences</Button>
          </CardContent>
        </Card>

        {/* Analysis Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap size={20} />
              Analysis Configuration
            </CardTitle>
            <CardDescription>Configure AI analysis parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="confidence">Minimum Confidence Threshold</Label>
              <select
                id="confidence"
                className="w-full h-10 px-3 rounded-lg border border-border bg-slate-950 text-foreground"
              >
                <option>High (80%+)</option>
                <option selected>Medium (60-80%)</option>
                <option>Low (40-60%)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="autoAnalysis">
                <input
                  id="autoAnalysis"
                  type="checkbox"
                  defaultChecked
                  className="mr-2 w-4 h-4 rounded"
                />
                Auto-analyze uploaded evidence
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timelineAuto">
                <input
                  id="timelineAuto"
                  type="checkbox"
                  defaultChecked
                  className="mr-2 w-4 h-4 rounded"
                />
                Automatically create timelines
              </Label>
            </div>
            <Button onClick={handleSave}>Save Settings</Button>
          </CardContent>
        </Card>

        {/* Compliance & Legal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText size={20} />
              Compliance
            </CardTitle>
            <CardDescription>Legal compliance and audit information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <p className="text-foreground">
                <span className="font-semibold">Compliance Status:</span>{" "}
                <span className="text-green-400">SOC 2 Certified</span>
              </p>
              <p className="text-foreground">
                <span className="font-semibold">Data Encryption:</span> AES-256
              </p>
              <p className="text-foreground">
                <span className="font-semibold">Audit Trail:</span> Enabled
              </p>
              <p className="text-muted-foreground text-xs mt-4">
                Last audit: January 15, 2025
              </p>
            </div>
            <Button variant="outline" className="w-full">
              View Audit Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
