'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Parcel } from '../types';

interface MapContainerProps {
  parcels: Parcel[];
  selectedPlotId: string | null;
  onSelectPlot: (plotId: string) => void;
  searchQuery: string;
}

export function MapContainer({
  parcels,
  selectedPlotId,
  onSelectPlot,
  searchQuery,
}: MapContainerProps) {
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<Record<string, L.GeoJSON>>({});

  // Function to get color based on parcel status
  const getColorForStatus = (status?: string) => {
    switch (status) {
      case 'matched':
        return '#22c55e'; // Green
      case 'mismatch':
        return '#ef4444'; // Red
      case 'missing':
        return '#a1a5a9'; // Grey
      default:
        return '#3b82f6'; // Blue
    }
  };

  // Function to get styling for a parcel
  const getFeatureStyle = (feature: any, plotId: string) => {
    const isSelected = plotId === selectedPlotId;
    const color = getColorForStatus(
      parcels.find((p) => p.plot_id === plotId)?.status
    );

    return {
      fillColor: color,
      weight: isSelected ? 3 : 2,
      opacity: 1,
      color: isSelected ? '#000' : 'rgba(0,0,0,0.5)',
      dashArray: isSelected ? '5, 5' : '',
      fillOpacity: isSelected ? 0.8 : 0.6,
    };
  };

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      const map = L.map('map').setView([28.52, 77.515], 15);

      // Add OpenStreetMap layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
    }

    // Clear existing layers
    Object.values(layersRef.current).forEach((layer) => {
      mapRef.current?.removeLayer(layer);
    });
    layersRef.current = {};

    // Add parcel layers
    parcels.forEach((parcel) => {
      const geoJsonLayer = L.geoJSON(
        {
          type: 'Feature',
          geometry: parcel.geometry,
          properties: { plot_id: parcel.plot_id },
        },
        {
          style: () => getFeatureStyle(null, parcel.plot_id),
          onEachFeature: (feature, layer) => {
            // Create popup content
            const popup = L.popup({
              className: 'custom-popup',
              closeButton: true,
            }).setContent(
              `<div class="text-sm font-semibold">${parcel.plot_id}</div>
               <div class="text-xs text-gray-600">Area (Map): ${parcel.area_map} sq.km</div>
               <div class="text-xs text-gray-600">Owner: ${parcel.owner_name || 'Unknown'}</div>
               <div class="text-xs text-gray-600">Status: ${parcel.status || 'Unknown'}</div>`
            );

            layer.bindPopup(popup);
            layer.on('click', () => {
              onSelectPlot(parcel.plot_id);
            });
          },
        }
      );

      geoJsonLayer.addTo(mapRef.current!);
      layersRef.current[parcel.plot_id] = geoJsonLayer;
    });

    // If a plot is selected, zoom to it
    if (selectedPlotId && layersRef.current[selectedPlotId]) {
      const bounds = (layersRef.current[selectedPlotId] as any).getBounds();
      mapRef.current?.fitBounds(bounds, { padding: [50, 50] });
    }

    // If search query is present, zoom to the searched plot
    if (searchQuery) {
      const searchedParcel = parcels.find((p) =>
        p.plot_id.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (searchedParcel && layersRef.current[searchedParcel.plot_id]) {
        const bounds = (layersRef.current[searchedParcel.plot_id] as any).getBounds();
        mapRef.current?.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [parcels, selectedPlotId, onSelectPlot, searchQuery]);

  return (
    <div
      id="map"
      style={{ width: '100%', height: '100%', minHeight: '400px' }}
      className="relative"
    />
  );
}
