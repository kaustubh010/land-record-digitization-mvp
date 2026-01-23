import type { Parcel, Record } from '../types';

// Sample GeoJSON parcels representing village land plots with irregular polygon shapes
export const sampleParcels: Parcel[] = [
  {
    plot_id: 'P001',
    area_map: 0.85,
    owner_name_map: 'Rajesh Kumar',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.5, 28.5],
          [77.51, 28.5],
          [77.512, 28.502],
          [77.51, 28.505],
          [77.5, 28.505],
          [77.498, 28.502],
          [77.5, 28.5],
        ],
      ],
    },
  },
  {
    plot_id: 'P002',
    area_map: 1.2,
    owner_name_map: 'Priya Singh',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.52, 28.5],
          [77.535, 28.5],
          [77.535, 28.508],
          [77.52, 28.508],
          [77.52, 28.5],
        ],
      ],
    },
  },
  {
    plot_id: 'P003',
    area_map: 0.95,
    owner_name_map: 'Amit Patel',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.5, 28.515],
          [77.515, 28.515],
          [77.518, 28.525],
          [77.5, 28.525],
          [77.5, 28.515],
        ],
      ],
    },
  },
  {
    plot_id: 'P004',
    area_map: 1.1,
    owner_name_map: undefined, // This plot has no owner record
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.52, 28.515],
          [77.54, 28.515],
          [77.543, 28.528],
          [77.52, 28.528],
          [77.52, 28.515],
        ],
      ],
    },
  },
  {
    plot_id: 'P005',
    area_map: 0.75,
    owner_name_map: 'Deepak Verma',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.5, 28.53],
          [77.512, 28.53],
          [77.515, 28.54],
          [77.5, 28.541],
          [77.5, 28.53],
        ],
      ],
    },
  },
  {
    plot_id: 'P006',
    area_map: 1.35,
    owner_name_map: 'Meera Gupta',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.52, 28.53],
          [77.545, 28.53],
          [77.548, 28.545],
          [77.52, 28.545],
          [77.52, 28.53],
        ],
      ],
    },
  },
  {
    plot_id: 'P007',
    area_map: 0.88,
    owner_name_map: 'Suresh Rao',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.5, 28.545],
          [77.515, 28.545],
          [77.518, 28.558],
          [77.5, 28.56],
          [77.5, 28.545],
        ],
      ],
    },
  },
  {
    plot_id: 'P008',
    area_map: 1.18,
    owner_name_map: 'Neha Sharma',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.52, 28.545],
          [77.542, 28.545],
          [77.546, 28.56],
          [77.52, 28.562],
          [77.52, 28.545],
        ],
      ],
    },
  },
  {
    plot_id: 'P009',
    area_map: 0.92,
    owner_name_map: 'Vikram Singh',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.5, 28.56],
          [77.513, 28.60],
          [77.516, 28.572],
          [77.5, 28.573],
          [77.5, 28.56],
        ],
      ],
    },
  },
  {
    plot_id: 'P010',
    area_map: 1.25,
    owner_name_map: 'Anita Das',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.52, 28.56],
          [77.544, 28.56],
          [77.548, 28.573],
          [77.52, 28.574],
          [77.52, 28.56],
        ],
      ],
    },
  },
  {
    plot_id: 'P011',
    area_map: 0.78,
    owner_name_map: 'Ravi Kumar',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.5, 28.575],
          [77.514, 28.575],
          [77.517, 28.587],
          [77.5, 28.588],
          [77.5, 28.575],
        ],
      ],
    },
  },
  {
    plot_id: 'P012',
    area_map: 1.42,
    owner_name_map: undefined, // Missing record
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [77.52, 28.575],
          [77.547, 28.575],
          [77.551, 28.59],
          [77.52, 28.591],
          [77.52, 28.575],
        ],
      ],
    },
  },
];

// Sample CSV records for land plots
export const sampleRecords: Record[] = [
  { plot_id: 'P001', owner_name: 'Rajesh Kumar', area_record: 0.84 }, // Near match
  { plot_id: 'P002', owner_name: 'Priya Singh', area_record: 1.2 }, // Exact match
  { plot_id: 'P003', owner_name: 'Amit Patel', area_record: 1.15 }, // Area mismatch (>5%)
  // P004 - Missing record
  { plot_id: 'P005', owner_name: 'Deepak Verma', area_record: 0.76 }, // Near match
  { plot_id: 'P006', owner_name: 'Meera Gupta', area_record: 1.35 }, // Exact match
  { plot_id: 'P007', owner_name: 'Suresh Rao', area_record: 0.88 }, // Exact match
  { plot_id: 'P008', owner_name: 'Neha Sharma', area_record: 1.2 }, // Area mismatch (>5%)
  { plot_id: 'P009', owner_name: 'Vikram Singh', area_record: 0.91 }, // Near match
  { plot_id: 'P010', owner_name: 'Anita Das', area_record: 1.25 }, // Exact match
  { plot_id: 'P011', owner_name: 'Ravi Kumar', area_record: 0.78 }, // Exact match
  // P012 - Missing record
];
