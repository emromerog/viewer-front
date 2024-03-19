<template>
  <v-app>
    <v-container>
      <!-- Search -->
      <div class="flex items-center mt-4">
        <!-- Input de búsqueda -->
        <input
          v-model="searchTerm"
          type="search"
          placeholder="Search term email"
          @input="search"
          class="px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <v-data-table
        :headers="emailsHeaders"
        :items="emails"
        item-value="content"
        show-expand
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Enron Emails</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:expanded-row="{ columns, item }">
          <tr :key="item.messageId">
            <td :colspan="columns.length">Content: {{ item.content }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </v-app>

  <!--<table
    v-if="showTable"
    class="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
  >
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
    >
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
        v-for="(item, index) in emails"
        :key="index"
      >
        <td scope="col" class="px-6 py-3">{{ index + 1 }}</td>
        <td scope="col" class="px-6 py-3">{{ item.from }}</td>
        <td scope="col" class="px-6 py-3">{{ item.to }}</td>
        <td scope="col" class="px-6 py-3">{{ item.subject }}</td>
      </tr>
    </tbody>
  </table>-->
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Email } from "../models/Email.ts";
import { useEnronEmailStore } from "../stores/EnronEmailStore.ts";

const emails = ref<Email[]>([]);
const store = useEnronEmailStore();

const emailsHeaders = [
  { title: "From", key: "from" },
  { title: "To", key: "to" },
  { title: "Subject", key: "subject" },
];

const searchTerm = ref(""); // Variable para almacenar el término de búsqueda

onMounted(async () => {
  await handleSearch();
});

const handleSearch = async () => {
  if (searchTerm.value === "") {
    await store.getAllEmails();
  } else {
    await store.searchEmailsPOST(searchTerm.value);
  }
  emails.value = store.emails;
};

const search = async () => {
  await handleSearch();
};
</script>
