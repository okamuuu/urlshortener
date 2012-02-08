exports = module.exports = global;

var path = require('path');
QUnit = require(path.join(path.dirname(require.resolve('qunit-tap')), '..', 'vendor', 'qunit', 'qunit', 'qunit')).QUnit;
require("qunit-tap").qunitTap(QUnit, require("util").puts, { noPlan: true });

QUnit.init();
exports.assert = QUnit;

