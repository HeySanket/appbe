var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
function createToken(data) {
  console.log(data, "data");
  const token = jwt.sign(data, process.env.JWT_KEY);
  return token;
}
function verifyToken(token) {
  const decoded = jwt.verify(token, privateKey);
  return decoded;
}

module.exports = { createToken, verifyToken };
