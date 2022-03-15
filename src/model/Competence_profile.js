const Sequelize = require('sequelize');

class Competence_profile extends Sequelize.Model {
    static createModel(sequelize) {
        /**
       * Defines the Competence_profile entity from the database
       * @param {Sequelize} sequelize The sequelize object.
       * @return {Model} A sequelize model describing the Competence_profile entity.
       */
        Competence_profile.init(
            {
                /*competence_profile_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true
                }, */
                person_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                },
                competence_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                years_of_experience: {
                    type: Sequelize.FLOAT,
                    allowNull: false,
                },
            },
            { sequelize, modelName: 'competence_profile', paranoid: true, freezeTableName: true, timestamps: false },
        );
        return Competence_profile;
    }

}

module.exports = { Competence_profile: Competence_profile, createModel: Competence_profile.createModel }; 