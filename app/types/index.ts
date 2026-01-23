export type ParcelStatus = 'matched' | 'mismatch' | 'missing';

export interface GeoJSONGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][];
}

export interface Parcel {
  plot_id: string;
  area_map: number;
  owner_name_map?: string;
  geometry: GeoJSONGeometry;
  // These are added during enrichment
  status?: ParcelStatus;
  owner_name?: string;
  area_record?: number;
}

export interface Record {
  plot_id: string;
  owner_name: string;
  area_record: number;
}

export interface EnrichedParcel extends Parcel {
  status: ParcelStatus;
  owner_name: string;
  area_record?: number;
}
