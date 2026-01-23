'use client';

import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Parcel } from '../types';

interface DashboardProps {
  parcels: Parcel[];
  selectedParcel: Parcel | undefined;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectPlot: (plotId: string) => void;
}

export function Dashboard({
  parcels,
  selectedParcel,
  searchQuery,
  onSearchChange,
  onSelectPlot,
}: DashboardProps) {
  // Get status summary
  const statusSummary = {
    matched: parcels.filter((p) => p.status === 'matched').length,
    mismatch: parcels.filter((p) => p.status === 'mismatch').length,
    missing: parcels.filter((p) => p.status === 'missing').length,
  };

  // Filter parcels based on search query
  const filteredParcels = searchQuery
    ? parcels.filter((p) =>
        p.plot_id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : parcels;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'matched':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'mismatch':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'missing':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'matched':
        return 'Matched';
      case 'mismatch':
        return 'Area Mismatch';
      case 'missing':
        return 'Missing Record';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Search Section */}
      <Card className="p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Search Plot</h2>
        <Input
          placeholder="Enter plot ID (e.g., P001)"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="text-sm"
        />
      </Card>

      {/* Summary Statistics */}
      <Card className="p-4">
        <h2 className="text-sm font-semibold text-foreground mb-3">Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Total Parcels:</span>
            <span className="text-sm font-semibold">{parcels.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Matched:</span>
            <Badge className="bg-green-100 text-green-800 border border-green-300 hover:bg-green-200">
              {statusSummary.matched}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Area Mismatch:</span>
            <Badge className="bg-red-100 text-red-800 border border-red-300 hover:bg-red-200">
              {statusSummary.mismatch}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Missing Record:</span>
            <Badge className="bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200">
              {statusSummary.missing}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Selected Parcel Details */}
      {selectedParcel ? (
        <Card className="p-4 flex-1 overflow-y-auto">
          <h2 className="text-sm font-semibold text-foreground mb-3">Plot Details</h2>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground font-medium">Plot ID</div>
              <div className="text-sm font-semibold text-foreground">
                {selectedParcel.plot_id}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Owner</div>
              <div className="text-sm text-foreground">
                {selectedParcel.owner_name || 'Unknown'}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">
                Area (Map)
              </div>
              <div className="text-sm text-foreground">
                {selectedParcel.area_map} sq.km
              </div>
            </div>
            {selectedParcel.area_record !== undefined && (
              <>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Area (Record)
                  </div>
                  <div className="text-sm text-foreground">
                    {selectedParcel.area_record} sq.km
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium">
                    Difference
                  </div>
                  <div className="text-sm text-foreground">
                    {Math.abs(selectedParcel.area_map - selectedParcel.area_record).toFixed(3)} sq.km (
                    {(
                      (Math.abs(
                        selectedParcel.area_map - selectedParcel.area_record
                      ) /
                        selectedParcel.area_record) *
                      100
                    ).toFixed(2)}
                    %)
                  </div>
                </div>
              </>
            )}
            <div>
              <div className="text-xs text-muted-foreground font-medium mb-2">
                Status
              </div>
              <Badge className={`${getStatusColor(selectedParcel.status)} text-xs`}>
                {getStatusLabel(selectedParcel.status)}
              </Badge>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-4 flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {filteredParcels.length > 0
                ? 'Click on a plot to view details'
                : 'No plots found'}
            </p>
          </div>
        </Card>
      )}

      {/* Plot List */}
      <Card className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-sm font-semibold text-foreground mb-3">All Plots</h2>
        <div className="space-y-2">
          {filteredParcels.map((parcel) => (
            <button
              key={parcel.plot_id}
              onClick={() => onSelectPlot(parcel.plot_id)}
              className={`w-full text-left p-2 rounded border transition-colors text-xs ${
                selectedParcel?.plot_id === parcel.plot_id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{parcel.plot_id}</span>
                <Badge
                  className={`text-xs ${getStatusColor(parcel.status)}`}
                  variant="outline"
                >
                  {parcel.status === 'matched' ? '✓' : parcel.status === 'mismatch' ? '⚠' : '✗'}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                {parcel.owner_name || 'Unknown'}
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
