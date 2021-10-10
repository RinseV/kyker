import { registerEnumType } from 'type-graphql';

export enum Animal {
    LION = 'Lion', // Red
    LEOPARD = 'Leopard', // Black
    CHEETAH = 'Cheetah', // Blue
    WILD_DOG = 'Wild Dog', // Brown
    HYENA = 'Hyena', // None :(
    BUFFALO = 'Buffalo', // Yellow
    HIPPO = 'Hippo', // None :(
    ELEPHANT = 'Elephant', // Green
    GIRAFFE = 'Giraffe', // None :(
    ZEBRA = 'Zebra', // None :(
    RHINO = 'Rhino' // Orange
}

registerEnumType(Animal, {
    name: 'Animal',
    description: 'Animal species'
});
