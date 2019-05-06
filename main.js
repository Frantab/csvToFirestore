#!/usr/bin/env node --harmony

const program = require('commander');

program
    .version('1.0.0')
    .option('-F, --firebase-config [firebaseConfig]', 'name of firebase firestore config file in the root folder')
    .option('-C, --csv [csv]', 'name of csv file in the root folder')
    .option('-c, --collection [collection]', 'name of firestore collection')
    .parse(process.argv);

// Check if all required options are entered.
if (!program.firebaseConfig) {
    console.error('Required option --firebase-config is missing!');
    return;
} else if (!program.csv) {
    console.error('Required option --csv is missing!');
    return;
} else if (!program.collection) {
   console.error('Required option --collection is missing!');
   return;
}

/**
 * Firebase taken from https://www.npmjs.com/package/firebase.
 * @type {object}
 */
const firebase = require('firebase');
/**
 * Fs taken from https://www.npmjs.com/package/fs.
 * @type {object}
 */
const fs = require('fs');
/**
 * This variable will contain firebase config.
 * @type {string}
 */
let firebaseConfig = {};

try {
    firebaseConfig = require(`${program.firebaseConfig}`).config;
} catch(error) {
    console.error(`Required option --firebase-config contains name of file (${program.firebaseConfig}) which does not exist.`);
    return;
}

/**
 * This function convert csv string into array.
 * @param {string} csvString 
 * @returns {array}
 */
const csvToArray = csvString => {
    /** @type {array} */
    const lines = csvString.split('\n');
    /** @type {array} */
    const keys = lines.shift().split('; ');

    return lines.map(line => {
        const resultLine = {};

        line = line.split('; ');
        keys.forEach((key, index) => resultLine[key] = line[index]);
        return resultLine;
    });
};

/**
 * Instance of firestore.
 * @type {object}
 */
const db = firebase.initializeApp(firebaseConfig).firestore();

csvString = fs.readFile(`${program.csv}`, 'utf8', (error, csvString) => {
    if (error && error.code === 'ENOENT') {
        console.error(`Csv file ${program.csv} was not found.`);
        return;
    } else if (error) {
        throw error;
    }

    /** @type {array} */
    const csvArray = csvToArray(csvString);

    csvArray.forEach(line => {
        db.collection(program.collection).add(line);
    });
});
