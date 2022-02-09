'use strict';

import Integration from "../integration/Integration.js";

  /**
   * Login a user. This is not a real login since no password is required. The
   * only check that is performed is that the username exists in the database.
   *
   * @param {string} username: The username of the user logging in.
   * @param {string} password: The password of the user logging in.
   * @return {User} The logged in user if login succeeded, or null if login
   *                failed.
   * @throws Throws an exception if unable to attempt to login the specified
   *         user.
   */
  function login(username, password) {
      var check_login = await this.Integration.login(username, password);
      if (check_login === false) {
        return false;
      }
      else if(check_login === true){
        return true;
      }
  }
module.exports = Controller;