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
	entry: './src/main.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.min.js'
	},
	module: {
		rules: [jsLoader]
	}
};
