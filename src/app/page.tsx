import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { SectionHero } from './landing-page/section-hero'

export default function Home() {
    return (
        <main className='flex flex-col items-center justify-between pt-10 gap-5 '>
            <SectionHero />
            <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex'>
                <div className='space-y-2'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href='/dashboard'>Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Dashboard Detail</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className='w-lg bg-slate-100 min-h-10 p-4 rounded-md border border-slate-400 border-dashed '>
                <div>Container</div>
                <Button>Button</Button>
            </div>
        </main>
    )
}
