import { registerEnumType } from 'type-graphql';

export enum CampSize {
    REST = 6,
    BUSH = 4,
    SATTELITE = 2
}

registerEnumType(CampSize, {
    name: 'CampSize',
    description: 'Camp size'
});
