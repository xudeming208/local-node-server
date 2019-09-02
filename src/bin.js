'use strict';

/**
 * @file bin
 * @author xudeming208@126.com
 */

const Commander = require('commander');
const pkg = require('../package.json');
const init = require('./index');
let config = {};
let commandArr = [];
let stat = true;


// Commander
Commander.usage('<command> [options]');

Commander.on('--help', function() {
	console.log(``);
	console.log(``);
	console.log(`  Home: https://github.com/xudeming208/local-node-server\n`);
	console.log(`  Doc: https://github.com/xudeming208/local-node-server/blob/master/README.md\n`);
	console.log(`  Examples1: server start\n`);
	console.log(`  Examples2: server start --ip '192.168.120.111' --port 8081\n`);
	console.log(`  Examples3: server start --dir '../../'\n`);
	console.log(`  Examples4: server start --port 8082 --dir '../../index.html'\n`);
});

// options
Commander
	// version
	.option('-v, --version', 'output the version number', () => {
		stat = false;
		console.log(`\nversion: ${pkg.version}\n`);
		console.log(`Home: https://github.com/xudeming208/local-node-server\n`)
	})
	// 指定IP地址
	.option('-i, --ip <ip>', 'set ip', ip => {
		config.ip = ip || '0.0.0.0';
	})
	// 指定端口号
	.option('-p --port <port>', 'set port', port => {
		config.port = +port || 8080;
	})
	// 指定资源路径
	.option('-d --dir <dir>', 'set dir', dir => {
		config.dir = dir || './';
	})

// Commands
Commander
	.command('start')
	.description('Start the service')
	.action(() => {
		stat && init(config);
	});


commandArr = ['-v', '--version', '-i', '--ip', '--port', '-p', '--dir', '-d', 'start'];

Commander.parse(process.argv);

// 没有参数或者参数不对的情况，显示help
if (!process.argv.slice(2).length || !commandArr.includes(process.argv.slice(2, 3).join())) {
	Commander.help();
}