const Sequelize = require('sequelize');

class Availability extends Sequelize.Model {
    static createModel(sequelize) {
        /**
       * Defines the Availability entity from the database
       * @param {Sequelize} sequelize The sequelize object.
       * @return {Model} A sequelize model describing the Availability entity.
       */
        Availability.init(
            {
                person_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                from_date: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                to_date: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
            },
            { sequelize, modelName: 'availability', paranoid: true, freezeTableName: true, timestamps: false },
        );
        return Availability;
    }

}

module.exports = { Availability: Availability, createModel: Availability.createModel }; 