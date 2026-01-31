"use client";

import { useEffect, useState } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { Property } from "@/lib/api";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface MapboxMapProps {
    properties: Property[];
}

export default function MapboxMap({ properties }: MapboxMapProps) {
    const [mounted, setMounted] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
            <Map
                initialViewState={{
                    longitude: 147.3272,
                    latitude: -42.8821,
                    zoom: 13,
                    pitch: 45, // 3D effect
                }}
                style={{ width: "100%", height: "100%" }}
                // Use CartoDB Dark Matter GL style - Free, Open Source, Premium Dark Look
                mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            >
                <NavigationControl position="top-right" />
                <FullscreenControl position="top-right" />

                {properties.map((property) => (
                    <Marker
                        key={property.id}
                        longitude={property.coordinates.lng}
                        latitude={property.coordinates.lat}
                        anchor="bottom"
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            setSelectedProperty(property);
                        }}
                    >
                        <div className="cursor-pointer group relative">
                            <div className="absolute -inset-2 bg-primary/50 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            <MapPin className="h-8 w-8 text-primary drop-shadow-[0_0_10px_rgba(var(--primary),0.8)] transform transition-transform hover:scale-110" />
                        </div>
                    </Marker>
                ))}

                {selectedProperty && (
                    <Popup
                        longitude={selectedProperty.coordinates.lng}
                        latitude={selectedProperty.coordinates.lat}
                        anchor="top"
                        onClose={() => setSelectedProperty(null)}
                        closeButton={false}
                        className="glass-popup"
                        offset={20}
                    >
                        <div className="glass-panel p-4 rounded-xl min-w-[240px] text-left">
                            <h3 className="font-bold text-lg text-foreground mb-1">{selectedProperty.address.street}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{selectedProperty.address.suburb}</p>

                            <div className="flex items-center justify-between mb-3">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Current Value</span>
                                    <span className="font-bold text-primary text-lg">
                                        ${selectedProperty.valuation.current.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <Link
                                href={`/search?q=${encodeURIComponent(selectedProperty.address.street)}`}
                                className="block w-full text-center py-2 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-colors border border-primary/20"
                            >
                                View Analytics
                            </Link>
                        </div>
                    </Popup>
                )}
            </Map>

            {/* Overlay gradient for seamless blending if needed */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
    );
}
