// List functions

function cons_t(car, cdr) {
    if (!(this instanceof cons_t)) {
        throw "Called cons_t() without new";
    }

    this.car = car;
    this.cdr = cdr;
    this.toString = function() {
        var ret = "(";
        var node = this;

        while (true) {
            ret += node.car;
            if (node.cdr === false) {
                return ret + ")";
            } else if (!FN_consp(node.cdr)) {
                return ret + " . " + node.cdr + ")";
            } else {
                ret += " ";
                node = node.cdr;
            }
        }
    }
}

function make_cADr_functions(prefix, levels) {
    var i;
    var function_body = "x";
    for (i = prefix.length - 1; i >= 0; i--) {
        function_body = "FN_c" + prefix[i] + "r(" + function_body + ")";
    }
    function_body = "return " + function_body + ";";

    function_name = "FN_c" + prefix + "r";
    if (!(function_name in this)) {
        this[function_name] = new Function("x", function_body);
    }

    if (levels > 0) {
        make_cADr_functions(prefix + "a", levels - 1);
        make_cADr_functions(prefix + "d", levels - 1);
    }
}

make_cADr_functions("a", 3);
make_cADr_functions("d", 3);

function FN_car(x) {
    return (x !== false) && x.car;
}

function FN_cdr(x) {
    return (x !== false) && x.cdr;
}

function FN_car_safe(x) {
    return FN_consp(x) && x.car;
}

function FN_cdr_safe(x) {
    return FN_consp(x) && x.cdr;
}

function FN_cons(car, cdr) {
    return new cons_t(car, cdr);
}

function FN_list() {
    var i;
    var x = false;
    for (i = arguments.length - 1; i >= 0; i--) {
        if (typeof x === 'undefined') {
            not_a_function();
        }
        x = new cons_t(arguments[i], x);
    }
    return x;
}

function FN_consp(x) {
    return (x instanceof cons_t);
}

function FN_listp(l) {
    return l === false || FN_consp(l);
}

