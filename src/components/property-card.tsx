import { Property } from "@/lib/api";
import { GlassCard } from "./ui/glass-card";
import { Bed, Bath, Car, Maximize } from "lucide-react";
import Image from "next/image";

interface PropertyCardProps {
    property: Property;
    featured?: boolean;
}

export function PropertyCard({ property, featured = false }: PropertyCardProps) {
    return (
        <GlassCard className="overflow-hidden p-0 h-full flex flex-col group hover:border-primary/50 transition-all duration-300 dark:hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)]">
            <div className="relative h-48 w-full overflow-hidden">
                <Image
                    src={property.imageUrl}
                    alt={`Property at ${property.address.street}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                <div className="absolute top-2 right-2 bg-green-500/20 backdrop-blur-md border border-green-500/30 text-green-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    {property.saleHistory[0].type}
                </div>

                <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-lg font-bold drop-shadow-md">${property.valuation.current.toLocaleString()}</p>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1 gap-3">
                <div>
                    <h3 className="text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                        {property.address.street}
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium">
                        {property.address.suburb}, {property.address.state} {property.address.postcode}
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground py-2 border-y border-border/50">
                    <div className="flex flex-col items-center gap-1">
                        <Bed className="h-4 w-4 text-primary" />
                        <span>{property.features.bedrooms} Bed</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Bath className="h-4 w-4 text-purple-400" />
                        <span>{property.features.bathrooms} Bath</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Car className="h-4 w-4 text-blue-400" />
                        <span>{property.features.parking} Car</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Maximize className="h-4 w-4 text-pink-400" />
                        <span>{property.features.landSize}m²</span>
                    </div>
                </div>

                <div className="mt-auto pt-2 flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">Updated {new Date(property.valuation.lastUpdated).toLocaleDateString()}</span>
                    <span className="text-primary font-bold tracking-wide">VIEW REPORT</span>
                </div>
            </div>
        </GlassCard>
    );
}
