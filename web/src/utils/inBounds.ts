import { LngLat } from 'mapbox-gl';

export const inBounds = (point: LngLat, bounds: [[number, number], [number, number]]): boolean => {
    const sw = bounds[0];
    const ne = bounds[1];

    return point.lng >= sw[0] && point.lng <= ne[0] && point.lat >= sw[1] && point.lat <= ne[1];
};
