import { getRecentDeals } from "@/lib/api";
import MapboxMap from "@/components/MapboxMap";

export default async function MapPage() {
    // Loading all recent deals to populate map
    const properties = await getRecentDeals();

    return (
        <div className="space-y-4 h-[calc(100vh-140px)]">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-outfit">Property Map</h1>
                    <p className="text-muted-foreground">Heatmap of property values in Hobart</p>
                </div>
            </div>
            <MapboxMap properties={properties} />
        </div>
    );
}
