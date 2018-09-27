"use strict";

const Base = require("./Base");

class CredentialsEncrypt extends Base {
  static get signature() {
    return "credentials:encrypt";
  }

  static get description() {
    return "Encrypt secure credentials";
  }

  async handle() {
    await this.transform(true);
    this.info("Credentials encrypted");
  }
}

module.exports = CredentialsEncrypt;
