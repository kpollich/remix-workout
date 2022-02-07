import { useEffect, useRef } from 'react';
import { Exercise } from '@prisma/client';
import {
  ActionFunction,
  LoaderFunction,
  useFetcher,
  useLoaderData,
} from 'remix';
import { db } from '~/db/index.server';

interface ExerciseListLoaderData {
  exercises: Exercise[];
}

export const loader: LoaderFunction = async ({ request }) => {
  const exercises = await db.exercise.findMany();

  return { exercises };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const method = form.get('_method');

  switch (method) {
    case 'create':
      const name = form.get('name');

      if (name === null) {
        return { errors: [{ name: 'Name is required' }] };
      }

      const exercise = await db.exercise.create({
        data: { name: String(name) },
      });

      return { exercise };
    case 'delete':
      const id = form.get('id');

      if (id === null) {
        return { errors: [{ id: 'Id is required', values: { id } }] };
      }

      await db.exercise.delete({ where: { id: Number(id) } });
    default:
      return { errors: ['Method not supported'] };
  }
};

function ExerciseListItem({
  exercise,
  isOptimistic = false,
}: {
  exercise: Partial<Exercise>;
  isOptimistic?: boolean;
}) {
  const fetcher = useFetcher();

  const isDeleting = fetcher.submission?.formData.get('_method') === 'delete';

  return (
    <fetcher.Form method="post" className="inline" replace>
      {!isDeleting && (
        <li key={`exercise-${exercise.id}`} className="flex">
          <div className="flex-1">{exercise.name}</div>
          <input type="hidden" name="_method" value="delete" />
          <input type="hidden" name="id" value={exercise.id} />

          <button
            type="submit"
            className="bg-violet-300 border-2 px-2 rounded-md ml-2 disabled:bg-slate-400 disabled:opacity:0.5"
            disabled={isOptimistic}
          >
            X
          </button>
        </li>
      )}
    </fetcher.Form>
  );
}

export default function Exercises() {
  const { exercises } = useLoaderData<ExerciseListLoaderData>();
  const fetcher = useFetcher();

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isAdding = fetcher.submission?.formData.get('_method') === 'create';

  useEffect(() => {
    if (isAdding) {
      formRef.current?.reset();
      inputRef.current?.focus();
    }
  }, [isAdding]);

  return (
    <main className="p-8 max-w-lg">
      {exercises.length ? (
        <ul className="flex flex-col space-y-2">
          {exercises.map((exercise) => (
            <ExerciseListItem exercise={exercise} />
          ))}

          {isAdding && (
            <ExerciseListItem
              isOptimistic
              exercise={{
                name: String(fetcher.submission?.formData.get('name')),
              }}
            />
          )}
        </ul>
      ) : (
        <div>No exercises found.</div>
      )}

      <div className="mt-8">
        <span>Add an exercise</span>

        <fetcher.Form replace method="post" ref={formRef}>
          <input type="hidden" name="_method" value="create" />

          <input
            className="border-2"
            type="text"
            name="name"
            required
            aria-label="Name"
            ref={inputRef}
          />

          <button
            className="bg-violet-300 px-2 py-1 rounded-md ml-2 border-2"
            type="submit"
          >
            Add
          </button>
        </fetcher.Form>
      </div>
    </main>
  );
}
