# csvtofirestore
Realy basic (not smart we can say STUPID) javascript tool for converting data from csv file to firebase firestore.
<span style="color:orange">I created it for one my specific use. Contact me if you want something like this but you are not sure if this is solution of you problem :-)</span>

## Installation
Install using npm:
```
npm i -g @brandund/csvtofirestore
```

## Usage

#### 1) Create empty dir and initialize npm in it.
```bash
mkdir what_ever
cd what_ever
npm init --yes
```
#### 2) Install `@brandund/csvtofirestore`.
```bash
npm i -g @brandund/csvtofirestore
```
#### 3) Create `firebaseConfig.js` and add config of your firebase project into it.
```bash
touch firebaseConfig.js
```
example of `firebaseConfig.js`:
```javascript
module.exports = {
    config: {
        apiKey: "<API_KEY>",
        authDomain: "<AUTH_DOMAIN>",
        databaseURL: "<DATABASE_URL>",
        projectId: "<PROJECT_ID>",
        storageBucket: "<STORAGE_BUCKET",
        messagingSenderId: "<MESSAGING_SENDER_ID>"
    }
};
```
#### 4) Copy your `.csv` file into `what_ever` folder.
#### 5) Run `csvtofirestore` tool.
```bash
csvtofirestore -F 'firebaseConfig.js' -C 'data.csv' -c 'users'
```

## Options
```
-V, --version                           output the version number
-F, --firebase-config [firebaseConfig]  name of firebase firestore config file in the root folder
-C, --csv [csv]                         name of csv file in the root folder
-c, --collection [collection]           name of firestore collection
-h, --help                              output usage information
```