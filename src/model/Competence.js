const Sequelize = require('sequelize');

class Competence extends Sequelize.Model {
  static createModel(sequelize) {
    /**
   * Defines the Competence entity from the database
   * @param {Sequelize} sequelize The sequelize object.
   * @return {Model} A sequelize model describing the Competence entity.
   */
    Competence.init(
      {
        Competence_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      },
      { sequelize, modelName: 'competence', paranoid: true, freezeTableName: true, timestamps: false},
    );
    return Competence;
  }

}

module.exports = { Competence: Competence, createModel: Competence.createModel};