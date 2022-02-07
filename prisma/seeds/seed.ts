import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

const exercises = [
  {
    id: 1,
    name: 'Squat',
  },
  {
    id: 2,
    name: 'Overhead Press',
  },
  {
    id: 3,
    name: 'Bent Over Row',
  },
  {
    id: 4,
    name: 'Deadlift',
  },
  {
    id: 5,
    name: 'Bench Press',
  },
];

const templates = [
  {
    id: 1,
    name: '5x5 A',
  },
  {
    id: 2,
    name: '5x5 B',
  },
];

const templateExercises = [
  {
    templateId: 1,
    exerciseId: 1,
    defaultSets: 5,
    defaultReps: 5,
  },
  {
    templateId: 1,
    exerciseId: 2,
    defaultSets: 5,
    defaultReps: 5,
  },
  {
    templateId: 1,
    exerciseId: 3,
    defaultSets: 5,
    defaultReps: 5,
  },
  {
    templateId: 2,
    exerciseId: 1,
    defaultSets: 5,
    defaultReps: 5,
  },
  {
    templateId: 2,
    exerciseId: 4,
    defaultSets: 5,
    defaultReps: 5,
  },
  {
    templateId: 2,
    exerciseId: 5,
    defaultSets: 5,
    defaultReps: 5,
  },
];

async function seed() {
  await Promise.all(
    exercises.map((exercise) => db.exercise.create({ data: exercise }))
  );

  await Promise.all(
    templates.map((template) => db.template.create({ data: template }))
  );

  await Promise.all(
    templateExercises.map((templateExercise) =>
      db.templateExercise.create({ data: templateExercise })
    )
  );

  console.log('Done!');
}

seed();
