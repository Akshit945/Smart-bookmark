'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Bookmark } from '@/types/custom'
import { Trash2, ExternalLink, Loader2, Globe, Heart } from 'lucide-react'

export default function BookmarkList({ bookmarks }: { bookmarks: Bookmark[] }) {
    const supabase = createClient()
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [togglingId, setTogglingId] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        setDeletingId(id)
        await supabase.from('bookmarks').delete().eq('id', id)
        setDeletingId(null)
    }

    const handleToggleLike = async (bookmark: Bookmark) => {
        setTogglingId(bookmark.id)
        const { error } = await supabase
            .from('bookmarks')
            .update({ is_liked: !bookmark.is_liked })
            .eq('id', bookmark.id)

        if (error) {
            console.error(error)
        }
        setTogglingId(null)
    }


    const getFaviconUrl = (url: string) => {
        try {
            const hostname = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
        } catch {
            return null;
        }
    }

    if (bookmarks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                    <Globe className="w-8 h-8 opacity-50" />
                </div>
                <p>No bookmarks found.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {bookmarks.map((bookmark) => (
                <div
                    key={bookmark.id}
                    className="bg-card text-card-foreground border border-border p-4 rounded-xl group hover:border-primary/50 transition-all duration-300 relative shadow-sm hover:shadow-md"
                >
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1 min-w-0 flex items-center gap-3">
                            {getFaviconUrl(bookmark.url) ? (
                                <img
                                    src={getFaviconUrl(bookmark.url)!}
                                    alt=""
                                    className="w-8 h-8 rounded-md bg-muted p-1 object-contain"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            ) : (
                                <Globe className="w-8 h-8 rounded-md bg-muted p-1 opacity-50" />
                            )}
                            <h3 className="font-semibold truncate" title={bookmark.title}>
                                {bookmark.title}
                            </h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => handleToggleLike(bookmark)}
                                disabled={togglingId === bookmark.id}
                                className={`text-muted-foreground hover:text-red-500 transition-colors p-1 ${bookmark.is_liked ? 'text-red-500' : ''}`}
                                title={bookmark.is_liked ? "Unlike" : "Like"}
                            >
                                <Heart className={`w-4 h-4 ${bookmark.is_liked ? 'fill-current' : ''}`} />
                            </button>
                            <button
                                onClick={() => handleDelete(bookmark.id)}
                                disabled={deletingId === bookmark.id}
                                className="text-muted-foreground hover:text-destructive transition-colors p-1 opacity-100 sm:opacity-0 group-hover:opacity-100"
                                title="Delete bookmark"
                            >
                                {deletingId === bookmark.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <a
                        href={bookmark.url.startsWith('http') ? bookmark.url : `https://${bookmark.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary truncate block transition-colors flex items-center gap-1 mt-2"
                    >
                        <ExternalLink className="w-3 h-3" />
                        {bookmark.url}
                    </a>
                </div>
            ))}
        </div>
    )
}
