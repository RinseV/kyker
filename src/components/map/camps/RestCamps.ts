export enum CampType {
    REST = 'Rest Camp',
    SATTELITE = 'Sattelite Camp',
    BUSH = 'Bush Camp'
}

export interface RestCamp {
    name: string;
    lon: number;
    lat: number;
    type: CampType;
}

export const restCampLocations: RestCamp[] = [
    {
        name: 'Berg-en-Dal',
        lon: 31.4458671,
        lat: -25.4267996,
        type: CampType.REST
    },
    {
        name: 'Crocodile Bridge',
        lon: 31.4468,
        lat: -25.3584331,
        type: CampType.REST
    },
    {
        name: 'Letaba',
        lon: 31.5722433,
        lat: -23.8542275,
        type: CampType.REST
    },
    {
        name: 'Lower Sabie',
        lon: 31.9131903,
        lat: -25.1198551,
        type: CampType.REST
    },
    {
        name: 'Mopani',
        lon: 31.394838,
        lat: -23.5216391,
        type: CampType.REST
    },
    {
        name: 'Olifants',
        lon: 31.7380819,
        lat: -24.0060509,
        type: CampType.REST
    },
    {
        name: 'Orpen',
        lon: 31.3885488,
        lat: -24.4756611,
        type: CampType.REST
    },
    {
        name: 'Pretoriuskop',
        lon: 31.2655137,
        lat: -25.1702045,
        type: CampType.REST
    },
    {
        name: 'Punda Maria',
        lon: 31.0151511,
        lat: -22.6927128,
        type: CampType.REST
    },
    {
        name: 'Satara',
        lon: 31.7776198,
        lat: -24.3930075,
        type: CampType.REST
    },
    {
        name: 'Shingwedzi',
        lon: 31.4333653,
        lat: -23.1088991,
        type: CampType.REST
    },
    {
        name: 'Skukuza',
        lon: 31.5896973,
        lat: -24.9964431,
        type: CampType.REST
    },
    {
        name: 'Balule',
        lon: 31.7311217,
        lat: -24.05349,
        type: CampType.SATTELITE
    },
    {
        name: 'Malelane',
        lon: 31.5093777,
        lat: -25.476639,
        type: CampType.SATTELITE
    },
    {
        name: 'Tamboti',
        lon: 31.403506,
        lat: -24.4541312,
        type: CampType.SATTELITE
    },
    {
        name: 'Bateleur',
        lon: 31.1998014,
        lat: -23.2342095,
        type: CampType.BUSH
    },
    {
        name: 'Biyamiti',
        lon: 31.7089072,
        lat: -25.3069235,
        type: CampType.BUSH
    },
    {
        name: 'Shimuwini',
        lon: 31.2638319,
        lat: -23.7146211,
        type: CampType.BUSH
    },
    {
        name: 'Sirheni',
        lon: 31.2192383,
        lat: -22.946967,
        type: CampType.BUSH
    },
    {
        name: 'Talamati',
        lon: 31.5533045,
        lat: -24.5560097,
        type: CampType.BUSH
    },
    {
        name: 'Boulders',
        lon: 31.3732333,
        lat: -23.6077431,
        type: CampType.BUSH
    },
    {
        name: 'Roodewal',
        lon: 31.6299829,
        lat: -24.1461244,
        type: CampType.BUSH
    }
];
