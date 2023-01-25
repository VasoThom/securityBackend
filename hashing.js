import bcrypt from "bcrypt";

const db = [];

//anmelden
const signUp = async ({ username, password }) => {
  const salt = 12;

  const salted = await bcrypt.genSalt(salt);
  console.log(salted);
  const hashedSaltedPassword = await bcrypt.hash(password, salted);

  console.log("Hashed Password: " + hashedSaltedPassword);
  db.push({ username, password: hashedSaltedPassword });
  console.log("Datenbank", db);
};

const login = async ({ username, password }) => {};

const testUser = {
  username: "Vaso",
  password: "bravecoders",
};

await signUp(testUser);
