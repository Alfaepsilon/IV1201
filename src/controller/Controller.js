"use strict";

const recruitDAO = require("../integration/recruitDAO");

class Controller {
  constructor() {
    this.recruitDAO = new recruitDAO();
  }

  static async createController() {
    const controller = new Controller();
    await controller.recruitDAO.makeTables();
    return controller;
  }

  static async login(username, password) {
    console.log(username);
    console.log(password);
    try {
      var check_login = await this.recruitDAO.login(username, password);
      return check_login;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { Controller: Controller, Login: Controller.login };
