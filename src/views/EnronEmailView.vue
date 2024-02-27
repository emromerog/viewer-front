<template>
  <!-- Search -->
  <div>
    <!-- Input de búsqueda -->
    <input
      v-model="searchTerm"
      type="search"
      placeholder="Search term email"
      @input="handleSearch"
    />

    <!-- Aquí puedes mostrar los resultados de la búsqueda o realizar la lógica que necesites -->
    <div v-if="searchResults.length > 0">
      <ul>
        <li v-for="(result, index) in searchResults" :key="index">
        </li>
      </ul>
    </div>
    <div v-else>No hay resultados.</div>
  </div>

  <!-- Tabla 
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table v-if="showTable" class="min-w-full">
            <thead class="bg-gray-200 border-b">
              <tr>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">#</th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">From</th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">To</th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">Subject</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" v-for="(item, index) in searchResults" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ index + 1 }}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ item.from }}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ item.to }}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ item.subject }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else>No hay datos para mostrar.</p>
        </div>
      </div>
    </div>
  </div>-->

  <table v-if="showTable" class="table-auto">
  <thead class="bg-gray-100">
    <tr>
      <th>#</th>
      <th>From</th>
      <th>To</th>
      <th>Subject</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200">
    <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" v-for="(item, index) in searchResults" :key="index">
      <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
      <td class="px-6 py-4 whitespace-nowrap">{{ item.from }}</td>
      <td class="px-6 py-4 whitespace-nowrap">{{ item.to }}</td>
      <td class="px-6 py-4 whitespace-nowrap">{{ item.subject }}</td>
    </tr>
  </tbody>
</table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEnronEmailStore } from "../stores/EnronEmailStore.ts";

const store = useEnronEmailStore();

const searchTerm = ref(''); // Variable para almacenar el término de búsqueda
const searchResults = ref([]); // Variable para almacenar los resultados de la búsqueda
const showTable = ref(false);

const handleSearch = async () => {
  try {
    // Realizar la petición GET a la API
    const response = await fetch(`http://localhost:8080/api/v1/emails/search/${searchTerm.value}`);

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
};
</script>

