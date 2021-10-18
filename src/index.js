'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const path = require('path');
const iswin = process.platform == 'win32';

const nodeopen = require('nodeopen');
const mime = require('./mime');
const bufferTypeArr = mime.bufferTypeArr;
const isDir = require('./isDir');
const readFile = require('./readFile');
const output = require('./output');

// init
const init = config => {
	let defaultIp = iswin ? '127.0.0.1' : '0.0.0.0';
	let ip = config.ip || defaultIp;
	let port = config.port || 8080;

	// 设置协议
	let scheme = http.createServer;
	let schemeName = 'http';
	switch (config.scheme) {
		case 'https':
			scheme = https.createServer;
			schemeName = 'https';
			break;
		default:
			scheme = http.createServer;
			schemeName = 'http';
	}

	let options = {
		key: fs.readFileSync(path.resolve(__dirname, '../public/privatekey.pem')),
		cert: fs.readFileSync(path.resolve(__dirname, '../public/certificate.pem'))
	};

	// async await
	scheme(options, async (req, res) => {
		let reqUrl = url.parse(req.url);
		let hostname = reqUrl.hostname;
		let pathname = decodeURIComponent(reqUrl.pathname);

		// 获取到真正的IP，比如在别的电脑访问此服务的时候，需要真正的IP，而不是设置的IP
		let headers = req.headers || {};
		let host = headers.host || '';
		ip = host.split(':')[0];

		// 目录
		let dir = config.dir || './';

		// 将favicon.ico处理为默认的favicon.ico
		if (pathname == '/favicon.ico') {
			let ico = path.resolve(__dirname, '../public/favicon.ico');
			let data = await readFile(ico, '');
			output(res, data, 'favicon.ico', 'ico');
			return;
		}

		if (pathname.length > 1) {
			let dirTemp = '';

			if (isDir(dir)) {
				dirTemp = dir;
			} else {
				dirTemp = path.dirname(dir);
			}
			dir = path.resolve(dirTemp, pathname.substr(1));
		}

		// 如果dir是文件夹的话，显示此文件夹下所有文件
		if (isDir(dir)) {
			let data = [`<h3>当前目录：${path.resolve(dir)}</h3><ul>`];
			let dirArr = [];
			let fileArr = [];

			let relativePathname = '/';
			if (pathname.length > 1) {
				relativePathname = `/${pathname.substr(1)}/`;
			}

			// icon路径
			let imgPath = `//${ip}:${port}/${path.resolve(__dirname, '..')}/public/`;

			// 遍历文件夹
			let dirFiles = fs.readdirSync(dir);
			dirFiles.forEach(item => {
				let str = `<a href="//${ip}:${port}${relativePathname}${item}">${item}</a>`;
				// 文件夹
				if (isDir(path.resolve(dir, item))) {
					dirArr.push(`<li class="dir"><img src="${imgPath}dir.png" />${str}</li>`);
				}
				// 文件
				else {
					fileArr.push(`<li class="file"><img src="${imgPath}file.png" />${str}</li>`);
				}
			});

			// 返回上一层目录
			let goback = `<li class="dir"><img src="${imgPath}dir.png" alt="icon" /><a href="javascript:history.back();">..</a></li>`;
			data.push(goback, ...dirArr, ...fileArr, '</ul>');

			// 根据模板生成页面
			let content = await readFile(path.resolve(__dirname, '../public/tpl.html'), 'utf-8');
			content = content.toString().replace("{{list}}", data.join(''));

			// 输出文件
			output(res, content, '', 'html');
		}
		// 如果dir是文件的话，显示此文件内容
		else {
			let filename = path.resolve(dir);

			// 文件后缀名
			let ext = path.extname(filename).toLowerCase().replace(/\./g, '');

			// encoding
			let encoding = bufferTypeArr.includes(ext) ? '' : 'utf-8';

			// 输出文件
			let data = await readFile(filename, encoding);
			output(res, data, filename, ext);
		}
	}).listen(port, ip, () => {
		console.log(`Server has started on port ${port} at ${new Date().toLocaleString()}`);

		nodeopen(`${schemeName}://${ip}:${port}`, () => {
			console.log(`browser has opened!`);
		});
	});
}

module.exports = init;