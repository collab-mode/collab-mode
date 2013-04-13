// List functions

function cons_t(car, cdr) {
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
    var function_body = "return x";
    var i;
    for (i = prefix.length - 1; i >= 0; i--) {
        function_body += ".c" + prefix[i] + "r";
    }
    function_body += ";"

    this["FN_c" + prefix + "r"] = new Function("x", function_body);

    if (levels > 0) {
        make_cADr_functions(prefix + "a", levels - 1);
        make_cADr_functions(prefix + "d", levels - 1);
    }
}
make_cADr_functions("a", 3);
make_cADr_functions("d", 3);

function FN_cdr(x) {
    return x.cdr;
}

function FN_car(x) {
    return x.car;
}

function FN_cadr(x) {
    return x.cdr.car;
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
    return !b;
}

function FN_substring(s, from, to) {
    return s.substring(from, to);
}

function FN_message() {
    var args = Array.prototype.slice.call(arguments, 0);
    console.log("message called with " + args);
}

// TODO?: real format
function FN_format() {
    var args = Array.prototype.slice.call(arguments, 0);
    console.log("format called with " + args);
    return "" + args;
}

function FN_lax_plist_get(l, k) {
    var x = l;
    while (x) {
        if (x.car === k) {
            return x.cdr;
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
    if (!x) {
        return false;
    }
    var start = new cons_t(x.car, false);
    var x = l;
    var y = start;
    while (FN_consp(x)) {
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
    return 0 === (0 + n);
}

function FN_stringp(s) {
    return typeof(s) === "string";
}

function FN_number_to_string(n) {
    return n + "";
}

function FN_symbol_name(n) {
    return n;
}

/*
function FN_replace_regexp_in_string(regexp, rep, str, fixedcase, literal, subexp, start) {
    // TODO: regex

}
*/

$match_data = false;
function FN_match_data() {
    return $match_data;
}

function FN_set_match_data(list, reseat) {
    $match_data = list;
}

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
    var tail = args.pop();
    fn.apply(this, args.concat(tail));
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

// Horrible hacks
function init() {
/*
infinote_user_name='acobb';
infinote_user_id = 0;
infinote_users = FN_list("acobb", 0, 0, 0, 0, 0);
infinote_group_name = "foo";
infinote_my_last_sent_vector = false;
infinote_connection = false;
infinote_request_log = false;
*/
    FN_infinote_collab_text_properties =
        FN_add_text_properties =
        function(){};
}
init();

function FN_infinote_send_string(str) {
    console.log("pretending to send ", str);
}

//function FN_collab_self_username() {return 'acobb';}

/*
old_gen = FN_xmlgen;
FN_xmlgen = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    print("xmlgen called with " + args.toString());
    return old_gen.apply(this, arguments);
};

old_extract = FN_xmlgen_extract_plist;
FN_xmlgen_extract_plist = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    print("xmlgen_extract_plist(" + args.toString() + ")");
    var ret = old_extract.apply(this, arguments);
    print(" -> " + ret.toString());
    return ret;
}
*/
