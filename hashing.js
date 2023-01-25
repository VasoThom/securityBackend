import bcrypt from "bcrypt";

const db = [];

//anmelden
const signUp = async ({ username, password }) => {
  const salt = 10;

  const salted = await bcrypt.genSalt(salt);
  console.log(salted);
  const hashedSaltedPassword = await bcrypt.hash(password, salted);

  console.log("Hashed Password: " + hashedSaltedPassword);
  db.push({ username, password: hashedSaltedPassword });
  console.log("Datenbank", db);
};

const login = async ({ username, password }) => {
  const user = db.find((user) => user.username == username);
  //console.log(user);

  if (!user) {
    console.log("Nutzer nicht gefunden");
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);
  console.log(passwordCorrect);
  if (passwordCorrect) {
    console.log("login erfolgreich");
  } else {
    console.log("falsches Passwort");
  }
};

const testUser = {
  username: "Vaso",
  password: "bravecoders",
};

await signUp(testUser);

const newUser = {
  username: "ella",
  password: "siggi",
};

const wrongUser = {
  username: "rahman",
  password: "1996",
};
//await login(wrongUser);
await signUp(newUser);
await login(newUser);

const unsafeUser = {
  username: "Marcel",
  password: "1985",
};

const performBruteForce = async () => {
  for (let i = 0; i < 9999; i++) {
    let pwd = i.toString();
    pwd = "0".repeat(4 - pwd.length) + i;

    //console.log(pwd);
    if (i % 100 == 0) {
      console.log("Prufen", { pwd });
    }
    const foundPassword = await login({ username: "Vaso", password: pwd });
    if (foundPassword) {
      console.log("password found", i);
      break;
    }
  }
};
performBruteForce();
