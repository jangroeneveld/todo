# React Webpack Typescript Starter
Minimal starter kit with hot module replacement (HMR) for rapid development.

* **[React](https://facebook.github.io/react/)** (15.x)
* **[Webpack](https://webpack.js.org/)** (3.x)
* **[Typescript](https://www.typescriptlang.org/)** (2.x)
* **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** using [React Hot Loader](https://github.com/gaearon/react-hot-loader) (3.x)
* [SASS](http://sass-lang.com/)
  
## Installation
1. Clone/download repo
2. `npm install`
3. Create a file with your firebase credentials at `src/resources/firebase.config.json`

## Usage
**Development**

`npm start`

* Build app continously (HMR enabled)
* App served @ `http://localhost:8080` 

**Production**

`npm run start-prod`

* Build app once (HMR disabled)
* App served @ `http://localhost:3000`

**Setting up depolyment**

`firebase init`
select `firestore` and `hosting`

**Deployment**

`npm run build`
`firebase deploy`

---

**All commands**

Command | Description
--- | ---
`npm run start-dev` | Build app continously (HMR enabled) and serve @ `http://localhost:8080`
`npm run start-prod` | Build app once (HMR disabled) and serve @ `http://localhost:3000`
`npm run build` | Build app to `/dist/bundle.min.js` 
`npm run test` | Run tests
`npm run lint` | Run Typescript and SASS linter
`npm run lint:ts` | Run Typescript linter
`npm run lint:sass` | Run SASS linter
`npm run start` | (alias of `npm run start-dev`)
