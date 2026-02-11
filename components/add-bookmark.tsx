'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import { Plus, Loader2, X } from 'lucide-react'

export default function AddBookmark() {
    const [isOpen, setIsOpen] = useState(false)
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)


        let formattedUrl = url
        if (!/^https?:\/\//i.test(url)) {
            formattedUrl = 'https://' + url
        }

        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            setError("You must be logged in")
            setIsLoading(false)
            return
        }

        const { error } = await supabase.from('bookmarks').insert({
            title,
            url: formattedUrl,
            user_id: user.id
        })

        if (error) {
            setError(error.message)
        } else {
            setIsOpen(false)
            setUrl('')
            setTitle('')
        }
        setIsLoading(false)
    }

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 bg-foreground text-background hover:opacity-90 rounded-full p-4 shadow-lg transition-all hover:scale-105 active:scale-95 z-40"
            >
                <Plus className="w-6 h-6" />
            </button>
        )
    }

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass w-full max-w-md p-6 rounded-2xl relative animate-in fade-in zoom-in duration-200 border border-border bg-card/50">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold mb-6">Add New Bookmark</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-muted-foreground mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., My Portfolio"
                            className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-all text-foreground"
                        />
                    </div>

                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-muted-foreground mb-1">
                            URL
                        </label>
                        <input
                            id="url"
                            type="text"
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="e.g., portfolio.com"
                            className="w-full bg-background border border-input rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-all text-foreground"
                        />
                    </div>



                    {error && (
                        <div className="text-destructive text-sm bg-destructive/10 p-2 rounded-lg">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-foreground text-background hover:opacity-90 font-medium py-2 rounded-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Bookmark'}
                    </button>
                </form>
            </div>
        </div>
    )
}
