const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { passBcrypt } = require("../reuseCom/passwordBcrypt");
function extractGmailAddresses(inputString) {
  const gmailRegex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/g;
  const matches = inputString.match(gmailRegex);
  return matches || [];
}
router.put("/", async (req, res) => {
  const { gmail } = req.query;
  const onlyGmail = await extractGmailAddresses(gmail)[0];
  const password = passBcrypt(req.body.ConfirmNewPassword);
  if (onlyGmail) {
    try {
      const data = await User.findOneAndUpdate(
        { gmail: onlyGmail },
        { password }
      );
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

module.exports = router;
