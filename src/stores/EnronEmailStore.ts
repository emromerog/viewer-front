import { defineStore } from 'pinia';

const GETAllEmailurl = 'http://localhost:8080/api/v1/emails';
const GETSearchEmailurl = 'http://localhost:8080/api/v1/emails/search/';

export const useEnronEmailStore = defineStore('enronEmailStore', {
  state: () => ({
    jsonData: [],
    showTable: false,
  }),
  actions: {
    
    /*** Maneja el evento change del input file*/
    async handleEmailSearch(event) {
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
        
      },
      /** Valida que el archivo se cargue */
      async handleGetAllEmail() {
        console.log("handleGetAllEmail...");

        try {
            const response = await fetch(GETAllEmailurl);
            if (response.ok) {
              console.log('Data obtenida correctamente.', await response.json());
              
              this.jsonData = await response.json(); // Actualiza directamente la propiedad reactiva

              console.log(this.jsonData.value);
              this.showTable = true; // Actualiza directamente la propiedad reactiva
              return this.jsonData;
              } else {
                console.error('Error en la solicitud:', response.status, response.statusText);
              }
            } catch (error) {
              //console.error('Se produjo un error al obtener la data: ', error.message);
            }
      },
  }
});