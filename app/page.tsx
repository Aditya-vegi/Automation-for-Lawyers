import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Legal Evidence OS
          </h1>
          <p className="text-xl text-muted-foreground text-balance">
            Multi-Modal Legal Evidence Intelligence Platform for Law Firms
          </p>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/auth/sign-in"
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/sign-up"
            className="px-8 py-3 border border-border hover:border-primary text-foreground rounded-lg font-medium transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 bg-slate-800/50 border border-border rounded-lg">
            <h3 className="font-semibold text-accent mb-2">Evidence Management</h3>
            <p className="text-sm text-muted-foreground">
              Organize and manage all types of evidence in one platform
            </p>
          </div>
          <div className="p-6 bg-slate-800/50 border border-border rounded-lg">
            <h3 className="font-semibold text-accent mb-2">Legal Intelligence</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered analysis and contradiction detection
            </p>
          </div>
          <div className="p-6 bg-slate-800/50 border border-border rounded-lg">
            <h3 className="font-semibold text-accent mb-2">Secure & Compliant</h3>
            <p className="text-sm text-muted-foreground">
              SOC 2 compliant with full audit trails
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
