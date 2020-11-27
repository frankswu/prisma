import { DatabaseStep } from './types'

export const exampleDbSteps: DatabaseStep[] = [
  {
    RawSql: 'PRAGMA foreign_keys=OFF;',
  },
  {
    CreateTable: {
      name: 'new_Post',
      columns: [
        {
          name: 'id',
          tpe: 'Int',
          required: true,
          foreign_key: null,
        },
        {
          name: 'title',
          tpe: 'String',
          required: true,
          foreign_key: null,
        },
        {
          name: 'anotherText',
          tpe: 'String',
          required: true,
          foreign_key: null,
        },
        {
          name: 'text',
          tpe: 'String',
          required: true,
          foreign_key: null,
        },
        {
          name: 'blog',
          tpe: 'Int',
          required: true,
          foreign_key: {
            table: 'Blog',
            column: 'id',
          },
        },
      ],
      primary_columns: ['id'],
    },
  },
  {
    RawSql:
      'INSERT INTO new_Post (id,title,text,blog) SELECT id,title,text,blog from Post',
  },
  {
    DropTable: {
      name: 'Post',
    },
  },
  {
    RenameTable: {
      name: 'new_Post',
      new_name: 'Post',
    },
  },
  {
    RawSql: 'PRAGMA "migration_engine".foreign_key_check;',
  },
  {
    RawSql: 'PRAGMA foreign_keys=ON;',
  },
]
