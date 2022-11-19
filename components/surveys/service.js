import { notFound } from '@hapi/boom'

// const bcrypt = require('bcrypt');

// const { models } = require('../../lib/sequelize')
import Survey from './model.js'

class SurveysService {
  // constructor () {
  //   // this.users = [];
  //   // this.generate();
  //   // this.pool = pool;
  //   // this.pool.on('error', (err) => console.error(err));
  // }

  // generate() {
  //   const limit = 5;
  //   for (let index = 0; index < limit; index++) {
  //     this.users.push({
  //       id: faker.datatype.uuid(),
  //       firstName: faker.name.firstName(),
  //       secondName: faker.name.lastName(),
  //       email: faker.internet.email(),
  //       phone: faker.phone.phoneNumber(),
  //     });
  //   }
  // }

  async create(name, description, questions, user) {
    const newSurvey = new Survey({
      name,
      description,
      questions,
      user: user._id
    })

    const savedSurvey = await newSurvey.save()

    user.surveys = user.surveys.concat(savedSurvey._id)
    await user.save()

    return savedSurvey
  }

  async find() {
    // const query = 'SELECT * FROM users';
    // sequelize retorna la informacion en un array
    // en la primer posicion esta la data y la segunda la metadata(más informacion del query)
    // const rta = await models.User.findAll({
    //   include: ['customer']
    // })
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(rta)
    //   }, 2000)
    // })
    const rta = await Survey.find({})
    return rta
  }

  async findOne(id) {
    const survey = await Survey.findById(id)
    if (!survey) throw notFound('Survey not found')
    return survey
  }

  async update(id, changes) {
    const { name, description, questions } = changes
    const newSurvey = {
      name,
      description,
      questions
    }
    // await this.findOne(id)
    const rta = await Survey.findByIdAndUpdate(id, newSurvey, { new: true })
    return rta
  }

  async delete(id) {
    await this.findOne(id)
    await Survey.findByIdAndDelete(id)
    // if (index === -1) throw boom.notFound('Survey not found')
    // this.users.splice(index, 1);
    // const user = await this.findOne(id)
    // await user.destroy()
    return true
  }
}

export default SurveysService
