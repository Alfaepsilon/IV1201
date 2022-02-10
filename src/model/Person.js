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
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      },
      { sequelize, modelName: 'person', paranoid: true }
    );
    return Person;
  }
}

module.exports = Person;