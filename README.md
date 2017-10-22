# React Webpack Typescript Starter
Minimal starter kit with hot module replacement (HMR) for rapid development.

* **[React](https://facebook.github.io/react/)** (15.x)
* **[Webpack](https://webpack.js.org/)** (3.x)
* **[Typescript](https://www.typescriptlang.org/)** (2.x)
* **[Hot Module Replacement (HMR)](https://webpack.js.org/concepts/hot-module-replacement/)** using [React Hot Loader](https://github.com/gaearon/react-hot-loader) (3.x)
* **[React Material UI](https://material-ui-1dab0.firebaseapp.com/)** (1.x)
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