// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebase: {
    apiKey: 'AIzaSyC7U2uGK-eaqs4NsJC-KXGMMHIk1_mkbHE',
    authDomain: 'igucapp.firebaseapp.com',
    databaseURL: 'https://igucapp.firebaseio.com',
    projectId: 'igucapp',
    storageBucket: 'igucapp.appspot.com',
    messagingSenderId: '593839568869',
  },
  //  firebase.initializeApp(config);
};
