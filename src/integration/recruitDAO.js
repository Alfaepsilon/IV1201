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
    const ns = cls.createNamespace(process.env.DB_NAME);
    Sequelize.useCLS(ns);
    this.database = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: process.env.DB_HOST, dialect: process.env.DB_DIALECT, dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false
          }
        }
      },
    );
    Person.createModel(this.database);
    Availability.createModel(this.database);
    Competence.createModel(this.database);
    Competence_profile.createModel(this.database);
    console.log("Contructing DAO")
  }
  /**
   * Returns the database
   * @returns {Database} database to be returned
   */

  getTransactions() {
    try {
      return this.database;
    } catch (error) {
      throw error
    }
  }
  /**
     * Returns true if the function matches a person's parameters
     * @param {String} username The username of the user.
     * @param {String}  password The password of our useful.
     * @return {Boolean} 
     */

  static async createDAO() {
    try {
      const recDAO = new recruitDAO();
      return recDAO;
    } catch (error) {
      throw error
    }
  }


  /**   Creates all non-included tables
     * @async 
     */
  async makeTables() {
    try {
      await this.database.authenticate();
      await this.database.sync({ force: false });
      console.log("Making Tables!");
    } catch (error) {
      throw error
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
    try {
      var matchingPersons = await Person.findAll({
        where: { username: username }
      });
      var check = false;
      var matchingPerson;
      for (let i = 0; i < Object.keys(matchingPersons).length; i++) {
        console.log(matchingPersons[i].get('password'));
        if (Person.validPassword(password, matchingPersons[i].get('password'))) {
          matchingPerson = matchingPersons[i].get({ plain: true });
          check = true;
        }
      }
      if (check) {
        console.log("valid");
        return matchingPersons;
      }
      else {
        console.log("invalid");
        return [];
      }
    } catch (err) {
      throw err;
    }
  }

  /**
     * Inserts a new person into the database with parameter values
     * @param {User} user  The user to register
     * @return {List} List of persons
     */
  async register(user) {
    try {
      await Person.create(
        { name: user.name, surname: user.surname, email: user.email, pnr: user.pnr, username: user.username, password: user.password, role_id: user.role_id }
      );
      var persons = await Person.findAll({
        where: { name: user.name, surname: user.surname, email: user.email, pnr: user.pnr, username: user.username, role_id: user.role_id }
      });
      return persons
    } catch (error) {
      throw error;
    }
  }

  /**
   * updates the default database values to include our bcrypt encryption
   **/
  async updateDefault() {
    try {
      await Person.update({ password: "LiZ98qvL8Lw" },
        { where: { username: "JoelleWilkinson" } });
      await Person.update({ password: "QkK48drV2Da" },
        { where: { username: "MartinCummings" } });
      await Person.update({ password: "EyD84euX5Nj" },
        { where: { username: "DanteMason" } });
      await Person.update({ password: "VdE34mqY2Xy" },
        { where: { username: "RisaMayer" } });
      await Person.update({ password: "NmK87boS4Lf" },
        { where: { username: "MaxwellBailey" } });
      await Person.update({ password: "LqK20ygU3Lw" },
        { where: { username: "EmiFlowers" } });
      await Person.update({ password: "OjP41mkY3Vb" },
        { where: { username: "HedleyArnold" } });
      await Person.update({ password: "LbH38urF4Kn" },
        { where: { username: "ArmandTodd" } });
      await Person.update({ password: "XoH15hnY3Bw" },
        { where: { username: "PhillipRamsey" } });
      await Person.update({ password: "MvZ46kfC1Kr" },
        { where: { username: "AustinMueller" } });
    } catch (error) {
      throw error
    }

  }

  /**
   * Returns a list of competences
   * @returns {Array} List of competences
   */
  async showCompetences() {
    try {
      var competences = await Competence.findAll();
      const array = [];
      for (let i = 0; i < Object.keys(competences).length; i++) {
        array.push(competences[i].get('name'));
      }
      return array;
    }
    catch (error) {
      throw error
    }
  }

  /**
     * Passes application data to the database
     * @param {Int} person_id personal id of the user that applies
     * @param {Int} competence_id id of the competence selected
     * @param {Date} from_date date to start work
     * @param {Date} to_date date to work until
     * @param {Int} years_of_experience amount of experience in years
     */
  async jobSubmission(person_id, competence_id, from_date, to_date, years_of_experience) {
    try {

      await Availability.create(
        { person_id: person_id, from_date: from_date, to_date: to_date });
      await Competence_profile.create(
        { person_id: person_id, competence_id: competence_id, years_of_experience: years_of_experience });
    }
    catch (error) {
      throw error
    }
  }
  /**
   * Returns ID of person
   * @param {String} username Username of person we want to get ID from
   * @returns {Array} Array of person id:s
   */

  async getPersonId(username) {
    try {
      var persons = await Person.findAll({
        where: { username: username }
      });
      const array = [];
      for (let i = 0; i < Object.keys(persons).length; i++) {
        array.push(persons[i].get('person_id'));
      }
      return array;
    }
    catch (error) {
      throw error
    }
  }
}
module.exports = { recruitDAO: recruitDAO, login: recruitDAO.login, makeTables: recruitDAO.makeTables, createDAO: recruitDAO.createDAO, register: recruitDAO.register, updateDefault: recruitDAO.updateDefault, getTransactions: recruitDAO.getTransactions, showCompetences: recruitDAO.showCompetences, jobSubmission: recruitDAO.jobSubmission, getPersonId: recruitDAO.getPersonId };

