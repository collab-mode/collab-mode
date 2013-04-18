var $match_data = false;
var $current_buffer;
var $named_buffers = {};
var $gensym_counter = 0;

var $buffer_make_local_vars = [];

add_to_init(function() {
    FN_set_buffer(new Buffer("*scratch*"));
});

function Buffer(name) {
    if (!(this instanceof Buffer)) {
        throw "Called Buffer() without new";
    }
    if (typeof(name) === 'undefined') {
        name = "*anon_buffer_$*" + ($gensym_counter++);
    }

    this.str = '';
    this.point = 1;
    this.name = name;
    this.env = {};
    this.render_hook = false;

    for (var key in $buffer_var_initialized_values) {
        this.env[key] = $buffer_var_initialized_values[key];
    }

    this.toString = function() {
        return "[Buffer " + this.name + "]";
    };
}

function with_current_buffer(buf, body) {
    if (!(buf instanceof Buffer)) {
        buf = FN_get_buffer(buf);
        if (!(buf instanceof Buffer)) {
            throw "named buffers not implemented";
        }
    }
    var old_buffer = $current_buffer;
    try {
        FN_set_buffer(buf);
        ret = body();
    } finally {
        FN_set_buffer(old_buffer);
    }
    return ret;
}

function buffer_str() {
    return "[[" + $current_buffer.str.substring(0, $current_buffer.point) +
        "|" + $current_buffer.str.substring($current_buffer.point) + "]]";
}

function FN_goto_char(p) {
    p--;
    $current_buffer.point = Math.max(0, Math.min($current_buffer.str.length, p));
    //console.log("(goto-char " + p + ") -> " + buffer_str());
}

function FN_forward_char(n) {
    FN_goto_char($current_buffer.point + n + 1);
}

$re_translation_cache = {};
function re_translate(re) {
    if (re in $re_translation_cache) {
        return $re_translation_cache[re];
    } else {
        var new_re = re.replace(/\[:word:\]/g, "\\w");
        var result = "";
        var in_backslash = false
        var i;
        for (i = 0; i < new_re.length; i++) {
            if (new_re[i] === '\\') {
                if (in_backslash) {
                    result += '\\\\';
                }
                in_backslash = !in_backslash;
            } else if (in_backslash) {
                if (new_re[i] !== '(' && new_re[i] !== ')') {
                    result += "\\";
                }
                result += new_re[i];
                in_backslash = false;
                if (new_re[i] === 's') {
                    //console.log("turning \\s" + new_re[i + 1] + " into \\s");
                    i++;
                }
            } else {
                if (new_re[i] === '(' || new_re[i] === ')') {
                    result += "\\";
                }
                result += new_re[i];
                last_was_backslash_s = false;
            }
        }
        $re_translation_cache[re] = result;
        return result;
    }
}

function FN_looking_at(re) {
    re = re_translate(re);
    //console.log("looking for ", re);
    $match_data = $current_buffer.str.substring($current_buffer.point).match("^" + re);
    if ($match_data === null) {
        //console.log("not found");
        return false;
    } else {
        $match_data.point = $current_buffer.point;
        //console.log("found, buffer: " + buffer_str());
        return true;
    }
}

function FN_char_after(pos) {
    if (typeof(pos) === 'undefined') {
        pos = $current_buffer.point;
    } else {
        pos--;
    }

    if (pos < 0 || pos >= $current_buffer.str.length) {
        return false;
    }
    var ret = $current_buffer.str.charCodeAt(pos);
    //console.log("(char-after) -> " + ret);
    return ret;
}

function FN_point() {
    return $current_buffer.point + 1;
}

function FN_buffer_substring_no_properties(start, end) {
    start--; end--;
    return $current_buffer.str.substring(start, end);
}

function FN_match_string_no_properties(n) {
    if ($match_data !== null && n in $match_data) {
        return $match_data[n];
    }
    return false;
}

function FN_match_end() {
    return $match_data.point + $match_data[0].length + 1;
}

function FN_match_data() {
    return $match_data;
}

function FN_set_match_data(list, reseat) {
    $match_data = list;
}

function FN_skip_syntax_forward(syntax) {
    if (syntax.length === 0) {
        return 0;
    }
    var negate = false;
    if (syntax[0] === "^") {
        negate = true;
        syntax = syntax.substring(1);
    }

    var i;
    for (i = $current_buffer.point; i < $current_buffer.str.length; i++) {
        if ((syntax.indexOf($current_buffer.str[i]) === -1) ^ negate) {
            break;
        }
    }
    if (i == $current_buffer.point) {
        return 0;
    }
    var dist = i - $current_buffer.point;
    $current_buffer.point = i;
    return dist;
}

