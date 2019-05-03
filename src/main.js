import * as firebase from 'firebase';

const csvFileToString = (path, success, error) => {
	const csv = new XMLHttpRequest();

	csv.onload = () => success(csv.response);
	csv.onerror = err => error(err);

	csv.open('GET', path);
	csv.send();
};

const csvToArray = csvString => {
	const lines = csvString.split('\n');
	const keys = lines.shift().split(';');

	return lines.map(line => {
		const result = {};

		line = line.split(';');

		keys.forEach((key, index) => {
			result[key] = line[index];
		});

		return result;
	});
};

export const convert = (collectionName, pathToCsv, firebaseConfig) => {
	const db = firebase.initializeApp(firebaseConfig).firestore();

	csvFileToString(pathToCsv, response => {
		const csv = csvToArray(response);

		csv.forEach(line => db.collection(collectionName).add(line));
	}, error => console.log(error));
};
