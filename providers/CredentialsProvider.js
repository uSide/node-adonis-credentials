"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class InteractorProvider extends ServiceProvider {
  _registerCredentials() {
    this.app.singleton("Credentials", () => {
      const Helpers = this.app.use("Adonis/Src/Helpers");
      const Encryption = this.app.use("Adonis/Src/Encryption");
      const Config = this.app.use("Adonis/Src/Config");
      return new (require("../src/Credentials"))(Helpers, Encryption, Config);
    });
  }

  _registerCommands() {
    this.app.bind("Credentials/Encrypt", () => require("../commands/Encrypt"));
    this.app.bind("Credentials/Decrypt", () => require("../commands/Decrypt"));
  }

  register() {
    this._registerCredentials();
    this._registerCommands();
  }

  boot() {
    const ace = require("@adonisjs/ace");
    ace.addCommand("Credentials/Encrypt");
    ace.addCommand("Credentials/Decrypt");
  }
}

module.exports = InteractorProvider;
