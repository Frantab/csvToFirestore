# csvToFirebase
Realy basic (not smart we can say STUPID) javascript tool for converting data from csv file to firebase firestore.
<span style="color:orange">I created it for one my specific use. Contact me if you want something like this but you are not sure if this is solution of you problem :-)</span>

## Installation
Install using npm:
```
npm install --save-dev csvToFirebase
```

## Usage
Please follow these steps. This script was created for one quick purpose to convert basic csv to basic firestore collection.

### 1) Create empty dir and go in it.
```
mkdir what_ever
cd what_ever
```
### 2) Initialize npm, install basic bundle-able enviroment and install `csvToFirebase`.
```
npm init --yes
npm install --save-dev webpack @babel/core @babel/preset-env babel-loader webpack-cli csvToFirebase
```
### 3) Edit package.json and create `webpack.config.js` file.
Replace `"scripts"` array in package.json for this:
```JSON
"scripts": {
    "start": "webpack --mode production"
},
```
Create `webpack.config.js`:
```
touch webpack.config.js
```
Insert this code below in it:
```javascript
// IMPORTS
const path = require('path');

// LOADERS
const jsLoader = {
	test: /\.js$/,
	exclude: /node_modules/,
	use: {
		loader: 'babel-loader'
	}
};

module.exports = {
	entry: './main.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'result.js'
	},
	module: {
		rules: [jsLoader]
	}
};
```
### 4) Copy or move your csv file into `what_ever` folder and create `main.js` file.
Create `main.js` in `what_ever` folder:
```
touch main.js
```
Insert code below into `main.js`:
```javascript
import * as csvToFirebase from 'csvToFirebase';

// Take this config from firebase console.
const config = {
    apiKey: YOUR_API_KEY,
    authDomain: YOUR_AUTH_DOMAIN,
    databaseURL: YOUR_DATABASE_URL,
    projectId: YOUR_PROJECT_ID,
    storageBucket: YOUR_STORAGE_BUCKET,
    messagingSenderId: YOUR_MESSAGING_SENDER_ID
};
const button = document.querySelector('#button');
const completed = document.createElement('div');

button.addEventListener('click', () => {
    document.body.removeChild(button);
    
    csvToFirebase.convert('COLLECTION_NAME', 'YOUR_CSV_FILE.csv', config);

    completed.innerHTML = 'CONVERTED!'
    completed.style.cssText = 'width: 200px; height: 200px; background-color: green; margin: 30px auto;'
    document.body.appendChild(completed);
});
```

### 5) create `index.html` in `what_ever` folder.
```
touch index.html
```
Insert code below into `index.html`
```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>csvToFirebase</title>
    </head>
    <body>
        <div id="button" style="width: 200px; height: 200px; background-color: red; margin: 30px auto;">CONVERT!</div>
        <script src="dist/result.js"></script>
    </body>
</html>
```

### 6) Build what you prepared.
```
npm start
```
### You `what_ever` folder should looks like this:
```

```
### 7) open `index.html` in your favourite browser (best option would be firefox beacose of CORS policy).
By clicked on Convert button you will start converting.

## <span style="color:orange">ATTENTION: as I said before, this script is realy "stupid". There is no ID checking and no error handler. If you are going to use this tool, please use it with consideration.</span>