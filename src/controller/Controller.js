'use strict';

const recruitDAO = require('../integration/recruitDAO');

class Controller
{

  constructor()
  {
    this.recruitDAO = new recruitDAO();
  }

  static async createController()
  {
    const controller = new Controller();
    await controller.recruitDAO.makeTables();
    return controller;
  }

  async login(username, password) {
      var check_login = await this.recruitDAO.login(username, password);
      return check_login;
  }
}
module.exports = Controller;