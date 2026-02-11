import { createClient } from '@/utils/supabase/server'
import Header from '@/components/header'
import DashboardClient from './dashboard-client'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-300">

            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 opacity-50">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />
                <DashboardClient user={user} />
            </div>
        </div>
    )
}
