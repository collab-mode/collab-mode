FN_infinote_find_file = (function (arg$filename) {
var old$filename = ((typeof(filename) !== 'undefined') ? filename : undefined);
filename = arg$filename;
try {
return ((false),
(((infinote_connection) !== false) ? (false) : ((FN_infinote_connect_to_server)())),
((FN_save_current_buffer_fn)(((function () {
try {
return (((FN_set_buffer)(((FN_process_buffer)((infinote_connection))))),
((function (arg$existing_file) {
var old$existing_file = ((typeof(existing_file) !== 'undefined') ? existing_file : undefined);
existing_file = arg$existing_file;
try {
return ((((existing_file) !== false) ? ((FN_infinote_send_subscribe_session)(((FN_lax_plist_get)((existing_file), ("id"))))) : ((FN_infinote_send_add_node)((filename)))));
} finally {existing_file = old$existing_file;
}})(((FN_lax_plist_get)((infinote_nodes), (filename))))));
} finally {}})))));
} finally {filename = old$filename;
}});
FN_infinote_before_change = (function (arg$start, arg$end) {
var old$start = ((typeof(start) !== 'undefined') ? start : undefined);
start = arg$start;
var old$end = ((typeof(end) !== 'undefined') ? end : undefined);
end = arg$end;
try {
return ((((infinote_inhibit_change_hooks) !== false) ? (false) : ((infinote_before_change_text=((FN_buffer_substring_no_properties)((start), (end)))))));
} finally {start = old$start;
end = old$end;
}});
FN_infinote_after_change = (function (arg$start, arg$end, arg$previous_length) {
var old$start = ((typeof(start) !== 'undefined') ? start : undefined);
start = arg$start;
var old$end = ((typeof(end) !== 'undefined') ? end : undefined);
end = arg$end;
var old$previous_length = ((typeof(previous_length) !== 'undefined') ? previous_length : undefined);
previous_length = arg$previous_length;
try {
return ((((infinote_inhibit_change_hooks) !== false) ? (false) : ((function (arg$insert_text, arg$changed$HUH_, arg$inserted$HUH_) {
var old$insert_text = ((typeof(insert_text) !== 'undefined') ? insert_text : undefined);
insert_text = arg$insert_text;
var old$changed$HUH_ = ((typeof(changed$HUH_) !== 'undefined') ? changed$HUH_ : undefined);
changed$HUH_ = arg$changed$HUH_;
var old$inserted$HUH_ = ((typeof(inserted$HUH_) !== 'undefined') ? inserted$HUH_ : undefined);
inserted$HUH_ = arg$inserted$HUH_;
try {
return ((((false), ((function (arg$exp4440044401) {
var old$exp4440044401 = ((typeof(exp4440044401) !== 'undefined') ? exp4440044401 : undefined);
exp4440044401 = arg$exp4440044401;
try {
return ((((exp4440044401) !== false) ? (exp4440044401) : ((FN_signal)(("cl-assertion-failed"), ((FN_list)((FN_cons(">=", FN_cons("end", FN_cons("start", false))))))))));
} finally {exp4440044401 = old$exp4440044401;
}})(((FN_$GT_$EQ_)((end), (start))))), (false))),
(((changed$HUH_) !== false) ? ((FN_infinote_local_delete)((start), (infinote_before_change_text))) : (false)),
(((inserted$HUH_) !== false) ? ((FN_infinote_local_insert)((start), (insert_text))) : (false)));
} finally {insert_text = old$insert_text;
changed$HUH_ = old$changed$HUH_;
inserted$HUH_ = old$inserted$HUH_;
}})(((FN_buffer_substring_no_properties)((start), (end))), ((FN_$GT_)((previous_length), (0))), ((FN_$GT_)((end), (start)))))));
} finally {start = old$start;
end = old$end;
previous_length = old$previous_length;
}});
FN_infinote_post_command = (function () {
try {
return ((false));
} finally {}});
FN_infinote_handle_stanza = (function (arg$xml_data) {
var old$xml_data = ((typeof(xml_data) !== 'undefined') ? xml_data : undefined);
xml_data = arg$xml_data;
try {
return (((function (arg$tag, arg$attributes, arg$contents) {
var old$tag = ((typeof(tag) !== 'undefined') ? tag : undefined);
tag = arg$tag;
var old$attributes = ((typeof(attributes) !== 'undefined') ? attributes : undefined);
attributes = arg$attributes;
var old$contents = ((typeof(contents) !== 'undefined') ? contents : undefined);
contents = arg$contents;
try {
return (((((FN_eq)((tag), ("stream:stream"))) !== false) ? (false) : ((((FN_eq)((tag), ("stream:features"))) !== false) ? ((((FN_cddr)((xml_data))) !== false) ? ((FN_infinote_send_auth)()) : (false)) : ((((FN_eq)((tag), ("challenge"))) !== false) ? ((FN_infinote_send_sasl_response)((infinote_user_name))) : ((((FN_eq)((tag), ("success"))) !== false) ? ((FN_infinote_send_stream_header)((infinote_server))) : ((((FN_eq)((tag), ("group"))) !== false) ? ((FN_infinote_handle_group_commands)(((FN_assoc_default)(("name"), (attributes))), (contents))) : (false)))))));
} finally {tag = old$tag;
attributes = old$attributes;
contents = old$contents;
}})(((FN_car)((xml_data))), ((FN_cadr)((xml_data))), ((FN_cddr)((xml_data))))));
} finally {xml_data = old$xml_data;
}});
FN_infinote_send_xml = (function (arg$xml_data) {
var old$xml_data = ((typeof(xml_data) !== 'undefined') ? xml_data : undefined);
xml_data = arg$xml_data;
try {
return (((FN_infinote_send_string)(((FN_xmlgen)((xml_data))))));
} finally {xml_data = old$xml_data;
}});
FN_infinote_send_group_command = (function (arg$xml_data, arg$group_name) {
var old$xml_data = ((typeof(xml_data) !== 'undefined') ? xml_data : undefined);
xml_data = arg$xml_data;
var old$group_name = ((typeof(group_name) !== 'undefined') ? group_name : undefined);
group_name = arg$group_name;
try {
group_name = (typeof(group_name) === 'undefined') ? false : group_name;
return (((function (arg$group) {
var old$group = ((typeof(group) !== 'undefined') ? group : undefined);
group = arg$group;
try {
return (((FN_infinote_send_xml)(((FN_list)(("group"), (":name"), (group), (":publisher"), ("you"), (xml_data))))));
} finally {group = old$group;
}})(((function (arg$exp4440244403) {
var old$exp4440244403 = ((typeof(exp4440244403) !== 'undefined') ? exp4440244403 : undefined);
exp4440244403 = arg$exp4440244403;
try {
return ((((exp4440244403) !== false) ? (exp4440244403) : (infinote_group_name)));
} finally {exp4440244403 = old$exp4440244403;
}})((group_name))))));
} finally {xml_data = old$xml_data;
group_name = old$group_name;
}});
FN_infinote_send_request = (function (arg$xml_data) {
var old$xml_data = ((typeof(xml_data) !== 'undefined') ? xml_data : undefined);
xml_data = arg$xml_data;
try {
return (((FN_infinote_send_group_command)(((FN_list)(("request"), (":user"), (infinote_user_id), (":time"), ((FN_infinote_vector_to_string)(((FN_infinote_diff_since_last_sent_vector)()))), (xml_data))))));
} finally {xml_data = old$xml_data;
}});
FN_infinote_send_auth = (function () {
try {
return (((FN_infinote_send_xml)((FN_cons("auth", FN_cons(":xmlns", FN_cons("urn:ietf:params:xml:ns:xmpp-sasl", FN_cons(":mechanism", FN_cons("ANONYMOUS", false)))))))));
} finally {}});
FN_infinote_send_sasl_response = (function (arg$username) {
var old$username = ((typeof(username) !== 'undefined') ? username : undefined);
username = arg$username;
try {
return (((FN_infinote_send_xml)(((FN_list)(("response"), (":xmlns"), ("urn:ietf:params:xml:ns:xmpp-sasl"), ((FN_base64_encode_string)((username))))))));
} finally {username = old$username;
}});
FN_infinote_send_stream_header = (function (arg$to) {
var old$to = ((typeof(to) !== 'undefined') ? to : undefined);
to = arg$to;
try {
return (((FN_infinote_send_string)(((FN_replace_regexp_in_string)(("/>"), (">"), ((FN_xmlgen)(((FN_list)(("stream:stream"), (":version"), ("1.0"), (":xmlns"), ("jabber:client"), (":xmlns:stream"), ("http://etherx.jabber.org/streams"), (":to"), (to))))))))));
} finally {to = old$to;
}});
FN_infinote_send_explore = (function (arg$node_id) {
var old$node_id = ((typeof(node_id) !== 'undefined') ? node_id : undefined);
node_id = arg$node_id;
try {
return (((FN_infinote_send_group_command)(((FN_list)(("explore-node"), (":seq"), ("0"), (":id"), (node_id))))));
} finally {node_id = old$node_id;
}});
FN_infinote_send_subscribe_session = (function (arg$node_id) {
var old$node_id = ((typeof(node_id) !== 'undefined') ? node_id : undefined);
node_id = arg$node_id;
try {
return (((FN_infinote_send_group_command)(((FN_list)(("subscribe-session"), (":seq"), ("0"), (":id"), (node_id))))));
} finally {node_id = old$node_id;
}});
FN_infinote_send_session_unsubscribe = (function () {
try {
return (((FN_infinote_send_group_command)((FN_cons("session-unsubscribe", false)))));
} finally {}});
FN_infinote_send_add_node = (function (arg$filename) {
var old$filename = ((typeof(filename) !== 'undefined') ? filename : undefined);
filename = arg$filename;
try {
return (((FN_infinote_send_group_command)(((FN_cons)(("add-node"), ((FN_cons)((":seq"), ((FN_cons)(("0"), ((FN_cons)((":parent"), ((FN_cons)(("0"), ((FN_cons)((":type"), ((FN_cons)(("InfText"), ((FN_cons)((":name"), ((FN_cons)((filename), (FN_cons(FN_cons("subscribe", false), false)))))))))))))))))))))));
} finally {filename = old$filename;
}});
FN_infinote_send_subscribe_ack = (function (arg$node_id) {
var old$node_id = ((typeof(node_id) !== 'undefined') ? node_id : undefined);
node_id = arg$node_id;
try {
return (((FN_infinote_send_group_command)(((FN_list)(("subscribe-ack"), (":id"), (node_id))))));
} finally {node_id = old$node_id;
}});
FN_infinote_send_sync_ack = (function () {
try {
return (((FN_infinote_send_group_command)((FN_cons("sync-ack", false)))));
} finally {}});
FN_infinote_send_user_join = (function (arg$name, arg$group) {
var old$name = ((typeof(name) !== 'undefined') ? name : undefined);
name = arg$name;
var old$group = ((typeof(group) !== 'undefined') ? group : undefined);
group = arg$group;
try {
return (((FN_infinote_send_group_command)(((FN_list)(("user-join"), (":seq"), ("0"), (":name"), (name), (":status"), ("active"), (":time"), ((FN_infinote_vector_to_string)(((FN_infinote_my_vector)()))), (":caret"), ("0"), (":hue"), (infinote_hue))), (group))));
} finally {name = old$name;
group = old$group;
}});
FN_infinote_send_insert = (function (arg$pos, arg$text) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
var old$text = ((typeof(text) !== 'undefined') ? text : undefined);
text = arg$text;
try {
return (((FN_infinote_send_request)(((FN_list)(("insert-caret"), (":pos"), (pos), (text))))));
} finally {pos = old$pos;
text = old$text;
}});
FN_infinote_send_delete = (function (arg$pos, arg$len) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
var old$len = ((typeof(len) !== 'undefined') ? len : undefined);
len = arg$len;
try {
return (((FN_infinote_send_request)(((FN_list)(("delete-caret"), (":pos"), (pos), (":len"), (len))))));
} finally {pos = old$pos;
len = old$len;
}});
FN_infinote_local_insert = (function (arg$pos, arg$text) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
var old$text = ((typeof(text) !== 'undefined') ? text : undefined);
text = arg$text;
try {
return (((function (arg$pos) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((FN_infinote_send_insert)((pos), (text))),
((infinote_request_log=((FN_cons)(((FN_list)((infinote_user_id), ((FN_infinote_my_vector)()), ((FN_list)(("insert-caret"), (pos), (text))))), (infinote_request_log))))),
((FN_infinote_increment_my_vector)((infinote_user_id))),
((infinote_my_last_sent_vector=((FN_infinote_my_vector)()))));
} finally {pos = old$pos;
}})(((FN__)((pos), (1))))));
} finally {pos = old$pos;
text = old$text;
}});
FN_infinote_local_delete = (function (arg$pos, arg$text) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
var old$text = ((typeof(text) !== 'undefined') ? text : undefined);
text = arg$text;
try {
return (((function (arg$pos) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((FN_infinote_send_delete)((pos), ((FN_length)((text))))),
((infinote_request_log=((FN_cons)(((FN_list)((infinote_user_id), ((FN_infinote_my_vector)()), ((FN_list)(("delete-caret"), (pos), (text))))), (infinote_request_log))))),
((FN_infinote_increment_my_vector)((infinote_user_id))),
((infinote_my_last_sent_vector=((FN_infinote_my_vector)()))));
} finally {pos = old$pos;
}})(((FN__)((pos), (1))))));
} finally {pos = old$pos;
text = old$text;
}});
FN_infinote_diff_since_last_sent_vector = (function () {
try {
return (((FN_infinote_vector_subtract)(((FN_infinote_my_vector)()), (infinote_my_last_sent_vector))));
} finally {}});
FN_infinote_vector_to_string = (function (arg$vector) {
var old$vector = ((typeof(vector) !== 'undefined') ? vector : undefined);
vector = arg$vector;
try {
return (((FN_mapconcat)((FN_identity), ((function (arg$user_operation) {
var old$user_operation = ((typeof(user_operation) !== 'undefined') ? user_operation : undefined);
user_operation = arg$user_operation;
try {
return (((function (arg$vector_strings) {
var old$vector_strings = ((typeof(vector_strings) !== 'undefined') ? vector_strings : undefined);
vector_strings = arg$vector_strings;
try {
return (((function () {
try {
return (((function () {
while (((FN_consp)((user_operation))) !== false) {(((FN_zerop)(((FN_cadr)((user_operation))))) !== false) ? (((false))) : ((vector_strings=((FN_nconc)((vector_strings), ((FN_list)(((function (arg$user_id, arg$operation_count) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$operation_count = ((typeof(operation_count) !== 'undefined') ? operation_count : undefined);
operation_count = arg$operation_count;
try {
return (((FN_format)(("%d:%d"), ((FN_car)((user_operation))), ((FN_cadr)((user_operation))))));
} finally {user_id = old$user_id;
operation_count = old$operation_count;
}})(((FN_car)((user_operation))), ((FN_cadr)((user_operation)))))))))));
 (user_operation=((FN_cddr)((user_operation))))};
})()),
(vector_strings));
} finally {}})()));
} finally {vector_strings = old$vector_strings;
}})((false))));
} finally {user_operation = old$user_operation;
}})((vector))), (";"))));
} finally {vector = old$vector;
}});
FN_infinote_create_session = (function (arg$name, arg$id, arg$group_name) {
var old$name = ((typeof(name) !== 'undefined') ? name : undefined);
name = arg$name;
var old$id = ((typeof(id) !== 'undefined') ? id : undefined);
id = arg$id;
var old$group_name = ((typeof(group_name) !== 'undefined') ? group_name : undefined);
group_name = arg$group_name;
try {
return (((function (arg$new_buffer) {
var old$new_buffer = ((typeof(new_buffer) !== 'undefined') ? new_buffer : undefined);
new_buffer = arg$new_buffer;
try {
return (((((function (arg$exp4440444405) {
var old$exp4440444405 = ((typeof(exp4440444405) !== 'undefined') ? exp4440444405 : undefined);
exp4440444405 = arg$exp4440444405;
try {
return ((((exp4440444405) !== false) ? (exp4440444405) : ((FN_save_current_buffer_fn)(((function () {
try {
return (((FN_set_buffer)((new_buffer))),
((function (arg$exp4440644407) {
var old$exp4440644407 = ((typeof(exp4440644407) !== 'undefined') ? exp4440644407 : undefined);
exp4440644407 = arg$exp4440644407;
try {
return ((((exp4440644407) !== false) ? (exp4440644407) : (infinote_node_id)));
} finally {exp4440644407 = old$exp4440644407;
}})(((FN_not)((infinote_mode))))));
} finally {}}))))));
} finally {exp4440444405 = old$exp4440444405;
}})(((FN_not)((new_buffer))))) !== false) ? ((new_buffer=((FN_generate_new_buffer)((name))))) : (false)),
((FN_save_current_buffer_fn)(((function () {
try {
return (((FN_set_buffer)((new_buffer))),
((infinote_group_name=(group_name))),
((infinote_node_id=(id))),
((infinote_node_type=("InfText"))),
(((infinote_mode) !== false) ? (false) : ((FN_infinote_mode)())),
((FN_display_buffer)(((FN_current_buffer)()))));
} finally {}})))),
((infinote_sessions=((FN_lax_plist_put)((infinote_sessions), (group_name), (new_buffer))))));
} finally {new_buffer = old$new_buffer;
}})(((FN_get_buffer)((name))))));
} finally {name = old$name;
id = old$id;
group_name = old$group_name;
}});
FN_infinote_user_join = (function (arg$name, arg$id, arg$vector, arg$hue, arg$caret, arg$selection, arg$status) {
var old$name = ((typeof(name) !== 'undefined') ? name : undefined);
name = arg$name;
var old$id = ((typeof(id) !== 'undefined') ? id : undefined);
id = arg$id;
var old$vector = ((typeof(vector) !== 'undefined') ? vector : undefined);
vector = arg$vector;
var old$hue = ((typeof(hue) !== 'undefined') ? hue : undefined);
hue = arg$hue;
var old$caret = ((typeof(caret) !== 'undefined') ? caret : undefined);
caret = arg$caret;
var old$selection = ((typeof(selection) !== 'undefined') ? selection : undefined);
selection = arg$selection;
var old$status = ((typeof(status) !== 'undefined') ? status : undefined);
status = arg$status;
try {
return (((infinote_users=((FN_lax_plist_put)((infinote_users), (id), ((FN_list)(("name"), (name), ("id"), (id), ("vector"), (((((syncing) !== false) ? ((FN_equal)((name), (infinote_user_name))) : (false)) !== false) ? (false) : (vector)), ("hue"), (hue), ("caret"), (caret), ("selection"), (selection), ("status"), (status))))))),
((((FN_equal)((name), (infinote_user_name))) !== false) ? (((false), ((infinote_user_id=(id))), ((((function (arg$exp4440844409) {
var old$exp4440844409 = ((typeof(exp4440844409) !== 'undefined') ? exp4440844409 : undefined);
exp4440844409 = arg$exp4440844409;
try {
return ((((exp4440844409) !== false) ? (exp4440844409) : ((FN_$EQ_)(((FN_point_min)()), ((FN_point_max)())))));
} finally {exp4440844409 = old$exp4440844409;
}})((infinote_syncing))) !== false) ? (false) : ((FN_infinote_local_insert)((1), ((FN_buffer_substring_no_properties)(((FN_point_min)()), ((FN_point_max)())))))), ((infinote_syncing=(false))))) : (false)));
} finally {name = old$name;
id = old$id;
vector = old$vector;
hue = old$hue;
caret = old$caret;
selection = old$selection;
status = old$status;
}});
FN_infinote_read_vector = (function (arg$vector_string) {
var old$vector_string = ((typeof(vector_string) !== 'undefined') ? vector_string : undefined);
vector_string = arg$vector_string;
try {
return (((FN_mapcar)((FN_string_to_number), ((FN_split_string)((vector_string), ("[:;]"), (true))))));
} finally {vector_string = old$vector_string;
}});
FN_infinote_xml_to_operation = (function (arg$operation_xml) {
var old$operation_xml = ((typeof(operation_xml) !== 'undefined') ? operation_xml : undefined);
operation_xml = arg$operation_xml;
try {
return (((function (arg$operation) {
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
try {
return (((function (arg$attributes) {
var old$attributes = ((typeof(attributes) !== 'undefined') ? attributes : undefined);
attributes = arg$attributes;
try {
return (((function (arg$contents) {
var old$contents = ((typeof(contents) !== 'undefined') ? contents : undefined);
contents = arg$contents;
try {
return (((function (arg$pos_string) {
var old$pos_string = ((typeof(pos_string) !== 'undefined') ? pos_string : undefined);
pos_string = arg$pos_string;
try {
return (((function (arg$len_string) {
var old$len_string = ((typeof(len_string) !== 'undefined') ? len_string : undefined);
len_string = arg$len_string;
try {
return (((function (arg$caret_string) {
var old$caret_string = ((typeof(caret_string) !== 'undefined') ? caret_string : undefined);
caret_string = arg$caret_string;
try {
return (((function (arg$selection_string) {
var old$selection_string = ((typeof(selection_string) !== 'undefined') ? selection_string : undefined);
selection_string = arg$selection_string;
try {
return (((function (arg$pos) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((function (arg$len) {
var old$len = ((typeof(len) !== 'undefined') ? len : undefined);
len = arg$len;
try {
return (((function (arg$caret) {
var old$caret = ((typeof(caret) !== 'undefined') ? caret : undefined);
caret = arg$caret;
try {
return (((function (arg$selection) {
var old$selection = ((typeof(selection) !== 'undefined') ? selection : undefined);
selection = arg$selection;
try {
return (((function () {
try {
return (((((FN_memql)((operation), (FN_cons("insert", FN_cons("insert-caret", false))))) !== false) ? ((function (arg$text) {
var old$text = ((typeof(text) !== 'undefined') ? text : undefined);
text = arg$text;
try {
return (((FN_list)((operation), (pos), (text))));
} finally {text = old$text;
}})(((FN_car)((contents))))) : ((((FN_memql)((operation), (FN_cons("delete", FN_cons("delete-caret", false))))) !== false) ? (((len) !== false) ? ((FN_list)((operation), (pos), (len))) : ((function (arg$text) {
var old$text = ((typeof(text) !== 'undefined') ? text : undefined);
text = arg$text;
try {
return (((FN_list)((operation), (pos), ((FN_length)((text))), (text))));
} finally {text = old$text;
}})(((FN_infinote_segment_xml_to_text)((contents)))))) : ((((FN_memql)((operation), (FN_cons("no-op", FN_cons("undo", FN_cons("undo-caret", FN_cons("redo", FN_cons("redo-caret", false)))))))) !== false) ? ((FN_list)((operation))) : ((((FN_eq)((operation), ("move"))) !== false) ? ((FN_list)((operation), (caret), (selection))) : (false))))));
} finally {}})()));
} finally {selection = old$selection;
}})((((selection_string) !== false) ? ((FN_string_to_number)((selection_string))) : (false)))));
} finally {caret = old$caret;
}})((((caret_string) !== false) ? ((FN_string_to_number)((caret_string))) : (false)))));
} finally {len = old$len;
}})((((len_string) !== false) ? ((FN_string_to_number)((len_string))) : (false)))));
} finally {pos = old$pos;
}})((((pos_string) !== false) ? ((FN_string_to_number)((pos_string))) : (false)))));
} finally {selection_string = old$selection_string;
}})(((FN_assoc_default)(("selection"), (attributes))))));
} finally {caret_string = old$caret_string;
}})(((FN_assoc_default)(("caret"), (attributes))))));
} finally {len_string = old$len_string;
}})(((FN_assoc_default)(("len"), (attributes))))));
} finally {pos_string = old$pos_string;
}})(((FN_assoc_default)(("pos"), (attributes))))));
} finally {contents = old$contents;
}})(((FN_cddr)((operation_xml))))));
} finally {attributes = old$attributes;
}})(((FN_cadr)((operation_xml))))));
} finally {operation = old$operation;
}})(((FN_car)((operation_xml))))));
} finally {operation_xml = old$operation_xml;
}});
FN_infinote_segment_xml_to_text = (function (arg$segment_xml) {
var old$segment_xml = ((typeof(segment_xml) !== 'undefined') ? segment_xml : undefined);
segment_xml = arg$segment_xml;
try {
return (((FN_apply)((FN_concat), ((FN_mapcar)(((function (arg$segment) {
var old$segment = ((typeof(segment) !== 'undefined') ? segment : undefined);
segment = arg$segment;
try {
return (((((FN_listp)((segment))) !== false) ? ((FN_car)(((FN_cddr)((segment))))) : (segment)));
} finally {segment = old$segment;
}})), (segment_xml))))));
} finally {segment_xml = old$segment_xml;
}});
FN_infinote_vector_includes = (function (arg$vector_1, arg$vector_2) {
var old$vector_1 = ((typeof(vector_1) !== 'undefined') ? vector_1 : undefined);
vector_1 = arg$vector_1;
var old$vector_2 = ((typeof(vector_2) !== 'undefined') ? vector_2 : undefined);
vector_2 = arg$vector_2;
try {
return (((function (arg$user_operation) {
var old$user_operation = ((typeof(user_operation) !== 'undefined') ? user_operation : undefined);
user_operation = arg$user_operation;
try {
return (((function (arg$__cl_var__44410) {
var old$__cl_var__44410 = ((typeof(__cl_var__44410) !== 'undefined') ? __cl_var__44410 : undefined);
__cl_var__44410 = arg$__cl_var__44410;
try {
return (((function (arg$__cl_var__44411) {
var old$__cl_var__44411 = ((typeof(__cl_var__44411) !== 'undefined') ? __cl_var__44411 : undefined);
__cl_var__44411 = arg$__cl_var__44411;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((user_operation))) !== false) ? ((((function (arg$user_id, arg$op_count) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$op_count = ((typeof(op_count) !== 'undefined') ? op_count : undefined);
op_count = arg$op_count;
try {
return (((FN_not)(((FN_equal)((op_count), ((FN_infinote_operation_count)((user_id), (vector_1))))))));
} finally {user_id = old$user_id;
op_count = old$op_count;
}})(((FN_car)((user_operation))), ((FN_cadr)((user_operation))))) !== false) ? ((__cl_var__44411=(false), ((__cl_var__44410=(false))))) : (true)) : (false)) !== false) {(user_operation=((FN_cddr)((user_operation))))};
})()),
(((__cl_var__44410) !== false) ? (true) : (__cl_var__44411)));
} finally {}})()));
} finally {__cl_var__44411 = old$__cl_var__44411;
}})((false))));
} finally {__cl_var__44410 = old$__cl_var__44410;
}})((true))));
} finally {user_operation = old$user_operation;
}})((vector_2))));
} finally {vector_1 = old$vector_1;
vector_2 = old$vector_2;
}});
FN_infinote_vector_equal = (function (arg$vector_1, arg$vector_2) {
var old$vector_1 = ((typeof(vector_1) !== 'undefined') ? vector_1 : undefined);
vector_1 = arg$vector_1;
var old$vector_2 = ((typeof(vector_2) !== 'undefined') ? vector_2 : undefined);
vector_2 = arg$vector_2;
try {
return (((((FN_infinote_vector_includes)((vector_1), (vector_2))) !== false) ? ((FN_infinote_vector_includes)((vector_2), (vector_1))) : (false)));
} finally {vector_1 = old$vector_1;
vector_2 = old$vector_2;
}});
FN_infinote_vector_subtract = (function (arg$vector_1, arg$vector_2) {
var old$vector_1 = ((typeof(vector_1) !== 'undefined') ? vector_1 : undefined);
vector_1 = arg$vector_1;
var old$vector_2 = ((typeof(vector_2) !== 'undefined') ? vector_2 : undefined);
vector_2 = arg$vector_2;
try {
return (((function (arg$new_vector) {
var old$new_vector = ((typeof(new_vector) !== 'undefined') ? new_vector : undefined);
new_vector = arg$new_vector;
try {
return (((function (arg$prop) {
var old$prop = ((typeof(prop) !== 'undefined') ? prop : undefined);
prop = arg$prop;
try {
return (((function () {
try {
return (((function () {
while (((FN_consp)((prop))) !== false) {(function (arg$user_id, arg$op_count) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$op_count = ((typeof(op_count) !== 'undefined') ? op_count : undefined);
op_count = arg$op_count;
try {
return (((new_vector=((FN_lax_plist_put)((new_vector), (user_id), ((FN__)(((FN_infinote_operation_count)((user_id), (new_vector))), (op_count))))))));
} finally {user_id = old$user_id;
op_count = old$op_count;
}})(((FN_car)((prop))), ((FN_cadr)((prop))));
 (prop=((FN_cddr)((prop))))};
})()),
(new_vector));
} finally {}})()));
} finally {prop = old$prop;
}})((vector_2))));
} finally {new_vector = old$new_vector;
}})(((FN_copy_sequence)((vector_1))))));
} finally {vector_1 = old$vector_1;
vector_2 = old$vector_2;
}});
FN_infinote_diffed_vector = (function (arg$vector, arg$diff) {
var old$vector = ((typeof(vector) !== 'undefined') ? vector : undefined);
vector = arg$vector;
var old$diff = ((typeof(diff) !== 'undefined') ? diff : undefined);
diff = arg$diff;
try {
return (((function (arg$new_vector) {
var old$new_vector = ((typeof(new_vector) !== 'undefined') ? new_vector : undefined);
new_vector = arg$new_vector;
try {
return (((function (arg$prop) {
var old$prop = ((typeof(prop) !== 'undefined') ? prop : undefined);
prop = arg$prop;
try {
return (((function () {
try {
return (((function () {
while (((FN_consp)((prop))) !== false) {(function (arg$user_id, arg$op_count) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$op_count = ((typeof(op_count) !== 'undefined') ? op_count : undefined);
op_count = arg$op_count;
try {
return (((new_vector=((FN_lax_plist_put)((new_vector), (user_id), ((FN_$PLUS_)((op_count), ((FN_infinote_operation_count)((user_id), (new_vector))))))))));
} finally {user_id = old$user_id;
op_count = old$op_count;
}})(((FN_car)((prop))), ((FN_cadr)((prop))));
 (prop=((FN_cddr)((prop))))};
})()),
(new_vector));
} finally {}})()));
} finally {prop = old$prop;
}})((diff))));
} finally {new_vector = old$new_vector;
}})(((FN_copy_sequence)((vector))))));
} finally {vector = old$vector;
diff = old$diff;
}});
FN_infinote_diff_user_vector = (function (arg$user_id, arg$diff) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$diff = ((typeof(diff) !== 'undefined') ? diff : undefined);
diff = arg$diff;
try {
return (((function (arg$user_data) {
var old$user_data = ((typeof(user_data) !== 'undefined') ? user_data : undefined);
user_data = arg$user_data;
try {
return (((function (arg$vector) {
var old$vector = ((typeof(vector) !== 'undefined') ? vector : undefined);
vector = arg$vector;
try {
return (((function () {
try {
return (((infinote_users=((FN_lax_plist_put)((infinote_users), (user_id), ((FN_lax_plist_put)((user_data), ("vector"), ((FN_infinote_diffed_vector)((vector), (diff))))))))));
} finally {}})()));
} finally {vector = old$vector;
}})(((FN_lax_plist_get)((user_data), ("vector"))))));
} finally {user_data = old$user_data;
}})(((FN_lax_plist_get)((infinote_users), (user_id))))));
} finally {user_id = old$user_id;
diff = old$diff;
}});
FN_infinote_increment_my_vector = (function (arg$user_id) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
try {
return (((FN_infinote_diff_user_vector)((infinote_user_id), ((FN_list)((user_id), (1))))));
} finally {user_id = old$user_id;
}});
FN_infinote_user_vector = (function (arg$user_id) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
try {
return (((FN_lax_plist_get)(((FN_lax_plist_get)((infinote_users), (user_id))), ("vector"))));
} finally {user_id = old$user_id;
}});
FN_infinote_get_user_data = (function (arg$user_id, arg$field) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$field = ((typeof(field) !== 'undefined') ? field : undefined);
field = arg$field;
try {
return (((FN_lax_plist_get)(((FN_lax_plist_get)((infinote_users), (user_id))), (field))));
} finally {user_id = old$user_id;
field = old$field;
}});
FN_infinote_set_user_data = (function (arg$user_id, arg$field, arg$value) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$field = ((typeof(field) !== 'undefined') ? field : undefined);
field = arg$field;
var old$value = ((typeof(value) !== 'undefined') ? value : undefined);
value = arg$value;
try {
return (((function (arg$user_data) {
var old$user_data = ((typeof(user_data) !== 'undefined') ? user_data : undefined);
user_data = arg$user_data;
try {
return (((infinote_users=((FN_lax_plist_put)((infinote_users), (user_id), ((FN_lax_plist_put)((user_data), (field), (value))))))));
} finally {user_data = old$user_data;
}})(((FN_lax_plist_get)((infinote_users), (user_id))))));
} finally {user_id = old$user_id;
field = old$field;
value = old$value;
}});
FN_infinote_insert_segment = (function (arg$author_id, arg$text) {
var old$author_id = ((typeof(author_id) !== 'undefined') ? author_id : undefined);
author_id = arg$author_id;
var old$text = ((typeof(text) !== 'undefined') ? text : undefined);
text = arg$text;
try {
return (((function (arg$infinote_inhibit_change_hooks) {
var old$infinote_inhibit_change_hooks = ((typeof(infinote_inhibit_change_hooks) !== 'undefined') ? infinote_inhibit_change_hooks : undefined);
infinote_inhibit_change_hooks = arg$infinote_inhibit_change_hooks;
try {
return (((FN_insert)((text))));
} finally {infinote_inhibit_change_hooks = old$infinote_inhibit_change_hooks;
}})((true))));
} finally {author_id = old$author_id;
text = old$text;
}});
FN_infinote_operation_count = (function (arg$user_id, arg$vector) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$vector = ((typeof(vector) !== 'undefined') ? vector : undefined);
vector = arg$vector;
try {
return (((function (arg$exp4441244413) {
var old$exp4441244413 = ((typeof(exp4441244413) !== 'undefined') ? exp4441244413 : undefined);
exp4441244413 = arg$exp4441244413;
try {
return ((((exp4441244413) !== false) ? (exp4441244413) : (0)));
} finally {exp4441244413 = old$exp4441244413;
}})(((FN_lax_plist_get)((vector), (user_id))))));
} finally {user_id = old$user_id;
vector = old$vector;
}});
FN_infinote_nth_user_request_from_log = (function (arg$user_id, arg$n) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$n = ((typeof(n) !== 'undefined') ? n : undefined);
n = arg$n;
try {
return (((function (arg$__cl_var__44414) {
var old$__cl_var__44414 = ((typeof(__cl_var__44414) !== 'undefined') ? __cl_var__44414 : undefined);
__cl_var__44414 = arg$__cl_var__44414;
try {
return (((function (arg$request) {
var old$request = ((typeof(request) !== 'undefined') ? request : undefined);
request = arg$request;
try {
return (((function (arg$__cl_var__44415) {
var old$__cl_var__44415 = ((typeof(__cl_var__44415) !== 'undefined') ? __cl_var__44415 : undefined);
__cl_var__44415 = arg$__cl_var__44415;
try {
return (((function (arg$__cl_var__44416) {
var old$__cl_var__44416 = ((typeof(__cl_var__44416) !== 'undefined') ? __cl_var__44416 : undefined);
__cl_var__44416 = arg$__cl_var__44416;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((__cl_var__44414))) !== false) ? (((false), ((request=((FN_car)((__cl_var__44414))))), ((((((FN_equal)(((FN_car)((request))), (user_id))) !== false) ? ((FN_$EQ_)(((FN__)((n), (1))), ((FN_infinote_operation_count)((user_id), ((FN_cadr)((request))))))) : (false)) !== false) ? ((__cl_var__44416=(request), ((__cl_var__44415=(false))))) : (true)))) : (false)) !== false) {(__cl_var__44414=((FN_cdr)((__cl_var__44414))))};
})()),
(((__cl_var__44415) !== false) ? (false) : (__cl_var__44416)));
} finally {}})()));
} finally {__cl_var__44416 = old$__cl_var__44416;
}})((false))));
} finally {__cl_var__44415 = old$__cl_var__44415;
}})((true))));
} finally {request = old$request;
}})((false))));
} finally {__cl_var__44414 = old$__cl_var__44414;
}})((infinote_request_log))));
} finally {user_id = old$user_id;
n = old$n;
}});
FN_infinote_translatable_user = (function (arg$request_user_id, arg$request_vector, arg$target_vector) {
var old$request_user_id = ((typeof(request_user_id) !== 'undefined') ? request_user_id : undefined);
request_user_id = arg$request_user_id;
var old$request_vector = ((typeof(request_vector) !== 'undefined') ? request_vector : undefined);
request_vector = arg$request_vector;
var old$target_vector = ((typeof(target_vector) !== 'undefined') ? target_vector : undefined);
target_vector = arg$target_vector;
try {
return (((function (arg$target_operation) {
var old$target_operation = ((typeof(target_operation) !== 'undefined') ? target_operation : undefined);
target_operation = arg$target_operation;
try {
return (((function (arg$__cl_var__44417) {
var old$__cl_var__44417 = ((typeof(__cl_var__44417) !== 'undefined') ? __cl_var__44417 : undefined);
__cl_var__44417 = arg$__cl_var__44417;
try {
return (((function (arg$__cl_var__44418) {
var old$__cl_var__44418 = ((typeof(__cl_var__44418) !== 'undefined') ? __cl_var__44418 : undefined);
__cl_var__44418 = arg$__cl_var__44418;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((target_operation))) !== false) ? ((((function (arg$target_user_id, arg$target_operation_count) {
var old$target_user_id = ((typeof(target_user_id) !== 'undefined') ? target_user_id : undefined);
target_user_id = arg$target_user_id;
var old$target_operation_count = ((typeof(target_operation_count) !== 'undefined') ? target_operation_count : undefined);
target_operation_count = arg$target_operation_count;
try {
return (((((FN_$SLASH_$EQ_)((target_user_id), (request_user_id))) !== false) ? ((FN_$GT_)((target_operation_count), ((FN_infinote_operation_count)((target_user_id), (request_vector))))) : (false)));
} finally {target_user_id = old$target_user_id;
target_operation_count = old$target_operation_count;
}})(((FN_car)((target_operation))), ((FN_cadr)((target_operation))))) !== false) ? ((__cl_var__44418=((FN_car)((target_operation))), ((__cl_var__44417=(false))))) : (true)) : (false)) !== false) {(target_operation=((FN_cddr)((target_operation))))};
})()),
(((__cl_var__44417) !== false) ? (false) : (__cl_var__44418)));
} finally {}})()));
} finally {__cl_var__44418 = old$__cl_var__44418;
}})((false))));
} finally {__cl_var__44417 = old$__cl_var__44417;
}})((true))));
} finally {target_operation = old$target_operation;
}})((target_vector))));
} finally {request_user_id = old$request_user_id;
request_vector = old$request_vector;
target_vector = old$target_vector;
}});
FN_infinote_closer_target_request = (function (arg$request_user_id, arg$request_vector, arg$target_vector) {
var old$request_user_id = ((typeof(request_user_id) !== 'undefined') ? request_user_id : undefined);
request_user_id = arg$request_user_id;
var old$request_vector = ((typeof(request_vector) !== 'undefined') ? request_vector : undefined);
request_vector = arg$request_vector;
var old$target_vector = ((typeof(target_vector) !== 'undefined') ? target_vector : undefined);
target_vector = arg$target_vector;
try {
return (((function (arg$translatable_user) {
var old$translatable_user = ((typeof(translatable_user) !== 'undefined') ? translatable_user : undefined);
translatable_user = arg$translatable_user;
try {
return (((function (arg$translatable_request) {
var old$translatable_request = ((typeof(translatable_request) !== 'undefined') ? translatable_request : undefined);
translatable_request = arg$translatable_request;
try {
return (((function (arg$translatable_vector) {
var old$translatable_vector = ((typeof(translatable_vector) !== 'undefined') ? translatable_vector : undefined);
translatable_vector = arg$translatable_vector;
try {
return (((function (arg$translatable_operation) {
var old$translatable_operation = ((typeof(translatable_operation) !== 'undefined') ? translatable_operation : undefined);
translatable_operation = arg$translatable_operation;
try {
return (((function (arg$closer_vector) {
var old$closer_vector = ((typeof(closer_vector) !== 'undefined') ? closer_vector : undefined);
closer_vector = arg$closer_vector;
try {
return (((function () {
try {
return (((FN_list)((translatable_user), (closer_vector), ((FN_infinote_translate_operation)((translatable_user), (translatable_vector), (closer_vector), (translatable_operation))))));
} finally {}})()));
} finally {closer_vector = old$closer_vector;
}})(((FN_infinote_diffed_vector)((target_vector), ((FN_list)((translatable_user), (-1))))))));
} finally {translatable_operation = old$translatable_operation;
}})(((FN_car)(((FN_cddr)((translatable_request))))))));
} finally {translatable_vector = old$translatable_vector;
}})(((FN_cadr)((translatable_request))))));
} finally {translatable_request = old$translatable_request;
}})(((FN_infinote_nth_user_request_from_log)((translatable_user), ((FN_infinote_operation_count)((translatable_user), (target_vector))))))));
} finally {translatable_user = old$translatable_user;
}})(((FN_infinote_translatable_user)((request_user_id), (request_vector), (target_vector))))));
} finally {request_user_id = old$request_user_id;
request_vector = old$request_vector;
target_vector = old$target_vector;
}});
FN_infinote_op_type = (function (arg$op) {
var old$op = ((typeof(op) !== 'undefined') ? op : undefined);
op = arg$op;
try {
return (((((FN_member)((op), (FN_cons("split", false)))) !== false) ? ("split") : ((((FN_member)((op), (FN_cons("delete", FN_cons("delete-caret", false))))) !== false) ? ("delete") : ((((FN_member)((op), (FN_cons("insert", FN_cons("insert-caret", false))))) !== false) ? ("insert") : ((((FN_member)((op), (FN_cons("undo", FN_cons("undo-caret", false))))) !== false) ? ("undo") : ((((FN_member)((op), (FN_cons("redo", FN_cons("redo-caret", false))))) !== false) ? ("redo") : (false)))))));
} finally {op = old$op;
}});
FN_infinote_transform_operation = (function (arg$operation, arg$against_operation, arg$cid_is_op) {
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
var old$against_operation = ((typeof(against_operation) !== 'undefined') ? against_operation : undefined);
against_operation = arg$against_operation;
var old$cid_is_op = ((typeof(cid_is_op) !== 'undefined') ? cid_is_op : undefined);
cid_is_op = arg$cid_is_op;
try {
return (("Get an operation transformed against another operation."),
((function (arg$pcase_144419, arg$x44420) {
var old$pcase_144419 = ((typeof(pcase_144419) !== 'undefined') ? pcase_144419 : undefined);
pcase_144419 = arg$pcase_144419;
var old$x44420 = ((typeof(x44420) !== 'undefined') ? x44420 : undefined);
x44420 = arg$x44420;
try {
return (((((FN_consp)((x44420))) !== false) ? ((function (arg$xcar44421, arg$xcdr44422) {
var old$xcar44421 = ((typeof(xcar44421) !== 'undefined') ? xcar44421 : undefined);
xcar44421 = arg$xcar44421;
var old$xcdr44422 = ((typeof(xcdr44422) !== 'undefined') ? xcdr44422 : undefined);
xcdr44422 = arg$xcdr44422;
try {
return (((((FN_consp)((xcar44421))) !== false) ? ((function (arg$xcar44423, arg$xcdr44424) {
var old$xcar44423 = ((typeof(xcar44423) !== 'undefined') ? xcar44423 : undefined);
xcar44423 = arg$xcar44423;
var old$xcdr44424 = ((typeof(xcdr44424) !== 'undefined') ? xcdr44424 : undefined);
xcdr44424 = arg$xcdr44424;
try {
return (((((FN_eq)((xcar44423), ("split"))) !== false) ? ((((FN_consp)((xcdr44424))) !== false) ? ((function (arg$xcar44425, arg$xcdr44426) {
var old$xcar44425 = ((typeof(xcar44425) !== 'undefined') ? xcar44425 : undefined);
xcar44425 = arg$xcar44425;
var old$xcdr44426 = ((typeof(xcdr44426) !== 'undefined') ? xcdr44426 : undefined);
xcdr44426 = arg$xcdr44426;
try {
return (((((FN_consp)((xcdr44426))) !== false) ? ((function (arg$xcar44427, arg$xcdr44428) {
var old$xcar44427 = ((typeof(xcar44427) !== 'undefined') ? xcar44427 : undefined);
xcar44427 = arg$xcar44427;
var old$xcdr44428 = ((typeof(xcdr44428) !== 'undefined') ? xcdr44428 : undefined);
xcdr44428 = arg$xcdr44428;
try {
return (((((FN_eq)((xcdr44428), (false))) !== false) ? ((((FN_consp)((xcdr44422))) !== false) ? ((function (arg$xcar44429, arg$xcdr44430) {
var old$xcar44429 = ((typeof(xcar44429) !== 'undefined') ? xcar44429 : undefined);
xcar44429 = arg$xcar44429;
var old$xcdr44430 = ((typeof(xcdr44430) !== 'undefined') ? xcdr44430 : undefined);
xcdr44430 = arg$xcdr44430;
try {
return (((((FN_eq)((xcdr44430), (false))) !== false) ? ((function (arg$against_operation, arg$operation_2, arg$operation_1) {
var old$against_operation = ((typeof(against_operation) !== 'undefined') ? against_operation : undefined);
against_operation = arg$against_operation;
var old$operation_2 = ((typeof(operation_2) !== 'undefined') ? operation_2 : undefined);
operation_2 = arg$operation_2;
var old$operation_1 = ((typeof(operation_1) !== 'undefined') ? operation_1 : undefined);
operation_1 = arg$operation_1;
try {
return (((FN_list)(("split"), ((FN_infinote_transform_operation)((operation_1), (against_operation), (cid_is_op))), ((FN_infinote_transform_operation)((operation_2), (against_operation), (cid_is_op))))));
} finally {against_operation = old$against_operation;
operation_2 = old$operation_2;
operation_1 = old$operation_1;
}})((xcar44429), (xcar44427), (xcar44425))) : (false)));
} finally {xcar44429 = old$xcar44429;
xcdr44430 = old$xcdr44430;
}})(((FN_car)((xcdr44422))), ((FN_cdr)((xcdr44422))))) : (false)) : ((((FN_consp)((xcdr44422))) !== false) ? ((function (arg$xcar44431, arg$xcdr44432) {
var old$xcar44431 = ((typeof(xcar44431) !== 'undefined') ? xcar44431 : undefined);
xcar44431 = arg$xcar44431;
var old$xcdr44432 = ((typeof(xcdr44432) !== 'undefined') ? xcdr44432 : undefined);
xcdr44432 = arg$xcdr44432;
try {
return (((((FN_consp)((xcar44431))) !== false) ? ((function (arg$xcar44433, arg$xcdr44434) {
var old$xcar44433 = ((typeof(xcar44433) !== 'undefined') ? xcar44433 : undefined);
xcar44433 = arg$xcar44433;
var old$xcdr44434 = ((typeof(xcdr44434) !== 'undefined') ? xcdr44434 : undefined);
xcdr44434 = arg$xcdr44434;
try {
return (((((FN_not)(((FN_eq)((xcar44433), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr44434))) !== false) ? ((function (arg$xcar44435, arg$xcdr44436) {
var old$xcar44435 = ((typeof(xcar44435) !== 'undefined') ? xcar44435 : undefined);
xcar44435 = arg$xcar44435;
var old$xcdr44436 = ((typeof(xcdr44436) !== 'undefined') ? xcdr44436 : undefined);
xcdr44436 = arg$xcdr44436;
try {
return (((((FN_consp)((xcdr44436))) !== false) ? ((function (arg$xcar44437, arg$xcdr44438) {
var old$xcar44437 = ((typeof(xcar44437) !== 'undefined') ? xcar44437 : undefined);
xcar44437 = arg$xcar44437;
var old$xcdr44438 = ((typeof(xcdr44438) !== 'undefined') ? xcdr44438 : undefined);
xcdr44438 = arg$xcdr44438;
try {
return (((((FN_not)(((FN_eq)((xcdr44438), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr44432), (false))) !== false) ? ((FN_funcall)((pcase_144419), (xcar44437), (xcar44435), (xcar44421))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44437 = old$xcar44437;
xcdr44438 = old$xcdr44438;
}})(((FN_car)((xcdr44436))), ((FN_cdr)((xcdr44436))))) : (false)));
} finally {xcar44435 = old$xcar44435;
xcdr44436 = old$xcdr44436;
}})(((FN_car)((xcdr44434))), ((FN_cdr)((xcdr44434))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44433 = old$xcar44433;
xcdr44434 = old$xcdr44434;
}})(((FN_car)((xcar44431))), ((FN_cdr)((xcar44431))))) : (false)));
} finally {xcar44431 = old$xcar44431;
xcdr44432 = old$xcdr44432;
}})(((FN_car)((xcdr44422))), ((FN_cdr)((xcdr44422))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44427 = old$xcar44427;
xcdr44428 = old$xcdr44428;
}})(((FN_car)((xcdr44426))), ((FN_cdr)((xcdr44426))))) : ((((FN_consp)((xcdr44422))) !== false) ? ((function (arg$xcar44439, arg$xcdr44440) {
var old$xcar44439 = ((typeof(xcar44439) !== 'undefined') ? xcar44439 : undefined);
xcar44439 = arg$xcar44439;
var old$xcdr44440 = ((typeof(xcdr44440) !== 'undefined') ? xcdr44440 : undefined);
xcdr44440 = arg$xcdr44440;
try {
return (((((FN_consp)((xcar44439))) !== false) ? ((function (arg$xcar44441, arg$xcdr44442) {
var old$xcar44441 = ((typeof(xcar44441) !== 'undefined') ? xcar44441 : undefined);
xcar44441 = arg$xcar44441;
var old$xcdr44442 = ((typeof(xcdr44442) !== 'undefined') ? xcdr44442 : undefined);
xcdr44442 = arg$xcdr44442;
try {
return (((((FN_not)(((FN_eq)((xcar44441), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr44442))) !== false) ? ((function (arg$xcar44443, arg$xcdr44444) {
var old$xcar44443 = ((typeof(xcar44443) !== 'undefined') ? xcar44443 : undefined);
xcar44443 = arg$xcar44443;
var old$xcdr44444 = ((typeof(xcdr44444) !== 'undefined') ? xcdr44444 : undefined);
xcdr44444 = arg$xcdr44444;
try {
return (((((FN_consp)((xcdr44444))) !== false) ? ((function (arg$xcar44445, arg$xcdr44446) {
var old$xcar44445 = ((typeof(xcar44445) !== 'undefined') ? xcar44445 : undefined);
xcar44445 = arg$xcar44445;
var old$xcdr44446 = ((typeof(xcdr44446) !== 'undefined') ? xcdr44446 : undefined);
xcdr44446 = arg$xcdr44446;
try {
return (((((FN_not)(((FN_eq)((xcdr44446), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr44440), (false))) !== false) ? ((FN_funcall)((pcase_144419), (xcar44445), (xcar44443), (xcar44421))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44445 = old$xcar44445;
xcdr44446 = old$xcdr44446;
}})(((FN_car)((xcdr44444))), ((FN_cdr)((xcdr44444))))) : (false)));
} finally {xcar44443 = old$xcar44443;
xcdr44444 = old$xcdr44444;
}})(((FN_car)((xcdr44442))), ((FN_cdr)((xcdr44442))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44441 = old$xcar44441;
xcdr44442 = old$xcdr44442;
}})(((FN_car)((xcar44439))), ((FN_cdr)((xcar44439))))) : (false)));
} finally {xcar44439 = old$xcar44439;
xcdr44440 = old$xcdr44440;
}})(((FN_car)((xcdr44422))), ((FN_cdr)((xcdr44422))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44425 = old$xcar44425;
xcdr44426 = old$xcdr44426;
}})(((FN_car)((xcdr44424))), ((FN_cdr)((xcdr44424))))) : ((((FN_consp)((xcdr44422))) !== false) ? ((function (arg$xcar44447, arg$xcdr44448) {
var old$xcar44447 = ((typeof(xcar44447) !== 'undefined') ? xcar44447 : undefined);
xcar44447 = arg$xcar44447;
var old$xcdr44448 = ((typeof(xcdr44448) !== 'undefined') ? xcdr44448 : undefined);
xcdr44448 = arg$xcdr44448;
try {
return (((((FN_consp)((xcar44447))) !== false) ? ((function (arg$xcar44449, arg$xcdr44450) {
var old$xcar44449 = ((typeof(xcar44449) !== 'undefined') ? xcar44449 : undefined);
xcar44449 = arg$xcar44449;
var old$xcdr44450 = ((typeof(xcdr44450) !== 'undefined') ? xcdr44450 : undefined);
xcdr44450 = arg$xcdr44450;
try {
return (((((FN_not)(((FN_eq)((xcar44449), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr44450))) !== false) ? ((function (arg$xcar44451, arg$xcdr44452) {
var old$xcar44451 = ((typeof(xcar44451) !== 'undefined') ? xcar44451 : undefined);
xcar44451 = arg$xcar44451;
var old$xcdr44452 = ((typeof(xcdr44452) !== 'undefined') ? xcdr44452 : undefined);
xcdr44452 = arg$xcdr44452;
try {
return (((((FN_consp)((xcdr44452))) !== false) ? ((function (arg$xcar44453, arg$xcdr44454) {
var old$xcar44453 = ((typeof(xcar44453) !== 'undefined') ? xcar44453 : undefined);
xcar44453 = arg$xcar44453;
var old$xcdr44454 = ((typeof(xcdr44454) !== 'undefined') ? xcdr44454 : undefined);
xcdr44454 = arg$xcdr44454;
try {
return (((((FN_not)(((FN_eq)((xcdr44454), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr44448), (false))) !== false) ? ((FN_funcall)((pcase_144419), (xcar44453), (xcar44451), (xcar44421))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44453 = old$xcar44453;
xcdr44454 = old$xcdr44454;
}})(((FN_car)((xcdr44452))), ((FN_cdr)((xcdr44452))))) : (false)));
} finally {xcar44451 = old$xcar44451;
xcdr44452 = old$xcdr44452;
}})(((FN_car)((xcdr44450))), ((FN_cdr)((xcdr44450))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44449 = old$xcar44449;
xcdr44450 = old$xcdr44450;
}})(((FN_car)((xcar44447))), ((FN_cdr)((xcar44447))))) : (false)));
} finally {xcar44447 = old$xcar44447;
xcdr44448 = old$xcdr44448;
}})(((FN_car)((xcdr44422))), ((FN_cdr)((xcdr44422))))) : (((true) !== false) ? (false) : (false)))) : ((((FN_consp)((xcdr44422))) !== false) ? ((function (arg$xcar44455, arg$xcdr44456) {
var old$xcar44455 = ((typeof(xcar44455) !== 'undefined') ? xcar44455 : undefined);
xcar44455 = arg$xcar44455;
var old$xcdr44456 = ((typeof(xcdr44456) !== 'undefined') ? xcdr44456 : undefined);
xcdr44456 = arg$xcdr44456;
try {
return (((((FN_consp)((xcar44455))) !== false) ? ((function (arg$xcar44457, arg$xcdr44458) {
var old$xcar44457 = ((typeof(xcar44457) !== 'undefined') ? xcar44457 : undefined);
xcar44457 = arg$xcar44457;
var old$xcdr44458 = ((typeof(xcdr44458) !== 'undefined') ? xcdr44458 : undefined);
xcdr44458 = arg$xcdr44458;
try {
return (((((FN_eq)((xcar44457), ("split"))) !== false) ? ((((FN_consp)((xcdr44458))) !== false) ? ((function (arg$xcar44459, arg$xcdr44460) {
var old$xcar44459 = ((typeof(xcar44459) !== 'undefined') ? xcar44459 : undefined);
xcar44459 = arg$xcar44459;
var old$xcdr44460 = ((typeof(xcdr44460) !== 'undefined') ? xcdr44460 : undefined);
xcdr44460 = arg$xcdr44460;
try {
return (((((FN_consp)((xcdr44460))) !== false) ? ((function (arg$xcar44461, arg$xcdr44462) {
var old$xcar44461 = ((typeof(xcar44461) !== 'undefined') ? xcar44461 : undefined);
xcar44461 = arg$xcar44461;
var old$xcdr44462 = ((typeof(xcdr44462) !== 'undefined') ? xcdr44462 : undefined);
xcdr44462 = arg$xcdr44462;
try {
return (((((FN_not)(((FN_eq)((xcdr44462), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr44456), (false))) !== false) ? ((FN_funcall)((pcase_144419), (xcar44461), (xcar44459), (xcar44421))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44461 = old$xcar44461;
xcdr44462 = old$xcdr44462;
}})(((FN_car)((xcdr44460))), ((FN_cdr)((xcdr44460))))) : (false)));
} finally {xcar44459 = old$xcar44459;
xcdr44460 = old$xcdr44460;
}})(((FN_car)((xcdr44458))), ((FN_cdr)((xcdr44458))))) : (false)) : ((((FN_consp)((xcdr44424))) !== false) ? ((function (arg$xcar44463, arg$xcdr44464) {
var old$xcar44463 = ((typeof(xcar44463) !== 'undefined') ? xcar44463 : undefined);
xcar44463 = arg$xcar44463;
var old$xcdr44464 = ((typeof(xcdr44464) !== 'undefined') ? xcdr44464 : undefined);
xcdr44464 = arg$xcdr44464;
try {
return (((((FN_consp)((xcdr44464))) !== false) ? ((function (arg$xcar44465, arg$xcdr44466) {
var old$xcar44465 = ((typeof(xcar44465) !== 'undefined') ? xcar44465 : undefined);
xcar44465 = arg$xcar44465;
var old$xcdr44466 = ((typeof(xcdr44466) !== 'undefined') ? xcdr44466 : undefined);
xcdr44466 = arg$xcdr44466;
try {
return (((((FN_not)(((FN_eq)((xcdr44466), (false))))) !== false) ? (false) : ((((FN_consp)((xcdr44458))) !== false) ? ((function (arg$xcar44467, arg$xcdr44468) {
var old$xcar44467 = ((typeof(xcar44467) !== 'undefined') ? xcar44467 : undefined);
xcar44467 = arg$xcar44467;
var old$xcdr44468 = ((typeof(xcdr44468) !== 'undefined') ? xcdr44468 : undefined);
xcdr44468 = arg$xcdr44468;
try {
return (((((FN_consp)((xcdr44468))) !== false) ? ((function (arg$xcar44469, arg$xcdr44470) {
var old$xcar44469 = ((typeof(xcar44469) !== 'undefined') ? xcar44469 : undefined);
xcar44469 = arg$xcar44469;
var old$xcdr44470 = ((typeof(xcdr44470) !== 'undefined') ? xcdr44470 : undefined);
xcdr44470 = arg$xcdr44470;
try {
return (((((FN_not)(((FN_eq)((xcdr44470), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr44456), (false))) !== false) ? ((function (arg$text_or_length_2, arg$position_2, arg$op_2, arg$text_or_length_1, arg$position_1, arg$op_1) {
var old$text_or_length_2 = ((typeof(text_or_length_2) !== 'undefined') ? text_or_length_2 : undefined);
text_or_length_2 = arg$text_or_length_2;
var old$position_2 = ((typeof(position_2) !== 'undefined') ? position_2 : undefined);
position_2 = arg$position_2;
var old$op_2 = ((typeof(op_2) !== 'undefined') ? op_2 : undefined);
op_2 = arg$op_2;
var old$text_or_length_1 = ((typeof(text_or_length_1) !== 'undefined') ? text_or_length_1 : undefined);
text_or_length_1 = arg$text_or_length_1;
var old$position_1 = ((typeof(position_1) !== 'undefined') ? position_1 : undefined);
position_1 = arg$position_1;
var old$op_1 = ((typeof(op_1) !== 'undefined') ? op_1 : undefined);
op_1 = arg$op_1;
try {
return (((function (arg$text_1) {
var old$text_1 = ((typeof(text_1) !== 'undefined') ? text_1 : undefined);
text_1 = arg$text_1;
try {
return (((function (arg$text_2) {
var old$text_2 = ((typeof(text_2) !== 'undefined') ? text_2 : undefined);
text_2 = arg$text_2;
try {
return (((function (arg$length_1) {
var old$length_1 = ((typeof(length_1) !== 'undefined') ? length_1 : undefined);
length_1 = arg$length_1;
try {
return (((function (arg$length_2) {
var old$length_2 = ((typeof(length_2) !== 'undefined') ? length_2 : undefined);
length_2 = arg$length_2;
try {
return (((function (arg$end_1) {
var old$end_1 = ((typeof(end_1) !== 'undefined') ? end_1 : undefined);
end_1 = arg$end_1;
try {
return (((function (arg$end_2) {
var old$end_2 = ((typeof(end_2) !== 'undefined') ? end_2 : undefined);
end_2 = arg$end_2;
try {
return (((function () {
try {
return (((function (arg$x44471) {
var old$x44471 = ((typeof(x44471) !== 'undefined') ? x44471 : undefined);
x44471 = arg$x44471;
try {
return (((((FN_consp)((x44471))) !== false) ? ((function (arg$xcar44472, arg$xcdr44473) {
var old$xcar44472 = ((typeof(xcar44472) !== 'undefined') ? xcar44472 : undefined);
xcar44472 = arg$xcar44472;
var old$xcdr44473 = ((typeof(xcdr44473) !== 'undefined') ? xcdr44473 : undefined);
xcdr44473 = arg$xcdr44473;
try {
return (((((FN_eq)((xcar44472), ("insert"))) !== false) ? ((((FN_consp)((xcdr44473))) !== false) ? ((function (arg$xcar44474, arg$xcdr44475) {
var old$xcar44474 = ((typeof(xcar44474) !== 'undefined') ? xcar44474 : undefined);
xcar44474 = arg$xcar44474;
var old$xcdr44475 = ((typeof(xcdr44475) !== 'undefined') ? xcdr44475 : undefined);
xcdr44475 = arg$xcdr44475;
try {
return (((((FN_eq)((xcar44474), ("insert"))) !== false) ? ((((FN_eq)((xcdr44475), (false))) !== false) ? ((function () {
try {
return (((((function (arg$exp4447644477) {
var old$exp4447644477 = ((typeof(exp4447644477) !== 'undefined') ? exp4447644477 : undefined);
exp4447644477 = arg$exp4447644477;
try {
return ((((exp4447644477) !== false) ? (exp4447644477) : ((((FN_$EQ_)((position_1), (position_2))) !== false) ? ((FN_not)((cid_is_op))) : (false))));
} finally {exp4447644477 = old$exp4447644477;
}})(((FN_$LT_)((position_1), (position_2))))) !== false) ? ((FN_list)((op_1), (position_1), (text_1))) : ((FN_list)((op_1), ((FN_$PLUS_)((position_1), (length_2))), (text_1)))));
} finally {}})()) : (false)) : ((((FN_not)(((FN_eq)((xcar44474), ("delete"))))) !== false) ? (false) : ((((FN_eq)((xcdr44475), (false))) !== false) ? ((function () {
try {
return (((((FN_$GT_$EQ_)((position_1), (end_2))) !== false) ? ((FN_list)((op_1), ((FN__)((position_1), (length_2))), (text_1))) : ((((FN_$LT_)((position_1), (position_2))) !== false) ? ((FN_list)((op_1), (position_1), (text_1))) : (((true) !== false) ? ((FN_list)((op_1), (position_2), (text_1))) : (false)))));
} finally {}})()) : (((true) !== false) ? (false) : (false))))));
} finally {xcar44474 = old$xcar44474;
xcdr44475 = old$xcdr44475;
}})(((FN_car)((xcdr44473))), ((FN_cdr)((xcdr44473))))) : (false)) : ((((FN_not)(((FN_eq)((xcar44472), ("delete"))))) !== false) ? (false) : ((((FN_consp)((xcdr44473))) !== false) ? ((function (arg$xcar44478, arg$xcdr44479) {
var old$xcar44478 = ((typeof(xcar44478) !== 'undefined') ? xcar44478 : undefined);
xcar44478 = arg$xcar44478;
var old$xcdr44479 = ((typeof(xcdr44479) !== 'undefined') ? xcdr44479 : undefined);
xcdr44479 = arg$xcdr44479;
try {
return (((((FN_eq)((xcar44478), ("insert"))) !== false) ? ((((FN_eq)((xcdr44479), (false))) !== false) ? ((function () {
try {
return (((((FN_$GT_$EQ_)((position_2), (end_1))) !== false) ? ((FN_list)((op_1), (position_1), (length_1))) : ((((FN_$LT_$EQ_)((position_2), (position_1))) !== false) ? ((FN_list)((op_1), ((FN_$PLUS_)((position_1), (length_2))), (length_1))) : ((((((FN_$GT_)((position_2), (position_1))) !== false) ? ((FN_$LT_)((position_2), (end_1))) : (false)) !== false) ? ((FN_infinote_split_operation)((operation), ((FN__)((position_2), (position_1))), (length_2))) : (false)))));
} finally {}})()) : (false)) : ((((FN_not)(((FN_eq)((xcar44478), ("delete"))))) !== false) ? (false) : ((((FN_eq)((xcdr44479), (false))) !== false) ? ((function () {
try {
return (((((FN_$LT_$EQ_)((end_1), (position_2))) !== false) ? ((FN_list)((op_1), (position_1), (length_1))) : ((((FN_$GT_$EQ_)((position_1), (end_2))) !== false) ? ((FN_list)((op_1), ((FN__)((position_1), (length_2))), (length_1))) : ((((FN_$GT_$EQ_)((position_1), (position_2))) !== false) ? ((((FN_$LT_$EQ_)((end_1), (end_2))) !== false) ? ((FN_list)((op_1), (position_2), (0))) : ((FN_list)((op_1), (position_2), ((FN__)((end_1), (end_2)))))) : ((((FN_$LT_)((position_1), (position_2))) !== false) ? ((((FN_$LT_$EQ_)((end_1), (end_2))) !== false) ? ((FN_list)((op_1), (position_1), ((FN__)((position_2), (position_1))))) : ((FN_list)((op_1), (position_1), ((FN__)((length_1), (length_2)))))) : (false))))));
} finally {}})()) : (((true) !== false) ? (false) : (false))))));
} finally {xcar44478 = old$xcar44478;
xcdr44479 = old$xcdr44479;
}})(((FN_car)((xcdr44473))), ((FN_cdr)((xcdr44473))))) : (((true) !== false) ? (false) : (false))))));
} finally {xcar44472 = old$xcar44472;
xcdr44473 = old$xcdr44473;
}})(((FN_car)((x44471))), ((FN_cdr)((x44471))))) : (false)));
} finally {x44471 = old$x44471;
}})(((FN_list)(((FN_infinote_op_type)((op_1))), ((FN_infinote_op_type)((op_2))))))));
} finally {}})()));
} finally {end_2 = old$end_2;
}})(((FN_$PLUS_)((position_2), (length_2))))));
} finally {end_1 = old$end_1;
}})(((FN_$PLUS_)((position_1), (length_1))))));
} finally {length_2 = old$length_2;
}})(((function (arg$exp4448044481) {
var old$exp4448044481 = ((typeof(exp4448044481) !== 'undefined') ? exp4448044481 : undefined);
exp4448044481 = arg$exp4448044481;
try {
return ((((exp4448044481) !== false) ? (exp4448044481) : (text_or_length_2)));
} finally {exp4448044481 = old$exp4448044481;
}})((((text_2) !== false) ? ((FN_length)((text_2))) : (false)))))));
} finally {length_1 = old$length_1;
}})(((function (arg$exp4448244483) {
var old$exp4448244483 = ((typeof(exp4448244483) !== 'undefined') ? exp4448244483 : undefined);
exp4448244483 = arg$exp4448244483;
try {
return ((((exp4448244483) !== false) ? (exp4448244483) : (text_or_length_1)));
} finally {exp4448244483 = old$exp4448244483;
}})((((text_1) !== false) ? ((FN_length)((text_1))) : (false)))))));
} finally {text_2 = old$text_2;
}})(((((FN_stringp)((text_or_length_2))) !== false) ? (text_or_length_2) : (false)))));
} finally {text_1 = old$text_1;
}})(((((FN_stringp)((text_or_length_1))) !== false) ? (text_or_length_1) : (false)))));
} finally {text_or_length_2 = old$text_or_length_2;
position_2 = old$position_2;
op_2 = old$op_2;
text_or_length_1 = old$text_or_length_1;
position_1 = old$position_1;
op_1 = old$op_1;
}})((xcar44469), (xcar44467), (xcar44457), (xcar44465), (xcar44463), (xcar44423))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44469 = old$xcar44469;
xcdr44470 = old$xcdr44470;
}})(((FN_car)((xcdr44468))), ((FN_cdr)((xcdr44468))))) : (false)));
} finally {xcar44467 = old$xcar44467;
xcdr44468 = old$xcdr44468;
}})(((FN_car)((xcdr44458))), ((FN_cdr)((xcdr44458))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44465 = old$xcar44465;
xcdr44466 = old$xcdr44466;
}})(((FN_car)((xcdr44464))), ((FN_cdr)((xcdr44464))))) : (false)));
} finally {xcar44463 = old$xcar44463;
xcdr44464 = old$xcdr44464;
}})(((FN_car)((xcdr44424))), ((FN_cdr)((xcdr44424))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44457 = old$xcar44457;
xcdr44458 = old$xcdr44458;
}})(((FN_car)((xcar44455))), ((FN_cdr)((xcar44455))))) : (false)));
} finally {xcar44455 = old$xcar44455;
xcdr44456 = old$xcdr44456;
}})(((FN_car)((xcdr44422))), ((FN_cdr)((xcdr44422))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44423 = old$xcar44423;
xcdr44424 = old$xcdr44424;
}})(((FN_car)((xcar44421))), ((FN_cdr)((xcar44421))))) : ((((FN_consp)((xcdr44422))) !== false) ? ((function (arg$xcar44484, arg$xcdr44485) {
var old$xcar44484 = ((typeof(xcar44484) !== 'undefined') ? xcar44484 : undefined);
xcar44484 = arg$xcar44484;
var old$xcdr44485 = ((typeof(xcdr44485) !== 'undefined') ? xcdr44485 : undefined);
xcdr44485 = arg$xcdr44485;
try {
return (((((FN_consp)((xcar44484))) !== false) ? ((function (arg$xcar44486, arg$xcdr44487) {
var old$xcar44486 = ((typeof(xcar44486) !== 'undefined') ? xcar44486 : undefined);
xcar44486 = arg$xcar44486;
var old$xcdr44487 = ((typeof(xcdr44487) !== 'undefined') ? xcdr44487 : undefined);
xcdr44487 = arg$xcdr44487;
try {
return (((((FN_not)(((FN_eq)((xcar44486), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr44487))) !== false) ? ((function (arg$xcar44488, arg$xcdr44489) {
var old$xcar44488 = ((typeof(xcar44488) !== 'undefined') ? xcar44488 : undefined);
xcar44488 = arg$xcar44488;
var old$xcdr44489 = ((typeof(xcdr44489) !== 'undefined') ? xcdr44489 : undefined);
xcdr44489 = arg$xcdr44489;
try {
return (((((FN_consp)((xcdr44489))) !== false) ? ((function (arg$xcar44490, arg$xcdr44491) {
var old$xcar44490 = ((typeof(xcar44490) !== 'undefined') ? xcar44490 : undefined);
xcar44490 = arg$xcar44490;
var old$xcdr44491 = ((typeof(xcdr44491) !== 'undefined') ? xcdr44491 : undefined);
xcdr44491 = arg$xcdr44491;
try {
return (((((FN_not)(((FN_eq)((xcdr44491), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr44485), (false))) !== false) ? ((FN_funcall)((pcase_144419), (xcar44490), (xcar44488), (xcar44421))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44490 = old$xcar44490;
xcdr44491 = old$xcdr44491;
}})(((FN_car)((xcdr44489))), ((FN_cdr)((xcdr44489))))) : (false)));
} finally {xcar44488 = old$xcar44488;
xcdr44489 = old$xcdr44489;
}})(((FN_car)((xcdr44487))), ((FN_cdr)((xcdr44487))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44486 = old$xcar44486;
xcdr44487 = old$xcdr44487;
}})(((FN_car)((xcar44484))), ((FN_cdr)((xcar44484))))) : (false)));
} finally {xcar44484 = old$xcar44484;
xcdr44485 = old$xcdr44485;
}})(((FN_car)((xcdr44422))), ((FN_cdr)((xcdr44422))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar44421 = old$xcar44421;
xcdr44422 = old$xcdr44422;
}})(((FN_car)((x44420))), ((FN_cdr)((x44420))))) : (false)));
} finally {pcase_144419 = old$pcase_144419;
x44420 = old$x44420;
}})(((function (arg$operation_2, arg$operation_1, arg$operation) {
var old$operation_2 = ((typeof(operation_2) !== 'undefined') ? operation_2 : undefined);
operation_2 = arg$operation_2;
var old$operation_1 = ((typeof(operation_1) !== 'undefined') ? operation_1 : undefined);
operation_1 = arg$operation_1;
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
try {
return (((FN_infinote_transform_operation)(((FN_infinote_transform_operation)((operation), (operation_1), (cid_is_op))), ((FN_infinote_transform_operation)((operation_2), (operation_1), (cid_is_op))), (cid_is_op))));
} finally {operation_2 = old$operation_2;
operation_1 = old$operation_1;
operation = old$operation;
}})), ((FN_list)((operation), (against_operation))))));
} finally {operation = old$operation;
against_operation = old$against_operation;
cid_is_op = old$cid_is_op;
}});
FN_infinote_translate_operation = (function (arg$user_id, arg$request_vector, arg$target_vector, arg$operation) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$request_vector = ((typeof(request_vector) !== 'undefined') ? request_vector : undefined);
request_vector = arg$request_vector;
var old$target_vector = ((typeof(target_vector) !== 'undefined') ? target_vector : undefined);
target_vector = arg$target_vector;
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
try {
return (((((FN_infinote_vector_equal)((request_vector), (target_vector))) !== false) ? (operation) : ((function (arg$closer_target_request) {
var old$closer_target_request = ((typeof(closer_target_request) !== 'undefined') ? closer_target_request : undefined);
closer_target_request = arg$closer_target_request;
try {
return (((function (arg$__cl_rest__44492) {
var old$__cl_rest__44492 = ((typeof(__cl_rest__44492) !== 'undefined') ? __cl_rest__44492 : undefined);
__cl_rest__44492 = arg$__cl_rest__44492;
try {
return (((function (arg$closer_target_user) {
var old$closer_target_user = ((typeof(closer_target_user) !== 'undefined') ? closer_target_user : undefined);
closer_target_user = arg$closer_target_user;
try {
return (((function (arg$closer_target_vector) {
var old$closer_target_vector = ((typeof(closer_target_vector) !== 'undefined') ? closer_target_vector : undefined);
closer_target_vector = arg$closer_target_vector;
try {
return (((function (arg$closer_target_operation) {
var old$closer_target_operation = ((typeof(closer_target_operation) !== 'undefined') ? closer_target_operation : undefined);
closer_target_operation = arg$closer_target_operation;
try {
return (((function () {
try {
return (((function (arg$translated_operation) {
var old$translated_operation = ((typeof(translated_operation) !== 'undefined') ? translated_operation : undefined);
translated_operation = arg$translated_operation;
try {
return (((FN_infinote_transform_operation)((translated_operation), (closer_target_operation), ((FN_infinote_cid_is_op)((user_id), (request_vector), (translated_operation), (closer_target_user), (closer_target_vector), (closer_target_operation))))));
} finally {translated_operation = old$translated_operation;
}})(((FN_infinote_translate_operation)((user_id), (request_vector), (closer_target_vector), (operation))))));
} finally {}})()));
} finally {closer_target_operation = old$closer_target_operation;
}})(((FN_car)((__cl_rest__44492))))));
} finally {closer_target_vector = old$closer_target_vector;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__44492);
false;
 (__cl_rest__44492=((FN_cdr)((__cl_rest__44492))));
return $ret;
})()))))));
} finally {closer_target_user = old$closer_target_user;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__44492))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__44492);
false;
 (__cl_rest__44492=((FN_cdr)((__cl_rest__44492))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__44492)))))))))));
} finally {__cl_rest__44492 = old$__cl_rest__44492;
}})((closer_target_request))));
} finally {closer_target_request = old$closer_target_request;
}})(((FN_infinote_closer_target_request)((user_id), (request_vector), (target_vector)))))));
} finally {user_id = old$user_id;
request_vector = old$request_vector;
target_vector = old$target_vector;
operation = old$operation;
}});
FN_infinote_my_vector = (function () {
try {
return (((FN_lax_plist_get)(((FN_lax_plist_get)((infinote_users), (infinote_user_id))), ("vector"))));
} finally {}});
FN_infinote_can_apply = (function (arg$vector, arg$onto_vector) {
var old$vector = ((typeof(vector) !== 'undefined') ? vector : undefined);
vector = arg$vector;
var old$onto_vector = ((typeof(onto_vector) !== 'undefined') ? onto_vector : undefined);
onto_vector = arg$onto_vector;
try {
return (((function (arg$user_operations) {
var old$user_operations = ((typeof(user_operations) !== 'undefined') ? user_operations : undefined);
user_operations = arg$user_operations;
try {
return (((function (arg$__cl_var__44493) {
var old$__cl_var__44493 = ((typeof(__cl_var__44493) !== 'undefined') ? __cl_var__44493 : undefined);
__cl_var__44493 = arg$__cl_var__44493;
try {
return (((function (arg$__cl_var__44494) {
var old$__cl_var__44494 = ((typeof(__cl_var__44494) !== 'undefined') ? __cl_var__44494 : undefined);
__cl_var__44494 = arg$__cl_var__44494;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((user_operations))) !== false) ? ((((function (arg$user_id, arg$operation_count) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$operation_count = ((typeof(operation_count) !== 'undefined') ? operation_count : undefined);
operation_count = arg$operation_count;
try {
return (((FN_$GT_)((operation_count), ((FN_infinote_operation_count)((user_id), (onto_vector))))));
} finally {user_id = old$user_id;
operation_count = old$operation_count;
}})(((FN_car)((user_operations))), ((FN_cadr)((user_operations))))) !== false) ? ((__cl_var__44494=(false), ((__cl_var__44493=(false))))) : (true)) : (false)) !== false) {(user_operations=((FN_cddr)((user_operations))))};
})()),
(((__cl_var__44493) !== false) ? (true) : (__cl_var__44494)));
} finally {}})()));
} finally {__cl_var__44494 = old$__cl_var__44494;
}})((false))));
} finally {__cl_var__44493 = old$__cl_var__44493;
}})((true))));
} finally {user_operations = old$user_operations;
}})((vector))));
} finally {vector = old$vector;
onto_vector = old$onto_vector;
}});
FN_infinote_process_request_queue = (function () {
try {
return (((function (arg$my_vector) {
var old$my_vector = ((typeof(my_vector) !== 'undefined') ? my_vector : undefined);
my_vector = arg$my_vector;
try {
return (((function (arg$__cl_var__44495) {
var old$__cl_var__44495 = ((typeof(__cl_var__44495) !== 'undefined') ? __cl_var__44495 : undefined);
__cl_var__44495 = arg$__cl_var__44495;
try {
return (((function (arg$request) {
var old$request = ((typeof(request) !== 'undefined') ? request : undefined);
request = arg$request;
try {
return (((function (arg$__cl_var__44496) {
var old$__cl_var__44496 = ((typeof(__cl_var__44496) !== 'undefined') ? __cl_var__44496 : undefined);
__cl_var__44496 = arg$__cl_var__44496;
try {
return (((function (arg$__cl_var__44497) {
var old$__cl_var__44497 = ((typeof(__cl_var__44497) !== 'undefined') ? __cl_var__44497 : undefined);
__cl_var__44497 = arg$__cl_var__44497;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((__cl_var__44495))) !== false) ? (((false), ((request=((FN_car)((__cl_var__44495))))), ((((function (arg$__cl_rest__44498) {
var old$__cl_rest__44498 = ((typeof(__cl_rest__44498) !== 'undefined') ? __cl_rest__44498 : undefined);
__cl_rest__44498 = arg$__cl_rest__44498;
try {
return (((function (arg$user_id) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
try {
return (((function (arg$vector) {
var old$vector = ((typeof(vector) !== 'undefined') ? vector : undefined);
vector = arg$vector;
try {
return (((function (arg$operation) {
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
try {
return (((function () {
try {
return (((FN_infinote_can_apply)((vector), (my_vector))));
} finally {}})()));
} finally {operation = old$operation;
}})(((FN_car)((__cl_rest__44498))))));
} finally {vector = old$vector;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__44498);
false;
 (__cl_rest__44498=((FN_cdr)((__cl_rest__44498))));
return $ret;
})()))))));
} finally {user_id = old$user_id;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__44498))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__44498);
false;
 (__cl_rest__44498=((FN_cdr)((__cl_rest__44498))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__44498)))))))))));
} finally {__cl_rest__44498 = old$__cl_rest__44498;
}})((request))) !== false) ? (((false), ((infinote_request_queue=((FN_remove)((request), (infinote_request_queue))))), ((FN_apply)((FN_infinote_handle_request), (request))), ((__cl_var__44497=(false), ((__cl_var__44496=(false))))))) : (true)))) : (false)) !== false) {(__cl_var__44495=((FN_cdr)((__cl_var__44495))))};
})()),
(__cl_var__44497));
} finally {}})()));
} finally {__cl_var__44497 = old$__cl_var__44497;
}})((false))));
} finally {__cl_var__44496 = old$__cl_var__44496;
}})((true))));
} finally {request = old$request;
}})((false))));
} finally {__cl_var__44495 = old$__cl_var__44495;
}})((infinote_request_queue))));
} finally {my_vector = old$my_vector;
}})(((FN_infinote_my_vector)()))));
} finally {}});
FN_infinote_affected_text = (function (arg$operation) {
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
try {
return (((function (arg$__cl_rest__44499) {
var old$__cl_rest__44499 = ((typeof(__cl_rest__44499) !== 'undefined') ? __cl_rest__44499 : undefined);
__cl_rest__44499 = arg$__cl_rest__44499;
try {
return (((function (arg$op) {
var old$op = ((typeof(op) !== 'undefined') ? op : undefined);
op = arg$op;
try {
return (((function (arg$pos) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((function (arg$len) {
var old$len = ((typeof(len) !== 'undefined') ? len : undefined);
len = arg$len;
try {
return (((function () {
try {
return (((function (arg$start, arg$end) {
var old$start = ((typeof(start) !== 'undefined') ? start : undefined);
start = arg$start;
var old$end = ((typeof(end) !== 'undefined') ? end : undefined);
end = arg$end;
try {
return (((FN_buffer_substring_no_properties)((start), (end))));
} finally {start = old$start;
end = old$end;
}})(((FN_$PLUS_)((pos), (1))), ((FN_$PLUS_)((pos), (1), (len))))));
} finally {}})()));
} finally {len = old$len;
}})(((FN_car)((__cl_rest__44499))))));
} finally {pos = old$pos;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__44499);
false;
 (__cl_rest__44499=((FN_cdr)((__cl_rest__44499))));
return $ret;
})()))))));
} finally {op = old$op;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__44499))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__44499);
false;
 (__cl_rest__44499=((FN_cdr)((__cl_rest__44499))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__44499)))))))))));
} finally {__cl_rest__44499 = old$__cl_rest__44499;
}})((operation))));
} finally {operation = old$operation;
}});
FN_infinote_contextualize_delete = (function (arg$operation, arg$currently_applicable_operation) {
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
var old$currently_applicable_operation = ((typeof(currently_applicable_operation) !== 'undefined') ? currently_applicable_operation : undefined);
currently_applicable_operation = arg$currently_applicable_operation;
try {
return (((function (arg$__cl_rest__44500) {
var old$__cl_rest__44500 = ((typeof(__cl_rest__44500) !== 'undefined') ? __cl_rest__44500 : undefined);
__cl_rest__44500 = arg$__cl_rest__44500;
try {
return (((function (arg$op) {
var old$op = ((typeof(op) !== 'undefined') ? op : undefined);
op = arg$op;
try {
return (((function (arg$pos) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((function (arg$len) {
var old$len = ((typeof(len) !== 'undefined') ? len : undefined);
len = arg$len;
try {
return (((function () {
try {
return (((FN_list)((op), (pos), ((FN_infinote_affected_text)((currently_applicable_operation))))));
} finally {}})()));
} finally {len = old$len;
}})(((FN_car)((__cl_rest__44500))))));
} finally {pos = old$pos;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__44500);
false;
 (__cl_rest__44500=((FN_cdr)((__cl_rest__44500))));
return $ret;
})()))))));
} finally {op = old$op;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__44500))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__44500);
false;
 (__cl_rest__44500=((FN_cdr)((__cl_rest__44500))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__44500)))))))))));
} finally {__cl_rest__44500 = old$__cl_rest__44500;
}})((operation))));
} finally {operation = old$operation;
currently_applicable_operation = old$currently_applicable_operation;
}});
FN_infinote_handle_request = (function (arg$user_id, arg$vector, arg$operation) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$vector = ((typeof(vector) !== 'undefined') ? vector : undefined);
vector = arg$vector;
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
try {
return (((function (arg$request) {
var old$request = ((typeof(request) !== 'undefined') ? request : undefined);
request = arg$request;
try {
return ((((syncing) !== false) ? (((false), ((infinote_request_log=((FN_cons)((request), (infinote_request_log))))), ((FN_infinote_increment_my_vector)((user_id))))) : ((function (arg$op_type) {
var old$op_type = ((typeof(op_type) !== 'undefined') ? op_type : undefined);
op_type = arg$op_type;
try {
return (((((FN_member)((op_type), (FN_cons("insert", FN_cons("delete", false))))) !== false) ? ((function (arg$my_vector) {
var old$my_vector = ((typeof(my_vector) !== 'undefined') ? my_vector : undefined);
my_vector = arg$my_vector;
try {
return (((((FN_infinote_can_apply)((vector), (my_vector))) !== false) ? ((function (arg$translated_operation) {
var old$translated_operation = ((typeof(translated_operation) !== 'undefined') ? translated_operation : undefined);
translated_operation = arg$translated_operation;
try {
return (((FN_infinote_apply_operation)((user_id), (translated_operation))),
((infinote_request_log=((FN_cons)((request), (infinote_request_log))))),
((FN_infinote_increment_my_vector)((user_id))),
((FN_infinote_diff_user_vector)((user_id), ((FN_list)((user_id), (1))))),
((FN_infinote_process_request_queue)()));
} finally {translated_operation = old$translated_operation;
}})(((FN_infinote_translate_operation)((user_id), (vector), (my_vector), (operation))))) : ((infinote_request_queue=((FN_cons)((request), (infinote_request_queue)))))));
} finally {my_vector = old$my_vector;
}})(((FN_infinote_my_vector)()))) : (false)));
} finally {op_type = old$op_type;
}})(((FN_infinote_op_type)(((FN_car)((operation)))))))));
} finally {request = old$request;
}})(((FN_list)((user_id), (vector), (operation))))));
} finally {user_id = old$user_id;
vector = old$vector;
operation = old$operation;
}});
FN_infinote_apply_operation = (function (arg$user_id, arg$operation) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
try {
return (((function (arg$infinote_inhibit_change_hooks) {
var old$infinote_inhibit_change_hooks = ((typeof(infinote_inhibit_change_hooks) !== 'undefined') ? infinote_inhibit_change_hooks : undefined);
infinote_inhibit_change_hooks = arg$infinote_inhibit_change_hooks;
try {
return (((((FN_consp)((operation))) !== false) ? ((function (arg$xcar44501, arg$xcdr44502) {
var old$xcar44501 = ((typeof(xcar44501) !== 'undefined') ? xcar44501 : undefined);
xcar44501 = arg$xcar44501;
var old$xcdr44502 = ((typeof(xcdr44502) !== 'undefined') ? xcdr44502 : undefined);
xcdr44502 = arg$xcdr44502;
try {
return (((((FN_eq)((xcar44501), ("split"))) !== false) ? ((((FN_consp)((xcdr44502))) !== false) ? ((function (arg$xcar44503, arg$xcdr44504) {
var old$xcar44503 = ((typeof(xcar44503) !== 'undefined') ? xcar44503 : undefined);
xcar44503 = arg$xcar44503;
var old$xcdr44504 = ((typeof(xcdr44504) !== 'undefined') ? xcdr44504 : undefined);
xcdr44504 = arg$xcdr44504;
try {
return (((((FN_consp)((xcdr44504))) !== false) ? ((function (arg$xcar44505, arg$xcdr44506) {
var old$xcar44505 = ((typeof(xcar44505) !== 'undefined') ? xcar44505 : undefined);
xcar44505 = arg$xcar44505;
var old$xcdr44506 = ((typeof(xcdr44506) !== 'undefined') ? xcdr44506 : undefined);
xcdr44506 = arg$xcdr44506;
try {
return (((((FN_eq)((xcdr44506), (false))) !== false) ? ((function (arg$operation_2, arg$operation_1) {
var old$operation_2 = ((typeof(operation_2) !== 'undefined') ? operation_2 : undefined);
operation_2 = arg$operation_2;
var old$operation_1 = ((typeof(operation_1) !== 'undefined') ? operation_1 : undefined);
operation_1 = arg$operation_1;
try {
return (((FN_infinote_apply_operation)((user_id), (operation_1))),
((FN_infinote_apply_operation)((user_id), ((FN_infinote_transform_operation)((operation_2), (operation_1), (true))))));
} finally {operation_2 = old$operation_2;
operation_1 = old$operation_1;
}})((xcar44505), (xcar44503))) : (false)));
} finally {xcar44505 = old$xcar44505;
xcdr44506 = old$xcdr44506;
}})(((FN_car)((xcdr44504))), ((FN_cdr)((xcdr44504))))) : (false)));
} finally {xcar44503 = old$xcar44503;
xcdr44504 = old$xcdr44504;
}})(((FN_car)((xcdr44502))), ((FN_cdr)((xcdr44502))))) : (false)) : ((((FN_eq)((xcar44501), ("insert"))) !== false) ? ((((FN_consp)((xcdr44502))) !== false) ? ((function (arg$xcar44507, arg$xcdr44508) {
var old$xcar44507 = ((typeof(xcar44507) !== 'undefined') ? xcar44507 : undefined);
xcar44507 = arg$xcar44507;
var old$xcdr44508 = ((typeof(xcdr44508) !== 'undefined') ? xcdr44508 : undefined);
xcdr44508 = arg$xcdr44508;
try {
return (((((FN_consp)((xcdr44508))) !== false) ? ((function (arg$xcar44509, arg$xcdr44510) {
var old$xcar44509 = ((typeof(xcar44509) !== 'undefined') ? xcar44509 : undefined);
xcar44509 = arg$xcar44509;
var old$xcdr44510 = ((typeof(xcdr44510) !== 'undefined') ? xcdr44510 : undefined);
xcdr44510 = arg$xcdr44510;
try {
return (((((FN_eq)((xcdr44510), (false))) !== false) ? ((function (arg$text, arg$pos) {
var old$text = ((typeof(text) !== 'undefined') ? text : undefined);
text = arg$text;
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((FN_save_excursion_fn)(((function () {
try {
return (((FN_goto_char)(((FN_$PLUS_)((1), (pos))))),
((FN_insert)((text))));
} finally {}})))));
} finally {text = old$text;
pos = old$pos;
}})((xcar44509), (xcar44507))) : (false)));
} finally {xcar44509 = old$xcar44509;
xcdr44510 = old$xcdr44510;
}})(((FN_car)((xcdr44508))), ((FN_cdr)((xcdr44508))))) : (false)));
} finally {xcar44507 = old$xcar44507;
xcdr44508 = old$xcdr44508;
}})(((FN_car)((xcdr44502))), ((FN_cdr)((xcdr44502))))) : (false)) : ((((FN_eq)((xcar44501), ("insert-caret"))) !== false) ? ((((FN_consp)((xcdr44502))) !== false) ? ((function (arg$xcar44511, arg$xcdr44512) {
var old$xcar44511 = ((typeof(xcar44511) !== 'undefined') ? xcar44511 : undefined);
xcar44511 = arg$xcar44511;
var old$xcdr44512 = ((typeof(xcdr44512) !== 'undefined') ? xcdr44512 : undefined);
xcdr44512 = arg$xcdr44512;
try {
return (((((FN_consp)((xcdr44512))) !== false) ? ((function (arg$xcar44513, arg$xcdr44514) {
var old$xcar44513 = ((typeof(xcar44513) !== 'undefined') ? xcar44513 : undefined);
xcar44513 = arg$xcar44513;
var old$xcdr44514 = ((typeof(xcdr44514) !== 'undefined') ? xcdr44514 : undefined);
xcdr44514 = arg$xcdr44514;
try {
return (((((FN_eq)((xcdr44514), (false))) !== false) ? ((function (arg$text, arg$pos) {
var old$text = ((typeof(text) !== 'undefined') ? text : undefined);
text = arg$text;
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((FN_save_excursion_fn)(((function () {
try {
return (((FN_goto_char)(((FN_$PLUS_)((1), (pos))))),
((FN_insert)((text))));
} finally {}})))));
} finally {text = old$text;
pos = old$pos;
}})((xcar44513), (xcar44511))) : (false)));
} finally {xcar44513 = old$xcar44513;
xcdr44514 = old$xcdr44514;
}})(((FN_car)((xcdr44512))), ((FN_cdr)((xcdr44512))))) : (false)));
} finally {xcar44511 = old$xcar44511;
xcdr44512 = old$xcdr44512;
}})(((FN_car)((xcdr44502))), ((FN_cdr)((xcdr44502))))) : (false)) : ((((FN_eq)((xcar44501), ("delete"))) !== false) ? ((((FN_consp)((xcdr44502))) !== false) ? ((function (arg$xcar44515, arg$xcdr44516) {
var old$xcar44515 = ((typeof(xcar44515) !== 'undefined') ? xcar44515 : undefined);
xcar44515 = arg$xcar44515;
var old$xcdr44516 = ((typeof(xcdr44516) !== 'undefined') ? xcdr44516 : undefined);
xcdr44516 = arg$xcdr44516;
try {
return (((((FN_consp)((xcdr44516))) !== false) ? ((function (arg$xcar44517, arg$xcdr44518) {
var old$xcar44517 = ((typeof(xcar44517) !== 'undefined') ? xcar44517 : undefined);
xcar44517 = arg$xcar44517;
var old$xcdr44518 = ((typeof(xcdr44518) !== 'undefined') ? xcdr44518 : undefined);
xcdr44518 = arg$xcdr44518;
try {
return (((((FN_eq)((xcdr44518), (false))) !== false) ? ((function (arg$len, arg$pos) {
var old$len = ((typeof(len) !== 'undefined') ? len : undefined);
len = arg$len;
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((FN_save_excursion_fn)(((function () {
try {
return (((FN_delete_region)(((FN_$PLUS_)((1), (pos))), ((FN_$PLUS_)((1), (pos), (len))))));
} finally {}})))));
} finally {len = old$len;
pos = old$pos;
}})((xcar44517), (xcar44515))) : (false)));
} finally {xcar44517 = old$xcar44517;
xcdr44518 = old$xcdr44518;
}})(((FN_car)((xcdr44516))), ((FN_cdr)((xcdr44516))))) : (false)));
} finally {xcar44515 = old$xcar44515;
xcdr44516 = old$xcdr44516;
}})(((FN_car)((xcdr44502))), ((FN_cdr)((xcdr44502))))) : (false)) : ((((FN_not)(((FN_eq)((xcar44501), ("delete-caret"))))) !== false) ? (false) : ((((FN_consp)((xcdr44502))) !== false) ? ((function (arg$xcar44519, arg$xcdr44520) {
var old$xcar44519 = ((typeof(xcar44519) !== 'undefined') ? xcar44519 : undefined);
xcar44519 = arg$xcar44519;
var old$xcdr44520 = ((typeof(xcdr44520) !== 'undefined') ? xcdr44520 : undefined);
xcdr44520 = arg$xcdr44520;
try {
return (((((FN_consp)((xcdr44520))) !== false) ? ((function (arg$xcar44521, arg$xcdr44522) {
var old$xcar44521 = ((typeof(xcar44521) !== 'undefined') ? xcar44521 : undefined);
xcar44521 = arg$xcar44521;
var old$xcdr44522 = ((typeof(xcdr44522) !== 'undefined') ? xcdr44522 : undefined);
xcdr44522 = arg$xcdr44522;
try {
return (((((FN_eq)((xcdr44522), (false))) !== false) ? ((function (arg$len, arg$pos) {
var old$len = ((typeof(len) !== 'undefined') ? len : undefined);
len = arg$len;
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((FN_save_excursion_fn)(((function () {
try {
return (((FN_delete_region)(((FN_$PLUS_)((1), (pos))), ((FN_$PLUS_)((1), (pos), (len))))));
} finally {}})))));
} finally {len = old$len;
pos = old$pos;
}})((xcar44521), (xcar44519))) : (false)));
} finally {xcar44521 = old$xcar44521;
xcdr44522 = old$xcdr44522;
}})(((FN_car)((xcdr44520))), ((FN_cdr)((xcdr44520))))) : (false)));
} finally {xcar44519 = old$xcar44519;
xcdr44520 = old$xcdr44520;
}})(((FN_car)((xcdr44502))), ((FN_cdr)((xcdr44502))))) : (((true) !== false) ? (false) : (false)))))))));
} finally {xcar44501 = old$xcar44501;
xcdr44502 = old$xcdr44502;
}})(((FN_car)((operation))), ((FN_cdr)((operation))))) : (false)));
} finally {infinote_inhibit_change_hooks = old$infinote_inhibit_change_hooks;
}})((true))));
} finally {user_id = old$user_id;
operation = old$operation;
}});
FN_infinote_node_from_id = (function (arg$id) {
var old$id = ((typeof(id) !== 'undefined') ? id : undefined);
id = arg$id;
try {
return (((function (arg$node) {
var old$node = ((typeof(node) !== 'undefined') ? node : undefined);
node = arg$node;
try {
return (((function (arg$__cl_var__44523) {
var old$__cl_var__44523 = ((typeof(__cl_var__44523) !== 'undefined') ? __cl_var__44523 : undefined);
__cl_var__44523 = arg$__cl_var__44523;
try {
return (((function (arg$__cl_var__44524) {
var old$__cl_var__44524 = ((typeof(__cl_var__44524) !== 'undefined') ? __cl_var__44524 : undefined);
__cl_var__44524 = arg$__cl_var__44524;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((node))) !== false) ? ((((FN_equal)((id), ((FN_lax_plist_get)(((FN_cadr)((node))), ("id"))))) !== false) ? ((__cl_var__44524=((FN_cadr)((node))), ((__cl_var__44523=(false))))) : (true)) : (false)) !== false) {(node=((FN_cddr)((node))))};
})()),
(((__cl_var__44523) !== false) ? (false) : (__cl_var__44524)));
} finally {}})()));
} finally {__cl_var__44524 = old$__cl_var__44524;
}})((false))));
} finally {__cl_var__44523 = old$__cl_var__44523;
}})((true))));
} finally {node = old$node;
}})((infinote_nodes))));
} finally {id = old$id;
}});
FN_infinote_handle_group_commands = (function (arg$group_name, arg$commands) {
var old$group_name = ((typeof(group_name) !== 'undefined') ? group_name : undefined);
group_name = arg$group_name;
var old$commands = ((typeof(commands) !== 'undefined') ? commands : undefined);
commands = arg$commands;
try {
return (((FN_mapcar)((FN_infinote_handle_group_command), (commands))));
} finally {group_name = old$group_name;
commands = old$commands;
}});
FN_infinote_handle_group_command = (function (arg$command_xml_data) {
var old$command_xml_data = ((typeof(command_xml_data) !== 'undefined') ? command_xml_data : undefined);
command_xml_data = arg$command_xml_data;
try {
return (((function (arg$command, arg$attributes, arg$contents, arg$session_buffer) {
var old$command = ((typeof(command) !== 'undefined') ? command : undefined);
command = arg$command;
var old$attributes = ((typeof(attributes) !== 'undefined') ? attributes : undefined);
attributes = arg$attributes;
var old$contents = ((typeof(contents) !== 'undefined') ? contents : undefined);
contents = arg$contents;
var old$session_buffer = ((typeof(session_buffer) !== 'undefined') ? session_buffer : undefined);
session_buffer = arg$session_buffer;
try {
return ((((infinote_verbose) !== false) ? ((FN_message)(((FN_format)(("Got group %S command %S"), (group_name), (command_xml_data))))) : (false)),
((((FN_eq)((command), ("welcome"))) !== false) ? ((FN_infinote_send_explore)((0))) : ((((FN_eq)((command), ("explore-begin"))) !== false) ? (false) : ((((FN_eq)((command), ("explore-end"))) !== false) ? ((infinote_connection_ready=(true))) : ((((FN_eq)((command), ("add-node"))) !== false) ? ((function (arg$id, arg$name, arg$parent, arg$type) {
var old$id = ((typeof(id) !== 'undefined') ? id : undefined);
id = arg$id;
var old$name = ((typeof(name) !== 'undefined') ? name : undefined);
name = arg$name;
var old$parent = ((typeof(parent) !== 'undefined') ? parent : undefined);
parent = arg$parent;
var old$type = ((typeof(type) !== 'undefined') ? type : undefined);
type = arg$type;
try {
return (((infinote_nodes=((FN_lax_plist_put)((infinote_nodes), (name), ((FN_list)(("id"), (id), ("parent"), (parent), ("name"), (name), ("type"), (type))))))),
((function (arg$first_content_tag) {
var old$first_content_tag = ((typeof(first_content_tag) !== 'undefined') ? first_content_tag : undefined);
first_content_tag = arg$first_content_tag;
try {
return (((((FN_equal)(("subscribe"), ((FN_car)((first_content_tag))))) !== false) ? ((function (arg$group) {
var old$group = ((typeof(group) !== 'undefined') ? group : undefined);
group = arg$group;
try {
return (((FN_infinote_create_session)((name), (id), (group))),
((FN_infinote_send_subscribe_ack)((id))),
((FN_infinote_send_user_join)((infinote_user_name), (group))),
((infinote_my_last_sent_vector=((FN_infinote_my_vector)()))));
} finally {group = old$group;
}})(((FN_assoc_default)(("group"), ((FN_cadr)((first_content_tag))))))) : (false)));
} finally {first_content_tag = old$first_content_tag;
}})(((FN_car)((contents))))));
} finally {id = old$id;
name = old$name;
parent = old$parent;
type = old$type;
}})(((FN_string_to_number)(((FN_assoc_default)(("id"), (attributes))))), ((FN_assoc_default)(("name"), (attributes))), ((FN_string_to_number)(((FN_assoc_default)(("id"), (attributes))))), ((FN_assoc_default)(("type"), (attributes))))) : ((((FN_eq)((command), ("sync-in"))) !== false) ? (false) : ((((FN_eq)((command), ("remove-node"))) !== false) ? (false) : ((((FN_eq)((command), ("subscribe-session"))) !== false) ? ((function (arg$id) {
var old$id = ((typeof(id) !== 'undefined') ? id : undefined);
id = arg$id;
try {
return (((function (arg$name) {
var old$name = ((typeof(name) !== 'undefined') ? name : undefined);
name = arg$name;
try {
return (((function (arg$group) {
var old$group = ((typeof(group) !== 'undefined') ? group : undefined);
group = arg$group;
try {
return (((function () {
try {
return (((FN_infinote_create_session)((name), (id), (group))),
((FN_infinote_send_subscribe_ack)((id))));
} finally {}})()));
} finally {group = old$group;
}})(((FN_assoc_default)(("group"), (attributes))))));
} finally {name = old$name;
}})(((FN_lax_plist_get)(((FN_infinote_node_from_id)((id))), ("name"))))));
} finally {id = old$id;
}})(((FN_string_to_number)(((FN_assoc_default)(("id"), (attributes))))))) : ((((FN_eq)((command), ("subscribe-chat"))) !== false) ? (false) : ((((FN_eq)((command), ("sync-begin"))) !== false) ? (((session_buffer) !== false) ? ((FN_save_current_buffer_fn)(((function () {
try {
return (((FN_set_buffer)((session_buffer))),
((infinote_syncing=(true))));
} finally {}})))) : (false)) : ((((FN_eq)((command), ("sync-end"))) !== false) ? (((false), (((infinote_verbose) !== false) ? ((FN_message)(((FN_format)(("Session buffer %S"), (session_buffer))))) : (false)), (((session_buffer) !== false) ? ((FN_save_current_buffer_fn)(((function () {
try {
return (((FN_set_buffer)((session_buffer))),
((FN_infinote_send_sync_ack)()),
((FN_infinote_send_user_join)((infinote_user_name), (group_name))),
((infinote_my_last_sent_vector=((FN_infinote_my_vector)()))));
} finally {}})))) : (false)))) : ((((FN_eq)((command), ("sync-segment"))) !== false) ? (((session_buffer) !== false) ? ((FN_save_current_buffer_fn)(((function () {
try {
return (((FN_set_buffer)((session_buffer))),
((FN_infinote_insert_segment)(((FN_assoc_default)(("author"), (attributes))), ((FN_car)((contents))))));
} finally {}})))) : (false)) : ((((FN_memql)((command), (FN_cons("user-join", FN_cons("sync-user", false))))) !== false) ? ((function (arg$name, arg$id, arg$vector, arg$hue, arg$caret, arg$selection, arg$status, arg$syncing) {
var old$name = ((typeof(name) !== 'undefined') ? name : undefined);
name = arg$name;
var old$id = ((typeof(id) !== 'undefined') ? id : undefined);
id = arg$id;
var old$vector = ((typeof(vector) !== 'undefined') ? vector : undefined);
vector = arg$vector;
var old$hue = ((typeof(hue) !== 'undefined') ? hue : undefined);
hue = arg$hue;
var old$caret = ((typeof(caret) !== 'undefined') ? caret : undefined);
caret = arg$caret;
var old$selection = ((typeof(selection) !== 'undefined') ? selection : undefined);
selection = arg$selection;
var old$status = ((typeof(status) !== 'undefined') ? status : undefined);
status = arg$status;
var old$syncing = ((typeof(syncing) !== 'undefined') ? syncing : undefined);
syncing = arg$syncing;
try {
return ((((session_buffer) !== false) ? ((FN_save_current_buffer_fn)(((function () {
try {
return (((FN_set_buffer)((session_buffer))),
((FN_infinote_user_join)((name), (id), (vector), (hue), (caret), (selection), (status))));
} finally {}})))) : (false)));
} finally {name = old$name;
id = old$id;
vector = old$vector;
hue = old$hue;
caret = old$caret;
selection = old$selection;
status = old$status;
syncing = old$syncing;
}})(((FN_assoc_default)(("name"), (attributes))), ((FN_string_to_number)(((FN_assoc_default)(("id"), (attributes))))), ((FN_infinote_read_vector)(((FN_assoc_default)(("time"), (attributes))))), ((FN_string_to_number)(((FN_assoc_default)(("hue"), (attributes))))), ((FN_string_to_number)(((FN_assoc_default)(("caret"), (attributes))))), ((FN_string_to_number)(((FN_assoc_default)(("selection"), (attributes))))), ((FN_assoc_default)(("status"), (attributes))), ((FN_eq)((command), ("sync-user"))))) : ((((FN_eq)((command), ("user-rejoin"))) !== false) ? (false) : ((((FN_eq)((command), ("session-close"))) !== false) ? (false) : ((((FN_eq)((command), ("user-status-change"))) !== false) ? (false) : ((((FN_eq)((command), ("sync-message"))) !== false) ? (false) : ((((FN_eq)((command), ("message"))) !== false) ? (false) : ((((FN_memql)((command), (FN_cons("request", FN_cons("sync-request", false))))) !== false) ? ((function (arg$user_id, arg$vector_diff, arg$operation_xml, arg$syncing) {
var old$user_id = ((typeof(user_id) !== 'undefined') ? user_id : undefined);
user_id = arg$user_id;
var old$vector_diff = ((typeof(vector_diff) !== 'undefined') ? vector_diff : undefined);
vector_diff = arg$vector_diff;
var old$operation_xml = ((typeof(operation_xml) !== 'undefined') ? operation_xml : undefined);
operation_xml = arg$operation_xml;
var old$syncing = ((typeof(syncing) !== 'undefined') ? syncing : undefined);
syncing = arg$syncing;
try {
return ((((session_buffer) !== false) ? ((FN_save_current_buffer_fn)(((function () {
try {
return (((FN_set_buffer)((session_buffer))),
(((syncing) !== false) ? (false) : ((FN_infinote_diff_user_vector)((user_id), (vector_diff)))),
((function (arg$request_vector) {
var old$request_vector = ((typeof(request_vector) !== 'undefined') ? request_vector : undefined);
request_vector = arg$request_vector;
try {
return (((FN_infinote_handle_request)((user_id), (request_vector), ((FN_infinote_xml_to_operation)((operation_xml))))));
} finally {request_vector = old$request_vector;
}})((((syncing) !== false) ? (vector_diff) : ((FN_infinote_user_vector)((user_id)))))));
} finally {}})))) : (false)));
} finally {user_id = old$user_id;
vector_diff = old$vector_diff;
operation_xml = old$operation_xml;
syncing = old$syncing;
}})(((FN_string_to_number)(((FN_assoc_default)(("user"), (attributes))))), ((FN_infinote_read_vector)(((FN_assoc_default)(("time"), (attributes))))), ((FN_car)((contents))), ((FN_eq)((command), ("sync-request"))))) : (false))))))))))))))))))));
} finally {command = old$command;
attributes = old$attributes;
contents = old$contents;
session_buffer = old$session_buffer;
}})(((FN_car)((command_xml_data))), ((FN_cadr)((command_xml_data))), ((FN_cddr)((command_xml_data))), ((FN_lax_plist_get)((infinote_sessions), (group_name))))));
} finally {command_xml_data = old$command_xml_data;
}});
FN_xmlgen = (function (arg$form, arg$in_elm, arg$level) {
var old$form = ((typeof(form) !== 'undefined') ? form : undefined);
form = arg$form;
var old$in_elm = ((typeof(in_elm) !== 'undefined') ? in_elm : undefined);
in_elm = arg$in_elm;
var old$level = ((typeof(level) !== 'undefined') ? level : undefined);
level = arg$level;
try {
in_elm = (typeof(in_elm) === 'undefined') ? false : in_elm;
level = (typeof(level) === 'undefined') ? false : level;
return (("Convert a sexp to xml:\n  '(p :class \"big\")) => \"<p class=\\\"big\\\" />\""),
((function (arg$level) {
var old$level = ((typeof(level) !== 'undefined') ? level : undefined);
level = arg$level;
try {
return (((((FN_numberp)((form))) !== false) ? ((FN_number_to_string)((form))) : ((((FN_stringp)((form))) !== false) ? (form) : ((((FN_listp)((form))) !== false) ? ((function (arg$__cl_rest__44525) {
var old$__cl_rest__44525 = ((typeof(__cl_rest__44525) !== 'undefined') ? __cl_rest__44525 : undefined);
__cl_rest__44525 = arg$__cl_rest__44525;
try {
return (((function (arg$xml) {
var old$xml = ((typeof(xml) !== 'undefined') ? xml : undefined);
xml = arg$xml;
try {
return (((function (arg$attrs) {
var old$attrs = ((typeof(attrs) !== 'undefined') ? attrs : undefined);
attrs = arg$attrs;
try {
return (((function () {
try {
return (((function (arg$el) {
var old$el = ((typeof(el) !== 'undefined') ? el : undefined);
el = arg$el;
try {
return (((((FN_symbolp)((el))) !== false) ? (false) : ((FN_error)(("Element must be a symbol (got '%S')."), (el)))),
((((FN_member)((el), (FN_cons("!unescape", FN_cons("!escape", false))))) !== false) ? ((function (arg$xmlgen_escape_elm_vals) {
var old$xmlgen_escape_elm_vals = ((typeof(xmlgen_escape_elm_vals) !== 'undefined') ? xmlgen_escape_elm_vals : undefined);
xmlgen_escape_elm_vals = arg$xmlgen_escape_elm_vals;
try {
return (((FN_mapconcat)(((function (arg$s) {
var old$s = ((typeof(s) !== 'undefined') ? s : undefined);
s = arg$s;
try {
return (((FN_xmlgen)((s), (in_elm), ((FN_1$PLUS_)((level))))));
} finally {s = old$s;
}})), ((FN_cdr)((xml))), (""))));
} finally {xmlgen_escape_elm_vals = old$xmlgen_escape_elm_vals;
}})(((((FN_equal)(("!escape"), (el))) !== false) ? (true) : (false)))) : (((false), ((el=((FN_symbol_name)((el))))), ((FN_concat)(("<"), (el), ((FN_xmlgen_attr_to_string)((attrs))), ((((FN_$GT_)(((FN_length)((xml))), (1))) !== false) ? ((FN_concat)((">"), ((FN_mapconcat)(((function (arg$s) {
var old$s = ((typeof(s) !== 'undefined') ? s : undefined);
s = arg$s;
try {
return (((FN_xmlgen)((s), (el), ((FN_1$PLUS_)((level))))));
} finally {s = old$s;
}})), (((xmlgen_escape_elm_vals) !== false) ? ((FN_mapcar)((FN_xmlgen_string_escape), ((FN_cdr)((xml))))) : ((FN_cdr)((xml)))), (""))), ("</"), (el), (">"))) : ("/>"))))))));
} finally {el = old$el;
}})(((FN_car)((xml))))));
} finally {}})()));
} finally {attrs = old$attrs;
}})(((FN_car)((__cl_rest__44525))))));
} finally {xml = old$xml;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__44525))), (2))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__44525);
false;
 (__cl_rest__44525=((FN_cdr)((__cl_rest__44525))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__44525)))))))))));
} finally {__cl_rest__44525 = old$__cl_rest__44525;
}})(((FN_xmlgen_extract_plist)((form))))) : (false)))));
} finally {level = old$level;
}})(((function (arg$exp4452644527) {
var old$exp4452644527 = ((typeof(exp4452644527) !== 'undefined') ? exp4452644527 : undefined);
exp4452644527 = arg$exp4452644527;
try {
return ((((exp4452644527) !== false) ? (exp4452644527) : (0)));
} finally {exp4452644527 = old$exp4452644527;
}})((level))))));
} finally {form = old$form;
in_elm = old$in_elm;
level = old$level;
}});
FN_xmlgen_extract_plist = (function (arg$list) {
var old$list = ((typeof(list) !== 'undefined') ? list : undefined);
list = arg$list;
try {
return (("Extract a plist from LIST returning the original list without\nthe plist and the plist."),
((function (arg$nlist, arg$plist, arg$last_keyword) {
var old$nlist = ((typeof(nlist) !== 'undefined') ? nlist : undefined);
nlist = arg$nlist;
var old$plist = ((typeof(plist) !== 'undefined') ? plist : undefined);
plist = arg$plist;
var old$last_keyword = ((typeof(last_keyword) !== 'undefined') ? last_keyword : undefined);
last_keyword = arg$last_keyword;
try {
return (((FN_mapc)(((function (arg$item) {
var old$item = ((typeof(item) !== 'undefined') ? item : undefined);
item = arg$item;
try {
return (((function (arg$item) {
var old$item = ((typeof(item) !== 'undefined') ? item : undefined);
item = arg$item;
try {
return ((((last_keyword) !== false) ? (((false), ((plist=((FN_append)((plist), ((FN_list)((last_keyword))))))), ((plist=((FN_append)((plist), ((FN_list)((item))))))), ((last_keyword=(false))))) : ((((FN_keywordp)((item))) !== false) ? ((last_keyword=(item))) : (((true) !== false) ? ((nlist=((FN_append)((nlist), ((FN_list)((item))))))) : (false)))));
} finally {item = old$item;
}})(((FN_car)(((function () {
var $ret = (list);
false;
 (list=((FN_cdr)((list))));
return $ret;
})()))))));
} finally {item = old$item;
}})), (list))),
(((last_keyword) !== false) ? ((FN_error)(("No value to satisfy keyword '%s'"), ((FN_symbol_name)((last_keyword))))) : (false)),
((FN_list)((nlist), (plist))));
} finally {nlist = old$nlist;
plist = old$plist;
last_keyword = old$last_keyword;
}})((false), (false), (false))));
} finally {list = old$list;
}});
FN_xmlgen_attr_to_string = (function (arg$plist) {
var old$plist = ((typeof(plist) !== 'undefined') ? plist : undefined);
plist = arg$plist;
try {
return (("Convert a plist to xml style attributes."),
((function (arg$res) {
var old$res = ((typeof(res) !== 'undefined') ? res : undefined);
res = arg$res;
try {
return (((function () {
while ((plist) !== false) {(function (arg$sym) {
var old$sym = ((typeof(sym) !== 'undefined') ? sym : undefined);
sym = arg$sym;
try {
return (((function (arg$val) {
var old$val = ((typeof(val) !== 'undefined') ? val : undefined);
val = arg$val;
try {
return (((function (arg$treated) {
var old$treated = ((typeof(treated) !== 'undefined') ? treated : undefined);
treated = arg$treated;
try {
return (((function () {
try {
return (((res=((FN_concat)((res), (" "), ((FN_substring)(((FN_symbol_name)((sym))), (1))), ("=\""), (((xmlgen_escape_attribute_vals) !== false) ? ((FN_xmlgen_string_escape)((treated))) : (treated)), ("\""))))));
} finally {}})()));
} finally {treated = old$treated;
}})(((((FN_numberp)((val))) !== false) ? ((FN_number_to_string)((val))) : ((((FN_stringp)((val))) !== false) ? (val) : (false))))));
} finally {val = old$val;
}})(((FN_car)(((function () {
var $ret = (plist);
false;
 (plist=((FN_cdr)((plist))));
return $ret;
})()))))));
} finally {sym = old$sym;
}})(((FN_car)(((function () {
var $ret = (plist);
false;
 (plist=((FN_cdr)((plist))));
return $ret;
})()))))};
})()),
(res));
} finally {res = old$res;
}})((""))));
} finally {plist = old$plist;
}});
FN_xmlgen_string_escape = (function (arg$string) {
var old$string = ((typeof(string) !== 'undefined') ? string : undefined);
string = arg$string;
try {
return (("Escape STRING for inclusion in some XML."),
((((FN_stringp)((string))) !== false) ? ((FN_mapc)(((function (arg$e) {
var old$e = ((typeof(e) !== 'undefined') ? e : undefined);
e = arg$e;
try {
return (((string=((FN_replace_regexp_in_string)(((FN_car)((e))), ((FN_cdr)((e))), (string))))));
} finally {e = old$e;
}})), (xmlgen_escapees))) : (false)),
(string));
} finally {string = old$string;
}});
FN_xml_parse_tag_1 = (function (arg$parse_dtd, arg$parse_ns) {
var old$parse_dtd = ((typeof(parse_dtd) !== 'undefined') ? parse_dtd : undefined);
parse_dtd = arg$parse_dtd;
var old$parse_ns = ((typeof(parse_ns) !== 'undefined') ? parse_ns : undefined);
parse_ns = arg$parse_ns;
try {
parse_dtd = (typeof(parse_dtd) === 'undefined') ? false : parse_dtd;
parse_ns = (typeof(parse_ns) === 'undefined') ? false : parse_ns;
return (("Like `xml-parse-tag', but possibly modify the buffer while working."),
((function (arg$xml_validating_parser) {
var old$xml_validating_parser = ((typeof(xml_validating_parser) !== 'undefined') ? xml_validating_parser : undefined);
xml_validating_parser = arg$xml_validating_parser;
try {
return (((function (arg$xml_ns) {
var old$xml_ns = ((typeof(xml_ns) !== 'undefined') ? xml_ns : undefined);
xml_ns = arg$xml_ns;
try {
return (((function () {
try {
return (((((FN_looking_at)(("<\\?"))) !== false) ? (((false), ((FN_search_forward)(("?>"))), ((FN_skip_syntax_forward)((" "))), ((FN_xml_parse_tag_1)((parse_dtd), (xml_ns))))) : ((((FN_looking_at)(("<!\\[CDATA\\["))) !== false) ? ((function (arg$pos) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((((FN_search_forward)(("]]>"), (false), (true))) !== false) ? (false) : ((FN_error)(("XML: (Not Well Formed) CDATA section does not end anywhere in the document")))),
((FN_concat)(((FN_buffer_substring_no_properties)((pos), ((FN_match_beginning)((0))))), ((FN_xml_parse_string)()))));
} finally {pos = old$pos;
}})(((FN_match_end)((0))))) : ((((FN_looking_at)(("<!DOCTYPE[ \t\n\r]"))) !== false) ? ((function (arg$dtd) {
var old$dtd = ((typeof(dtd) !== 'undefined') ? dtd : undefined);
dtd = arg$dtd;
try {
return (((FN_skip_syntax_forward)((" "))),
(((xml_validating_parser) !== false) ? ((FN_cons)((dtd), ((FN_xml_parse_tag_1)((false), (xml_ns))))) : ((FN_xml_parse_tag_1)((false), (xml_ns)))));
} finally {dtd = old$dtd;
}})(((FN_xml_parse_dtd)((parse_ns))))) : ((((FN_looking_at)(("<!--"))) !== false) ? (((false), ((FN_search_forward)(("-->"))), ((FN_skip_syntax_forward)((" "))), ((((FN_eobp)()) !== false) ? (false) : ((function (arg$xml_sub_parser) {
var old$xml_sub_parser = ((typeof(xml_sub_parser) !== 'undefined') ? xml_sub_parser : undefined);
xml_sub_parser = arg$xml_sub_parser;
try {
return (((FN_xml_parse_tag_1)((parse_dtd), (xml_ns))));
} finally {xml_sub_parser = old$xml_sub_parser;
}})((true)))))) : ((((FN_looking_at)(("</"))) !== false) ? (false) : ((((FN_looking_at)(((FN_concat)(("<\\("), (xml_name_re), ("\\)"))))) !== false) ? (((false), ((FN_goto_char)(((FN_match_end)((1))))), ((function (arg$node_name) {
var old$node_name = ((typeof(node_name) !== 'undefined') ? node_name : undefined);
node_name = arg$node_name;
try {
return (((function (arg$attrs) {
var old$attrs = ((typeof(attrs) !== 'undefined') ? attrs : undefined);
attrs = arg$attrs;
try {
return (((function (arg$children) {
var old$children = ((typeof(children) !== 'undefined') ? children : undefined);
children = arg$children;
try {
return (((function () {
try {
return (((((FN_consp)((xml_ns))) !== false) ? ((function (arg$__cl_dolist_temp__44528) {
var old$__cl_dolist_temp__44528 = ((typeof(__cl_dolist_temp__44528) !== 'undefined') ? __cl_dolist_temp__44528 : undefined);
__cl_dolist_temp__44528 = arg$__cl_dolist_temp__44528;
try {
return (((function () {
while ((__cl_dolist_temp__44528) !== false) {(function (arg$attr) {
var old$attr = ((typeof(attr) !== 'undefined') ? attr : undefined);
attr = arg$attr;
try {
return (((((((FN_consp)(((FN_car)((attr))))) !== false) ? ((FN_equal)(("http://www.w3.org/2000/xmlns/"), ((FN_caar)((attr))))) : (false)) !== false) ? ((((FN_symbolp)(((FN_car)((xml_ns))))) !== false) ? ((function (arg$__cl_arg1__44529) {
var old$__cl_arg1__44529 = ((typeof(__cl_arg1__44529) !== 'undefined') ? __cl_arg1__44529 : undefined);
__cl_arg1__44529 = arg$__cl_arg1__44529;
try {
return (((function () {
try {
return (((FN_setcdr)((xml_ns), ((FN_cons)((__cl_arg1__44529), ((FN_cdr)((xml_ns))))))));
} finally {}})()));
} finally {__cl_arg1__44529 = old$__cl_arg1__44529;
}})(((FN_cons)(((FN_cdar)((attr))), ((FN_cdr)((attr))))))) : ((xml_ns=((FN_cons)(((FN_cons)(((FN_cdar)((attr))), ((FN_cdr)((attr))))), (xml_ns)))))) : (false)),
((__cl_dolist_temp__44528=((FN_cdr)((__cl_dolist_temp__44528))))));
} finally {attr = old$attr;
}})(((FN_car)((__cl_dolist_temp__44528))))};
})()));
} finally {__cl_dolist_temp__44528 = old$__cl_dolist_temp__44528;
}})((attrs))) : (false)),
((children=((FN_list)((attrs), ((FN_xml_maybe_do_ns)((node_name), (""), (xml_ns))))))),
((((FN_looking_at)(("/>"))) !== false) ? (((false), ((FN_forward_char)((2))), ((FN_nreverse)((children))))) : ((((FN_eq)(((FN_char_after)()), (62))) !== false) ? (((false), ((FN_forward_char)((1))), ((function (arg$end) {
var old$end = ((typeof(end) !== 'undefined') ? end : undefined);
end = arg$end;
try {
return (((function () {
while (((FN_not)(((FN_looking_at)((end))))) !== false) {(((FN_eobp)()) !== false) ? ((FN_error)(("XML: (Not Well-Formed) End of document while reading element `%s'"), (node_name))) : ((((FN_looking_at)(("</"))) !== false) ? (((false), ((FN_forward_char)((2))), ((FN_error)(("XML: (Not Well-Formed) Invalid end tag `%s' (expecting `%s')"), ((function (arg$pos) {
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
try {
return (((FN_buffer_substring)((pos), ((((FN_re_search_forward)(("\\s-*>"), (false), (true))) !== false) ? ((FN_match_beginning)((0))) : ((FN_point_max)())))));
} finally {pos = old$pos;
}})(((FN_point)()))), (node_name))))) : ((((FN_$EQ_)(((FN_char_after)()), (60))) !== false) ? ((function (arg$tag) {
var old$tag = ((typeof(tag) !== 'undefined') ? tag : undefined);
tag = arg$tag;
try {
return ((((tag) !== false) ? ((children=((FN_cons)((tag), (children))))) : (false)));
} finally {tag = old$tag;
}})(((FN_xml_parse_tag_1)((false), (xml_ns))))) : (((true) !== false) ? ((function (arg$expansion) {
var old$expansion = ((typeof(expansion) !== 'undefined') ? expansion : undefined);
expansion = arg$expansion;
try {
return (((children=((FN_cons)(((((FN_stringp)(((FN_car)((children))))) !== false) ? ((FN_concat)(((FN_car)(((function () {
var $ret = (children);
false;
 (children=((FN_cdr)((children))));
return $ret;
})()))), (expansion))) : (expansion)), (children))))));
} finally {expansion = old$expansion;
}})(((FN_xml_parse_string)()))) : (false))))};
})()),
((FN_goto_char)(((FN_match_end)((0))))),
((FN_nreverse)((children))));
} finally {end = old$end;
}})(((FN_concat)(("</"), (node_name), ("\\s-*>"))))))) : (((true) !== false) ? ((FN_error)(("XML: (Well-Formed) Couldn't parse tag: %s"), ((FN_buffer_substring_no_properties)(((FN__)(((FN_point)()), (10))), ((FN_$PLUS_)(((FN_point)()), (1))))))) : (false)))));
} finally {}})()));
} finally {children = old$children;
}})((false))));
} finally {attrs = old$attrs;
}})(((FN_xml_parse_attlist)((xml_ns))))));
} finally {node_name = old$node_name;
}})(((FN_match_string_no_properties)((1))))))) : (((true) !== false) ? (((false), (((xml_sub_parser) !== false) ? (false) : ((FN_error)(("XML: (Well-Formed) Invalid character")))), ((FN_xml_parse_string)()))) : (false)))))))));
} finally {}})()));
} finally {xml_ns = old$xml_ns;
}})(((((FN_eq)((parse_ns), ("symbol-qnames"))) !== false) ? ((FN_cons)(("symbol-qnames"), (xml_default_ns))) : ((((function (arg$exp4453044531) {
var old$exp4453044531 = ((typeof(exp4453044531) !== 'undefined') ? exp4453044531 : undefined);
exp4453044531 = arg$exp4453044531;
try {
return ((((exp4453044531) !== false) ? (exp4453044531) : ((((FN_eq)(((FN_car_safe)((parse_ns))), ("symbol-qnames"))) !== false) ? ((FN_listp)(((FN_cdr)((parse_ns))))) : (false))));
} finally {exp4453044531 = old$exp4453044531;
}})(((FN_consp)(((FN_car_safe)((parse_ns))))))) !== false) ? (parse_ns) : (((parse_ns) !== false) ? (xml_default_ns) : (false)))))));
} finally {xml_validating_parser = old$xml_validating_parser;
}})(((function (arg$exp4453244533) {
var old$exp4453244533 = ((typeof(exp4453244533) !== 'undefined') ? exp4453244533 : undefined);
exp4453244533 = arg$exp4453244533;
try {
return ((((exp4453244533) !== false) ? (exp4453244533) : (xml_validating_parser)));
} finally {exp4453244533 = old$exp4453244533;
}})((parse_dtd))))));
} finally {parse_dtd = old$parse_dtd;
parse_ns = old$parse_ns;
}});
FN_xml_parse_attlist = (function (arg$xml_ns) {
var old$xml_ns = ((typeof(xml_ns) !== 'undefined') ? xml_ns : undefined);
xml_ns = arg$xml_ns;
try {
xml_ns = (typeof(xml_ns) === 'undefined') ? false : xml_ns;
return (("Return the attribute-list after point.\nLeave point at the first non-blank character after the tag."),
((function (arg$attlist, arg$end_pos, arg$name) {
var old$attlist = ((typeof(attlist) !== 'undefined') ? attlist : undefined);
attlist = arg$attlist;
var old$end_pos = ((typeof(end_pos) !== 'undefined') ? end_pos : undefined);
end_pos = arg$end_pos;
var old$name = ((typeof(name) !== 'undefined') ? name : undefined);
name = arg$name;
try {
return (((FN_skip_syntax_forward)((" "))),
((function () {
while (((FN_looking_at)(((FN_concat)(("\\("), (xml_name_re), ("\\)\\s-*=\\s-*"))))) !== false) {(end_pos=((FN_match_end)((0))));
 (name=((FN_xml_maybe_do_ns)(((FN_match_string_no_properties)((1))), (false), (xml_ns))));
 (FN_goto_char)((end_pos));
 (((FN_looking_at)(("\"\\([^\"]*\\)\""))) !== false) ? ((end_pos=((FN_match_end)((0))))) : ((((FN_looking_at)(("'\\([^']*\\)'"))) !== false) ? ((end_pos=((FN_match_end)((0))))) : ((FN_error)(("XML: (Not Well-Formed) Attribute values must be given between quotes"))));
 (((FN_assoc)((name), (attlist))) !== false) ? ((FN_error)(("XML: (Not Well-Formed) Each attribute must be unique within an element"))) : (false);
 (function (arg$string) {
var old$string = ((typeof(string) !== 'undefined') ? string : undefined);
string = arg$string;
try {
return (((FN_replace_regexp_in_string)(("\\s-\\{2,\\}"), (" "), (string))),
((function (arg$expansion) {
var old$expansion = ((typeof(expansion) !== 'undefined') ? expansion : undefined);
expansion = arg$expansion;
try {
return (((((FN_stringp)((expansion))) !== false) ? (false) : ((FN_error)(("XML: (Not Well-Formed) Entities in attributes cannot expand into elements")))),
((attlist=((FN_cons)(((FN_cons)((name), (expansion))), (attlist))))));
} finally {expansion = old$expansion;
}})(((FN_xml_substitute_special)((string))))));
} finally {string = old$string;
}})(((FN_match_string_no_properties)((1))));
 (FN_goto_char)((end_pos));
 (FN_skip_syntax_forward)((" "))};
})()),
((FN_nreverse)((attlist))));
} finally {attlist = old$attlist;
end_pos = old$end_pos;
name = old$name;
}})((false), (false), (false))));
} finally {xml_ns = old$xml_ns;
}});
FN_xml_maybe_do_ns = (function (arg$name, arg$_$default, arg$xml_ns) {
var old$name = ((typeof(name) !== 'undefined') ? name : undefined);
name = arg$name;
var old$_$default = ((typeof(_$default) !== 'undefined') ? _$default : undefined);
_$default = arg$_$default;
var old$xml_ns = ((typeof(xml_ns) !== 'undefined') ? xml_ns : undefined);
xml_ns = arg$xml_ns;
try {
return (("Perform any namespace expansion.\nNAME is the name to perform the expansion on.\nDEFAULT is the default namespace.  XML-NS is a cons of namespace\nnames to uris.  When namespace-aware parsing is off, then XML-NS\nis nil.\n\nDuring namespace-aware parsing, any name without a namespace is\nput into the namespace identified by DEFAULT.  nil is used to\nspecify that the name shouldn't be given a namespace.\nExpanded names will by default be returned as a cons.  If you\nwould like to get plain symbols instead, provide a cons cell\n\n  (symbol-qnames . ALIST)\n\nin the XML-NS argument."),
((((FN_consp)((xml_ns))) !== false) ? ((function (arg$symbol_qnames) {
var old$symbol_qnames = ((typeof(symbol_qnames) !== 'undefined') ? symbol_qnames : undefined);
symbol_qnames = arg$symbol_qnames;
try {
return (((function (arg$nsp) {
var old$nsp = ((typeof(nsp) !== 'undefined') ? nsp : undefined);
nsp = arg$nsp;
try {
return (((function (arg$lname) {
var old$lname = ((typeof(lname) !== 'undefined') ? lname : undefined);
lname = arg$lname;
try {
return (((function (arg$prefix) {
var old$prefix = ((typeof(prefix) !== 'undefined') ? prefix : undefined);
prefix = arg$prefix;
try {
return (((function (arg$special) {
var old$special = ((typeof(special) !== 'undefined') ? special : undefined);
special = arg$special;
try {
return (((function (arg$ns) {
var old$ns = ((typeof(ns) !== 'undefined') ? ns : undefined);
ns = arg$ns;
try {
return (((function () {
try {
return ((((((symbol_qnames) !== false) ? ((FN_not)(((FN_string$EQ_)((prefix), ("xmlns"))))) : (false)) !== false) ? ((FN_intern)(((FN_concat)((ns), (lname))))) : ((FN_cons)((ns), (((special) !== false) ? ("") : (lname))))));
} finally {}})()));
} finally {ns = old$ns;
}})(((function (arg$exp4453444535) {
var old$exp4453444535 = ((typeof(exp4453444535) !== 'undefined') ? exp4453444535 : undefined);
exp4453444535 = arg$exp4453444535;
try {
return ((((exp4453444535) !== false) ? (exp4453444535) : ("")));
} finally {exp4453444535 = old$exp4453444535;
}})(((FN_cdr)(((FN_assoc)((((special) !== false) ? ("xmlns") : (prefix)), (((symbol_qnames) !== false) ? ((FN_cdr)((xml_ns))) : (xml_ns)))))))))));
} finally {special = old$special;
}})(((((FN_string_equal)((lname), ("xmlns"))) !== false) ? ((FN_not)((prefix))) : (false)))));
} finally {prefix = old$prefix;
}})((((nsp) !== false) ? ((FN_substring)((name), (0), ((FN_match_beginning)((0))))) : (_$default)))));
} finally {lname = old$lname;
}})((((nsp) !== false) ? ((FN_substring)((name), ((FN_match_end)((0))))) : (name)))));
} finally {nsp = old$nsp;
}})(((FN_string_match)((":"), (name))))));
} finally {symbol_qnames = old$symbol_qnames;
}})(((FN_eq)(((FN_car_safe)((xml_ns))), ("symbol-qnames"))))) : ((FN_intern)((name)))));
} finally {name = old$name;
_$default = old$_$default;
xml_ns = old$xml_ns;
}});
FN_xml_substitute_special = (function (arg$string) {
var old$string = ((typeof(string) !== 'undefined') ? string : undefined);
string = arg$string;
try {
return (("Return STRING, after substituting entity and character references.\nSTRING is assumed to occur in an XML attribute value."),
((function (arg$strlen, arg$children) {
var old$strlen = ((typeof(strlen) !== 'undefined') ? strlen : undefined);
strlen = arg$strlen;
var old$children = ((typeof(children) !== 'undefined') ? children : undefined);
children = arg$children;
try {
return (((function () {
while (((FN_string_match)((xml_entity_or_char_ref_re), (string))) !== false) {(children=((FN_cons)(((FN_substring)((string), (0), ((FN_match_beginning)((0))))), (children))));
 (function (arg$remainder) {
var old$remainder = ((typeof(remainder) !== 'undefined') ? remainder : undefined);
remainder = arg$remainder;
try {
return (((function (arg$is_hex) {
var old$is_hex = ((typeof(is_hex) !== 'undefined') ? is_hex : undefined);
is_hex = arg$is_hex;
try {
return (((function (arg$ref) {
var old$ref = ((typeof(ref) !== 'undefined') ? ref : undefined);
ref = arg$ref;
try {
return (((function () {
try {
return ((((ref) !== false) ? ((function (arg$val) {
var old$val = ((typeof(val) !== 'undefined') ? val : undefined);
val = arg$val;
try {
return (((children=((FN_cons)((((val) !== false) ? ((FN_string)((val))) : (((xml_validating_parser) !== false) ? ((FN_error)(("XML: (Validity) Undefined character `x%s'"), (ref))) : (((true) !== false) ? (xml_undefined_entity) : (false)))), (children))))),
((string=(remainder), ((strlen=((FN_length)((string))))))));
} finally {val = old$val;
}})(((FN_decode_char)(("ucs"), ((FN_string_to_number)((ref), (((is_hex) !== false) ? (16) : (false)))))))) : (((false), ((ref=((FN_match_string)((3), (string))))), ((function (arg$val) {
var old$val = ((typeof(val) !== 'undefined') ? val : undefined);
val = arg$val;
try {
return (((string=((FN_concat)((val), (remainder))))));
} finally {val = old$val;
}})(((function (arg$exp4453644537) {
var old$exp4453644537 = ((typeof(exp4453644537) !== 'undefined') ? exp4453644537 : undefined);
exp4453644537 = arg$exp4453644537;
try {
return ((((exp4453644537) !== false) ? (exp4453644537) : (((xml_validating_parser) !== false) ? ((FN_error)(("XML: (Validity) Undefined entity `%s'"), (ref))) : (xml_undefined_entity))));
} finally {exp4453644537 = old$exp4453644537;
}})(((FN_cdr)(((FN_assoc)((ref), (xml_entity_alist))))))))), (((xml_entity_expansion_limit) !== false) ? ((((FN_$GT_)(((FN_length)((string))), ((FN_$PLUS_)((strlen), (xml_entity_expansion_limit))))) !== false) ? ((FN_error)(("XML: Passed `xml-entity-expansion-limit' while expanding `&%s;'"), (ref))) : (false)) : (false))))));
} finally {}})()));
} finally {ref = old$ref;
}})(((FN_match_string)((2), (string))))));
} finally {is_hex = old$is_hex;
}})(((FN_match_string)((1), (string))))));
} finally {remainder = old$remainder;
}})(((FN_substring)((string), ((FN_match_end)((0))))))};
})()),
((FN_mapconcat)((FN_identity), ((FN_nreverse)(((FN_cons)((string), (children))))), (""))));
} finally {strlen = old$strlen;
children = old$children;
}})(((FN_length)((string))), (false))));
} finally {string = old$string;
}});
FN_xml_parse_string = (function () {
try {
return (("Parse character data at point, and return it as a string.\nLeave point at the start of the next thing to parse.  This\nfunction can modify the buffer by expanding entity and character\nreferences."),
((function (arg$start, arg$old_remaining_size, arg$ref, arg$val) {
var old$start = ((typeof(start) !== 'undefined') ? start : undefined);
start = arg$start;
var old$old_remaining_size = ((typeof(old_remaining_size) !== 'undefined') ? old_remaining_size : undefined);
old_remaining_size = arg$old_remaining_size;
var old$ref = ((typeof(ref) !== 'undefined') ? ref : undefined);
ref = arg$ref;
var old$val = ((typeof(val) !== 'undefined') ? val : undefined);
val = arg$val;
try {
return (((function () {
while (((((FN_not)(((FN_eobp)()))) !== false) ? ((FN_not)(((FN_looking_at)(("<"))))) : (false)) !== false) {(FN_skip_chars_forward)(("^<&"));
 (((FN_eq)(((FN_char_after)()), (38))) !== false) ? (((false), ((((FN_looking_at)((xml_entity_or_char_ref_re))) !== false) ? (false) : ((FN_error)(("XML: (Not Well-Formed) Invalid entity reference")))), ((((ref=((FN_match_string)((2))))) !== false) ? (((false), ((val=((function (arg$save_match_data_internal) {
var old$save_match_data_internal = ((typeof(save_match_data_internal) !== 'undefined') ? save_match_data_internal : undefined);
save_match_data_internal = arg$save_match_data_internal;
try {
return (((function () {
try {
return (FN_decode_char)(("ucs"), ((FN_string_to_number)((ref), ((((FN_match_string)((1))) !== false) ? (16) : (false)))));
} finally {
(FN_set_match_data)((save_match_data_internal), ("evaporate"))}})()));
} finally {save_match_data_internal = old$save_match_data_internal;
}})(((FN_match_data)()))))), ((((FN_null)((val))) !== false) ? (((xml_validating_parser) !== false) ? ((FN_error)(("XML: (Validity) Invalid character reference `%s'"), ((FN_match_string)((0))))) : (false)) : (false)), ((FN_replace_match)((((val) !== false) ? ((FN_string)((val))) : (xml_undefined_entity)), (true), (true))))) : (((false), ((ref=((FN_match_string)((3))), ((val=((FN_assoc)((ref), (xml_entity_alist))))))), ((((FN_null)((val))) !== false) ? (((xml_validating_parser) !== false) ? ((FN_error)(("XML: (Validity) Undefined entity `%s'"), (ref))) : (false)) : (false)), ((FN_replace_match)(((function (arg$exp4453844539) {
var old$exp4453844539 = ((typeof(exp4453844539) !== 'undefined') ? exp4453844539 : undefined);
exp4453844539 = arg$exp4453844539;
try {
return ((((exp4453844539) !== false) ? (exp4453844539) : (xml_undefined_entity)));
} finally {exp4453844539 = old$exp4453844539;
}})(((FN_cdr)((val))))), (true), (true))), ((FN_goto_char)(((FN_match_beginning)((0)))))))), (((xml_entity_expansion_limit) !== false) ? ((((FN_$GT_)(((FN__)(((FN_buffer_size)()), ((FN_point)()))), ((FN_$PLUS_)((old_remaining_size), (xml_entity_expansion_limit))))) !== false) ? ((FN_error)(("XML: Entity reference expansion surpassed `xml-entity-expansion-limit'"))) : (false)) : (false)))) : (false)};
})()),
((function (arg$end_marker) {
var old$end_marker = ((typeof(end_marker) !== 'undefined') ? end_marker : undefined);
end_marker = arg$end_marker;
try {
return (((FN_goto_char)((start))),
((function () {
while (((FN_re_search_forward)(("\r\n?"), (end_marker), (true))) !== false) {(FN_replace_match)(("\n"), (true), (true))};
})()),
((FN_goto_char)((end_marker))),
((FN_buffer_substring)((start), ((FN_point)()))));
} finally {end_marker = old$end_marker;
}})(((FN_point_marker)()))));
} finally {start = old$start;
old_remaining_size = old$old_remaining_size;
ref = old$ref;
val = old$val;
}})(((FN_point)()), ((FN__)(((FN_buffer_size)()), ((FN_point)()))), (false), (false))));
} finally {}});
FN_xml_get_attribute = (function (arg$node, arg$attribute) {
var old$node = ((typeof(node) !== 'undefined') ? node : undefined);
node = arg$node;
var old$attribute = ((typeof(attribute) !== 'undefined') ? attribute : undefined);
attribute = arg$attribute;
try {
return (("Get from NODE the value of ATTRIBUTE.\nAn empty string is returned if the attribute was not found.\n\nSee also `xml-get-attribute-or-nil'."),
((function (arg$exp4454044541) {
var old$exp4454044541 = ((typeof(exp4454044541) !== 'undefined') ? exp4454044541 : undefined);
exp4454044541 = arg$exp4454044541;
try {
return ((((exp4454044541) !== false) ? (exp4454044541) : ("")));
} finally {exp4454044541 = old$exp4454044541;
}})(((FN_xml_get_attribute_or_nil)((node), (attribute))))));
} finally {node = old$node;
attribute = old$attribute;
}});
FN_xml_get_attribute_or_nil = (function (arg$node, arg$attribute) {
var old$node = ((typeof(node) !== 'undefined') ? node : undefined);
node = arg$node;
var old$attribute = ((typeof(attribute) !== 'undefined') ? attribute : undefined);
attribute = arg$attribute;
try {
return (("Get from NODE the value of ATTRIBUTE.\nReturn nil if the attribute was not found.\n\nSee also `xml-get-attribute'."),
((FN_cdr)(((FN_assoc)((attribute), ((FN_xml_node_attributes)((node))))))));
} finally {node = old$node;
attribute = old$attribute;
}});
FN_xml_node_attributes = (function (arg$node) {
var old$node = ((typeof(node) !== 'undefined') ? node : undefined);
node = arg$node;
try {
return (("Return the list of attributes of NODE.\nThe list can be nil."),
((FN_nth)((1), (node))));
} finally {node = old$node;
}});
infinote_server = "irc.joelhough.com";
infinote_port = 6523;
infinote_user_name = "Andrew Cobb";
infinote_hue = 0.20254063606262207;
infinote_connection = false;
infinote_connection_buffer = false;
infinote_connection_ready = false;
infinote_verbose = false;
infinote_nodes = false;
infinote_sessions = false;
infinote_group_name = false;
infinote_node_id = false;
infinote_node_type = false;
infinote_users = false;
infinote_user_id = false;
infinote_request_log = false;
infinote_request_queue = false;
infinote_my_last_sent_vector = false;
infinote_inhibit_change_hooks = false;
infinote_before_change_text = false;
infinote_syncing = false;
xmlgen_escape_attribute_vals = true;
xmlgen_escape_elm_vals = true;
xmlgen_escapees = FN_cons(FN_cons("&", "&amp;"), FN_cons(FN_cons("'", "&apos;"), FN_cons(FN_cons("\"", "&quot;"), FN_cons(FN_cons("<", "&lt;"), FN_cons(FN_cons(">", "&gt;"), false)))));
xml_validating_parser = false;
xml_sub_parser = false;
xml_undefined_entity = "?";
xml_default_ns = FN_cons(FN_cons("", ""), FN_cons(FN_cons("xml", "http://www.w3.org/XML/1998/namespace"), FN_cons(FN_cons("xmlns", "http://www.w3.org/2000/xmlns/"), false)));
xml_name_start_char_re = "[[:word:]:_]";
xml_name_char_re = "[-0-9.[:word:]:_·̀-ͯ‿-⁀]";
xml_name_re = "[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*";
xml_names_re = "[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\(?: [[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\)*";
xml_nmtoken_re = "[-0-9.[:word:]:_·̀-ͯ‿-⁀]+";
xml_nmtokens_re = "[-0-9.[:word:]:_·̀-ͯ‿-⁀]+\\(?: [[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\)*";
xml_char_ref_re = "\\(?:&#[0-9]+;\\|&#x[0-9a-fA-F]+;\\)";
xml_entity_ref = "&[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*;";
xml_entity_alist = FN_cons(FN_cons("lt", "&#60;"), FN_cons(FN_cons("gt", ">"), FN_cons(FN_cons("apos", "'"), FN_cons(FN_cons("quot", "\""), FN_cons(FN_cons("amp", "&#38;"), false)))));
xml_entity_or_char_ref_re = "&\\(?:#\\(x\\)?\\([0-9a-fA-F]+\\)\\|\\([[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\)\\);";
xml_pe_reference_re = "%\\([[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\);";
xml_reference_re = "\\(?:&[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*;\\|\\(?:&#[0-9]+;\\|&#x[0-9a-fA-F]+;\\)\\)";
xml_att_value_re = "\\(?:\"\\(?:[^&\"]\\|\\(?:&[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*;\\|\\(?:&#[0-9]+;\\|&#x[0-9a-fA-F]+;\\)\\)\\)*\"\\|'\\(?:[^&']\\|\\(?:&[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*;\\|\\(?:&#[0-9]+;\\|&#x[0-9a-fA-F]+;\\)\\)\\)*'\\)";
xml_tokenized_type_re = "\\(?:ID\\|IDREF\\|IDREFS\\|ENTITY\\|ENTITIES\\|NMTOKEN\\|NMTOKENS\\)";
xml_notation_type_re = "\\(?:NOTATION\\s-+(\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\(?:\\s-*|\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\)*\\s-*)\\)";
xml_enumeration_re = "\\(?:(\\s-*[-0-9.[:word:]:_·̀-ͯ‿-⁀]+\\(?:\\s-*|\\s-*[-0-9.[:word:]:_·̀-ͯ‿-⁀]+\\)*\\s-+)\\)";
xml_enumerated_type_re = "\\(?:\\(?:NOTATION\\s-+(\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\(?:\\s-*|\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\)*\\s-*)\\)\\|\\(?:(\\s-*[-0-9.[:word:]:_·̀-ͯ‿-⁀]+\\(?:\\s-*|\\s-*[-0-9.[:word:]:_·̀-ͯ‿-⁀]+\\)*\\s-+)\\)\\)";
xml_att_type_re = "\\(?:CDATA\\|\\(?:ID\\|IDREF\\|IDREFS\\|ENTITY\\|ENTITIES\\|NMTOKEN\\|NMTOKENS\\)\\|\\(?:NOTATION\\s-+(\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\(?:\\s-*|\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\)*\\s-*)\\)\\|\\(?:\\(?:NOTATION\\s-+(\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\(?:\\s-*|\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\)*\\s-*)\\)\\|\\(?:(\\s-*[-0-9.[:word:]:_·̀-ͯ‿-⁀]+\\(?:\\s-*|\\s-*[-0-9.[:word:]:_·̀-ͯ‿-⁀]+\\)*\\s-+)\\)\\)\\)";
xml_default_decl_re = "\\(?:#REQUIRED\\|#IMPLIED\\|\\(?:#FIXED\\s-+\\)*\\(?:\"\\(?:[^&\"]\\|\\(?:&[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*;\\|\\(?:&#[0-9]+;\\|&#x[0-9a-fA-F]+;\\)\\)\\)*\"\\|'\\(?:[^&']\\|\\(?:&[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*;\\|\\(?:&#[0-9]+;\\|&#x[0-9a-fA-F]+;\\)\\)\\)*'\\)\\)";
xml_att_def_re = "\\(?:\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\s-*\\(?:CDATA\\|\\(?:ID\\|IDREF\\|IDREFS\\|ENTITY\\|ENTITIES\\|NMTOKEN\\|NMTOKENS\\)\\|\\(?:NOTATION\\s-+(\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\(?:\\s-*|\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\)*\\s-*)\\)\\|\\(?:\\(?:NOTATION\\s-+(\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\(?:\\s-*|\\s-*[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\)*\\s-*)\\)\\|\\(?:(\\s-*[-0-9.[:word:]:_·̀-ͯ‿-⁀]+\\(?:\\s-*|\\s-*[-0-9.[:word:]:_·̀-ͯ‿-⁀]+\\)*\\s-+)\\)\\)\\)\\s-*\\(?:#REQUIRED\\|#IMPLIED\\|\\(?:#FIXED\\s-+\\)*\\(?:\"\\(?:[^&\"]\\|\\(?:&[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*;\\|\\(?:&#[0-9]+;\\|&#x[0-9a-fA-F]+;\\)\\)\\)*\"\\|'\\(?:[^&']\\|\\(?:&[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*;\\|\\(?:&#[0-9]+;\\|&#x[0-9a-fA-F]+;\\)\\)\\)*'\\)\\)\\)";
xml_entity_value_re = "\\(?:\"\\(?:[^%&\"]\\|%\\([[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\);\\|\\(?:&[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*;\\|\\(?:&#[0-9]+;\\|&#x[0-9a-fA-F]+;\\)\\)\\)*\"\\|'\\(?:[^%&']\\|%\\([[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*\\);\\|\\(?:&[[:word:]:_][-0-9.[:word:]:_·̀-ͯ‿-⁀]*;\\|\\(?:&#[0-9]+;\\|&#x[0-9a-fA-F]+;\\)\\)\\)*'\\)";
xml_entity_expansion_limit = 20000;
buffer_add_make_local_var('infinote_nodes');
buffer_add_make_local_var('infinote_sessions');
buffer_add_make_local_var('infinote_group_name');
buffer_add_make_local_var('infinote_node_id');
buffer_add_make_local_var('infinote_node_type');
buffer_add_make_local_var('infinote_users');
buffer_add_make_local_var('infinote_user_id');
buffer_add_make_local_var('infinote_request_log');
buffer_add_make_local_var('infinote_request_queue');
buffer_add_make_local_var('infinote_my_last_sent_vector');
buffer_add_make_local_var('infinote_inhibit_change_hooks');
buffer_add_make_local_var('infinote_text_before_change');
buffer_add_make_local_var('infinote_syncing');
