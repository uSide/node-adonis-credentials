"use strict";

const yaml = require("js-yaml");
const path = require("path");
const fs = require("fs");

class Credentials {
  constructor(Helpers, Encryption, Config) {
    this.Helpers = Helpers;
    this.Encryption = new Encryption.constructor(
      Config.get("app.credentialsKey")
    );
  }

  encrypt(data) {
    return this.Encryption.encrypt(data);
  }

  decrypt(data) {
    return this.Encryption.decrypt(data);
  }

  get(filename) {
    if (
      this.Helpers.isAceCommand() &&
      process.argv.join().indexOf("credentials:") > -1
    ) {
      return {};
    }

    let encrypted = fs.readFileSync(
      path.join(
        this.Helpers.appRoot(),
        "config/credentials",
        `${filename}.enc`
      ),
      "utf8"
    );

    return yaml.safeLoad(this.decrypt(encrypted));
  }
}

module.exports = Credentials;
