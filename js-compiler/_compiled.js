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
return ((((false), ((function (arg$exp6922869229) {
var old$exp6922869229 = ((typeof(exp6922869229) !== 'undefined') ? exp6922869229 : undefined);
exp6922869229 = arg$exp6922869229;
try {
return ((((exp6922869229) !== false) ? (exp6922869229) : ((FN_signal)(("cl-assertion-failed"), ((FN_list)((FN_cons(">=", FN_cons("end", FN_cons("start", false))))))))));
} finally {exp6922869229 = old$exp6922869229;
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
}})(((function (arg$exp6923069231) {
var old$exp6923069231 = ((typeof(exp6923069231) !== 'undefined') ? exp6923069231 : undefined);
exp6923069231 = arg$exp6923069231;
try {
return ((((exp6923069231) !== false) ? (exp6923069231) : (infinote_group_name)));
} finally {exp6923069231 = old$exp6923069231;
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
return (((((function (arg$exp6923269233) {
var old$exp6923269233 = ((typeof(exp6923269233) !== 'undefined') ? exp6923269233 : undefined);
exp6923269233 = arg$exp6923269233;
try {
return ((((exp6923269233) !== false) ? (exp6923269233) : ((FN_save_current_buffer_fn)(((function () {
try {
return (((FN_set_buffer)((new_buffer))),
((function (arg$exp6923469235) {
var old$exp6923469235 = ((typeof(exp6923469235) !== 'undefined') ? exp6923469235 : undefined);
exp6923469235 = arg$exp6923469235;
try {
return ((((exp6923469235) !== false) ? (exp6923469235) : (infinote_node_id)));
} finally {exp6923469235 = old$exp6923469235;
}})(((FN_not)((infinote_mode))))));
} finally {}}))))));
} finally {exp6923269233 = old$exp6923269233;
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
((((FN_equal)((name), (infinote_user_name))) !== false) ? (((false), ((infinote_user_id=(id))), ((((function (arg$exp6923669237) {
var old$exp6923669237 = ((typeof(exp6923669237) !== 'undefined') ? exp6923669237 : undefined);
exp6923669237 = arg$exp6923669237;
try {
return ((((exp6923669237) !== false) ? (exp6923669237) : ((FN_$EQ_)(((FN_point_min)()), ((FN_point_max)())))));
} finally {exp6923669237 = old$exp6923669237;
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
return (((function (arg$__cl_var__69238) {
var old$__cl_var__69238 = ((typeof(__cl_var__69238) !== 'undefined') ? __cl_var__69238 : undefined);
__cl_var__69238 = arg$__cl_var__69238;
try {
return (((function (arg$__cl_var__69239) {
var old$__cl_var__69239 = ((typeof(__cl_var__69239) !== 'undefined') ? __cl_var__69239 : undefined);
__cl_var__69239 = arg$__cl_var__69239;
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
}})(((FN_car)((user_operation))), ((FN_cadr)((user_operation))))) !== false) ? ((__cl_var__69239=(false), ((__cl_var__69238=(false))))) : (true)) : (false)) !== false) {(user_operation=((FN_cddr)((user_operation))))};
})()),
(((__cl_var__69238) !== false) ? (true) : (__cl_var__69239)));
} finally {}})()));
} finally {__cl_var__69239 = old$__cl_var__69239;
}})((false))));
} finally {__cl_var__69238 = old$__cl_var__69238;
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
return (((function (arg$exp6924069241) {
var old$exp6924069241 = ((typeof(exp6924069241) !== 'undefined') ? exp6924069241 : undefined);
exp6924069241 = arg$exp6924069241;
try {
return ((((exp6924069241) !== false) ? (exp6924069241) : (0)));
} finally {exp6924069241 = old$exp6924069241;
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
return (((function (arg$__cl_var__69242) {
var old$__cl_var__69242 = ((typeof(__cl_var__69242) !== 'undefined') ? __cl_var__69242 : undefined);
__cl_var__69242 = arg$__cl_var__69242;
try {
return (((function (arg$request) {
var old$request = ((typeof(request) !== 'undefined') ? request : undefined);
request = arg$request;
try {
return (((function (arg$__cl_var__69243) {
var old$__cl_var__69243 = ((typeof(__cl_var__69243) !== 'undefined') ? __cl_var__69243 : undefined);
__cl_var__69243 = arg$__cl_var__69243;
try {
return (((function (arg$__cl_var__69244) {
var old$__cl_var__69244 = ((typeof(__cl_var__69244) !== 'undefined') ? __cl_var__69244 : undefined);
__cl_var__69244 = arg$__cl_var__69244;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((__cl_var__69242))) !== false) ? (((false), ((request=((FN_car)((__cl_var__69242))))), ((((((FN_equal)(((FN_car)((request))), (user_id))) !== false) ? ((FN_$EQ_)(((FN__)((n), (1))), ((FN_infinote_operation_count)((user_id), ((FN_cadr)((request))))))) : (false)) !== false) ? ((__cl_var__69244=(request), ((__cl_var__69243=(false))))) : (true)))) : (false)) !== false) {(__cl_var__69242=((FN_cdr)((__cl_var__69242))))};
})()),
(((__cl_var__69243) !== false) ? (false) : (__cl_var__69244)));
} finally {}})()));
} finally {__cl_var__69244 = old$__cl_var__69244;
}})((false))));
} finally {__cl_var__69243 = old$__cl_var__69243;
}})((true))));
} finally {request = old$request;
}})((false))));
} finally {__cl_var__69242 = old$__cl_var__69242;
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
return (((function (arg$__cl_var__69245) {
var old$__cl_var__69245 = ((typeof(__cl_var__69245) !== 'undefined') ? __cl_var__69245 : undefined);
__cl_var__69245 = arg$__cl_var__69245;
try {
return (((function (arg$__cl_var__69246) {
var old$__cl_var__69246 = ((typeof(__cl_var__69246) !== 'undefined') ? __cl_var__69246 : undefined);
__cl_var__69246 = arg$__cl_var__69246;
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
}})(((FN_car)((target_operation))), ((FN_cadr)((target_operation))))) !== false) ? ((__cl_var__69246=((FN_car)((target_operation))), ((__cl_var__69245=(false))))) : (true)) : (false)) !== false) {(target_operation=((FN_cddr)((target_operation))))};
})()),
(((__cl_var__69245) !== false) ? (false) : (__cl_var__69246)));
} finally {}})()));
} finally {__cl_var__69246 = old$__cl_var__69246;
}})((false))));
} finally {__cl_var__69245 = old$__cl_var__69245;
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
((function (arg$pcase_169119, arg$x69120) {
var old$pcase_169119 = ((typeof(pcase_169119) !== 'undefined') ? pcase_169119 : undefined);
pcase_169119 = arg$pcase_169119;
var old$x69120 = ((typeof(x69120) !== 'undefined') ? x69120 : undefined);
x69120 = arg$x69120;
try {
return (((((FN_consp)((x69120))) !== false) ? ((function (arg$xcar69121, arg$xcdr69122) {
var old$xcar69121 = ((typeof(xcar69121) !== 'undefined') ? xcar69121 : undefined);
xcar69121 = arg$xcar69121;
var old$xcdr69122 = ((typeof(xcdr69122) !== 'undefined') ? xcdr69122 : undefined);
xcdr69122 = arg$xcdr69122;
try {
return (((((FN_consp)((xcar69121))) !== false) ? ((function (arg$xcar69123, arg$xcdr69124) {
var old$xcar69123 = ((typeof(xcar69123) !== 'undefined') ? xcar69123 : undefined);
xcar69123 = arg$xcar69123;
var old$xcdr69124 = ((typeof(xcdr69124) !== 'undefined') ? xcdr69124 : undefined);
xcdr69124 = arg$xcdr69124;
try {
return (((((FN_eq)((xcar69123), ("split"))) !== false) ? ((((FN_consp)((xcdr69124))) !== false) ? ((function (arg$xcar69125, arg$xcdr69126) {
var old$xcar69125 = ((typeof(xcar69125) !== 'undefined') ? xcar69125 : undefined);
xcar69125 = arg$xcar69125;
var old$xcdr69126 = ((typeof(xcdr69126) !== 'undefined') ? xcdr69126 : undefined);
xcdr69126 = arg$xcdr69126;
try {
return (((((FN_consp)((xcdr69126))) !== false) ? ((function (arg$xcar69127, arg$xcdr69128) {
var old$xcar69127 = ((typeof(xcar69127) !== 'undefined') ? xcar69127 : undefined);
xcar69127 = arg$xcar69127;
var old$xcdr69128 = ((typeof(xcdr69128) !== 'undefined') ? xcdr69128 : undefined);
xcdr69128 = arg$xcdr69128;
try {
return (((((FN_eq)((xcdr69128), (false))) !== false) ? ((((FN_consp)((xcdr69122))) !== false) ? ((function (arg$xcar69129, arg$xcdr69130) {
var old$xcar69129 = ((typeof(xcar69129) !== 'undefined') ? xcar69129 : undefined);
xcar69129 = arg$xcar69129;
var old$xcdr69130 = ((typeof(xcdr69130) !== 'undefined') ? xcdr69130 : undefined);
xcdr69130 = arg$xcdr69130;
try {
return (((((FN_eq)((xcdr69130), (false))) !== false) ? ((function (arg$against_operation, arg$operation_2, arg$operation_1) {
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
}})((xcar69129), (xcar69127), (xcar69125))) : (false)));
} finally {xcar69129 = old$xcar69129;
xcdr69130 = old$xcdr69130;
}})(((FN_car)((xcdr69122))), ((FN_cdr)((xcdr69122))))) : (false)) : ((((FN_consp)((xcdr69122))) !== false) ? ((function (arg$xcar69131, arg$xcdr69132) {
var old$xcar69131 = ((typeof(xcar69131) !== 'undefined') ? xcar69131 : undefined);
xcar69131 = arg$xcar69131;
var old$xcdr69132 = ((typeof(xcdr69132) !== 'undefined') ? xcdr69132 : undefined);
xcdr69132 = arg$xcdr69132;
try {
return (((((FN_consp)((xcar69131))) !== false) ? ((function (arg$xcar69133, arg$xcdr69134) {
var old$xcar69133 = ((typeof(xcar69133) !== 'undefined') ? xcar69133 : undefined);
xcar69133 = arg$xcar69133;
var old$xcdr69134 = ((typeof(xcdr69134) !== 'undefined') ? xcdr69134 : undefined);
xcdr69134 = arg$xcdr69134;
try {
return (((((FN_not)(((FN_eq)((xcar69133), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr69134))) !== false) ? ((function (arg$xcar69135, arg$xcdr69136) {
var old$xcar69135 = ((typeof(xcar69135) !== 'undefined') ? xcar69135 : undefined);
xcar69135 = arg$xcar69135;
var old$xcdr69136 = ((typeof(xcdr69136) !== 'undefined') ? xcdr69136 : undefined);
xcdr69136 = arg$xcdr69136;
try {
return (((((FN_consp)((xcdr69136))) !== false) ? ((function (arg$xcar69137, arg$xcdr69138) {
var old$xcar69137 = ((typeof(xcar69137) !== 'undefined') ? xcar69137 : undefined);
xcar69137 = arg$xcar69137;
var old$xcdr69138 = ((typeof(xcdr69138) !== 'undefined') ? xcdr69138 : undefined);
xcdr69138 = arg$xcdr69138;
try {
return (((((FN_not)(((FN_eq)((xcdr69138), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr69132), (false))) !== false) ? ((FN_funcall)((pcase_169119), (xcar69137), (xcar69135), (xcar69121))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69137 = old$xcar69137;
xcdr69138 = old$xcdr69138;
}})(((FN_car)((xcdr69136))), ((FN_cdr)((xcdr69136))))) : (false)));
} finally {xcar69135 = old$xcar69135;
xcdr69136 = old$xcdr69136;
}})(((FN_car)((xcdr69134))), ((FN_cdr)((xcdr69134))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69133 = old$xcar69133;
xcdr69134 = old$xcdr69134;
}})(((FN_car)((xcar69131))), ((FN_cdr)((xcar69131))))) : (false)));
} finally {xcar69131 = old$xcar69131;
xcdr69132 = old$xcdr69132;
}})(((FN_car)((xcdr69122))), ((FN_cdr)((xcdr69122))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69127 = old$xcar69127;
xcdr69128 = old$xcdr69128;
}})(((FN_car)((xcdr69126))), ((FN_cdr)((xcdr69126))))) : ((((FN_consp)((xcdr69122))) !== false) ? ((function (arg$xcar69139, arg$xcdr69140) {
var old$xcar69139 = ((typeof(xcar69139) !== 'undefined') ? xcar69139 : undefined);
xcar69139 = arg$xcar69139;
var old$xcdr69140 = ((typeof(xcdr69140) !== 'undefined') ? xcdr69140 : undefined);
xcdr69140 = arg$xcdr69140;
try {
return (((((FN_consp)((xcar69139))) !== false) ? ((function (arg$xcar69141, arg$xcdr69142) {
var old$xcar69141 = ((typeof(xcar69141) !== 'undefined') ? xcar69141 : undefined);
xcar69141 = arg$xcar69141;
var old$xcdr69142 = ((typeof(xcdr69142) !== 'undefined') ? xcdr69142 : undefined);
xcdr69142 = arg$xcdr69142;
try {
return (((((FN_not)(((FN_eq)((xcar69141), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr69142))) !== false) ? ((function (arg$xcar69143, arg$xcdr69144) {
var old$xcar69143 = ((typeof(xcar69143) !== 'undefined') ? xcar69143 : undefined);
xcar69143 = arg$xcar69143;
var old$xcdr69144 = ((typeof(xcdr69144) !== 'undefined') ? xcdr69144 : undefined);
xcdr69144 = arg$xcdr69144;
try {
return (((((FN_consp)((xcdr69144))) !== false) ? ((function (arg$xcar69145, arg$xcdr69146) {
var old$xcar69145 = ((typeof(xcar69145) !== 'undefined') ? xcar69145 : undefined);
xcar69145 = arg$xcar69145;
var old$xcdr69146 = ((typeof(xcdr69146) !== 'undefined') ? xcdr69146 : undefined);
xcdr69146 = arg$xcdr69146;
try {
return (((((FN_not)(((FN_eq)((xcdr69146), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr69140), (false))) !== false) ? ((FN_funcall)((pcase_169119), (xcar69145), (xcar69143), (xcar69121))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69145 = old$xcar69145;
xcdr69146 = old$xcdr69146;
}})(((FN_car)((xcdr69144))), ((FN_cdr)((xcdr69144))))) : (false)));
} finally {xcar69143 = old$xcar69143;
xcdr69144 = old$xcdr69144;
}})(((FN_car)((xcdr69142))), ((FN_cdr)((xcdr69142))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69141 = old$xcar69141;
xcdr69142 = old$xcdr69142;
}})(((FN_car)((xcar69139))), ((FN_cdr)((xcar69139))))) : (false)));
} finally {xcar69139 = old$xcar69139;
xcdr69140 = old$xcdr69140;
}})(((FN_car)((xcdr69122))), ((FN_cdr)((xcdr69122))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69125 = old$xcar69125;
xcdr69126 = old$xcdr69126;
}})(((FN_car)((xcdr69124))), ((FN_cdr)((xcdr69124))))) : ((((FN_consp)((xcdr69122))) !== false) ? ((function (arg$xcar69147, arg$xcdr69148) {
var old$xcar69147 = ((typeof(xcar69147) !== 'undefined') ? xcar69147 : undefined);
xcar69147 = arg$xcar69147;
var old$xcdr69148 = ((typeof(xcdr69148) !== 'undefined') ? xcdr69148 : undefined);
xcdr69148 = arg$xcdr69148;
try {
return (((((FN_consp)((xcar69147))) !== false) ? ((function (arg$xcar69149, arg$xcdr69150) {
var old$xcar69149 = ((typeof(xcar69149) !== 'undefined') ? xcar69149 : undefined);
xcar69149 = arg$xcar69149;
var old$xcdr69150 = ((typeof(xcdr69150) !== 'undefined') ? xcdr69150 : undefined);
xcdr69150 = arg$xcdr69150;
try {
return (((((FN_not)(((FN_eq)((xcar69149), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr69150))) !== false) ? ((function (arg$xcar69151, arg$xcdr69152) {
var old$xcar69151 = ((typeof(xcar69151) !== 'undefined') ? xcar69151 : undefined);
xcar69151 = arg$xcar69151;
var old$xcdr69152 = ((typeof(xcdr69152) !== 'undefined') ? xcdr69152 : undefined);
xcdr69152 = arg$xcdr69152;
try {
return (((((FN_consp)((xcdr69152))) !== false) ? ((function (arg$xcar69153, arg$xcdr69154) {
var old$xcar69153 = ((typeof(xcar69153) !== 'undefined') ? xcar69153 : undefined);
xcar69153 = arg$xcar69153;
var old$xcdr69154 = ((typeof(xcdr69154) !== 'undefined') ? xcdr69154 : undefined);
xcdr69154 = arg$xcdr69154;
try {
return (((((FN_not)(((FN_eq)((xcdr69154), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr69148), (false))) !== false) ? ((FN_funcall)((pcase_169119), (xcar69153), (xcar69151), (xcar69121))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69153 = old$xcar69153;
xcdr69154 = old$xcdr69154;
}})(((FN_car)((xcdr69152))), ((FN_cdr)((xcdr69152))))) : (false)));
} finally {xcar69151 = old$xcar69151;
xcdr69152 = old$xcdr69152;
}})(((FN_car)((xcdr69150))), ((FN_cdr)((xcdr69150))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69149 = old$xcar69149;
xcdr69150 = old$xcdr69150;
}})(((FN_car)((xcar69147))), ((FN_cdr)((xcar69147))))) : (false)));
} finally {xcar69147 = old$xcar69147;
xcdr69148 = old$xcdr69148;
}})(((FN_car)((xcdr69122))), ((FN_cdr)((xcdr69122))))) : (((true) !== false) ? (false) : (false)))) : ((((FN_consp)((xcdr69122))) !== false) ? ((function (arg$xcar69155, arg$xcdr69156) {
var old$xcar69155 = ((typeof(xcar69155) !== 'undefined') ? xcar69155 : undefined);
xcar69155 = arg$xcar69155;
var old$xcdr69156 = ((typeof(xcdr69156) !== 'undefined') ? xcdr69156 : undefined);
xcdr69156 = arg$xcdr69156;
try {
return (((((FN_consp)((xcar69155))) !== false) ? ((function (arg$xcar69157, arg$xcdr69158) {
var old$xcar69157 = ((typeof(xcar69157) !== 'undefined') ? xcar69157 : undefined);
xcar69157 = arg$xcar69157;
var old$xcdr69158 = ((typeof(xcdr69158) !== 'undefined') ? xcdr69158 : undefined);
xcdr69158 = arg$xcdr69158;
try {
return (((((FN_eq)((xcar69157), ("split"))) !== false) ? ((((FN_consp)((xcdr69158))) !== false) ? ((function (arg$xcar69159, arg$xcdr69160) {
var old$xcar69159 = ((typeof(xcar69159) !== 'undefined') ? xcar69159 : undefined);
xcar69159 = arg$xcar69159;
var old$xcdr69160 = ((typeof(xcdr69160) !== 'undefined') ? xcdr69160 : undefined);
xcdr69160 = arg$xcdr69160;
try {
return (((((FN_consp)((xcdr69160))) !== false) ? ((function (arg$xcar69161, arg$xcdr69162) {
var old$xcar69161 = ((typeof(xcar69161) !== 'undefined') ? xcar69161 : undefined);
xcar69161 = arg$xcar69161;
var old$xcdr69162 = ((typeof(xcdr69162) !== 'undefined') ? xcdr69162 : undefined);
xcdr69162 = arg$xcdr69162;
try {
return (((((FN_not)(((FN_eq)((xcdr69162), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr69156), (false))) !== false) ? ((FN_funcall)((pcase_169119), (xcar69161), (xcar69159), (xcar69121))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69161 = old$xcar69161;
xcdr69162 = old$xcdr69162;
}})(((FN_car)((xcdr69160))), ((FN_cdr)((xcdr69160))))) : (false)));
} finally {xcar69159 = old$xcar69159;
xcdr69160 = old$xcdr69160;
}})(((FN_car)((xcdr69158))), ((FN_cdr)((xcdr69158))))) : (false)) : ((((FN_consp)((xcdr69124))) !== false) ? ((function (arg$xcar69163, arg$xcdr69164) {
var old$xcar69163 = ((typeof(xcar69163) !== 'undefined') ? xcar69163 : undefined);
xcar69163 = arg$xcar69163;
var old$xcdr69164 = ((typeof(xcdr69164) !== 'undefined') ? xcdr69164 : undefined);
xcdr69164 = arg$xcdr69164;
try {
return (((((FN_consp)((xcdr69164))) !== false) ? ((function (arg$xcar69165, arg$xcdr69166) {
var old$xcar69165 = ((typeof(xcar69165) !== 'undefined') ? xcar69165 : undefined);
xcar69165 = arg$xcar69165;
var old$xcdr69166 = ((typeof(xcdr69166) !== 'undefined') ? xcdr69166 : undefined);
xcdr69166 = arg$xcdr69166;
try {
return (((((FN_not)(((FN_eq)((xcdr69166), (false))))) !== false) ? (false) : ((((FN_consp)((xcdr69158))) !== false) ? ((function (arg$xcar69167, arg$xcdr69168) {
var old$xcar69167 = ((typeof(xcar69167) !== 'undefined') ? xcar69167 : undefined);
xcar69167 = arg$xcar69167;
var old$xcdr69168 = ((typeof(xcdr69168) !== 'undefined') ? xcdr69168 : undefined);
xcdr69168 = arg$xcdr69168;
try {
return (((((FN_consp)((xcdr69168))) !== false) ? ((function (arg$xcar69169, arg$xcdr69170) {
var old$xcar69169 = ((typeof(xcar69169) !== 'undefined') ? xcar69169 : undefined);
xcar69169 = arg$xcar69169;
var old$xcdr69170 = ((typeof(xcdr69170) !== 'undefined') ? xcdr69170 : undefined);
xcdr69170 = arg$xcdr69170;
try {
return (((((FN_not)(((FN_eq)((xcdr69170), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr69156), (false))) !== false) ? ((function (arg$text_or_length_2, arg$position_2, arg$op_2, arg$text_or_length_1, arg$position_1, arg$op_1) {
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
return (((function (arg$x69171) {
var old$x69171 = ((typeof(x69171) !== 'undefined') ? x69171 : undefined);
x69171 = arg$x69171;
try {
return (((((FN_consp)((x69171))) !== false) ? ((function (arg$xcar69172, arg$xcdr69173) {
var old$xcar69172 = ((typeof(xcar69172) !== 'undefined') ? xcar69172 : undefined);
xcar69172 = arg$xcar69172;
var old$xcdr69173 = ((typeof(xcdr69173) !== 'undefined') ? xcdr69173 : undefined);
xcdr69173 = arg$xcdr69173;
try {
return (((((FN_eq)((xcar69172), ("insert"))) !== false) ? ((((FN_consp)((xcdr69173))) !== false) ? ((function (arg$xcar69174, arg$xcdr69175) {
var old$xcar69174 = ((typeof(xcar69174) !== 'undefined') ? xcar69174 : undefined);
xcar69174 = arg$xcar69174;
var old$xcdr69175 = ((typeof(xcdr69175) !== 'undefined') ? xcdr69175 : undefined);
xcdr69175 = arg$xcdr69175;
try {
return (((((FN_eq)((xcar69174), ("insert"))) !== false) ? ((((FN_eq)((xcdr69175), (false))) !== false) ? ((function () {
try {
return (((((function (arg$exp6924769248) {
var old$exp6924769248 = ((typeof(exp6924769248) !== 'undefined') ? exp6924769248 : undefined);
exp6924769248 = arg$exp6924769248;
try {
return ((((exp6924769248) !== false) ? (exp6924769248) : ((((FN_$EQ_)((position_1), (position_2))) !== false) ? ((FN_not)((cid_is_op))) : (false))));
} finally {exp6924769248 = old$exp6924769248;
}})(((FN_$LT_)((position_1), (position_2))))) !== false) ? ((FN_list)((op_1), (position_1), (text_1))) : ((FN_list)((op_1), ((FN_$PLUS_)((position_1), (length_2))), (text_1)))));
} finally {}})()) : (false)) : ((((FN_not)(((FN_eq)((xcar69174), ("delete"))))) !== false) ? (false) : ((((FN_eq)((xcdr69175), (false))) !== false) ? ((function () {
try {
return (((((FN_$GT_$EQ_)((position_1), (end_2))) !== false) ? ((FN_list)((op_1), ((FN__)((position_1), (length_2))), (text_1))) : ((((FN_$LT_)((position_1), (position_2))) !== false) ? ((FN_list)((op_1), (position_1), (text_1))) : (((true) !== false) ? ((FN_list)((op_1), (position_2), (text_1))) : (false)))));
} finally {}})()) : (((true) !== false) ? (false) : (false))))));
} finally {xcar69174 = old$xcar69174;
xcdr69175 = old$xcdr69175;
}})(((FN_car)((xcdr69173))), ((FN_cdr)((xcdr69173))))) : (false)) : ((((FN_not)(((FN_eq)((xcar69172), ("delete"))))) !== false) ? (false) : ((((FN_consp)((xcdr69173))) !== false) ? ((function (arg$xcar69178, arg$xcdr69179) {
var old$xcar69178 = ((typeof(xcar69178) !== 'undefined') ? xcar69178 : undefined);
xcar69178 = arg$xcar69178;
var old$xcdr69179 = ((typeof(xcdr69179) !== 'undefined') ? xcdr69179 : undefined);
xcdr69179 = arg$xcdr69179;
try {
return (((((FN_eq)((xcar69178), ("insert"))) !== false) ? ((((FN_eq)((xcdr69179), (false))) !== false) ? ((function () {
try {
return (((((FN_$GT_$EQ_)((position_2), (end_1))) !== false) ? ((FN_list)((op_1), (position_1), (length_1))) : ((((FN_$LT_$EQ_)((position_2), (position_1))) !== false) ? ((FN_list)((op_1), ((FN_$PLUS_)((position_1), (length_2))), (length_1))) : ((((((FN_$GT_)((position_2), (position_1))) !== false) ? ((FN_$LT_)((position_2), (end_1))) : (false)) !== false) ? ((FN_infinote_split_operation)((operation), ((FN__)((position_2), (position_1))), (length_2))) : (false)))));
} finally {}})()) : (false)) : ((((FN_not)(((FN_eq)((xcar69178), ("delete"))))) !== false) ? (false) : ((((FN_eq)((xcdr69179), (false))) !== false) ? ((function () {
try {
return (((((FN_$LT_$EQ_)((end_1), (position_2))) !== false) ? ((FN_list)((op_1), (position_1), (length_1))) : ((((FN_$GT_$EQ_)((position_1), (end_2))) !== false) ? ((FN_list)((op_1), ((FN__)((position_1), (length_2))), (length_1))) : ((((FN_$GT_$EQ_)((position_1), (position_2))) !== false) ? ((((FN_$LT_$EQ_)((end_1), (end_2))) !== false) ? ((FN_list)((op_1), (position_2), (0))) : ((FN_list)((op_1), (position_2), ((FN__)((end_1), (end_2)))))) : ((((FN_$LT_)((position_1), (position_2))) !== false) ? ((((FN_$LT_$EQ_)((end_1), (end_2))) !== false) ? ((FN_list)((op_1), (position_1), ((FN__)((position_2), (position_1))))) : ((FN_list)((op_1), (position_1), ((FN__)((length_1), (length_2)))))) : (false))))));
} finally {}})()) : (((true) !== false) ? (false) : (false))))));
} finally {xcar69178 = old$xcar69178;
xcdr69179 = old$xcdr69179;
}})(((FN_car)((xcdr69173))), ((FN_cdr)((xcdr69173))))) : (((true) !== false) ? (false) : (false))))));
} finally {xcar69172 = old$xcar69172;
xcdr69173 = old$xcdr69173;
}})(((FN_car)((x69171))), ((FN_cdr)((x69171))))) : (false)));
} finally {x69171 = old$x69171;
}})(((FN_list)(((FN_infinote_op_type)((op_1))), ((FN_infinote_op_type)((op_2))))))));
} finally {}})()));
} finally {end_2 = old$end_2;
}})(((FN_$PLUS_)((position_2), (length_2))))));
} finally {end_1 = old$end_1;
}})(((FN_$PLUS_)((position_1), (length_1))))));
} finally {length_2 = old$length_2;
}})(((function (arg$exp6924969250) {
var old$exp6924969250 = ((typeof(exp6924969250) !== 'undefined') ? exp6924969250 : undefined);
exp6924969250 = arg$exp6924969250;
try {
return ((((exp6924969250) !== false) ? (exp6924969250) : (text_or_length_2)));
} finally {exp6924969250 = old$exp6924969250;
}})((((text_2) !== false) ? ((FN_length)((text_2))) : (false)))))));
} finally {length_1 = old$length_1;
}})(((function (arg$exp6925169252) {
var old$exp6925169252 = ((typeof(exp6925169252) !== 'undefined') ? exp6925169252 : undefined);
exp6925169252 = arg$exp6925169252;
try {
return ((((exp6925169252) !== false) ? (exp6925169252) : (text_or_length_1)));
} finally {exp6925169252 = old$exp6925169252;
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
}})((xcar69169), (xcar69167), (xcar69157), (xcar69165), (xcar69163), (xcar69123))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69169 = old$xcar69169;
xcdr69170 = old$xcdr69170;
}})(((FN_car)((xcdr69168))), ((FN_cdr)((xcdr69168))))) : (false)));
} finally {xcar69167 = old$xcar69167;
xcdr69168 = old$xcdr69168;
}})(((FN_car)((xcdr69158))), ((FN_cdr)((xcdr69158))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69165 = old$xcar69165;
xcdr69166 = old$xcdr69166;
}})(((FN_car)((xcdr69164))), ((FN_cdr)((xcdr69164))))) : (false)));
} finally {xcar69163 = old$xcar69163;
xcdr69164 = old$xcdr69164;
}})(((FN_car)((xcdr69124))), ((FN_cdr)((xcdr69124))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69157 = old$xcar69157;
xcdr69158 = old$xcdr69158;
}})(((FN_car)((xcar69155))), ((FN_cdr)((xcar69155))))) : (false)));
} finally {xcar69155 = old$xcar69155;
xcdr69156 = old$xcdr69156;
}})(((FN_car)((xcdr69122))), ((FN_cdr)((xcdr69122))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69123 = old$xcar69123;
xcdr69124 = old$xcdr69124;
}})(((FN_car)((xcar69121))), ((FN_cdr)((xcar69121))))) : ((((FN_consp)((xcdr69122))) !== false) ? ((function (arg$xcar69184, arg$xcdr69185) {
var old$xcar69184 = ((typeof(xcar69184) !== 'undefined') ? xcar69184 : undefined);
xcar69184 = arg$xcar69184;
var old$xcdr69185 = ((typeof(xcdr69185) !== 'undefined') ? xcdr69185 : undefined);
xcdr69185 = arg$xcdr69185;
try {
return (((((FN_consp)((xcar69184))) !== false) ? ((function (arg$xcar69186, arg$xcdr69187) {
var old$xcar69186 = ((typeof(xcar69186) !== 'undefined') ? xcar69186 : undefined);
xcar69186 = arg$xcar69186;
var old$xcdr69187 = ((typeof(xcdr69187) !== 'undefined') ? xcdr69187 : undefined);
xcdr69187 = arg$xcdr69187;
try {
return (((((FN_not)(((FN_eq)((xcar69186), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr69187))) !== false) ? ((function (arg$xcar69188, arg$xcdr69189) {
var old$xcar69188 = ((typeof(xcar69188) !== 'undefined') ? xcar69188 : undefined);
xcar69188 = arg$xcar69188;
var old$xcdr69189 = ((typeof(xcdr69189) !== 'undefined') ? xcdr69189 : undefined);
xcdr69189 = arg$xcdr69189;
try {
return (((((FN_consp)((xcdr69189))) !== false) ? ((function (arg$xcar69190, arg$xcdr69191) {
var old$xcar69190 = ((typeof(xcar69190) !== 'undefined') ? xcar69190 : undefined);
xcar69190 = arg$xcar69190;
var old$xcdr69191 = ((typeof(xcdr69191) !== 'undefined') ? xcdr69191 : undefined);
xcdr69191 = arg$xcdr69191;
try {
return (((((FN_not)(((FN_eq)((xcdr69191), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr69185), (false))) !== false) ? ((FN_funcall)((pcase_169119), (xcar69190), (xcar69188), (xcar69121))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69190 = old$xcar69190;
xcdr69191 = old$xcdr69191;
}})(((FN_car)((xcdr69189))), ((FN_cdr)((xcdr69189))))) : (false)));
} finally {xcar69188 = old$xcar69188;
xcdr69189 = old$xcdr69189;
}})(((FN_car)((xcdr69187))), ((FN_cdr)((xcdr69187))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69186 = old$xcar69186;
xcdr69187 = old$xcdr69187;
}})(((FN_car)((xcar69184))), ((FN_cdr)((xcar69184))))) : (false)));
} finally {xcar69184 = old$xcar69184;
xcdr69185 = old$xcdr69185;
}})(((FN_car)((xcdr69122))), ((FN_cdr)((xcdr69122))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar69121 = old$xcar69121;
xcdr69122 = old$xcdr69122;
}})(((FN_car)((x69120))), ((FN_cdr)((x69120))))) : (false)));
} finally {pcase_169119 = old$pcase_169119;
x69120 = old$x69120;
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
return (((function (arg$__cl_rest__69253) {
var old$__cl_rest__69253 = ((typeof(__cl_rest__69253) !== 'undefined') ? __cl_rest__69253 : undefined);
__cl_rest__69253 = arg$__cl_rest__69253;
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
}})(((FN_car)((__cl_rest__69253))))));
} finally {closer_target_vector = old$closer_target_vector;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__69253);
false;
 (__cl_rest__69253=((FN_cdr)((__cl_rest__69253))));
return $ret;
})()))))));
} finally {closer_target_user = old$closer_target_user;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__69253))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__69253);
false;
 (__cl_rest__69253=((FN_cdr)((__cl_rest__69253))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__69253)))))))))));
} finally {__cl_rest__69253 = old$__cl_rest__69253;
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
return (((function (arg$__cl_var__69254) {
var old$__cl_var__69254 = ((typeof(__cl_var__69254) !== 'undefined') ? __cl_var__69254 : undefined);
__cl_var__69254 = arg$__cl_var__69254;
try {
return (((function (arg$__cl_var__69255) {
var old$__cl_var__69255 = ((typeof(__cl_var__69255) !== 'undefined') ? __cl_var__69255 : undefined);
__cl_var__69255 = arg$__cl_var__69255;
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
}})(((FN_car)((user_operations))), ((FN_cadr)((user_operations))))) !== false) ? ((__cl_var__69255=(false), ((__cl_var__69254=(false))))) : (true)) : (false)) !== false) {(user_operations=((FN_cddr)((user_operations))))};
})()),
(((__cl_var__69254) !== false) ? (true) : (__cl_var__69255)));
} finally {}})()));
} finally {__cl_var__69255 = old$__cl_var__69255;
}})((false))));
} finally {__cl_var__69254 = old$__cl_var__69254;
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
return (((function (arg$__cl_var__69256) {
var old$__cl_var__69256 = ((typeof(__cl_var__69256) !== 'undefined') ? __cl_var__69256 : undefined);
__cl_var__69256 = arg$__cl_var__69256;
try {
return (((function (arg$request) {
var old$request = ((typeof(request) !== 'undefined') ? request : undefined);
request = arg$request;
try {
return (((function (arg$__cl_var__69257) {
var old$__cl_var__69257 = ((typeof(__cl_var__69257) !== 'undefined') ? __cl_var__69257 : undefined);
__cl_var__69257 = arg$__cl_var__69257;
try {
return (((function (arg$__cl_var__69258) {
var old$__cl_var__69258 = ((typeof(__cl_var__69258) !== 'undefined') ? __cl_var__69258 : undefined);
__cl_var__69258 = arg$__cl_var__69258;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((__cl_var__69256))) !== false) ? (((false), ((request=((FN_car)((__cl_var__69256))))), ((((function (arg$__cl_rest__69259) {
var old$__cl_rest__69259 = ((typeof(__cl_rest__69259) !== 'undefined') ? __cl_rest__69259 : undefined);
__cl_rest__69259 = arg$__cl_rest__69259;
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
}})(((FN_car)((__cl_rest__69259))))));
} finally {vector = old$vector;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__69259);
false;
 (__cl_rest__69259=((FN_cdr)((__cl_rest__69259))));
return $ret;
})()))))));
} finally {user_id = old$user_id;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__69259))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__69259);
false;
 (__cl_rest__69259=((FN_cdr)((__cl_rest__69259))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__69259)))))))))));
} finally {__cl_rest__69259 = old$__cl_rest__69259;
}})((request))) !== false) ? (((false), ((infinote_request_queue=((FN_remove)((request), (infinote_request_queue))))), ((FN_apply)((FN_infinote_handle_request), (request))), ((__cl_var__69258=(false), ((__cl_var__69257=(false))))))) : (true)))) : (false)) !== false) {(__cl_var__69256=((FN_cdr)((__cl_var__69256))))};
})()),
(__cl_var__69258));
} finally {}})()));
} finally {__cl_var__69258 = old$__cl_var__69258;
}})((false))));
} finally {__cl_var__69257 = old$__cl_var__69257;
}})((true))));
} finally {request = old$request;
}})((false))));
} finally {__cl_var__69256 = old$__cl_var__69256;
}})((infinote_request_queue))));
} finally {my_vector = old$my_vector;
}})(((FN_infinote_my_vector)()))));
} finally {}});
FN_infinote_affected_text = (function (arg$operation) {
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
try {
return (((function (arg$__cl_rest__69260) {
var old$__cl_rest__69260 = ((typeof(__cl_rest__69260) !== 'undefined') ? __cl_rest__69260 : undefined);
__cl_rest__69260 = arg$__cl_rest__69260;
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
}})(((FN_car)((__cl_rest__69260))))));
} finally {pos = old$pos;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__69260);
false;
 (__cl_rest__69260=((FN_cdr)((__cl_rest__69260))));
return $ret;
})()))))));
} finally {op = old$op;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__69260))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__69260);
false;
 (__cl_rest__69260=((FN_cdr)((__cl_rest__69260))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__69260)))))))))));
} finally {__cl_rest__69260 = old$__cl_rest__69260;
}})((operation))));
} finally {operation = old$operation;
}});
FN_infinote_contextualize_delete = (function (arg$operation, arg$currently_applicable_operation) {
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
var old$currently_applicable_operation = ((typeof(currently_applicable_operation) !== 'undefined') ? currently_applicable_operation : undefined);
currently_applicable_operation = arg$currently_applicable_operation;
try {
return (((function (arg$__cl_rest__69261) {
var old$__cl_rest__69261 = ((typeof(__cl_rest__69261) !== 'undefined') ? __cl_rest__69261 : undefined);
__cl_rest__69261 = arg$__cl_rest__69261;
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
}})(((FN_car)((__cl_rest__69261))))));
} finally {pos = old$pos;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__69261);
false;
 (__cl_rest__69261=((FN_cdr)((__cl_rest__69261))));
return $ret;
})()))))));
} finally {op = old$op;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__69261))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__69261);
false;
 (__cl_rest__69261=((FN_cdr)((__cl_rest__69261))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__69261)))))))))));
} finally {__cl_rest__69261 = old$__cl_rest__69261;
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
return (((((FN_consp)((operation))) !== false) ? ((function (arg$xcar69201, arg$xcdr69202) {
var old$xcar69201 = ((typeof(xcar69201) !== 'undefined') ? xcar69201 : undefined);
xcar69201 = arg$xcar69201;
var old$xcdr69202 = ((typeof(xcdr69202) !== 'undefined') ? xcdr69202 : undefined);
xcdr69202 = arg$xcdr69202;
try {
return (((((FN_eq)((xcar69201), ("split"))) !== false) ? ((((FN_consp)((xcdr69202))) !== false) ? ((function (arg$xcar69203, arg$xcdr69204) {
var old$xcar69203 = ((typeof(xcar69203) !== 'undefined') ? xcar69203 : undefined);
xcar69203 = arg$xcar69203;
var old$xcdr69204 = ((typeof(xcdr69204) !== 'undefined') ? xcdr69204 : undefined);
xcdr69204 = arg$xcdr69204;
try {
return (((((FN_consp)((xcdr69204))) !== false) ? ((function (arg$xcar69205, arg$xcdr69206) {
var old$xcar69205 = ((typeof(xcar69205) !== 'undefined') ? xcar69205 : undefined);
xcar69205 = arg$xcar69205;
var old$xcdr69206 = ((typeof(xcdr69206) !== 'undefined') ? xcdr69206 : undefined);
xcdr69206 = arg$xcdr69206;
try {
return (((((FN_eq)((xcdr69206), (false))) !== false) ? ((function (arg$operation_2, arg$operation_1) {
var old$operation_2 = ((typeof(operation_2) !== 'undefined') ? operation_2 : undefined);
operation_2 = arg$operation_2;
var old$operation_1 = ((typeof(operation_1) !== 'undefined') ? operation_1 : undefined);
operation_1 = arg$operation_1;
try {
return (((FN_infinote_apply_operation)((user_id), (operation_1))),
((FN_infinote_apply_operation)((user_id), ((FN_infinote_transform_operation)((operation_2), (operation_1), (true))))));
} finally {operation_2 = old$operation_2;
operation_1 = old$operation_1;
}})((xcar69205), (xcar69203))) : (false)));
} finally {xcar69205 = old$xcar69205;
xcdr69206 = old$xcdr69206;
}})(((FN_car)((xcdr69204))), ((FN_cdr)((xcdr69204))))) : (false)));
} finally {xcar69203 = old$xcar69203;
xcdr69204 = old$xcdr69204;
}})(((FN_car)((xcdr69202))), ((FN_cdr)((xcdr69202))))) : (false)) : ((((FN_eq)((xcar69201), ("insert"))) !== false) ? ((((FN_consp)((xcdr69202))) !== false) ? ((function (arg$xcar69207, arg$xcdr69208) {
var old$xcar69207 = ((typeof(xcar69207) !== 'undefined') ? xcar69207 : undefined);
xcar69207 = arg$xcar69207;
var old$xcdr69208 = ((typeof(xcdr69208) !== 'undefined') ? xcdr69208 : undefined);
xcdr69208 = arg$xcdr69208;
try {
return (((((FN_consp)((xcdr69208))) !== false) ? ((function (arg$xcar69209, arg$xcdr69210) {
var old$xcar69209 = ((typeof(xcar69209) !== 'undefined') ? xcar69209 : undefined);
xcar69209 = arg$xcar69209;
var old$xcdr69210 = ((typeof(xcdr69210) !== 'undefined') ? xcdr69210 : undefined);
xcdr69210 = arg$xcdr69210;
try {
return (((((FN_eq)((xcdr69210), (false))) !== false) ? ((function (arg$text, arg$pos) {
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
}})((xcar69209), (xcar69207))) : (false)));
} finally {xcar69209 = old$xcar69209;
xcdr69210 = old$xcdr69210;
}})(((FN_car)((xcdr69208))), ((FN_cdr)((xcdr69208))))) : (false)));
} finally {xcar69207 = old$xcar69207;
xcdr69208 = old$xcdr69208;
}})(((FN_car)((xcdr69202))), ((FN_cdr)((xcdr69202))))) : (false)) : ((((FN_eq)((xcar69201), ("insert-caret"))) !== false) ? ((((FN_consp)((xcdr69202))) !== false) ? ((function (arg$xcar69211, arg$xcdr69212) {
var old$xcar69211 = ((typeof(xcar69211) !== 'undefined') ? xcar69211 : undefined);
xcar69211 = arg$xcar69211;
var old$xcdr69212 = ((typeof(xcdr69212) !== 'undefined') ? xcdr69212 : undefined);
xcdr69212 = arg$xcdr69212;
try {
return (((((FN_consp)((xcdr69212))) !== false) ? ((function (arg$xcar69213, arg$xcdr69214) {
var old$xcar69213 = ((typeof(xcar69213) !== 'undefined') ? xcar69213 : undefined);
xcar69213 = arg$xcar69213;
var old$xcdr69214 = ((typeof(xcdr69214) !== 'undefined') ? xcdr69214 : undefined);
xcdr69214 = arg$xcdr69214;
try {
return (((((FN_eq)((xcdr69214), (false))) !== false) ? ((function (arg$text, arg$pos) {
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
}})((xcar69213), (xcar69211))) : (false)));
} finally {xcar69213 = old$xcar69213;
xcdr69214 = old$xcdr69214;
}})(((FN_car)((xcdr69212))), ((FN_cdr)((xcdr69212))))) : (false)));
} finally {xcar69211 = old$xcar69211;
xcdr69212 = old$xcdr69212;
}})(((FN_car)((xcdr69202))), ((FN_cdr)((xcdr69202))))) : (false)) : ((((FN_eq)((xcar69201), ("delete"))) !== false) ? ((((FN_consp)((xcdr69202))) !== false) ? ((function (arg$xcar69215, arg$xcdr69216) {
var old$xcar69215 = ((typeof(xcar69215) !== 'undefined') ? xcar69215 : undefined);
xcar69215 = arg$xcar69215;
var old$xcdr69216 = ((typeof(xcdr69216) !== 'undefined') ? xcdr69216 : undefined);
xcdr69216 = arg$xcdr69216;
try {
return (((((FN_consp)((xcdr69216))) !== false) ? ((function (arg$xcar69217, arg$xcdr69218) {
var old$xcar69217 = ((typeof(xcar69217) !== 'undefined') ? xcar69217 : undefined);
xcar69217 = arg$xcar69217;
var old$xcdr69218 = ((typeof(xcdr69218) !== 'undefined') ? xcdr69218 : undefined);
xcdr69218 = arg$xcdr69218;
try {
return (((((FN_eq)((xcdr69218), (false))) !== false) ? ((function (arg$len, arg$pos) {
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
}})((xcar69217), (xcar69215))) : (false)));
} finally {xcar69217 = old$xcar69217;
xcdr69218 = old$xcdr69218;
}})(((FN_car)((xcdr69216))), ((FN_cdr)((xcdr69216))))) : (false)));
} finally {xcar69215 = old$xcar69215;
xcdr69216 = old$xcdr69216;
}})(((FN_car)((xcdr69202))), ((FN_cdr)((xcdr69202))))) : (false)) : ((((FN_not)(((FN_eq)((xcar69201), ("delete-caret"))))) !== false) ? (false) : ((((FN_consp)((xcdr69202))) !== false) ? ((function (arg$xcar69219, arg$xcdr69220) {
var old$xcar69219 = ((typeof(xcar69219) !== 'undefined') ? xcar69219 : undefined);
xcar69219 = arg$xcar69219;
var old$xcdr69220 = ((typeof(xcdr69220) !== 'undefined') ? xcdr69220 : undefined);
xcdr69220 = arg$xcdr69220;
try {
return (((((FN_consp)((xcdr69220))) !== false) ? ((function (arg$xcar69221, arg$xcdr69222) {
var old$xcar69221 = ((typeof(xcar69221) !== 'undefined') ? xcar69221 : undefined);
xcar69221 = arg$xcar69221;
var old$xcdr69222 = ((typeof(xcdr69222) !== 'undefined') ? xcdr69222 : undefined);
xcdr69222 = arg$xcdr69222;
try {
return (((((FN_eq)((xcdr69222), (false))) !== false) ? ((function (arg$len, arg$pos) {
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
}})((xcar69221), (xcar69219))) : (false)));
} finally {xcar69221 = old$xcar69221;
xcdr69222 = old$xcdr69222;
}})(((FN_car)((xcdr69220))), ((FN_cdr)((xcdr69220))))) : (false)));
} finally {xcar69219 = old$xcar69219;
xcdr69220 = old$xcdr69220;
}})(((FN_car)((xcdr69202))), ((FN_cdr)((xcdr69202))))) : (((true) !== false) ? (false) : (false)))))))));
} finally {xcar69201 = old$xcar69201;
xcdr69202 = old$xcdr69202;
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
return (((function (arg$__cl_var__69262) {
var old$__cl_var__69262 = ((typeof(__cl_var__69262) !== 'undefined') ? __cl_var__69262 : undefined);
__cl_var__69262 = arg$__cl_var__69262;
try {
return (((function (arg$__cl_var__69263) {
var old$__cl_var__69263 = ((typeof(__cl_var__69263) !== 'undefined') ? __cl_var__69263 : undefined);
__cl_var__69263 = arg$__cl_var__69263;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((node))) !== false) ? ((((FN_equal)((id), ((FN_lax_plist_get)(((FN_cadr)((node))), ("id"))))) !== false) ? ((__cl_var__69263=((FN_cadr)((node))), ((__cl_var__69262=(false))))) : (true)) : (false)) !== false) {(node=((FN_cddr)((node))))};
})()),
(((__cl_var__69262) !== false) ? (false) : (__cl_var__69263)));
} finally {}})()));
} finally {__cl_var__69263 = old$__cl_var__69263;
}})((false))));
} finally {__cl_var__69262 = old$__cl_var__69262;
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
return (((((FN_numberp)((form))) !== false) ? ((FN_number_to_string)((form))) : ((((FN_stringp)((form))) !== false) ? (form) : ((((FN_listp)((form))) !== false) ? ((function (arg$__cl_rest__69264) {
var old$__cl_rest__69264 = ((typeof(__cl_rest__69264) !== 'undefined') ? __cl_rest__69264 : undefined);
__cl_rest__69264 = arg$__cl_rest__69264;
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
}})(((FN_car)((__cl_rest__69264))))));
} finally {xml = old$xml;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__69264))), (2))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__69264);
false;
 (__cl_rest__69264=((FN_cdr)((__cl_rest__69264))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__69264)))))))))));
} finally {__cl_rest__69264 = old$__cl_rest__69264;
}})(((FN_xmlgen_extract_plist)((form))))) : (false)))));
} finally {level = old$level;
}})(((function (arg$exp6926569266) {
var old$exp6926569266 = ((typeof(exp6926569266) !== 'undefined') ? exp6926569266 : undefined);
exp6926569266 = arg$exp6926569266;
try {
return ((((exp6926569266) !== false) ? (exp6926569266) : (0)));
} finally {exp6926569266 = old$exp6926569266;
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
return (((((FN_consp)((xml_ns))) !== false) ? ((function (arg$__cl_dolist_temp__69267) {
var old$__cl_dolist_temp__69267 = ((typeof(__cl_dolist_temp__69267) !== 'undefined') ? __cl_dolist_temp__69267 : undefined);
__cl_dolist_temp__69267 = arg$__cl_dolist_temp__69267;
try {
return (((function () {
while ((__cl_dolist_temp__69267) !== false) {(function (arg$attr) {
var old$attr = ((typeof(attr) !== 'undefined') ? attr : undefined);
attr = arg$attr;
try {
return (((((((FN_consp)(((FN_car)((attr))))) !== false) ? ((FN_equal)(("http://www.w3.org/2000/xmlns/"), ((FN_caar)((attr))))) : (false)) !== false) ? ((((FN_symbolp)(((FN_car)((xml_ns))))) !== false) ? ((function (arg$__cl_arg1__69268) {
var old$__cl_arg1__69268 = ((typeof(__cl_arg1__69268) !== 'undefined') ? __cl_arg1__69268 : undefined);
__cl_arg1__69268 = arg$__cl_arg1__69268;
try {
return (((function () {
try {
return (((FN_setcdr)((xml_ns), ((FN_cons)((__cl_arg1__69268), ((FN_cdr)((xml_ns))))))));
} finally {}})()));
} finally {__cl_arg1__69268 = old$__cl_arg1__69268;
}})(((FN_cons)(((FN_cdar)((attr))), ((FN_cdr)((attr))))))) : ((xml_ns=((FN_cons)(((FN_cons)(((FN_cdar)((attr))), ((FN_cdr)((attr))))), (xml_ns)))))) : (false)),
((__cl_dolist_temp__69267=((FN_cdr)((__cl_dolist_temp__69267))))));
} finally {attr = old$attr;
}})(((FN_car)((__cl_dolist_temp__69267))))};
})()));
} finally {__cl_dolist_temp__69267 = old$__cl_dolist_temp__69267;
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
}})(((((FN_eq)((parse_ns), ("symbol-qnames"))) !== false) ? ((FN_cons)(("symbol-qnames"), (xml_default_ns))) : ((((function (arg$exp6926969270) {
var old$exp6926969270 = ((typeof(exp6926969270) !== 'undefined') ? exp6926969270 : undefined);
exp6926969270 = arg$exp6926969270;
try {
return ((((exp6926969270) !== false) ? (exp6926969270) : ((((FN_eq)(((FN_car_safe)((parse_ns))), ("symbol-qnames"))) !== false) ? ((FN_listp)(((FN_cdr)((parse_ns))))) : (false))));
} finally {exp6926969270 = old$exp6926969270;
}})(((FN_consp)(((FN_car_safe)((parse_ns))))))) !== false) ? (parse_ns) : (((parse_ns) !== false) ? (xml_default_ns) : (false)))))));
} finally {xml_validating_parser = old$xml_validating_parser;
}})(((function (arg$exp6927169272) {
var old$exp6927169272 = ((typeof(exp6927169272) !== 'undefined') ? exp6927169272 : undefined);
exp6927169272 = arg$exp6927169272;
try {
return ((((exp6927169272) !== false) ? (exp6927169272) : (xml_validating_parser)));
} finally {exp6927169272 = old$exp6927169272;
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
}})(((function (arg$exp6927369274) {
var old$exp6927369274 = ((typeof(exp6927369274) !== 'undefined') ? exp6927369274 : undefined);
exp6927369274 = arg$exp6927369274;
try {
return ((((exp6927369274) !== false) ? (exp6927369274) : ("")));
} finally {exp6927369274 = old$exp6927369274;
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
}})(((function (arg$exp6927569276) {
var old$exp6927569276 = ((typeof(exp6927569276) !== 'undefined') ? exp6927569276 : undefined);
exp6927569276 = arg$exp6927569276;
try {
return ((((exp6927569276) !== false) ? (exp6927569276) : (((xml_validating_parser) !== false) ? ((FN_error)(("XML: (Validity) Undefined entity `%s'"), (ref))) : (xml_undefined_entity))));
} finally {exp6927569276 = old$exp6927569276;
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
}})(((FN_match_data)()))))), ((((FN_null)((val))) !== false) ? (((xml_validating_parser) !== false) ? ((FN_error)(("XML: (Validity) Invalid character reference `%s'"), ((FN_match_string)((0))))) : (false)) : (false)), ((FN_replace_match)((((val) !== false) ? ((FN_string)((val))) : (xml_undefined_entity)), (true), (true))))) : (((false), ((ref=((FN_match_string)((3))), ((val=((FN_assoc)((ref), (xml_entity_alist))))))), ((((FN_null)((val))) !== false) ? (((xml_validating_parser) !== false) ? ((FN_error)(("XML: (Validity) Undefined entity `%s'"), (ref))) : (false)) : (false)), ((FN_replace_match)(((function (arg$exp6927769278) {
var old$exp6927769278 = ((typeof(exp6927769278) !== 'undefined') ? exp6927769278 : undefined);
exp6927769278 = arg$exp6927769278;
try {
return ((((exp6927769278) !== false) ? (exp6927769278) : (xml_undefined_entity)));
} finally {exp6927769278 = old$exp6927769278;
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
((function (arg$exp6927969280) {
var old$exp6927969280 = ((typeof(exp6927969280) !== 'undefined') ? exp6927969280 : undefined);
exp6927969280 = arg$exp6927969280;
try {
return ((((exp6927969280) !== false) ? (exp6927969280) : ("")));
} finally {exp6927969280 = old$exp6927969280;
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
infinote_hue = 0.35588300228118896;
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
$all_function_syms = ["FN_nth", "FN_xml_node_attributes", "FN_xml_get_attribute_or_nil", "FN_xml_get_attribute", "FN_point_marker", "FN_buffer_size", "FN_replace_match", "FN_null", "FN_match_data", "FN_set_match_data", "FN_skip_chars_forward", "FN_match_string", "FN_decode_char", "FN_string", "FN_string_match", "FN_string_equal", "FN_intern", "FN_string$EQ_", "FN_xml_substitute_special", "FN_assoc", "FN_car_safe", "FN_match_string_no_properties", "FN_xml_parse_attlist", "FN_point", "FN_re_search_forward", "FN_buffer_substring", "FN_char_after", "FN_nreverse", "FN_forward_char", "FN_xml_maybe_do_ns", "FN_cdar", "FN_setcdr", "FN_caar", "FN_eobp", "FN_xml_parse_dtd", "FN_match_end", "FN_xml_parse_string", "FN_match_beginning", "FN_skip_syntax_forward", "FN_search_forward", "FN_looking_at", "FN_xml_parse_tag_1", "FN_substring", "FN_keywordp", "FN_append", "FN_mapc", "FN_xmlgen_extract_plist", "FN_xmlgen_string_escape", "FN_xmlgen_attr_to_string", "FN_symbol_name", "FN_1$PLUS_", "FN_error", "FN_symbolp", "FN_number_to_string", "FN_numberp", "FN_message", "FN_infinote_handle_group_command", "FN_infinote_node_from_id", "FN_delete_region", "FN_goto_char", "FN_save_excursion_fn", "FN_infinote_apply_operation", "FN_infinote_contextualize_delete", "FN_infinote_affected_text", "FN_infinote_handle_request", "FN_remove", "FN_infinote_process_request_queue", "FN_infinote_can_apply", "FN_infinote_cid_is_op", "FN_stringp", "FN_infinote_split_operation", "FN_$LT_$EQ_", "FN_$LT_", "FN_funcall", "FN_infinote_transform_operation", "FN_member", "FN_infinote_op_type", "FN_infinote_translate_operation", "FN_infinote_closer_target_request", "FN_$SLASH_$EQ_", "FN_infinote_translatable_user", "FN_cdr", "FN_infinote_nth_user_request_from_log", "FN_insert", "FN_infinote_insert_segment", "FN_infinote_set_user_data", "FN_infinote_get_user_data", "FN_infinote_user_vector", "FN_infinote_diff_user_vector", "FN_$PLUS_", "FN_infinote_diffed_vector", "FN_copy_sequence", "FN_infinote_vector_equal", "FN_infinote_operation_count", "FN_infinote_vector_includes", "FN_listp", "FN_concat", "FN_apply", "FN_infinote_segment_xml_to_text", "FN_memql", "FN_infinote_xml_to_operation", "FN_split_string", "FN_string_to_number", "FN_mapcar", "FN_infinote_read_vector", "FN_point_max", "FN_point_min", "FN_$EQ_", "FN_equal", "FN_infinote_user_join", "FN_get_buffer", "FN_lax_plist_put", "FN_current_buffer", "FN_display_buffer", "FN_infinote_mode", "FN_generate_new_buffer", "FN_not", "FN_infinote_create_session", "FN_format", "FN_nconc", "FN_zerop", "FN_consp", "FN_identity", "FN_mapconcat", "FN_infinote_vector_subtract", "FN_length", "FN__", "FN_infinote_increment_my_vector", "FN_infinote_send_delete", "FN_infinote_send_insert", "FN_infinote_my_vector", "FN_infinote_send_user_join", "FN_infinote_send_sync_ack", "FN_infinote_send_subscribe_ack", "FN_cons", "FN_infinote_send_session_unsubscribe", "FN_infinote_send_explore", "FN_replace_regexp_in_string", "FN_base64_encode_string", "FN_infinote_diff_since_last_sent_vector", "FN_infinote_vector_to_string", "FN_infinote_send_request", "FN_infinote_send_group_command", "FN_xmlgen", "FN_infinote_send_string", "FN_infinote_send_xml", "FN_cadr", "FN_car", "FN_assoc_default", "FN_infinote_handle_group_commands", "FN_infinote_send_stream_header", "FN_infinote_send_sasl_response", "FN_infinote_send_auth", "FN_cddr", "FN_eq", "FN_infinote_handle_stanza", "FN_infinote_post_command", "FN_$GT_", "FN_infinote_local_insert", "FN_infinote_local_delete", "FN_$GT_$EQ_", "FN_list", "FN_signal", "FN_infinote_after_change", "FN_buffer_substring_no_properties", "FN_infinote_before_change", "FN_infinote_send_add_node", "FN_lax_plist_get", "FN_infinote_send_subscribe_session", "FN_process_buffer", "FN_set_buffer", "FN_save_current_buffer_fn", "FN_infinote_connect_to_server", "FN_infinote_find_file"];
