module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        publish: [],
        npmRebuild: false,
        productName: 'vue-electron-typescript-boilerplate',
        nsis: {
          oneClick: false,
          allowToChangeInstallationDirectory: true
        },
        win: {
          target: ['nsis', 'portable']
        }
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
};
