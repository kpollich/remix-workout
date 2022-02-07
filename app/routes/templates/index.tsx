import { Exercise, Template, TemplateExercise } from '@prisma/client';
import { LoaderFunction, useLoaderData } from 'remix';
import { db } from '~/db/index.server';

interface TemplateListLoaderData {
  templates: Array<
    Template & {
      templateExercises: Array<TemplateExercise & { exercise: Exercise }>;
    }
  >;
}

export const loader: LoaderFunction = async ({ request }) => {
  const templates = await db.template.findMany({
    include: { templateExercises: { include: { exercise: true } } },
  });

  return { templates };
};

export default function Templates() {
  const { templates } = useLoaderData<TemplateListLoaderData>();

  return (
    <main className="p-8 max-w-lg">
      {templates.length ? (
        <ul>
          {templates.map((template) => (
            <li
              key={`template-${template.id}`}
              className="rounded-md bg-slate-300 shadow-md p-4 mb-4"
            >
              <h2 className="text-2xl">{template.name}</h2>

              <ul>
                {template.templateExercises.map((templateExercise) => (
                  <li key={`template-exercise-${templateExercise.id}`}>
                    <span>{templateExercise.exercise.name}</span> --{' '}
                    <span>
                      {templateExercise.defaultSets} sets of{' '}
                      {templateExercise.defaultReps} reps
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <div>No templates found</div>
      )}
    </main>
  );
}
