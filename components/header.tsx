import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { ModeToggle } from './mode-toggle'

import { signOutAction } from '@/app/actions'

export default async function Header() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl tracking-tight">
                    Smart Bookmark
                </Link>

                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="hidden sm:block text-sm text-muted-foreground">
                                {user.email}
                            </div>
                            <ModeToggle />
                            <form action={signOutAction}>
                                <button
                                    className="p-2 hover:bg-accent hover:text-accent-foreground rounded-full transition-colors text-muted-foreground"
                                    title="Sign out"
                                >
                                    <LogOut size={20} />
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <ModeToggle />
                            <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
