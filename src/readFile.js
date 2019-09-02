'use strict';

/**
 * @file readFile
 * @author xudeming208@126.com
 */

const fs = require('fs');

const readFile = (filename, encoding) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, encoding, (err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data);
		})
	})
}

module.exports = readFile;