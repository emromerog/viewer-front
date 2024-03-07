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
  </div>

  <table v-if="showTable" class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th>#</th>
        <th>From</th>
        <th>To</th>
        <th>Subject</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr
        class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
        v-for="(item, index) in searchResults"
        :key="index"
      >
        <td scope="col" class="px-6 py-3">{{ index + 1 }}</td>
        <td scope="col" class="px-6 py-3">{{ item.from }}</td>
        <td scope="col" class="px-6 py-3">{{ item.to }}</td>
        <td scope="col" class="px-6 py-3">{{ item.subject }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useEnronEmailStore } from "../stores/EnronEmailStore.ts";



const store = useEnronEmailStore();

const searchTerm = ref(""); // Variable para almacenar el término de búsqueda
const searchResults = ref([]); // Variable para almacenar los resultados de la búsqueda
const showTable = ref(false);

const el = ref()

onMounted(() => {
  el.value // <div>
  console.log("padre")
})

const handleSearch = async () => {
  try {
    // Realizar la petición GET a la API
    const response = await fetch(
      `http://localhost:8080/api/v1/emails/search/${searchTerm.value}`
    );

    // Verificar si la respuesta es exitosa (código 200)
    if (response.ok) {
      // Convertir la respuesta a JSON
      const data = await response.json();
      console.log(data);
      // Actualizar los resultados de la búsqueda
      searchResults.value = data;
      showTable.value = searchResults.value.length > 0;
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
};
</script>
