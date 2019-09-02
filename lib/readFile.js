'use strict';

/**
 * @file readFile
 * @author xudeming208@126.com
 */

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fs = require('fs');

const readFile = (filename, encoding) => {
	return new _promise2.default((resolve, reject) => {
		fs.readFile(filename, encoding, (err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	});
};

module.exports = readFile;