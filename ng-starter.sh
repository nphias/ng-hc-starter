##ng-hc-holochain batch script
## make sure you are using the ACTIVE LTS node version 12.0.2 (node 14)

## install anglular cli
npm install -g @angular/cli

## new minimal project
ng new ng-hc-starter --skip-tests --minimal

## add tailwind
 npm install -D tailwindcss
 add config file tailwind.config.js
 
 module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};


# add styles styles.scss:
 
@import 'tailwindcss/base';

@import 'tailwindcss/components';

@import 'tailwindcss/utilities';


## install the holochain conductor api
npm install --save-exact @holochain/conductor-api

## install supporting dependencies  "mobx-angular": "^4.3.0",
npm install --save js-base64
npm install --save mobx-angular mobx --legacy-peer-deps

## mock config add "mock":"ng serve --configuration mock"
"mock": {
              "buildOptimizer": false,
              "optimization": false,
              "vendorChunk": true,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true,
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.mock.ts"
                }
              ]
            }
            
"mock": {
              "browserTarget": "ng-hc-starter:build:mock"
            }
            
            
## set tsconfig environment path
"paths": {
      "@environment": ["./src/environments/environment.ts"]
    },

## set allowsyntheticImports to true in tsconfig
 "allowSyntheticDefaultImports": true,
    
## in index.html : body class="bg-gray-900"

## buffer hack... temporary
in polyfill.ts:  
 (window as any).global = window;
 global.Buffer = global.Buffer || require('buffer').Buffer;
 
 npm install buffer --save-dev
 
  






