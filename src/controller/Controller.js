"use strict";

const recruitDAO = require('../integration/recruitDAO').recruitDAO;

class Controller {
  constructor() {
    this.recruitDAO = new recruitDAO();
    this.transactions = this.recruitDAO.getTransactions();
  }

  /**
     * Creates the controller and syncs authenticates & syncs the database.
     * @return {Const} controller. Our initialized controller.
     */

  static async createController() {
    const controller = new Controller();
    await controller.recruitDAO.makeTables();
    return controller;
  }

  /**
     * This function will make a call down to the Integration and check if a user is returned.
     * @param {String} username The username of the user.
     * @param {String}  password The password of our useful.
     * @return {Boolean} Indicating succesful or unsuccesful login
     */

  async login(username, password) {
    console.log(username);
    console.log(password);
    try {
      return this.transactions.transaction(async (x) => {
        var matchingPerson = await this.recruitDAO.login(username, password);
        console.log(Object.keys(matchingPerson).length)
        if (Object.keys(matchingPerson).length >= 1) {
          console.log(true);
          return true
        } else {
          console.log(false)
          return false;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
     * Passes login parameters to the DAO
     * @param {String} user user to register
     */
  async register(user) {
    try {
      return this.transactions.transaction(async (x) => {
        try {
          var isCreated = await this.recruitDAO.register(user);
          console.log(isCreated)
          console.log(Object.keys(isCreated).length)
          if (Object.keys(isCreated).length >= 1) {
            console.log(true);
            return true
          } else {
            console.log(false)
            return false;
          }
        } catch (error) {
          throw error
        }
      });
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }

  //updates the default database values to include our bcrypt encryption
  async updateDefault() {
    try {
      return this.transactions.transaction(async (x) => {
        await this.recruitDAO.updateDefault();
      });
    }
    catch (error) {
      console.log(error)
      throw error;
    }
  }

  /**
     * Passes login parameters to the DAO
     * @param {String} tickets checks if "tickets" expertise is checked
     * @param {String} lotteries checks if "lotteries" expertise is checked
     * @param {String} rollercoaster checks if "rollercoaster" expertise is checked
     * @param {Date} tickets checks if "tickets" expertise is checked
     * @param {Date} tickets checks if "tickets" expertise is checked
     */

  async apply(username, competence_id, from_date, to_date, years_of_experience) {
    console.log(username)
    //console.log(competence_id)
    //console.log(from_date)
    //console.log(to_date)
    //console.log(years_of_experience)
    var pid = await this.recruitDAO.getPersonId(username)
    await this.recruitDAO.jobSubmission(pid, competence_id, from_date, to_date, years_of_experience)
  }

  /**
   * 
   */
  async display_competences() {
    return await this.recruitDAO.showCompetences();
  }
}

module.exports = { Controller: Controller, login: Controller.login, createController: Controller.createController, register: Controller.register, updateDefault: Controller.updateDefault, apply: Controller.apply }; 
