"use strict";

const lodash = require("lodash");
const yaml = require("js-yaml");
const path = require("path");
const fs = require("fs");

class Credentials {
  constructor(Helpers, Encryption, Config) {
    this.Helpers = Helpers;
    this.Encryption = new Encryption.constructor(
      Config.get("app.credentialsKey")
    );
    this._credentials = {};

    if (
      !this.Helpers.isAceCommand() &&
      process.argv.join().indexOf("credentials:") == -1
    ) {
      let files = fs
        .readdirSync(path.join(this.Helpers.appRoot(), "config/credentials"))
        .filter(e => e.indexOf(".enc") > -1)
        .map(e => e.split(".")[0]);

      for (let filename of files) {
        let encrypted = fs.readFileSync(
          path.join(
            this.Helpers.appRoot(),
            "config/credentials",
            `${filename}.enc`
          ),
          "utf8"
        );

        this._credentials[filename] = yaml.safeLoad(this.decrypt(encrypted));
      }
    }
  }

  encrypt(data) {
    return this.Encryption.encrypt(data);
  }

  decrypt(data) {
    return this.Encryption.decrypt(data);
  }

  get(key, defaultValue) {
    lodash.get(this._credentials, key, defaultValue);
  }
}

module.exports = Credentials;
