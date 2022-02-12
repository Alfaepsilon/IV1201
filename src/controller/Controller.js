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
}

module.exports = { Controller: Controller, login: Controller.login, createController: Controller.createController };
