function FN_read(str) {
    var index = 0;

    function peek() {
        if (index < str.length) {
            return str[index];
        } else {
            return null;
        }
    }
    function pop() {
        var c = peek();
        if (c === null) {
            throw 'unexpected EOF while reading "' + str + '"';
        }
        index++;
        return c;
    }
    function eat(expected) {
        var c = pop();
        if (c !== expected) {
            throw "parse error"
        }
    }

    function parse_sexp() {
        eat_whitespace();
        if (peek() === '(') {
            return parse_list();
        } else {
            return parse_atom();
        }
    }

    function parse_list() {
        eat('(');
        var items = [];
        eat_whitespace();
        while (peek() !== ')') {
            items.push(parse_sexp());
            eat_whitespace();
        }
        eat(')');
        return FN_list.apply(this, items);
    }

    function eat_whitespace() {
        while (' \n\r\t'.indexOf(peek()) !== -1) {
            pop();
        }
    }

    function parse_atom() {
        if (!peek()) {
            pop(); // for error
        }

        if (peek() === '"') {
            return parse_string();
        }

        var num = false;
        var sym = "";
        if ('0123456789.'.indexOf(peek()) !== -1) {
            num = true;
        }
        while (peek() && '() \n\r\t'.indexOf(peek()) === -1) {
            sym += pop();
        }
        if (sym.length === 0) {
            throw "error reading atom";
        }
        if (num) {
            return +sym;
        } else {
            return sym;
        }
    }

    function parse_string() {
        eat('"');
        var s = '';
        while (peek() && peek() !== '"') {
            var c = pop();
            if (c === '\\') {
                var c2 = pop();
                switch(c2) {
                    case 'n': s += '\n'; break;
                    case 't': s += '\t'; break;
                    case 'r': s += '\r'; break;
                    case '0': s += '\0'; break;
                    default: s += c2; break;
                }
            } else {
                s += c;
            }
        }
        eat('"');
        return s;
    }

    return parse_sexp();
}
