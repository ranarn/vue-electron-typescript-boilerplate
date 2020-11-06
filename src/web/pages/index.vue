<template>
  <v-container fluid>
    <v-row justify="center" class="mt-2">
      <h1><i class="fab fa-node" /> Hello Boilerplate</h1>
    </v-row>

    <v-row justify="center" no-gutters class="pl-4 pr-4 mt-4">
      <v-btn color="primary" block tile @click="submit">Send Hello to ipcMain</v-btn>
    </v-row>
    <v-row justify="center" no-gutters class="pl-4 pr-4 mt-4">
      <v-card class="mx-auto" width="100%" tile>
        <v-card-text>
          <div class="font-weight-bold">Reply from ipcMain:</div>
          <p v-show="reply" class="subtitle-1 font-weight-bold primary--text">{{ message }}</p>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { ipcRenderer } from 'electron';

export default Vue.extend({
  data () {
    return {
      reply: false,
      message: ''
    };
  },
  created () {
    ipcRenderer.on('msg:reply', (e: any, message: string) => {
      this.message = message;
      this.reply = true;
    });
  },
  methods: {
    submit () {
      ipcRenderer.send('msg:hello', 'Hi there!');
    }
  }
});
</script>
