import 'colors'
import fs from 'fs-extra'
import path from 'path'
import shell from 'shelljs'
import { CodeGenerator } from '../interfaces/code.generator'

export class GraphqlCodeGenerator extends CodeGenerator {
  protected createDirStructure(): void {
    fs.mkdirSync('./src', {
      recursive: true,
    })

    fs.mkdirSync('./src/database', {
      recursive: true,
    })

    fs.mkdirSync('./src/graphql', {
      recursive: true,
    })

    fs.mkdirSync('./src/graphql/modules', {
      recursive: true,
    })

    fs.mkdirSync('./src/graphql/modules/default', {
      recursive: true,
    })

    fs.mkdirSync('./src/config', {
      recursive: true,
    })

    fs.mkdirSync('./src/interfaces', {
      recursive: true,
    })
  }

  protected copyCode(): void {
    fs.copySync(path.resolve(__dirname, '..', '..', 'code', 'graphql_api'), './')
    fs.rename('./gitignore', './.gitignore')
  }

  protected installDependencies(): void {
    console.log('================= Installing dependencies ================='.yellow)
    shell.exec(
      'yarn add @graphql-tools/schema apollo-server-express bcrypt cors dotenv dotenv-parse-variables express graphql lodash'
    )
    shell.exec(
      'yarn add -D @types/bcrypt @types/express @types/lodash @types/node @types/dotenv-parse-variables ts-node tsc-watch typescript'
    )
  }

  init() {
    this.createDirStructure()
    this.copyCode()
    this.installDependencies()
  }
}
