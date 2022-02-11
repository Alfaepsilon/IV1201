'use strict';
const Sequelize = require('sequelize');
class Person extends Sequelize.Model {
  static createModel(sequelize) {
    /**
   * Defines the Person entity from the database
   * @param {Sequelize} sequelize The sequelize object.
   * @return {Model} A sequelize model describing the Person entity.
   */
    Person.init(
      {
        person_id: {
          type: Sequelize.INTEGER,
          primaryKey: true
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      },
      { sequelize, modelName: 'person', paranoid: true, freezeTableName: true, timestamps: false }
    );
    console.log("person logged!")
    return Person;
  }
}

module.exports = { Person: Person, createModel: Person.createModel };