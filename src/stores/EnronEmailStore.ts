import { defineStore } from "pinia";
import { Email } from "../models/Email.ts";

const apiUrl = import.meta.env.VITE_API_URL;
//const GETAllEmailsUrl = "http://localhost:8080/api/v1/emails";
//const GETSearchEmailsUrl = "http://localhost:8080/api/v1/emails/search/";
//const POSTSearchEmailsUrl = "http://localhost:8080/api/v1/emails/";
const GETAllEmailsUrl = `${apiUrl}/api/v1/emails`;
const GETSearchEmailsUrl = `${apiUrl}/api/v1/emails/search/`;
const POSTSearchEmailsUrl = `${apiUrl}/api/v1/emails`;

export const useEnronEmailStore = defineStore("enronEmailStore", {
  state: () => ({
    emails: [] as Email[],
  }),
  actions: {
    async searchEmails(term: string) {
      try {
        const response = await fetch(GETSearchEmailsUrl + term);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        this.emails = data as Email[];
      } catch (error) {
        console.error("Error al obtener los emails:", error.message);
      }
    },
    async getAllEmails() {
      try {
        const response = await fetch(GETAllEmailsUrl);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        this.emails = data as Email[];
      } catch (error) {
        console.error("Error al obtener los emails:", error.message);
      }
    },
    async searchEmailsPOST(searchTerm: string) {
      try {
        const response = await fetch(POSTSearchEmailsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: 1, itemsPerPage: 25, term: searchTerm }),
          //body: JSON.stringify({ term: searchTerm }),
        });
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data.items);
        this.emails = data.items as Email[];
      } catch (error) {
        console.error("Error al obtener los emails:", error.message);
      }
    },
  },
});
