function FN_infinote_connect_to_server(callback) {
    if (infinote_connection !== false &&
        infinote_connection.readyState !== 3) {
        return;
    }

    var url = 'ws://' + /*infinote_server*/ 'collab-mode.com' + ':' +
        (infinote_port + 1);
    var connection = new WebSocket(url, ['binary']);

    var update_state_ui = function() {
        switch (connection.readyState) {
        case connection.CONNECTING:
            $("#connection-status").text("Connecting...");
            break;
        case connection.OPEN:
            $("#connection-status").text("Connected.");
            break;
        case connection.CLOSING:
        case connection.CLOSED:
            $("#connection-status").text("Connection closed.");
            break;
        }
    };

    connection.onopen = function() {
        update_state_ui();
        console.log("socket opened");
        FN_infinote_send_stream_header(infinote_server);

        var count = 0;
        var interval_id = window.setInterval(function() {
            count++;
            with_current_buffer(connection.buffer, function() {
                if (count > 1000 || !infinote_connection) {
                    console.log("giving up waiting for handshake");
                    clearInterval(interval_id);
                } else if (infinote_connection_ready) {
                    clearInterval(interval_id);
                    if (callback) {
                        callback();
                    }
                }
            });
        }, 300);
    };
    connection.onerror = function(error) {
        update_state_ui();
        console.log("socket error", error);
    };
    connection.onclose = function() {
        update_state_ui();
    }
    connection.onmessage = function(msg) {
        infinote_filter(msg.data);
    };
    connection.buffer = new Buffer();

    infinote_connection_buffer = connection.buffer;
    with_current_buffer(infinote_connection_buffer, function() {
        infinote_connection = connection;
        infinote_group_name = "InfDirectory";
        infinote_node_id = 0;
        infinote_node_type = "InfDirectory";
    });
}

function IgnoreMeError() {}
IgnoreMeError.prototype = new Error();

function infinote_filter(blob) {
    var fr = new FileReader();
    fr.onloadend = function () {
        console.log("message received: ", fr.result);
        infinote_connection_buffer.str += fr.result;

        with_current_buffer(infinote_connection_buffer, function () {
            while (infinote_connection_buffer.str !== '') {
                // delete anything that isn't a tag opening. mainly worried about whitespace
                infinote_connection_buffer.str = infinote_connection_buffer.str.replace(/^[^<]*/, '');

                // xmpp opens a stream tag that remains open for the duration of the communication,
                // which means that we have to handle the stream header and stream close separately
                // from our normal xml parsing. we can parse the tags by making them valid tags.
                // the stream close has nothing of interest to parse

                // stream header
                infinote_connection_buffer.str = infinote_connection_buffer.str.replace(/^(<stream:stream[^>]*[^\/])>/gi, "$1/>");
                // TODO: stream close

                var old$FN_error = FN_error;
                FN_error = function() {
                    console.log("ignoring " + FN_format.apply(this, arguments));
                    throw new IgnoreMeError();
                }

                FN_goto_char(1);
                try {
                    var xml_data = FN_xml_parse_tag_1();
                } catch(e) {
                    if (e instanceof IgnoreMeError) {
                        xml_data = false;
                    } else {
                        throw e;
                    }
                } finally {
                    FN_error = old$FN_error;
                }

                if (xml_data === false) {
                    return;
                } else {
                    FN_delete_region(1, FN_point());
                    $("#log").append($("<pre>").addClass("in").text(xml_data + ""));
                    FN_infinote_handle_stanza(xml_data);
                }
            };
        });
    }
    fr.readAsBinaryString(blob);
}

function FN_infinote_send_string(str) {
    console.log("trying to send", str);
    $("#log").append($("<pre>").addClass("out").text(str + ""));
    var ret = infinote_connection.send(str);
    console.log(" -> ", ret);
}

function FN_current_buffer() {
    return $current_buffer;
}

function FN_infinote_mode() {
    FN_infinote_init_this_buffer();
    infinote_mode = true;
}

