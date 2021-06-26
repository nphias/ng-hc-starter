# Ng-Hc-Starter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2

If you want to install from commandline instead of cloning.. 
see the script at ng-starter.sh (which i will try to keep up to date)
The steps in the script require manual intervention and are designed to work with angular 12.0.2 

- Required Dependencies
 works with LTS node 14.x and nvm 7.x

IMPORTANT: Currently for this version we need to do a special install 
(legacy needed currently for mobx-angular hack):
 
`npm install --legacy-peer-deps`  

## Development server

Run `ng start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
(without holochain you will get a blank screen)

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
for build and watch use: `npm run watch`
(without holochain you will get a blank screen)

## mock
for mock development when you do not want to run holochain : `npm run mock`

## player2
for player2 UI (run a separate instance for a separate conductor instance): `npm run player2`
(without holochain you will get a blank screen)

