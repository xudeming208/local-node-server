'use strict';

/**
 * @file readFile
 * @author xudeming208@126.com
 */

const path = require('path');
const mime = require('./mime');
const types = mime.types;
const download = mime.downloadTypeArr;

// 显示数据
const outputFile = (res, data, filename, ext) => {
	try {
		let headers = {
			"Access-Control-Allow-Origin": "*",
			'Cache-Control': 'no-cache,no-store',
			'X-Frame-Options': 'SAMEORIGIN',
			'X-Xss-Protection': '1; mode=block',
			'X-Content-Type-Options': 'nosniff',
			"Content-Type": (types[ext] ? types[ext] : 'text/plain') + ';charset=utf-8',
			'Content-Length': Buffer.byteLength(data, 'utf-8')
		};

		// 特殊格式下载
		if (download.includes(ext)) {
			let disposition = `attachment;filename=${encodeURI(path.basename(filename))}`;
			headers['Content-Disposition'] = disposition;
		}

		res.writeHead(200, headers);
		res.end(data);
	} catch (err) {
		res.writeHead(503, {
			'Content-Type': 'text/plain',
			'Cache-Control': 'no-cache,no-store'
		});
		console.dir(err);
		res.end(err.toString());
	}
}

module.exports = outputFile;