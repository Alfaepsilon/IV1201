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
      throw error
    }
  }

  /**
     * Passes login parameters to the DAO
     * @param {String} user user to register
     */
  async register(user) {
    try {
      return this.transactions.transaction(async (x) => {
        var isCreated = await this.recruitDAO.register(user);
        console.log(isCreated)
        console.log(Object.keys(isCreated).length)
        if (Object.keys(isCreated).length >= 1) {
          return true
        } else {
          return false;
        }
      });
    }
    catch (error) {
      throw error
    }
  }
  /**
   *updates the default database values to include our bcrypt encryption
   */
  async updateDefault() {
    try {
      return this.transactions.transaction(async (x) => {
        await this.recruitDAO.updateDefault();
      });
    }
    catch (error) {
      throw error;
    }
  }

  /**
     * Passes application data to the DAO
     * @param {String} username username of the user that applies
     * @param {Int} competence_id id of the competence selected
     * @param {Date} from_date date to start work
     * @param {Date} to_date date to work until
     * @param {Int} years_of_experience amount of experience in years
     */

  async apply(username, competence_id, from_date, to_date, years_of_experience) {
    try {
      return this.transactions.transaction(async (x) => {
        var pid = await this.recruitDAO.getPersonId(username)
        await this.recruitDAO.jobSubmission(pid, competence_id, from_date, to_date, years_of_experience)
      });
    }
    catch (error) {
      throw error
    }
  }

  /**
   * Diplays all of the competences
   */
  async display_competences() {
    try {
      return this.transactions.transaction(async (x) => {
        return await this.recruitDAO.showCompetences();
      });
    }
    catch (error) {
      throw error
    }
  }
}

module.exports = { Controller: Controller, login: Controller.login, createController: Controller.createController, register: Controller.register, updateDefault: Controller.updateDefault, apply: Controller.apply }; 
