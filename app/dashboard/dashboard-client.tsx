'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState, useCallback } from 'react'
import { Bookmark } from '@/types/custom'
import BookmarkList from '@/components/bookmark-list'
import AddBookmark from '@/components/add-bookmark'
import { Search } from 'lucide-react'
import { User } from '@supabase/supabase-js'

export default function DashboardClient({ user }: { user: User }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(true)


    const [supabase] = useState(() => createClient())

    const fetchBookmarks = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching bookmarks:', error)
                setBookmarks([])
            }

            if (data) {
                setBookmarks(data)
            }
        } catch (err) {
            console.error('Unexpected error:', err)
            setBookmarks([])
        } finally {
            setIsLoading(false)
        }
    }, [supabase, user.id])

    useEffect(() => {
        fetchBookmarks()

        const channel = supabase
            .channel('realtime bookmarks dashboard')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'bookmarks',
            }, (payload) => {
                console.log('Realtime Event received:', payload)
                fetchBookmarks()
            })
            .subscribe((status) => {
                console.log('Realtime Subscription Status:', status)
            })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, fetchBookmarks])

    const [filter, setFilter] = useState<'all' | 'favorites'>('all')


    const filteredBookmarks = bookmarks.filter(bookmark => {
        const matchesSearch = bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            bookmark.url.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesType = filter === 'all' ? true : bookmark.is_liked

        return matchesSearch && matchesType
    })

    return (
        <>
            <main className="max-w-6xl mx-auto w-full px-4 py-8 pb-32 flex-1">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Bookmarks</h1>
                        <p className="text-muted-foreground">Manage your collection.</p>
                    </div>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search bookmarks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-card border border-input focus:border-foreground focus:ring-1 focus:ring-foreground outline-none transition-all placeholder:text-muted-foreground text-foreground"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-4 mb-6 border-b border-border">
                    <button
                        onClick={() => setFilter('all')}
                        className={`pb-2 px-1 font-medium text-sm transition-colors relative ${filter === 'all' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        All Bookmarks
                        {filter === 'all' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground rounded-full" />}
                    </button>
                    <button
                        onClick={() => setFilter('favorites')}
                        className={`pb-2 px-1 font-medium text-sm transition-colors relative ${filter === 'favorites' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        Favorites
                        {filter === 'favorites' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground rounded-full" />}
                    </button>
                </div>

                <BookmarkList bookmarks={filteredBookmarks} />

                {isLoading && (
                    <div className="mt-20 flex justify-center">
                        <div className="w-8 h-8 border-4 border-muted border-t-foreground rounded-full animate-spin"></div>
                    </div>
                )}
            </main>

            <AddBookmark />
        </>
    )
}
