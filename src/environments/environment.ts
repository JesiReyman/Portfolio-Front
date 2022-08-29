// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//Acá tengo que poner la URL que usamos para poder conectarnos a la base
export const environment = {
  firebase: {
    projectId: 'portfolio-9dcf2',
    appId: '1:536918368244:web:66bf28107c0d68e20ae3a1',
    storageBucket: 'portfolio-9dcf2.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyCCIfYqqs3nqDGZVqmeA981TcL1x77zfu0',
    authDomain: 'portfolio-9dcf2.firebaseapp.com',
    messagingSenderId: '536918368244',
  },
  production: false,
  apiUrl: "http://localhost:8080"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
