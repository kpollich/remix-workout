/*
  Warnings:

  - You are about to drop the `_ExerciseToTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_ExerciseToTemplate_B_index";

-- DropIndex
DROP INDEX "_ExerciseToTemplate_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ExerciseToTemplate";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "TemplateExercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "templateId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "defaultSets" INTEGER NOT NULL,
    "defaultReps" INTEGER NOT NULL,
    CONSTRAINT "TemplateExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TemplateExercise_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WorkoutExercise" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "workoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    CONSTRAINT "WorkoutExercise_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkoutExercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rep" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "weight" INTEGER NOT NULL,
    "workoutExerciseId" INTEGER NOT NULL,
    CONSTRAINT "Rep_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "exerciseId" INTEGER,
    CONSTRAINT "Template_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Template" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Template";
DROP TABLE "Template";
ALTER TABLE "new_Template" RENAME TO "Template";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
