import { SearchInput } from "@/components/search-input";
import MapboxMap from "@/components/MapboxMap";
import { getRecentDeals } from "@/lib/api";
import { PropertyCard } from "@/components/property-card";
import { ArrowRight, Map as MapIcon, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
    const recentProperties = await getRecentDeals();

    return (
        <div className="flex flex-col gap-12">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center text-center gap-8 py-12 md:py-20 z-10">
                {/* Decorative background glow is handled in layout, but added here for prominence */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-slow" />

                <div className="space-y-4 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-md mb-4 animate-accordion-down">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Live Market Data for Hobart
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight font-outfit">
                        Validating value in <br />
                        <span className="text-gradient">Hobart, Tasmania</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Discover accurate property valuations, past sales history, and market insights powered by real-time local data.
                    </p>
                </div>

                <div className="w-full max-w-2xl mx-auto mt-4 px-4">
                    <SearchInput />
                </div>
            </section>

            {/* Dashboard / Map Section */}
            <section className="grid lg:grid-cols-3 gap-8 w-full max-w-[1400px] mx-auto">
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-bold font-outfit flex items-center gap-2">
                            <MapIcon className="h-6 w-6 text-primary" />
                            Interactive Market Map
                        </h2>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary ring-2 ring-primary/20" /> Low</span>
                            <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500 ring-2 ring-purple-500/20" /> High</span>
                        </div>
                    </div>

                    <Suspense fallback={<div className="h-[600px] w-full bg-muted/20 animate-pulse rounded-2xl glass-panel" />}>
                        <MapboxMap properties={recentProperties} />
                    </Suspense>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-2xl font-bold font-outfit flex items-center gap-2">
                            <TrendingUp className="h-6 w-6 text-purple-500" />
                            Recent Valuations
                        </h2>
                        <Link href="/search" className="text-sm text-primary hover:underline flex items-center gap-1">
                            View All <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-4 h-[600px] overflow-y-auto pr-2 scrollbar-hide pb-4">
                        {recentProperties.slice(0, 4).map((prop) => (
                            <div key={prop.id} className="h-[320px]">
                                <PropertyCard property={prop} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto py-12">
                <FeatureCard
                    icon={<TrendingUp className="h-8 w-8 text-primary" />}
                    title="Real-Time Trends"
                    description="Live analysis of property values across Hobart's suburbs updated daily."
                />
                <FeatureCard
                    icon={<MapIcon className="h-8 w-8 text-purple-500" />}
                    title="Heatmap Analytics"
                    description="Visualize property prices and investor hotspots on our detailed heatmap."
                />
                <FeatureCard
                    icon={<ShieldCheck className="h-8 w-8 text-pink-500" />}
                    title="Verified Data"
                    description="Sourced directly from reliable government databases and recent sales records."
                />
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="glass-card p-6 flex flex-col items-center text-center gap-4 group cursor-default">
            <div className="p-4 bg-primary/5 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                {icon}
            </div>
            <h3 className="text-lg font-bold font-outfit">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
    );
}
