import { LngLat } from 'mapbox-gl';
import { FitBounds } from 'react-mapbox-gl/lib/map';

export const inBounds = (point: LngLat, bounds: FitBounds): boolean => {
    const sw = bounds[0];
    const ne = bounds[1];

    return point.lng >= sw[0] && point.lng <= ne[0] && point.lat >= sw[1] && point.lat <= ne[1];
};
