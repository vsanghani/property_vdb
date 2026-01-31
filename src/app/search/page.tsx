import { searchProperties } from "@/lib/api";
import { PropertyCard } from "@/components/property-card";
import { SearchInput } from "@/components/search-input";
import { ExportButton } from "@/components/export-button";

interface SearchPageProps {
    searchParams: {
        q?: string;
    };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = searchParams.q || "";
    const results = await searchProperties(query);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-outfit">Property Valuation</h1>
                    <p className="text-muted-foreground">
                        {results.length} results found for "{query}"
                    </p>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row gap-4 items-center">
                    <ExportButton data={results} />
                    <SearchInput className="max-w-md" />
                </div>
            </div>

            {results.length === 0 ? (
                <div className="text-center py-20 bg-muted/20 rounded-xl">
                    <p className="text-xl text-muted-foreground">No properties found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((property) => (
                        <PropertyCard key={property.id} property={property} featured />
                    ))}
                </div>
            )}
        </div>
    );
}
