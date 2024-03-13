import { defineStore } from "pinia";

const GETAllEmailsUrl = "http://localhost:8080/api/v1/emails";
const POSTSearchEmailsUrl = "http://localhost:8080/api/v1/emails/search/";

export const useEnronEmailStore = defineStore("enronEmailStore", {
  state: () => ({
    searchTerm: "",
    emailsSearchResult: [],
    emails: [],
  }),
  actions: {
    async handleSearchEmails() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/emails/search/${this.searchTerm.value}`
        );

        if (response.ok) {
          const data = await response.json();
          // Actualizar los resultados de la búsqueda
          this.searchResults = data;
        } else {
          // Manejar errores en la respuesta
          console.error(
            "Error en la solicitud:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        // Manejar errores en la petición
        console.error(
          "Se produjo un error al realizar la búsqueda:",
          error.message
        );
      }
    },
    getAllEmails() {
      fetch(GETAllEmailsUrl)
        .then((response) => response.json())
        //.then((data) => console.log(data));
        .then((data) => {
          this.emails.values = data;
        });
    },
    searchEmails() {
      fetch(POSTSearchEmailsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page: 1, itemsPerPage: 25 }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
  },
});
