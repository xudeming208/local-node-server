#!/usr/bin/env node

if (parseFloat(process.versions.node) < 7.6) {
	return console.warn('local-node-server采用了async/await，node版本需要>=7.6.0才支持，请更新node版本至>=7.6.0!');
}

require('../lib/bin');