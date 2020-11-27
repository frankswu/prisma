import {
  DatabaseSteps,
  // RawSqlStep,
  // DropTableStep,
  // RenameTableStep,
  // CreateTableStep,
  LocalMigrationWithDatabaseSteps,
} from '../types'
import { darkBrightBlue } from '@prisma/sdk/dist//highlight/theme'
import { highlightSql } from '@prisma/sdk'

export function printDatabaseStepsOverview(
  databaseSteps: DatabaseSteps[],
): string {
  if (databaseSteps.length === 0) {
    return `No statements inferrable.`
  }
  const counts = getStepCounts(databaseSteps)
  const overview =
    Object.entries(counts)
      .reduce<string[]>((acc, [key, value]) => {
        if (value > 0) {
          acc.push(`${value} ${darkBrightBlue(key)}`)
        }

        return acc
      }, [])
      .join(', ') + ' statements.'
  return overview
}
export function highlightMigrationsSQL(
  migrations: LocalMigrationWithDatabaseSteps[],
): any {
  return highlightSql(
    '-- Start Migrations\n\n' +
      migrations
        .map(
          (migration) =>
            `-- Migration ${migration.id}\n` +
            migration.databaseSteps.map((it) => it.raw).join('\n'),
        )
        .join('\n\n') +
      '\n\n-- End Migrations',
  )
}

export function printDetailedDatabaseSteps(
  databaseSteps: DatabaseSteps[],
): string {
  return databaseSteps
    .map((it) => it.raw)
    .join('\n\n')
    .replace(/"quaint"./g, '') // For SQLite output
}

// const bold = (str) => str

// function renderStep(step: DatabaseStep) {
//   if (isRawSqlStep(step)) {
//     return `${bold('Raw SQL')} ${chalk.dim(step.RawSql)}`
//   }
//   if (isDropTableStep(step)) {
//     return `${bold('Drop table')} ${chalk.bold.dim(step.DropTable.name)}`
//   }
//   if (isRenameTableStep(step)) {
//     return `${bold('Rename table')} ${chalk.dim(
//       step.RenameTable.name,
//     )} ${chalk.dim('→')} ${chalk.dim(step.RenameTable.new_name)}`
//   }
//   if (isCreateTableStep(step)) {
//     const foreignKeyCount = step.CreateTable.columns.filter(
//       (c) => c.foreign_key,
//     ).length
//     const primaryCount = step.CreateTable.primary_columns.length
//     const foreignKeyStr =
//       foreignKeyCount > 0 ? `, ${foreignKeyCount} foreign keys` : ''
//     const primaryColumns = primaryCount > 0 ? `, ${primaryCount} primary` : ''
//     return `${bold('Create table')} ${chalk.bold.dim(
//       step.CreateTable.name,
//     )}${chalk.dim(
//       `, ${step.CreateTable.columns.length} columns${foreignKeyStr}${primaryColumns}`,
//     )}`
//   }
// }

type StepCounts = {
  RawSql: number
  DropTable: number
  RenameTable: number
  CreateTable: number
}

function getStepCounts(databaseSteps: DatabaseSteps[]): StepCounts {
  const stepCounts = {
    RawSql: 0,
    DropTable: 0,
    RenameTable: 0,
    CreateTable: 0,
  }

  for (const it of databaseSteps) {
    const key = Object.keys(it.step)[0]
    stepCounts[key]++
  }

  return stepCounts
}

// function isRawSqlStep(databaseStep: DatabaseStep): databaseStep is RawSqlStep {
//   return Object.prototype.hasOwnProperty.call(databaseStep, 'RawSql')
// }

// function isDropTableStep(
//   databaseStep: DatabaseStep,
// ): databaseStep is DropTableStep {
//   return Object.prototype.hasOwnProperty.call(databaseStep, 'DropTable')
// }

// function isRenameTableStep(
//   databaseStep: DatabaseStep,
// ): databaseStep is RenameTableStep {
//   return Object.prototype.hasOwnProperty.call(databaseStep, 'RenameTable')
// }

// function isCreateTableStep(
//   databaseStep: DatabaseStep,
// ): databaseStep is CreateTableStep {
//   return Object.prototype.hasOwnProperty.call(databaseStep, 'CreateTable')
// }

// const ct = chalk.bold('CreateTable')
