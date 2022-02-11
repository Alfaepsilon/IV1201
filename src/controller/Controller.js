"use strict";

const recruitDAO = require('../integration/recruitDAO').recruitDAO;

class Controller {
  constructor() {
    this.recruitDAO = new recruitDAO();
  }

  static async createController() {
    const controller = new Controller();
    await controller.recruitDAO.makeTables();
    return controller;
  }

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
