import * as firebase from 'firebase';

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

const convert = (collectionName, firebaseConfig, csvString) => {
	const db = firebase.initializeApp(firebaseConfig).firestore();
	const csv = csvToArray(csvString);

	csv.forEach(line => db.collection(collectionName).add(line));
};

export default convert;
