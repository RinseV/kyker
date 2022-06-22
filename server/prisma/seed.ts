/* eslint-disable @typescript-eslint/no-unused-vars */
import { CampSize, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Animals
  const leopard = await prisma.animal.upsert({
    where: { name: 'Leopard' },
    update: {},
    create: {
      name: 'Leopard',
      disabled: false,
      lightColor: '#000',
      darkColor: '#fff'
    }
  });

  const elephant = await prisma.animal.upsert({
    where: { name: 'Elephant' },
    update: {},
    create: {
      name: 'Elephant',
      disabled: false,
      lightColor: '#16A34A',
      darkColor: '#86EFAC'
    }
  });

  const rhino = await prisma.animal.upsert({
    where: { name: 'Rhino' },
    update: {},
    create: {
      name: 'Rhino',
      disabled: true,
      lightColor: '#D97706',
      darkColor: '#FCD34D'
    }
  });

  const lion = await prisma.animal.upsert({
    where: { name: 'Lion' },
    update: {},
    create: {
      name: 'Lion',
      disabled: false,
      lightColor: '#DC2626',
      darkColor: '#FCA5A5'
    }
  });

  const buffalo = await prisma.animal.upsert({
    where: { name: 'Buffalo' },
    update: {},
    create: {
      name: 'Buffalo',
      disabled: false,
      lightColor: '#CA8A04',
      darkColor: '#FDE047'
    }
  });

  const cheetah = await prisma.animal.upsert({
    where: { name: 'Cheetah' },
    update: {},
    create: {
      name: 'Cheetah',
      disabled: false,
      lightColor: '#0284C7',
      darkColor: '#7DD3FC'
    }
  });

  const wildDog = await prisma.animal.upsert({
    where: { name: 'Wild Dog' },
    update: {},
    create: {
      name: 'Wild Dog',
      disabled: false,
      lightColor: '#EA580C',
      darkColor: '#FDBA74'
    }
  });

  const hyena = await prisma.animal.upsert({
    where: { name: 'Hyena' },
    update: {},
    create: {
      name: 'Hyena',
      disabled: false,
      lightColor: '#9333EA',
      darkColor: '#D8B4FE'
    }
  });

  const hippo = await prisma.animal.upsert({
    where: { name: 'Hippo' },
    update: {},
    create: {
      name: 'Hippo',
      disabled: false,
      lightColor: '#DB2777',
      darkColor: '#F9A8D4'
    }
  });

  const giraffe = await prisma.animal.upsert({
    where: { name: 'Giraffe' },
    update: {},
    create: {
      name: 'Giraffe',
      disabled: false,
      lightColor: '#0D9488',
      darkColor: '#5EEAD4'
    }
  });

  const zebra = await prisma.animal.upsert({
    where: { name: 'Zebra' },
    update: {},
    create: {
      name: 'Zebra',
      disabled: false,
      lightColor: '#0891B2',
      darkColor: '#67E8F9'
    }
  });

  // Camps
  const bergEnDal = await prisma.camp.upsert({
    where: { name: 'Berg-en-Dal' },
    update: {},
    create: {
      name: 'Berg-en-Dal',
      latitude: -25.4267996,
      longitude: 31.4458671,
      size: CampSize.REST
    }
  });

  const crocodileBridge = await prisma.camp.upsert({
    where: { name: 'Crocodile Bridge' },
    update: {},
    create: {
      name: 'Crocodile Bridge',
      latitude: -25.3584331,
      longitude: 31.4468,
      size: CampSize.REST
    }
  });

  const letaba = await prisma.camp.upsert({
    where: { name: 'Letaba' },
    update: {},
    create: {
      name: 'Letaba',
      latitude: -23.8542275,
      longitude: 31.5722433,
      size: CampSize.REST
    }
  });

  const lowerSabie = await prisma.camp.upsert({
    where: { name: 'Lower Sabie' },
    update: {},
    create: {
      name: 'Lower Sabie',
      latitude: -25.1198551,
      longitude: 31.9131903,
      size: CampSize.REST
    }
  });

  const mopani = await prisma.camp.upsert({
    where: { name: 'Mopani' },
    update: {},
    create: {
      name: 'Mopani',
      latitude: -23.5216391,
      longitude: 31.394838,
      size: CampSize.REST
    }
  });

  const olifants = await prisma.camp.upsert({
    where: { name: 'Olifants' },
    update: {},
    create: {
      name: 'Olifants',
      latitude: -24.0060509,
      longitude: 31.7380819,
      size: CampSize.REST
    }
  });

  const orpen = await prisma.camp.upsert({
    where: { name: 'Orpen' },
    update: {},
    create: {
      name: 'Orpen',
      latitude: -24.4756611,
      longitude: 31.3885488,
      size: CampSize.REST
    }
  });

  const pretoriuskop = await prisma.camp.upsert({
    where: { name: 'Pretoriuskop' },
    update: {},
    create: {
      name: 'Pretoriuskop',
      latitude: -25.1702045,
      longitude: 31.2655137,
      size: CampSize.REST
    }
  });

  const pundaMaria = await prisma.camp.upsert({
    where: { name: 'Punda Maria' },
    update: {},
    create: {
      name: 'Punda Maria',
      latitude: -22.6927128,
      longitude: 31.0151511,
      size: CampSize.REST
    }
  });

  const satara = await prisma.camp.upsert({
    where: { name: 'Satara' },
    update: {},
    create: {
      name: 'Satara',
      latitude: -24.3930075,
      longitude: 31.7776198,
      size: CampSize.REST
    }
  });

  const shingwedzi = await prisma.camp.upsert({
    where: { name: 'Shingwedzi' },
    update: {},
    create: {
      name: 'Shingwedzi',
      latitude: -23.1088991,
      longitude: 31.4333653,
      size: CampSize.REST
    }
  });

  const skukuza = await prisma.camp.upsert({
    where: { name: 'Skukuza' },
    update: {},
    create: {
      name: 'Skukuza',
      latitude: -24.9964431,
      longitude: 31.5896973,
      size: CampSize.REST
    }
  });

  const bateleur = await prisma.camp.upsert({
    where: { name: 'Bateleur' },
    update: {},
    create: {
      name: 'Bateleur',
      latitude: -23.2342095,
      longitude: 31.1998014,
      size: CampSize.BUSH
    }
  });

  const biyamiti = await prisma.camp.upsert({
    where: { name: 'Biyamiti' },
    update: {},
    create: {
      name: 'Biyamiti',
      latitude: -25.3069235,
      longitude: 31.7089072,
      size: CampSize.BUSH
    }
  });

  const boulders = await prisma.camp.upsert({
    where: { name: 'Boulders' },
    update: {},
    create: {
      name: 'Boulders',
      latitude: -23.6077431,
      longitude: 31.3732333,
      size: CampSize.BUSH
    }
  });

  const roodewal = await prisma.camp.upsert({
    where: { name: 'Roodewal' },
    update: {},
    create: {
      name: 'Roodewal',
      latitude: -24.1461244,
      longitude: 31.6299829,
      size: CampSize.BUSH
    }
  });

  const shimuwini = await prisma.camp.upsert({
    where: { name: 'Shimuwini' },
    update: {},
    create: {
      name: 'Shimuwini',
      latitude: -23.7146211,
      longitude: 31.2638319,
      size: CampSize.BUSH
    }
  });

  const sirheni = await prisma.camp.upsert({
    where: { name: 'Sirheni' },
    update: {},
    create: {
      name: 'Sirheni',
      latitude: -22.946967,
      longitude: 31.2192383,
      size: CampSize.BUSH
    }
  });

  const talamati = await prisma.camp.upsert({
    where: { name: 'Talamati' },
    update: {},
    create: {
      name: 'Talamati',
      latitude: -24.5560097,
      longitude: 31.5533045,
      size: CampSize.BUSH
    }
  });

  const balule = await prisma.camp.upsert({
    where: { name: 'Balule' },
    update: {},
    create: {
      name: 'Balule',
      latitude: -24.05349,
      longitude: 31.7311217,
      size: CampSize.SATELLITE
    }
  });

  const malelane = await prisma.camp.upsert({
    where: { name: 'Malelane' },
    update: {},
    create: {
      name: 'Malelane',
      latitude: -25.476639,
      longitude: 31.5093777,
      size: CampSize.SATELLITE
    }
  });

  const tamboti = await prisma.camp.upsert({
    where: { name: 'Tamboti' },
    update: {},
    create: {
      name: 'Tamboti',
      latitude: -24.4541312,
      longitude: 31.403506,
      size: CampSize.SATELLITE
    }
  });

  // Gates
  const malelaneGate = await prisma.gate.upsert({
    where: { name: 'Malelane' },
    update: {},
    create: {
      name: 'Malelane',
      latitude: -25.461588,
      longitude: 31.5310544
    }
  });

  const crocodileBridgeGate = await prisma.gate.upsert({
    where: { name: 'Crocodile Bridge' },
    update: {},
    create: {
      name: 'Crocodile Bridge',
      latitude: -25.3584331,
      longitude: 31.8913413
    }
  });

  const numbi = await prisma.gate.upsert({
    where: { name: 'Numbi' },
    update: {},
    create: {
      name: 'Numbi',
      latitude: -25.155402,
      longitude: 31.1959276
    }
  });

  const paulKruger = await prisma.gate.upsert({
    where: { name: 'Paul Kruger' },
    update: {},
    create: {
      name: 'Paul Kruger',
      latitude: -24.9809791,
      longitude: 31.4826853
    }
  });

  const phabeni = await prisma.gate.upsert({
    where: { name: 'Phabeni' },
    update: {},
    create: {
      name: 'Phabeni',
      latitude: -25.0249714,
      longitude: 31.2387993
    }
  });

  const orpenGate = await prisma.gate.upsert({
    where: { name: 'Orpen' },
    update: {},
    create: {
      name: 'Orpen',
      latitude: -24.5419665,
      longitude: 31.3701233
    }
  });

  const phalaborwa = await prisma.gate.upsert({
    where: { name: 'Phalaborwa' },
    update: {},
    create: {
      name: 'Phalaborwa',
      latitude: -23.9456776,
      longitude: 31.1634931
    }
  });

  const pundaMariaGate = await prisma.gate.upsert({
    where: { name: 'Punda Maria' },
    update: {},
    create: {
      name: 'Punda Maria',
      latitude: -22.737287,
      longitude: 31.0082647
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
