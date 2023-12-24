const bcrypt = require("bcrypt");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
function passBcrypt(password) {
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
function passNcrypt(password, DbPass) {
  const hash = bcrypt.compareSync(password, DbPass);
  return hash;
}

module.exports = { passBcrypt, passNcrypt };
