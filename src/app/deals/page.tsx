import { getRecentDeals } from "@/lib/api";
import { PropertyCard } from "@/components/property-card";

export default async function DealsPage() {
    const deals = await getRecentDeals();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-outfit">Recent Property Deals</h1>
                <p className="text-muted-foreground">
                    Latest property transactions and listings in Hobart.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {deals.map((property) => (
                    <PropertyCard key={property.id} property={property} featured />
                ))}
            </div>
        </div>
    );
}
