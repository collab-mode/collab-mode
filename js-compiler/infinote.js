function FN_infinote_connect_to_server() {
    if (infinote_connection !== false &&
        infinote_connection.readyState !== 3) {
        return;
    }

    var url = 'ws://' + /*infinote_server*/ 'localhost' + ':' +
        (infinote_port + 1);
    var connection = new WebSocket(url, ['binary']);
    connection.onopen = function() {
        console.log("socket opened");
        FN_infinote_send_stream_header(infinote_server);
    };
    connection.onerror = function(error) {
        console.log("socket error", error);
    };
    connection.onmessage = function(msg) {
        infinote_filter(msg.data);
    };
    connection.buffer = new Buffer();

    infinote_connection_buffer = connection.buffer;
    FN_save_current_buffer_fn(function() {
        FN_set_buffer(infinote_connection_buffer);
        infinote_connection = connection;
        infinote_group_name = "InfDirectory";
        infinote_node_id = 0;
        infinote_node_type = "InfDirectory";
    });
    //FN_infinote_send_stream_header(infinote_server);
}

function infinote_filter(blob) {
    var fr = new FileReader();
    fr.onloadend = function () {
        console.log("message received: ", fr.result);
        infinote_connection_buffer.str += fr.result;

        while (infinote_connection_buffer.str !== '') {
            // delete anything that isn't a tag opening. mainly worried about whitespace
            infinote_connection_buffer.str = infinote_connection_buffer.str.replace(/^[^<]*/, '');

            // xmpp opens a stream tag that remains open for the duration of the communication,
            // which means that we have to handle the stream header and stream close separately
            // from our normal xml parsing. we can parse the tags by making them valid tags.
            // the stream close has nothing of interest to parse

            // stream header
            infinote_connection_buffer.str = infinote_connection_buffer.str.replace(/(<stream:stream[^>]*[^\/])>/gi, "$1/>");
            // TODO: stream close

            var should_break = false;
            with_current_buffer(infinote_connection_buffer, function () {
                FN_goto_char(0);

                try {
                    var xml_data = FN_xml_parse_tag_1();
                } catch(e) {
                    console.log("ignoring XML error", e);
                    xml_data = false;
                }

                if (xml_data === false) {
                    should_break = true;
                    return;
                } else {
                    infinote_connection_buffer.str = infinote_connection_buffer.str.substring(FN_point());
                    $("#log").append($("<pre>").addClass("in").text(xml_data + ""));
                    FN_infinote_handle_stanza(xml_data);
                }
            });
            if (should_break) {
                break;
            }
        }
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

function FN_infinote_mode() {}
infinote_mode = false;
