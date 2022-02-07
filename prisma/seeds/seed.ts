import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

const templates = [
  {
    name: '5x5 A',
    exercises: ['Squat', 'Overhead Press', 'Bent Over Row'],
  },
  {
    name: '5x5 B',
    exercises: ['Squat', 'Deadlift', 'Bench Press'],
  },
];

async function seed() {
  const templateRecords = await Promise.all(
    templates.map((template) =>
      db.template.create({
        data: {
          name: template.name,
          exercises: {
            connectOrCreate: template.exercises.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
        },
        include: {
          exercises: true,
        },
      })
    )
  );

  console.log('Done!');
}

seed();
