"use strict";

const recruitDAO = require('../integration/recruitDAO').recruitDAO;

class Controller {
  constructor() {
    this.recruitDAO = new recruitDAO();
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
      var matchingPerson = await this.recruitDAO.login(username, password);
      console.log(Object.keys(matchingPerson).length)
      if (Object.keys(matchingPerson).length >= 1) {
        console.log(true);
        return true
      } else {
        console.log(false)
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
     * Passes login parameters to the DAO
     * @param {String} name The name of the user.
     * @param {String}  surname The surname of our user.
     * @param {String}  email The mail address of our user.
     * @param {String} pnr The personal number of our user.
     * @param {String}  password The password of our user.
     * @param {String}  role_id The role identification of our user.
     */
  async register(name, surname, email, pnr, username, password, role_id) {
    try { await this.recruitDAO.register(name, surname, email, pnr, username, password, role_id); }
    catch (error) { console.log(error); }
  }
}

module.exports = { Controller: Controller, login: Controller.login, createController: Controller.createController, register: Controller.register };