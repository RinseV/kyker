import React from 'react';
import { TargetMarkerInfo } from './Map';
import { Marker } from './Marker';

type TargetProps = {
    info: TargetMarkerInfo | null;
};

export const Target: React.VFC<TargetProps> = ({ info }) => {
    if (!info) {
        return null;
    }
    return <Marker coordinates={[info.coordinates.lng, info.coordinates.lat]} />;
};