function FN_concat() {
    var total = '';
    var i;
    for (i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

function FN_mapc(f, l) {
    var x = l;
    while (x) {
        f(x.car);
        x = x.cdr;
    }
}

function FN_mapcar(f, l) {
    var x = l;
    var results = []
    while (x) {
        results.push(f(x.car));
        x = x.cdr;
    }
    return FN_list.apply(this, results);
}

function FN_keywordp(k) {
    return FN_stringp(k) && k.substring(0, 1) === ":";
}

function FN_symbolp(s) {
    return FN_stringp(s);
}

function FN_member(elt, list) {
    var x = list;
    while (FN_consp(x)) {
        if (x.car === elt) {
            return x;
        }
        x = x.cdr;
    }
    return false;
}

function FN_append() {
    var start = false;
    var cursor = false;
    var i;
    for (i = 0; i < arguments.length; i++) {
        var x = arguments[i];
        while (x) {
            if (start === false) {
                start = cursor = new cons_t(x.car, false);
            } else {
                cursor.cdr = new cons_t(x.car, false);
                cursor = cursor.cdr;
            }
            x = x.cdr;
        }
    }
    return start;
}

// Arithmatic functions

function FN__() {
    // negation/subtraction function
    if (arguments.length === 0) {
        return 0;
    } else if (arguments.length === 1) {
        return -arguments[0];
    } else {
        var total = arguments[0];
        var i;
        for (i = 1; i < arguments.length; i++) {
            total -= arguments[i];
        }
        return total;
    }
}

function FN_$GT_(a, b) {
    return a > b;
}

function FN_$GT_$EQ_(a, b) {
    return a >= b;
}

function FN_$LT_(a, b) {
    return a < b;
}

function FN_$LT_$EQ_(a, b) {
    return a <= b;
}

function FN_$PLUS_() {
    var total = 0;
    var i;
    for (i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

function FN_1$PLUS_(x) {
    return x + 1;
}

// Other functions

function FN_eq(a, b) {
    return a === b;
}

function FN_$EQ_(a, b) {
    return a === b;
}

function FN_equal(a, b) {
    return a === b;
}

function FN_funcall(f) {
    f.apply(this, Array.prototype.slice.call(arguments, 1));
}

function FN_length(l) {
    if (FN_consp(l)) {
        var i = 0;
        while (l !== false) {
            i++;
            l = l.cdr;
        }
        return i;
    } else {
        return l.length;
    }
}

function FN_not(b) {
    return b === false;
}

function FN_substring(s, from, to) {
    return s.substring(from, to);
}

function FN_message() {
    var args = Array.prototype.slice.call(arguments, 0);
    console.log(FN_format(args));
}

// TODO?: real format
function FN_format(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.log("format called with \"" + format + "\" " + args);
    var i, j = 1;
    var result = ""
    for (i = 0; i < format.length; i++) {
        if (format[i] === "%") {
            i++;
            result += arguments[j++];
        } else {
            result += format[i];
        }
    }

    return result;
}

function FN_lax_plist_get(l, k) {
    var x = l;
    while (x) {
        if (x.car === k) {
            return x.cdr.car;
        }
        x = x.cdr.cdr;
    }
    return false;
}

function FN_lax_plist_put(l, k, val) {
    var x = l;
    while (x) {
        if (x.car === k) {
            x.cdr.car = val;
            return l;
        }
        x = x.cdr.cdr;
    }
    return FN_cons(k, FN_cons(val, l));
}

function FN_copy_sequence(l) {
    if (l === false) {
        return false;
    }
    var x = l;
    var start = new cons_t(x.car, false);
    var y = start;
    while (FN_consp(x.cdr)) {
        y.cdr = new cons_t(x.cdr.car, false);
        y = y.cdr;
        x = x.cdr;
    }
    return start;
}

function FN_identity(x) {
    return x;
}

function FN_mapconcat(f, l, sep) {
    var ll = [];
    var x = l;
    while (x) {
        ll.push(f(x.car));
        x = x.cdr;
    }
    return ll.join(sep);
}

function FN_numberp(n) {
    return typeof(n) === 'number';
}

function FN_stringp(s) {
    return typeof(s) === 'string';
}

function FN_number_to_string(n) {
    return n + "";
}

function FN_symbol_name(n) {
    return n;
}

function FN_nconc() {
    var val = false;
    var tail = false;

    for (i = 0; i < arguments.length; i++) {
        var tem = arguments[i];
        if (tem === false) {
            continue;
        }
        if (val === false) {
            val = tem;
        }
        if (i + 1 === arguments.length) {
            break;
        }
        while (FN_consp(tem)) {
            tail = tem;
            tem = tail.cdr;
        }
        tem = arguments[i + 1];
        tail.cdr = tem;
        if (tem === false) {
            arguments[i + 1] = tail;
        }
    }

    return val;
}

/*
function FN_replace_regexp_in_string(regexp, rep, str, fixedcase, literal, subexp, start) {
    // TODO: regex

}
*/

function FN_nreverse(list) {
    if (list === false) {
        return list;
    }
    var prev = false;
    var tail = list;
    while (tail !== false) {
        var next = tail.cdr;
        tail.cdr = prev;
        prev = tail;
        tail = next;
    }
    return prev;
}

function FN_apply(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    var x = args.pop();
    while (x !== false) {
        args.push(x.car);
        x = x.cdr;
    }
    return fn.apply(this, args);
}

function FN_replace_regexp_in_string(re, rep, string) {
    // TODO: emacs-re -> js-re
    // TODO: other options
    return string.replace(re, rep);
}

function FN_string_match(regexp, string, start) {
    // TODO: emacs-re -> js-re
    var result = new RegExp(regexp).exec(string);
    if (!result) {
        return false;
    } else {
        return result.index;
    }
}

function FN_error() {
    throw FN_format.apply(this, arguments);
}

function FN_intern(x) {
    return x;
}

function FN_assoc(key, list) {
    var x = list;
    while (x !== false) {
        if (x.car === key) {
            return x;
        }
        x = x.cdr;
    }
    return false;
}

function FN_assoc_default(key, list, test, $default) {
    if (typeof(test) === 'undefined' || test === false) {
        test = FN_equal;
    }
    if (typeof($default) === 'undefined') {
        $default = false;
    }

    var x = list;
    while (x !== false) {
        if (FN_consp(x.car)) {
            if (test(x.car.car, key) !== false) {
                return x.car.cdr;
            }
        } else {
            if (test(x.car, key) !== false) {
                return $default;
            }
        }
        x = x.cdr;
    }
    return false;
}

function FN_base64_encode_string(str) {
    return btoa(str);
}

function FN_string_to_number(str, base) {
    base = base || 10;
    if (base === 10) {
        return parseFloat(str);
    } else {
        return parseInt(str, base);
    }
}

function FN_memql(elt, list) {
    return FN_member(elt, list);
}

function FN_split_string(str, separators, omit_nulls) {
    if (typeof(separators) === 'undefined') {
        separators = '\s+';
    }
    var result = str.split(new RegExp(separators));
    if (omit_nulls) {
        result = result.filter(function(e) {
            return e !== '';
        });
    }
    return FN_list.apply(this, result);
}

function FN_zerop(n) {
    return n === 0;
}

function FN_nth(l, n) {
    var x = l;
    while (FN_consp(x)) {
        if (n === 0) {
            return x.car;
        }
        n--;
        x = x.cdr;
    }
    return false;
}

var init = function() {
    // make sure init stuff doesn't get run twice
    init = function() {};
};

function add_to_init(f) {
    var old_init = init; // not actually needed
    init = function() {
        old_init();
        f();
    };
}

add_to_init(function() {
    // Horrible hacks
    /*FN_infinote_collab_text_properties =
        FN_add_text_properties =
        function(){};
*/
});
