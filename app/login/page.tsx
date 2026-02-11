import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import LoginButton from './login-button'

export default async function LoginPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        redirect('/')
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-background text-foreground transition-colors duration-300">

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 dark:bg-blue-600/20" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 dark:bg-purple-600/20" />

            <div className="glass p-8 rounded-2xl w-full max-w-md relative z-10 flex flex-col items-center gap-8 shadow-2xl border border-border bg-card/30">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Smart <span className="text-gradient">Bookmark</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Your premium space for organizing the web.
                    </p>
                </div>

                <div className="w-full space-y-4">
                    <LoginButton />
                </div>

                <div className="text-xs text-center text-muted-foreground">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </div>
            </div>
        </div>
    )
}
