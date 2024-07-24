/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("6627de282c12549a9f85");

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
        return userAccount;
      }
    } catch (error) {
      console.log("Appwrite serive :: Create Account :: error", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("Appwrite serive :: Login  :: error", error);
      // throw error;
    }
  }

  /*   async getCurrentUser() {
    try {
      const user = await this.account.get();
      if (user) {
        return user;
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }

    return null;
  }
 */
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      if (error.code === 401) {
        console.log(
          "Appwrite service :: getCurrentUser :: User not authenticated"
        );
      } else {
        console.log("Appwrite service :: getCurrentUser :: error", error);
      }
      return null;
    }
  }

  async signOut() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}
const authService = new AuthService();
export default authService;
