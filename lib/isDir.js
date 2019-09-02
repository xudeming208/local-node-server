'use strict';

/**
 * @file isDir
 * @author xudeming208@126.com
 */

const fs = require('fs');

// 判断是否文件夹
module.exports = path => {
	try {
		return fs.statSync(path).isDirectory();
	} catch (e) {
		return false;
	}
};