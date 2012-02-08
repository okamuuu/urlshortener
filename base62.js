var base62_map = [],
    int_map = {};

var x = 0;

for (var i = 0; i < 10; ++i) {
    var s = String(i);
    base62_map.push(s);
    int_map[s] = x++;
}

var a = 'a'.charCodeAt(0);
for (var i = 0; i < 26; ++i) {
    var s = String.fromCharCode(a + i);
    base62_map.push(s);
    int_map[s] = x++;
}

var A = 'A'.charCodeAt(0);
for (var i = 0; i < 26; ++i) {
    var s = String.fromCharCode(A + i);
    base62_map.push(s);
    int_map[s] = x++;
}

exports.int_to_base62_string = function(num) {
    var ret = '';
    while (num > 0) {
        ret = base62_map[num % 62] + ret;
        num = parseInt(num / 62);
    }
    var head = '';
    for (var n = 5 - ret.length; n > 0; --n) {
        head += '0';
    }
    if (head) {
        ret = head + ret;
    }
    return ret;
}

exports.base62_string_to_int = function(str) {
    var ret = 0;
    for (var i = 0; i < str.length; ++i) {
        var s = str.substr(i, 1);
        ret *= 62;
        ret += int_map[s];
    }
    return ret;
}
