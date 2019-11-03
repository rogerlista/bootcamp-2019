import Sequelize from 'sequelize'

import User from '../app/models/user'
import Student from '../app/models/student'
import Plan from '../app/models/plan'
import Matriculation from '../app/models/matriculation'

import databaseConfig from '../config/database'

const models = [User, Student, Plan, Matriculation]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()
