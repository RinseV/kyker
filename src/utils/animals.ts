import { registerEnumType } from 'type-graphql';

export enum Animal {
    LION = 'Lion',
    LEOPARD = 'Leopard',
    CHEETAH = 'Cheetah',
    WILD_DOG = 'Wild Dog',
    HYENA = 'Hyena',
    BUFFALO = 'Buffalo',
    HIPPO = 'Hippo',
    ELEPHANT = 'Elephant',
    GIRAFFE = 'Giraffe',
    ZEBRA = 'Zebra',
    RHINO = 'Rhino'
}

registerEnumType(Animal, {
    name: 'Animal',
    description: 'Animal species'
});
