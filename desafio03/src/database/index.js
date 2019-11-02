import Sequelize from 'sequelize'

import User from '../app/models/user'
import Student from '../app/models/student'
import Plan from '../app/models/plan'

import databaseConfig from '../config/database'

const models = [User, Student, Plan]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models.map(model => model.init(this.connection))
  }
}

export default new Database()
