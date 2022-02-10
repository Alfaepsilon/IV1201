const Sequelize = require("sequelize");
const Person = require("../model/Person");
/* This class is responsible for all database calls.
 */
class recruitDAO {
  /* Creates a new instance and connects to the database.
   */
  constructor() {
    //Environment variables initializes the sequelize database.
    this.database = new Sequelize(
      process.env.DATABASE_NAME,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASS,
      { host: process.env.DATABASE_HOST, dialect: process.env.DATABASE_DIALECT }
    );
    Person.createModel(this.database);
    console.log('CONSTRACTOR')

  }

  /* @async
   * Creates all non-included tables
   */
  async makeTables() {
    try {
      await this.database.authenticate();
      await this.database.sync({ force: false });
    } catch {
      console.log("Error authenticating or syncing database!");
    }
  }

  /* Returns true if the function matches a person's parameters
   * @param {string} username
   * @param {string} password
   * @returns {boolean}
   */
  static async login(username, password) {
    var matchingPerson = await Person.getUsers({
      where: { username: username, password: password },
    });
    if (Object.keys(matchingPerson).length > 1) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = recruitDAO;