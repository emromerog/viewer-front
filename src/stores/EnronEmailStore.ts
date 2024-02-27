import { defineStore } from 'pinia';

const GETAllEmailurl = 'http://localhost:8080/api/v1/emails';
const GETSearchEmailurl = 'http://localhost:8080/api/v1/emails/search/';

export const useEnronEmailStore = defineStore('enronEmailStore', {
  state: () => ({
    /*jsonData: [],
    showTable: false,*/
    searchTerm: "",
  searchResults: [],
  }),
  actions: {
    async handleSearchEmails () {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/emails/search/${this.searchTerm.value}`);
    
        if (response.ok) {
          const data = await response.json();
          // Actualizar los resultados de la búsqueda
          this.searchResults = data;
        } else {
          // Manejar errores en la respuesta
          console.error('Error en la solicitud:', response.status, response.statusText);
        }
      } catch (error) {
        // Manejar errores en la petición
        console.error('Se produjo un error al realizar la búsqueda:', error.message);
      }
    },
    /*** Maneja el evento change del input file*/
    /*async handleEmailSearch(event) {
        const searchTerm = event.target.querySelector('#default-search').value;
        //console.log("handleFileChange...", searchTerm);

        try {
            const response = await fetch(GETSearchEmailurl + searchTerm);
            if (response.ok) {
              console.log('Data obtenida correctamente.');
              this.jsonData = await response.json(); // Actualiza directamente la propiedad reactiva
              this.showTable = true; // Actualiza directamente la propiedad reactiva
              console.log(this.jsonData)
              return this.jsonData;
              } else {
                console.error('Error en la solicitud:', response.status, response.statusText);
              }
            } catch (error) {
              console.error('Se produjo un error al obtener la data: ', error.message);
            }
        
      },*/
      /** Valida que el archivo se cargue */
      /*async handleGetAllEmail() {
        console.log("handleGetAllEmail...");
        try {
          // Realizar la petición GET a la API
          const response = await fetch(GETAllEmailurl);
      
          // Verificar si la respuesta es exitosa (código 200)
          if (response.ok) {
            // Convertir la respuesta a JSON
            const data = await response.json();
            console.log(data)
            // Actualizar los resultados de la búsqueda
            searchResults.value = data;
            showTable.value = searchResults.value.length > 0;
          } else {
            // Manejar errores en la respuesta
            console.error('Error en la solicitud:', response.status, response.statusText);
          }
        } catch (error) {
          // Manejar errores en la petición
          console.error('Se produjo un error al realizar la búsqueda:', error.message);
        }        
      },*/
  }
});