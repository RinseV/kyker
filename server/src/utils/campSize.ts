import { registerEnumType } from 'type-graphql';

export enum CampSize {
    REST = 6,
    BUSH = 4,
    SATTELITE = 2,
    PICNIC = 1
}

registerEnumType(CampSize, {
    name: 'CampSize',
    description: 'Camp size'
});
