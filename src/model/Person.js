const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
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
          allowNull: true
        },
        username: {
          type: Sequelize.STRING,
          allowNull: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
          set(value) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hash);
          }
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        surname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pnr: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: true
        },
        role_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      { sequelize, modelName: 'person', paranoid: true, freezeTableName: true, timestamps: false },
    );
    Person.validPassword = (password, hash) => {
      return bcrypt.compareSync(password, hash);
    }
    return Person;
  }

}

module.exports = { Person: Person, createModel: Person.createModel };