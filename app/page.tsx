'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { MapContainer } from './components/MapContainer';
import { Dashboard } from './components/Dashboard';
import { sampleParcels, sampleRecords } from './data/sampleData';
import type { Parcel, Record as RecordType, ParcelStatus } from './types';

// Calculate parcel status based on records
function calculateParcelStatus(parcel: Parcel, records: RecordType[]): ParcelStatus {
  const record = records.find((r) => r.plot_id === parcel.plot_id);

  if (!record) {
    return 'missing';
  }

  const areaDifference = Math.abs(
    (Math.abs(parcel.area_map - record.area_record) / record.area_record) * 100
  );

  if (areaDifference > 5) {
    return 'mismatch';
  }

  return 'matched';
}

// Enrich parcels with status and record information
function enrichParcels(parcels: Parcel[], records: RecordType[]) {
  return parcels.map((parcel) => {
    const status = calculateParcelStatus(parcel, records);
    const record = records.find((r) => r.plot_id === parcel.plot_id);

    return {
      ...parcel,
      status,
      owner_name: record?.owner_name || parcel.owner_name_map || 'Unknown',
      area_record: record?.area_record,
    };
  });
}

export default function Home() {
  const enrichedParcels = useMemo(
    () => enrichParcels(sampleParcels, sampleRecords),
    []
  );

  const [selectedPlotId, setSelectedPlotId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedParcel = selectedPlotId
    ? enrichedParcels.find((p) => p.plot_id === selectedPlotId)
    : null;

  return (
    <main className="w-full h-screen flex flex-col bg-background">
      <header className="bg-card border-b border-border p-4">
        <h1 className="text-2xl font-bold text-foreground">Land Record Digitization Assistant</h1>
        <p className="text-sm text-muted-foreground">Village-scale land parcel mapping and verification</p>
      </header>

      <div className="flex flex-1 gap-4 p-4 overflow-hidden">
        {/* Map Section */}
        <div className="flex-1 rounded-lg border border-border overflow-hidden bg-card">
          <MapContainer
            parcels={enrichedParcels}
            selectedPlotId={selectedPlotId}
            onSelectPlot={setSelectedPlotId}
            searchQuery={searchQuery}
          />
        </div>

        {/* Dashboard Section */}
        <div className="w-80 flex flex-col gap-4">
          <Dashboard
            parcels={enrichedParcels}
            selectedParcel={selectedParcel}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectPlot={setSelectedPlotId}
          />
        </div>
      </div>
    </main>
  );
}
