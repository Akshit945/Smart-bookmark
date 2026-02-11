import Link from 'next/link'
import { ArrowRight, Bookmark, Layers, Search } from 'lucide-react'
import Header from '@/components/header'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">

                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                <div className="relative z-10 max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="inline-flex items-center justify-center p-2 px-4 rounded-full bg-secondary text-sm font-medium mb-4">
                        <span className="flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
                            </span>
                            v2.0 Now Available
                        </span>
                    </div>

                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter">
                        Organize your web. <br />
                        <span className="text-muted-foreground">In strict monochrome.</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A minimalist, distraction-free bookmark manager. Real-time sync, folders, and search. Designed for focus.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="/login"
                            className="h-12 px-8 rounded-full bg-foreground text-background font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
                        >
                            Get Started <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/dashboard"
                            className="h-12 px-8 rounded-full border border-input bg-background hover:bg-accent hover:text-accent-foreground font-medium flex items-center justify-center transition-colors"
                        >
                            Log In
                        </Link>
                    </div>

                    <div className="pt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
                        <FeatureCard
                            icon={<Bookmark className="w-6 h-6" />}
                            title="Smart Bookmarks"
                            description="Save links instantly with auto-fetched metadata and favicons."
                        />
                        <FeatureCard
                            icon={<Layers className="w-6 h-6" />}
                            title="Organized Folders"
                            description="Group your content into custom playlists and folders."
                        />
                        <FeatureCard
                            icon={<Search className="w-6 h-6" />}
                            title="Instant Search"
                            description="Find what you need in milliseconds with fuzzy search."
                        />
                    </div>
                </div>
            </main>

            <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
                © {new Date().getFullYear()} Smart Bookmark. Minimalist by design.
            </footer>
        </div>
    )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow">
            <div className="mb-4 text-foreground">{icon}</div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
        </div>
    )
}
