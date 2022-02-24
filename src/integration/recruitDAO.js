const Sequelize = require('sequelize');
const Person = require('../model/Person');
/**
 * This class is responsible for all database calls.
 */
class recruitDAO
{
    /**
     * Creates a new instance and connects to the database.
     */
    constructor()
    {
        //Environment variables initializes the sequelize database.
        this.database = new Sequelize(
            process.env.DATABASE_NAME,
            process.env.DATABASE_USER,
            process.env.DATABASE_PASS,
            {host: process.env.DATABASE_HOST, 
            dialect: process.env.DATABASE_DIALECT}
        );
        Person.createModel(this.database);
    }

    /**
     * @async
     * Creates all non-included tables
     */
    async makeTables()
    {
        try
        {
            await this.database.authenticate();
            await this.database.sync({force: false});
        }
        catch
        {
            console.log("Error authenticating or syncing database!");
        }
    }

    /**
     * Returns true if the function matches a person's parameters
     * @param {string} username
     * @param {string} password
     * @returns {boolean}
     */

  async login(username, password) {
    console.log("Logging in!");
    /*await Person.sync({ force: false }).then(function () {
      Person.create({
        username: username,
        password: password
      })
    }); */
    var matchingPerson = await Person.findAll({
      where: { username: username, password: password }
    });
    return matchingPerson;
  }

  /**
     * Inserts a new person into the database with parameter values
     * @param {String} name The name of the user.
     * @param {String}  surname The surname of our user.
     * @param {String}  email The mail address of our user.
     * @param {String} pnr The personal number of our user.
     * @param {String}  password The password of our user.
     * @param {String}  role_id The role identification of our user.
     */
  async register(name, surname, email, pnr, username, password, role_id) //password has to be encrypted, role_id 1 is for recruiters and 2 is for applicants
  {
    await Person.create(
      {name: name, surname: surname, email: email, pnr: pnr, username: username, password: password, role_id: role_id}
    );
  }

}
module.exports = { recruitDAO: recruitDAO, login: recruitDAO.login, makeTables: recruitDAO.makeTables, createDAO: recruitDAO.createDAO, register: recruitDAO.register };
