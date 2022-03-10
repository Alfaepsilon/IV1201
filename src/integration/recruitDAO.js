const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const Person = require('../model/Person').Person;
/* This class is responsible for all database calls.
 */
class recruitDAO {
  /* Creates a new instance and connects to the database.
   */
  constructor() {
    //Environment variables initializes the sequelize database.
    const ns = cls.createNamespace(process.env.DB_NAME);
    Sequelize.useCLS(ns);
    this.database = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      { host: process.env.DB_HOST, dialect: process.env.DB_DIALECT }
    );
    Person.createModel(this.database);
    console.log('Constructing recruitDAO')
  }

  getTransactions() {
    return this.database;
  }

  /**
     * Returns true if the function matches a person's parameters
     * @param {String} username The username of the user.
     * @param {String}  password The password of our useful.
     * @return {Boolean} 
     */

  static async createDAO() {
    const recDAO = new recruitDAO();
    return recDAO;
  }


  /**   Creates all non-included tables
     * @async 
     */
  async makeTables() {
    try {
      await this.database.authenticate();
      await this.database.sync({ force: false });
      console.log("Making Tables!");
    } catch {
      console.log("Error authenticating or syncing database!");
    }
  }

  /**
     * Returns true if the function matches a person's parameters
     * @param {String} username The username of the user.
     * @param {String}  password The password of our useful.
     * @return {Boolean} 
     */

  async login(username, password) {
    console.log("Logging in!");
    var matchingPersons = await Person.findAll({
      where: { username: username}
    });
    var check = false;
    var matchingPerson;
    for (let i = 0; i < Object.keys(matchingPersons).length; i++){
      console.log(matchingPersons[i].get('password'));
      if(Person.validPassword(password, matchingPersons[i].get('password')))
      {
        matchingPerson = matchingPersons[i].get({plain: true});
        check = true;
      }
    }
    if(check)
    {
      console.log("valid");
      return matchingPersons;
    }
    else
    {
      console.log("invalid");
      return [];
    }
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
  async register(user) //password has to be encrypted, role_id 1 is for recruiters and 2 is for applicants
  {
    await Person.create(
      { name: user.name, surname: user.surname, email: user.email, pnr: user.pnr, username: user.username, password: user.password, role_id: user.role_id }
    );
    var isCreated = await Person.findAll({
      where: { name: user.name, surname: user.surname, email: user.email, pnr: user.pnr, username: user.username, role_id: user.role_id }
    });
    return isCreated
  }
  //updates the default database values to include our bcrypt encryption
  async updateDefault()
  {
    const joelle = await Person.create({ username: "JoellerWilkinson" });
    joelle.password = "test";
    await joelle.save();
    const martin = await Person.create({ username: "MartinCummings" });
    martin.password = "test";
    await martin.save();
    const dante = await Person.create({ username: "DanteMason" });
    dante.password = "test";
    await dante.save();
    const risa = await Person.create({ username: "RisaMayer" });
    risa.password = "test";
    await risa.save();
    const maxwell = await Person.create({ username: "MaxwellBailey" });
    maxwell.password = "test";
    await maxwell.save();
    const emi = await Person.create({ username: "EmiFlowers" });
    emi.password = "test";
    await emi.save();
    const hedley = await Person.create({ username: "HedleyArnold" });
    hedley.password = "test";
    await hedley.save();
    const armand = await Person.create({ username: "ArmandTodd" });
    armand.password = "test";
    await armand.save();
    const phillip = await Person.create({ username: "PhillipRamsey" });
    phillip.password = "test";
    await phillip.save();
    const austin = await Person.create({ username: "AustinMueller" });
    austin.password = "test";
    await austin.save();
  }
}
module.exports = { recruitDAO: recruitDAO, login: recruitDAO.login, makeTables: recruitDAO.makeTables, createDAO: recruitDAO.createDAO, register: recruitDAO.register, updateDefault: recruitDAO.updateDefault, getTransactions: recruitDAO.getTransactions };