var $editor;
function ace_init(file) {
    // borrowed from https://github.com/ajaxorg/cloud9/blob/master/plugins-client/ext.code/code.js
    var SupportedModes = {
        abap: ["ABAP", "abap", "text/x-abap", "other"],
        asciidoc: ["AsciiDoc", "asciidoc", "text/x-asciidoc", "other"],
        c_cpp: ["C, C++", "c|cc|cpp|cxx|h|hh|hpp", "text/x-c"],
        clojure: ["Clojure", "clj", "text/x-script.clojure"],
        coffee: ["CoffeeScript", "*Cakefile|coffee|cf", "text/x-script.coffeescript"],
        coldfusion: ["ColdFusion", "cfm", "text/x-coldfusion", "other"],
        csharp: ["C#", "cs", "text/x-csharp"],
        css: ["CSS", "css", "text/css"],
        dart: ["Dart", "dart", "text/x-dart"],
        diff: ["Diff", "diff|patch", "text/x-diff", "other"],
        glsl: ["Glsl", "glsl|frag|vert", "text/x-glsl", "other"],
        golang: ["Go", "go", "text/x-go"],
        groovy: ["Groovy", "groovy", "text/x-groovy", "other"],
        haml: ["Haml", "haml", "text/haml", "other"],
        haxe: ["haXe", "hx", "text/haxe", "other"],
        html: ["HTML", "htm|html|xhtml", "text/html"],
        jade: ["Jade", "jade", "text/x-jade"],
        java: ["Java", "java", "text/x-java-source"],
        jsp: ["JSP", "jsp", "text/x-jsp", "other"],
        javascript: ["JavaScript", "js", "application/javascript"],
        json: ["JSON", "json", "application/json"],
        jsx: ["JSX", "jsx", "text/x-jsx", "other"],
        latex: ["LaTeX", "latex|tex|ltx|bib", "application/x-latex", "other"],
        less: ["LESS", "less", "text/x-less"],
        lisp: ["Lisp", "*scratch*|lisp|scm|rkt|el", "text/x-lisp", "other"],
        liquid: ["Liquid", "liquid", "text/x-liquid", "other"],
        lua: ["Lua", "lua", "text/x-lua"],
        luapage: ["LuaPage", "lp", "text/x-luapage", "other"],
        makefile: ["Makefile", "*GNUmakefile|*makefile|*Makefile|*OCamlMakefile|make", "text/x-makefile", "other"],
        markdown: ["Markdown", "md|markdown", "text/x-markdown", "other"],
        objectivec: ["Objective-C", "m", "text/objective-c", "other"],
        ocaml: ["OCaml", "ml|mli", "text/x-script.ocaml", "other"],
        perl: ["Perl", "pl|pm", "text/x-script.perl"],
        pgsql: ["pgSQL", "pgsql", "text/x-pgsql", "other"],
        php: ["PHP", "php|phtml", "application/x-httpd-php"],
        powershell: ["Powershell", "ps1", "text/x-script.powershell", "other"],
        python: ["Python", "py", "text/x-script.python"],
        r:    ["R"    , "r", "text/x-r", "other"],
        rdoc: ["RDoc" , "Rd", "text/x-rdoc", "other"],
        rhtml:["RHTML", "Rhtml", "text/x-rhtml", "other"],
        ruby: ["Ruby", "ru|gemspec|rake|rb", "text/x-script.ruby"],
        scad: ["OpenSCAD", "scad", "text/x-scad", "other"],
        scala: ["Scala", "scala", "text/x-scala"],
        scss: ["SCSS", "scss|sass", "text/x-scss"],
        sh: ["SH", "sh|bash|bat", "application/x-sh"],
        stylus: ["Stylus", "styl|stylus", "text/x-stylus"],
        sql: ["SQL", "sql", "text/x-sql"],
        svg: ["SVG", "svg", "image/svg+xml", "other"],
        tcl: ["Tcl", "tcl", "text/x-tcl", "other"],
        text: ["Text", "txt", "text/plain", "hidden"],
        textile: ["Textile", "textile", "text/x-web-textile", "other"],
        typescript: ["Typescript", "ts|str", "text/x-typescript"],
        xml: ["XML", "xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl", "application/xml"],
        xquery: ["XQuery", "xq", "text/x-xquery"],
        yaml: ["YAML", "yaml", "text/x-yaml"]
    };

    var mode_array = [];
    for (var mode in SupportedModes) {
        mode_array.push(mode);
    }
    mode_array.sort(function(a, b) {
        return SupportedModes[a][0].localeCompare(SupportedModes[b][0]);
    });
    var selected_mode = "text";
    for (var i = 0; i < mode_array.length; i++) {
        $("<option/>")
            .attr("value", mode_array[i])
            .text(SupportedModes[mode_array[i]][0])
            .appendTo("#mode-select");

        var pattern = SupportedModes[mode_array[i]][1];
        var subPatterns = pattern.split('|');
        for (var j = 0; j < subPatterns.length; j++) {
            var p = subPatterns[j];
            if (p[0] === '*') {
                p = '^' + p.substring(1) + '$';
            } else {
                p = '\\.' + p + '$';
            }
            if (file.match(p)) {
                selected_mode = mode_array[i];
            }
        }
    }

    document.title = file;

    $editor = ace.edit("editor");
    var buffer = FN_generate_new_buffer(file);
    buffer.env.infinote_mode = true;
    var just_nuke_it = function() {
        $editor.setValue($current_buffer.str, $current_buffer.point);
    };
    buffer.render_hook = {
        inserted: just_nuke_it,
        deleted: just_nuke_it
    };
    $editor.on("change", function(e) {
        var start = $editor.session.doc.positionToIndex(e.data.range.start);
        var end = $editor.session.doc.positionToIndex(e.data.range.end);

        console.log(e.data);

        with_current_buffer(buffer, function() {
            if (e.data.action === "insertText" || e.data.action === "insertLines") {
                FN_infinote_before_change(start + 1, start + 1);
                $current_buffer.str = $editor.getValue();
                FN_infinote_after_change(start + 1, end + 1, 0);
            } else if (e.data.action === "removeText") {
                end = start + e.data.text.length;
                FN_infinote_before_change(start + 1, end + 1);
                $current_buffer.str = $editor.getValue();
                FN_infinote_after_change(start + 1, start + 1, end - start);
            } else if (e.data.action === "removeLines") {
                end = start;
                for (var l = 0; l < e.data.lines.length; l++) {
                    end += e.data.lines[l].length + e.data.nl.length;
                }
                FN_infinote_before_change(start + 1, end + 1);
                $current_buffer.str = $editor.getValue();
                FN_infinote_after_change(start + 1, start + 1, end - start);
            }
        });
    });

    $editor.getSession().setMode("ace/mode/" + selected_mode);
    $("#mode-select").val(selected_mode).change(function() {
        $editor.getSession().setMode("ace/mode/" + $("#mode-select").val());
    });
}

$(function() {
    init();
    var room = unescape(window.location.hash).substring(1);
    $("#room-input").val(room);

    $("#login-box input[type=submit]").on('click', function (e) {
        $("#login-box").hide();
        $("#main-app").show();

        var file = $("#room-input").val();
        infinote_user_name = $("#username-input").val();
        ace_init(file);

        FN_infinote_connect_to_server(function() {
            console.log("FIND ME " + file);
            FN_infinote_find_file(file);
        });

        $editor.focus();

        e.preventDefault();
        return false;
    });
    $("#username-input").focus();
});

function toggle_log() {
    var log = $("#log");
    var ed = $("#editor");
    if (log.is(":visible")) {
        log.fadeOut(100, function() {
            ed.fadeIn(100);
        });
    } else {
        ed.fadeOut(100, function() {
            log.fadeIn(100);
        });
    }
}

function FN_windows_showing_buffer() {
    return false;
}

function FN_infinote_set_major_mode() {}
function FN_infinote_user_selection_face() {}
function FN_infinote_user_caret_face() {}
function FN_infinote_user_face() {}
function FN_infinote_send_move_caret() {}
function FN_infinote_move_caret() {}
infinote_max_op_eval_depth = 7;