function FN_eobp() {
    return $current_buffer.point === $current_buffer.str.length;
}

function FN_buffer_size(buf) {
    if (typeof(buf) === 'undefined') {
        buf = $current_buffer;
    }
    return buf.str.length;
}

function FN_skip_chars_forward(str, lim) {
    lim--;
    if (typeof(lim) === 'undefined') {
        lim = $current_buffer.str.length;
    }

    var old_point = $current_buffer.point;
    // TODO: more orrect
    var diff = FN_skip_syntax_forward(str);
    if (old_point + diff > lim) {
        $current_buffer.point = lim;
        return lim - old_point;
    }
    return diff;
}

function FN_point_marker() {
    return $current_buffer.point + 1;
}

function FN_re_search_forward(regexp, bound, noerror, count) {
    bound--;
    var sub_buf = $current_buffer.str.substring($current_buffer.point, bound);
    $match_data = sub_buf.match(regexp);
    if ($match_data === null) {
        return false;
    } else {
        $match_data.point = $current_buffer.point;
        $current_buffer.point += $match_data[0].length;
    }
    return $current_buffer.point + 1;
}

function FN_save_current_buffer_fn(fn) {
    var buffer = $current_buffer;
    try {
        return fn();
    } finally {
        FN_set_buffer(buffer);
    }
}

function FN_save_excursion_fn(fn) {
    var buffer = $current_buffer;
    var point = buffer.point;
    try {
        return fn();
    } finally {
        buffer.point = point;
        FN_set_buffer(buffer);
    }
}

$buffer_var_initialized_values = {}
$buffer_var_cleanup = function() {
    for (var i = 0; i < $buffer_make_local_vars.length; i++) {
        var key = $buffer_make_local_vars[i];
        $buffer_var_initialized_values[key] = this[key];
    }
}

function FN_set_buffer(buf) {
    if ($current_buffer === buf) {
        return;
    }
    console.log("switching to " + buf + "...");

    $buffer_var_cleanup();

    $current_buffer = buf;

    var old_globals = {};
    var key;
    for (key in $current_buffer.env) {
        old_globals[key] = this[key];
        this[key] = $current_buffer.env[key];
    }
    for (var i = 0; i < $buffer_make_local_vars.length; i++) {
        key = $buffer_make_local_vars[i];
        old_globals[key] = this[key];
        this[key] = $current_buffer.env[key];
    }

    $buffer_var_cleanup = function() {
        var key;
        for (key in old_globals) {
            $current_buffer.env[key] = this[key];
            this[key] = old_globals.key;
        }
    };
}

function FN_process_buffer(process) {
    return process.buffer;
}

FN_buffer_substring = FN_buffer_substring_no_properties;

function FN_get_buffer(name_or_buffer) {
    if (name_or_buffer instanceof Buffer) {
        return name_or_buffer;
    }
    if (name_or_buffer in $named_buffers) {
        return $named_buffers[name_or_buffer];
    }
    return false;
}

function FN_generate_new_buffer(name) {
    var i = 1;
    var new_name = name;
    while(true) {
        if (!(new_name in $named_buffers)) {
            var buf = new Buffer(new_name);
            $named_buffers[new_name] = buf;
            return buf;
        }
        i++;
        var new_name = name + "<" + i + ">";
    }
}

/*
function FN_buffer_local_value(sym, buf) {
    if (sym in buf.env) {
        return buf.env[sym];
    } else {
        return this[sym];
    }
}
*/

function FN_display_buffer() {}

function FN_insert() {
    var i;
    var insert_str = '';
    for (i = 0; i < arguments.length; i++) {
        var x = arguments[i];
        if (typeof x === 'number') {
            insert_str += String.fromCharCode(x);
        } else {
            insert_str += x;
        }
    }
    var p = $current_buffer.point;
    var s = $current_buffer.str;
    $current_buffer.str =
        s.substring(0, p) +
        insert_str +
        s.substring(p);

    if ($current_buffer.render_hook) {
        $current_buffer.render_hook.inserted(p, insert_str);
    }

    $current_buffer.point += insert_str.length;
}

function FN_delete_region(start, end) {
    start--; end--;
    var p = $current_buffer.point;
    var s = $current_buffer.str;
    $current_buffer.str = s.substring(0, start) + s.substring(end);

    if ($current_buffer.render_hook) {
        $current_buffer.render_hook.deleted(start, end);
    }
}

function buffer_add_make_local_var(sym) {
    $buffer_make_local_vars.push(sym);
}
