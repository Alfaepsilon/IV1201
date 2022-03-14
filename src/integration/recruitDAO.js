const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const Person = require('../model/Person').Person;
const Availability = require('../model/Availability').Availability;
const Competence = require('../model/Competence').Competence;
const Competence_profile = require('../model/Competence_profile').Competence_profile;
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
    Availability.createModel(this.database);
    Competence.createModel(this.database);
    Competence_profile.createModel(this.database);
    console.log('Constructing recruitDAO');
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
    await Person.update({password: "LiZ98qvL8Lw"},
    {where: {username: "JoelleWilkinson" }});
    await Person.update({password: "QkK48drV2Da"},
    {where: {username: "MartinCummings" }});
    await Person.update({password: "EyD84euX5Nj"},
    {where: {username: "DanteMason" }});
    await Person.update({password: "VdE34mqY2Xy"},
    {where: {username: "RisaMayer" }});
    await Person.update({password: "NmK87boS4Lf"},
    {where: {username: "MaxwellBailey" }});
    await Person.update({password: "LqK20ygU3Lw"},
    {where: {username: "EmiFlowers" }});
    await Person.update({password: "OjP41mkY3Vb"},
    {where: {username: "HedleyArnold" }});
    await Person.update({password: "LbH38urF4Kn"},
    {where: {username: "ArmandTodd" }});
    await Person.update({password: "XoH15hnY3Bw"},
    {where: {username: "PhillipRamsey" }});
    await Person.update({password: "MvZ46kfC1Kr"},
    {where: {username: "AustinMueller" }});
  }

  async showCompetences()
  {
    var competences = await Competence.findAll();
    const array = [];
    for (let i = 0; i < Object.keys(competences).length; i++){
      array.push(matchingPersons[i].get('name'));
    }
    return array;
  }

  async jobSubmission(person_id, competence_id, from_date, to_date, years_of_experience)
  {
    await Availability.create(
      { person_id: person_id, from_date: from_date, to_date: to_date });
    await Competence_profile.create(
      { person_id: person_id, competence_id: competence_id, years_of_experience: years_of_experience });
  }

}
module.exports = { recruitDAO: recruitDAO, login: recruitDAO.login, makeTables: recruitDAO.makeTables, createDAO: recruitDAO.createDAO, register: recruitDAO.register, updateDefault: recruitDAO.updateDefault, getTransactions: recruitDAO.getTransactions };
