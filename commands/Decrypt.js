"use strict";

const Base = require("./Base");

class CredentialsDecrypt extends Base {
  static get signature() {
    return "credentials:decrypt";
  }

  static get description() {
    return "Decrypt secure credentials";
  }

  async handle() {
    await this.transform(false);
    this.info("Credentials decrypted");
  }
}

module.exports = CredentialsDecrypt;
