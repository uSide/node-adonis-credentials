"use strict";

const { Command } = require("@adonisjs/ace");

class CredentialsDecrypt extends Command {
  async transform(encrypt = true) {
    const Helpers = use("Helpers");
    const Credentials = use("Credentials");
    const fs = use("fs");
    const path = use("path");
    const dir = path.join(Helpers.appRoot(), "config/credentials");

    const files = fs
      .readdirSync(dir)
      .filter(e => e.indexOf(encrypt ? ".yml" : ".enc") > -1);

    for (let file of files) {
      let filepath = path.join(dir, file.split(".")[0]);
      fs.writeFileSync(
        `${filepath}.${encrypt ? "enc" : "yml"}`,
        Credentials[encrypt ? "encrypt" : "decrypt"](
          fs.readFileSync(`${filepath}.${encrypt ? "yml" : "enc"}`, "utf8")
        )
      );
    }
  }
}

module.exports = CredentialsDecrypt;
