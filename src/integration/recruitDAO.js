const Sequelize = require("sequelize");
const cls = require("cls-hooked");
const Person = require("../model/Person").Person;
/* This class is responsible for all database calls.
 */
class recruitDAO {
  /* Creates a new instance and connects to the database.
   */
  constructor() {
    //Environment variables initializes the sequelize database.
    
    const ns = cls.createNamespace(process.env.DB_NAME);
    Sequelize.useCLS(ns);
    // this.database = new Sequelize(
    //   process.env.DB_NAME,
    //   process.env.DB_USER,
    //   "nourIsHappym",
    //   //process.env.DB_PASS,
    //   { host: process.env.DB_HOST, dialect: process.env.DB_DIALECT }
    // );
    // Person.createModel(this.database);
    // console.log("Constructing recruitDAO");
    // }
    // catch{

    //   console.log("Nour2: Error somewhere in get transaction function");

    // }
    this.database = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      { host: process.env.DB_HOST, dialect: process.env.DB_DIALECT }
    );
    this.database.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    // errGen(err)
      /*
       * Logs errors to the console.
       */
      //   this.logger.logException(err);
        // res.status(500).send({error: 'Operation failed.' + err});    
    // console.error('Unable to connect to the database:', err);
  });
  }

  getTransactions() {
    try{
    return this.database;
  } catch
  {
   console.log("Nour2: Error somewhere in get transaction function");
   return null;

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
    } catch {
      console.log("Nour2: Error somewhere in createDAO function");
      return null;
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
    // try {
      console.log(await Person.findAll({
        where: { username: username }
      }))
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
      if (check) {
        console.log("valid");
        return matchingPersons;
      } else {
        console.log("invalid");
        return [];
      }
    // } catch (err) {
    //   console.log("Nour2: Error somewhere in login function" + err);
    //   throw err;
    // }
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
  async register(
    user //password has to be encrypted, role_id 1 is for recruiters and 2 is for applicants
  ) {
    try {
      await Person.create({
        name: user.name,
        surname: user.surname,
        email: user.email,
        pnr: user.pnr,
        username: user.username,
        password: user.password,
        role_id: user.role_id,
      });
      var isCreated = await Person.findAll({
        where: {
          name: user.name,
          surname: user.surname,
          email: user.email,
          pnr: user.pnr,
          username: user.username,
          role_id: user.role_id,
        },
      });
      return isCreated;
    } catch {
      console.log("Nour3: Error somewhere in register function");
    }
  }
  //updates the default database values to include our bcrypt encryption
  async updateDefault() {
    try {
      await Person.update(
        { password: "LiZ98qvL8Lw" },
        { where: { username: "JoelleWilkinson" } }
      );
      await Person.update(
        { password: "QkK48drV2Da" },
        { where: { username: "MartinCummings" } }
      );
      await Person.update(
        { password: "EyD84euX5Nj" },
        { where: { username: "DanteMason" } }
      );
      await Person.update(
        { password: "VdE34mqY2Xy" },
        { where: { username: "RisaMayer" } }
      );
      await Person.update(
        { password: "NmK87boS4Lf" },
        { where: { username: "MaxwellBailey" } }
      );
      await Person.update(
        { password: "LqK20ygU3Lw" },
        { where: { username: "EmiFlowers" } }
      );
      await Person.update(
        { password: "OjP41mkY3Vb" },
        { where: { username: "HedleyArnold" } }
      );
      await Person.update(
        { password: "LbH38urF4Kn" },
        { where: { username: "ArmandTodd" } }
      );
      await Person.update(
        { password: "XoH15hnY3Bw" },
        { where: { username: "PhillipRamsey" } }
      );
      await Person.update(
        { password: "MvZ46kfC1Kr" },
        { where: { username: "AustinMueller" } }
      );
    } catch {
      console.log("Nour2: Error somewhere in update defaukt function");
    }
  }
}
module.exports = {
  recruitDAO: recruitDAO,
  login: recruitDAO.login,
  makeTables: recruitDAO.makeTables,
  createDAO: recruitDAO.createDAO,
  register: recruitDAO.register,
  updateDefault: recruitDAO.updateDefault,
  getTransactions: recruitDAO.getTransactions,
};
