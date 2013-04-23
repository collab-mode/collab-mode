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
return ((((false), ((function (arg$exp46424643) {
var old$exp46424643 = ((typeof(exp46424643) !== 'undefined') ? exp46424643 : undefined);
exp46424643 = arg$exp46424643;
try {
return ((((exp46424643) !== false) ? (exp46424643) : ((FN_signal)(("cl-assertion-failed"), ((FN_list)((FN_cons(">=", FN_cons("end", FN_cons("start", false))))))))));
} finally {exp46424643 = old$exp46424643;
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
}})(((function (arg$exp46444645) {
var old$exp46444645 = ((typeof(exp46444645) !== 'undefined') ? exp46444645 : undefined);
exp46444645 = arg$exp46444645;
try {
return ((((exp46444645) !== false) ? (exp46444645) : (infinote_group_name)));
} finally {exp46444645 = old$exp46444645;
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
return (((((function (arg$exp46464647) {
var old$exp46464647 = ((typeof(exp46464647) !== 'undefined') ? exp46464647 : undefined);
exp46464647 = arg$exp46464647;
try {
return ((((exp46464647) !== false) ? (exp46464647) : ((FN_save_current_buffer_fn)(((function () {
try {
return (((FN_set_buffer)((new_buffer))),
((function (arg$exp46484649) {
var old$exp46484649 = ((typeof(exp46484649) !== 'undefined') ? exp46484649 : undefined);
exp46484649 = arg$exp46484649;
try {
return ((((exp46484649) !== false) ? (exp46484649) : (infinote_node_id)));
} finally {exp46484649 = old$exp46484649;
}})(((FN_not)((infinote_mode))))));
} finally {}}))))));
} finally {exp46464647 = old$exp46464647;
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
((((FN_equal)((name), (infinote_user_name))) !== false) ? (((false), ((infinote_user_id=(id))), ((((function (arg$exp46504651) {
var old$exp46504651 = ((typeof(exp46504651) !== 'undefined') ? exp46504651 : undefined);
exp46504651 = arg$exp46504651;
try {
return ((((exp46504651) !== false) ? (exp46504651) : ((FN_$EQ_)(((FN_point_min)()), ((FN_point_max)())))));
} finally {exp46504651 = old$exp46504651;
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
return (((function (arg$__cl_var__4652) {
var old$__cl_var__4652 = ((typeof(__cl_var__4652) !== 'undefined') ? __cl_var__4652 : undefined);
__cl_var__4652 = arg$__cl_var__4652;
try {
return (((function (arg$__cl_var__4653) {
var old$__cl_var__4653 = ((typeof(__cl_var__4653) !== 'undefined') ? __cl_var__4653 : undefined);
__cl_var__4653 = arg$__cl_var__4653;
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
}})(((FN_car)((user_operation))), ((FN_cadr)((user_operation))))) !== false) ? ((__cl_var__4653=(false), ((__cl_var__4652=(false))))) : (true)) : (false)) !== false) {(user_operation=((FN_cddr)((user_operation))))};
})()),
(((__cl_var__4652) !== false) ? (true) : (__cl_var__4653)));
} finally {}})()));
} finally {__cl_var__4653 = old$__cl_var__4653;
}})((false))));
} finally {__cl_var__4652 = old$__cl_var__4652;
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
return (((function (arg$exp46544655) {
var old$exp46544655 = ((typeof(exp46544655) !== 'undefined') ? exp46544655 : undefined);
exp46544655 = arg$exp46544655;
try {
return ((((exp46544655) !== false) ? (exp46544655) : (0)));
} finally {exp46544655 = old$exp46544655;
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
return (((function (arg$__cl_var__4656) {
var old$__cl_var__4656 = ((typeof(__cl_var__4656) !== 'undefined') ? __cl_var__4656 : undefined);
__cl_var__4656 = arg$__cl_var__4656;
try {
return (((function (arg$request) {
var old$request = ((typeof(request) !== 'undefined') ? request : undefined);
request = arg$request;
try {
return (((function (arg$__cl_var__4657) {
var old$__cl_var__4657 = ((typeof(__cl_var__4657) !== 'undefined') ? __cl_var__4657 : undefined);
__cl_var__4657 = arg$__cl_var__4657;
try {
return (((function (arg$__cl_var__4658) {
var old$__cl_var__4658 = ((typeof(__cl_var__4658) !== 'undefined') ? __cl_var__4658 : undefined);
__cl_var__4658 = arg$__cl_var__4658;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((__cl_var__4656))) !== false) ? (((false), ((request=((FN_car)((__cl_var__4656))))), ((((((FN_equal)(((FN_car)((request))), (user_id))) !== false) ? ((FN_$EQ_)(((FN__)((n), (1))), ((FN_infinote_operation_count)((user_id), ((FN_cadr)((request))))))) : (false)) !== false) ? ((__cl_var__4658=(request), ((__cl_var__4657=(false))))) : (true)))) : (false)) !== false) {(__cl_var__4656=((FN_cdr)((__cl_var__4656))))};
})()),
(((__cl_var__4657) !== false) ? (false) : (__cl_var__4658)));
} finally {}})()));
} finally {__cl_var__4658 = old$__cl_var__4658;
}})((false))));
} finally {__cl_var__4657 = old$__cl_var__4657;
}})((true))));
} finally {request = old$request;
}})((false))));
} finally {__cl_var__4656 = old$__cl_var__4656;
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
return (((function (arg$__cl_var__4659) {
var old$__cl_var__4659 = ((typeof(__cl_var__4659) !== 'undefined') ? __cl_var__4659 : undefined);
__cl_var__4659 = arg$__cl_var__4659;
try {
return (((function (arg$__cl_var__4660) {
var old$__cl_var__4660 = ((typeof(__cl_var__4660) !== 'undefined') ? __cl_var__4660 : undefined);
__cl_var__4660 = arg$__cl_var__4660;
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
}})(((FN_car)((target_operation))), ((FN_cadr)((target_operation))))) !== false) ? ((__cl_var__4660=((FN_car)((target_operation))), ((__cl_var__4659=(false))))) : (true)) : (false)) !== false) {(target_operation=((FN_cddr)((target_operation))))};
})()),
(((__cl_var__4659) !== false) ? (false) : (__cl_var__4660)));
} finally {}})()));
} finally {__cl_var__4660 = old$__cl_var__4660;
}})((false))));
} finally {__cl_var__4659 = old$__cl_var__4659;
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
((function (arg$pcase_14519, arg$x4520) {
var old$pcase_14519 = ((typeof(pcase_14519) !== 'undefined') ? pcase_14519 : undefined);
pcase_14519 = arg$pcase_14519;
var old$x4520 = ((typeof(x4520) !== 'undefined') ? x4520 : undefined);
x4520 = arg$x4520;
try {
return (((((FN_consp)((x4520))) !== false) ? ((function (arg$xcar4521, arg$xcdr4522) {
var old$xcar4521 = ((typeof(xcar4521) !== 'undefined') ? xcar4521 : undefined);
xcar4521 = arg$xcar4521;
var old$xcdr4522 = ((typeof(xcdr4522) !== 'undefined') ? xcdr4522 : undefined);
xcdr4522 = arg$xcdr4522;
try {
return (((((FN_consp)((xcar4521))) !== false) ? ((function (arg$xcar4523, arg$xcdr4524) {
var old$xcar4523 = ((typeof(xcar4523) !== 'undefined') ? xcar4523 : undefined);
xcar4523 = arg$xcar4523;
var old$xcdr4524 = ((typeof(xcdr4524) !== 'undefined') ? xcdr4524 : undefined);
xcdr4524 = arg$xcdr4524;
try {
return (((((FN_eq)((xcar4523), ("split"))) !== false) ? ((((FN_consp)((xcdr4524))) !== false) ? ((function (arg$xcar4525, arg$xcdr4526) {
var old$xcar4525 = ((typeof(xcar4525) !== 'undefined') ? xcar4525 : undefined);
xcar4525 = arg$xcar4525;
var old$xcdr4526 = ((typeof(xcdr4526) !== 'undefined') ? xcdr4526 : undefined);
xcdr4526 = arg$xcdr4526;
try {
return (((((FN_consp)((xcdr4526))) !== false) ? ((function (arg$xcar4527, arg$xcdr4528) {
var old$xcar4527 = ((typeof(xcar4527) !== 'undefined') ? xcar4527 : undefined);
xcar4527 = arg$xcar4527;
var old$xcdr4528 = ((typeof(xcdr4528) !== 'undefined') ? xcdr4528 : undefined);
xcdr4528 = arg$xcdr4528;
try {
return (((((FN_eq)((xcdr4528), (false))) !== false) ? ((((FN_consp)((xcdr4522))) !== false) ? ((function (arg$xcar4529, arg$xcdr4530) {
var old$xcar4529 = ((typeof(xcar4529) !== 'undefined') ? xcar4529 : undefined);
xcar4529 = arg$xcar4529;
var old$xcdr4530 = ((typeof(xcdr4530) !== 'undefined') ? xcdr4530 : undefined);
xcdr4530 = arg$xcdr4530;
try {
return (((((FN_eq)((xcdr4530), (false))) !== false) ? ((function (arg$against_operation, arg$operation_2, arg$operation_1) {
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
}})((xcar4529), (xcar4527), (xcar4525))) : (false)));
} finally {xcar4529 = old$xcar4529;
xcdr4530 = old$xcdr4530;
}})(((FN_car)((xcdr4522))), ((FN_cdr)((xcdr4522))))) : (false)) : ((((FN_consp)((xcdr4522))) !== false) ? ((function (arg$xcar4531, arg$xcdr4532) {
var old$xcar4531 = ((typeof(xcar4531) !== 'undefined') ? xcar4531 : undefined);
xcar4531 = arg$xcar4531;
var old$xcdr4532 = ((typeof(xcdr4532) !== 'undefined') ? xcdr4532 : undefined);
xcdr4532 = arg$xcdr4532;
try {
return (((((FN_consp)((xcar4531))) !== false) ? ((function (arg$xcar4533, arg$xcdr4534) {
var old$xcar4533 = ((typeof(xcar4533) !== 'undefined') ? xcar4533 : undefined);
xcar4533 = arg$xcar4533;
var old$xcdr4534 = ((typeof(xcdr4534) !== 'undefined') ? xcdr4534 : undefined);
xcdr4534 = arg$xcdr4534;
try {
return (((((FN_not)(((FN_eq)((xcar4533), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr4534))) !== false) ? ((function (arg$xcar4535, arg$xcdr4536) {
var old$xcar4535 = ((typeof(xcar4535) !== 'undefined') ? xcar4535 : undefined);
xcar4535 = arg$xcar4535;
var old$xcdr4536 = ((typeof(xcdr4536) !== 'undefined') ? xcdr4536 : undefined);
xcdr4536 = arg$xcdr4536;
try {
return (((((FN_consp)((xcdr4536))) !== false) ? ((function (arg$xcar4537, arg$xcdr4538) {
var old$xcar4537 = ((typeof(xcar4537) !== 'undefined') ? xcar4537 : undefined);
xcar4537 = arg$xcar4537;
var old$xcdr4538 = ((typeof(xcdr4538) !== 'undefined') ? xcdr4538 : undefined);
xcdr4538 = arg$xcdr4538;
try {
return (((((FN_not)(((FN_eq)((xcdr4538), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr4532), (false))) !== false) ? ((FN_funcall)((pcase_14519), (xcar4537), (xcar4535), (xcar4521))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4537 = old$xcar4537;
xcdr4538 = old$xcdr4538;
}})(((FN_car)((xcdr4536))), ((FN_cdr)((xcdr4536))))) : (false)));
} finally {xcar4535 = old$xcar4535;
xcdr4536 = old$xcdr4536;
}})(((FN_car)((xcdr4534))), ((FN_cdr)((xcdr4534))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4533 = old$xcar4533;
xcdr4534 = old$xcdr4534;
}})(((FN_car)((xcar4531))), ((FN_cdr)((xcar4531))))) : (false)));
} finally {xcar4531 = old$xcar4531;
xcdr4532 = old$xcdr4532;
}})(((FN_car)((xcdr4522))), ((FN_cdr)((xcdr4522))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4527 = old$xcar4527;
xcdr4528 = old$xcdr4528;
}})(((FN_car)((xcdr4526))), ((FN_cdr)((xcdr4526))))) : ((((FN_consp)((xcdr4522))) !== false) ? ((function (arg$xcar4539, arg$xcdr4540) {
var old$xcar4539 = ((typeof(xcar4539) !== 'undefined') ? xcar4539 : undefined);
xcar4539 = arg$xcar4539;
var old$xcdr4540 = ((typeof(xcdr4540) !== 'undefined') ? xcdr4540 : undefined);
xcdr4540 = arg$xcdr4540;
try {
return (((((FN_consp)((xcar4539))) !== false) ? ((function (arg$xcar4541, arg$xcdr4542) {
var old$xcar4541 = ((typeof(xcar4541) !== 'undefined') ? xcar4541 : undefined);
xcar4541 = arg$xcar4541;
var old$xcdr4542 = ((typeof(xcdr4542) !== 'undefined') ? xcdr4542 : undefined);
xcdr4542 = arg$xcdr4542;
try {
return (((((FN_not)(((FN_eq)((xcar4541), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr4542))) !== false) ? ((function (arg$xcar4543, arg$xcdr4544) {
var old$xcar4543 = ((typeof(xcar4543) !== 'undefined') ? xcar4543 : undefined);
xcar4543 = arg$xcar4543;
var old$xcdr4544 = ((typeof(xcdr4544) !== 'undefined') ? xcdr4544 : undefined);
xcdr4544 = arg$xcdr4544;
try {
return (((((FN_consp)((xcdr4544))) !== false) ? ((function (arg$xcar4545, arg$xcdr4546) {
var old$xcar4545 = ((typeof(xcar4545) !== 'undefined') ? xcar4545 : undefined);
xcar4545 = arg$xcar4545;
var old$xcdr4546 = ((typeof(xcdr4546) !== 'undefined') ? xcdr4546 : undefined);
xcdr4546 = arg$xcdr4546;
try {
return (((((FN_not)(((FN_eq)((xcdr4546), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr4540), (false))) !== false) ? ((FN_funcall)((pcase_14519), (xcar4545), (xcar4543), (xcar4521))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4545 = old$xcar4545;
xcdr4546 = old$xcdr4546;
}})(((FN_car)((xcdr4544))), ((FN_cdr)((xcdr4544))))) : (false)));
} finally {xcar4543 = old$xcar4543;
xcdr4544 = old$xcdr4544;
}})(((FN_car)((xcdr4542))), ((FN_cdr)((xcdr4542))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4541 = old$xcar4541;
xcdr4542 = old$xcdr4542;
}})(((FN_car)((xcar4539))), ((FN_cdr)((xcar4539))))) : (false)));
} finally {xcar4539 = old$xcar4539;
xcdr4540 = old$xcdr4540;
}})(((FN_car)((xcdr4522))), ((FN_cdr)((xcdr4522))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4525 = old$xcar4525;
xcdr4526 = old$xcdr4526;
}})(((FN_car)((xcdr4524))), ((FN_cdr)((xcdr4524))))) : ((((FN_consp)((xcdr4522))) !== false) ? ((function (arg$xcar4547, arg$xcdr4548) {
var old$xcar4547 = ((typeof(xcar4547) !== 'undefined') ? xcar4547 : undefined);
xcar4547 = arg$xcar4547;
var old$xcdr4548 = ((typeof(xcdr4548) !== 'undefined') ? xcdr4548 : undefined);
xcdr4548 = arg$xcdr4548;
try {
return (((((FN_consp)((xcar4547))) !== false) ? ((function (arg$xcar4549, arg$xcdr4550) {
var old$xcar4549 = ((typeof(xcar4549) !== 'undefined') ? xcar4549 : undefined);
xcar4549 = arg$xcar4549;
var old$xcdr4550 = ((typeof(xcdr4550) !== 'undefined') ? xcdr4550 : undefined);
xcdr4550 = arg$xcdr4550;
try {
return (((((FN_not)(((FN_eq)((xcar4549), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr4550))) !== false) ? ((function (arg$xcar4551, arg$xcdr4552) {
var old$xcar4551 = ((typeof(xcar4551) !== 'undefined') ? xcar4551 : undefined);
xcar4551 = arg$xcar4551;
var old$xcdr4552 = ((typeof(xcdr4552) !== 'undefined') ? xcdr4552 : undefined);
xcdr4552 = arg$xcdr4552;
try {
return (((((FN_consp)((xcdr4552))) !== false) ? ((function (arg$xcar4553, arg$xcdr4554) {
var old$xcar4553 = ((typeof(xcar4553) !== 'undefined') ? xcar4553 : undefined);
xcar4553 = arg$xcar4553;
var old$xcdr4554 = ((typeof(xcdr4554) !== 'undefined') ? xcdr4554 : undefined);
xcdr4554 = arg$xcdr4554;
try {
return (((((FN_not)(((FN_eq)((xcdr4554), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr4548), (false))) !== false) ? ((FN_funcall)((pcase_14519), (xcar4553), (xcar4551), (xcar4521))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4553 = old$xcar4553;
xcdr4554 = old$xcdr4554;
}})(((FN_car)((xcdr4552))), ((FN_cdr)((xcdr4552))))) : (false)));
} finally {xcar4551 = old$xcar4551;
xcdr4552 = old$xcdr4552;
}})(((FN_car)((xcdr4550))), ((FN_cdr)((xcdr4550))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4549 = old$xcar4549;
xcdr4550 = old$xcdr4550;
}})(((FN_car)((xcar4547))), ((FN_cdr)((xcar4547))))) : (false)));
} finally {xcar4547 = old$xcar4547;
xcdr4548 = old$xcdr4548;
}})(((FN_car)((xcdr4522))), ((FN_cdr)((xcdr4522))))) : (((true) !== false) ? (false) : (false)))) : ((((FN_consp)((xcdr4522))) !== false) ? ((function (arg$xcar4555, arg$xcdr4556) {
var old$xcar4555 = ((typeof(xcar4555) !== 'undefined') ? xcar4555 : undefined);
xcar4555 = arg$xcar4555;
var old$xcdr4556 = ((typeof(xcdr4556) !== 'undefined') ? xcdr4556 : undefined);
xcdr4556 = arg$xcdr4556;
try {
return (((((FN_consp)((xcar4555))) !== false) ? ((function (arg$xcar4557, arg$xcdr4558) {
var old$xcar4557 = ((typeof(xcar4557) !== 'undefined') ? xcar4557 : undefined);
xcar4557 = arg$xcar4557;
var old$xcdr4558 = ((typeof(xcdr4558) !== 'undefined') ? xcdr4558 : undefined);
xcdr4558 = arg$xcdr4558;
try {
return (((((FN_eq)((xcar4557), ("split"))) !== false) ? ((((FN_consp)((xcdr4558))) !== false) ? ((function (arg$xcar4559, arg$xcdr4560) {
var old$xcar4559 = ((typeof(xcar4559) !== 'undefined') ? xcar4559 : undefined);
xcar4559 = arg$xcar4559;
var old$xcdr4560 = ((typeof(xcdr4560) !== 'undefined') ? xcdr4560 : undefined);
xcdr4560 = arg$xcdr4560;
try {
return (((((FN_consp)((xcdr4560))) !== false) ? ((function (arg$xcar4561, arg$xcdr4562) {
var old$xcar4561 = ((typeof(xcar4561) !== 'undefined') ? xcar4561 : undefined);
xcar4561 = arg$xcar4561;
var old$xcdr4562 = ((typeof(xcdr4562) !== 'undefined') ? xcdr4562 : undefined);
xcdr4562 = arg$xcdr4562;
try {
return (((((FN_not)(((FN_eq)((xcdr4562), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr4556), (false))) !== false) ? ((FN_funcall)((pcase_14519), (xcar4561), (xcar4559), (xcar4521))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4561 = old$xcar4561;
xcdr4562 = old$xcdr4562;
}})(((FN_car)((xcdr4560))), ((FN_cdr)((xcdr4560))))) : (false)));
} finally {xcar4559 = old$xcar4559;
xcdr4560 = old$xcdr4560;
}})(((FN_car)((xcdr4558))), ((FN_cdr)((xcdr4558))))) : (false)) : ((((FN_consp)((xcdr4524))) !== false) ? ((function (arg$xcar4563, arg$xcdr4564) {
var old$xcar4563 = ((typeof(xcar4563) !== 'undefined') ? xcar4563 : undefined);
xcar4563 = arg$xcar4563;
var old$xcdr4564 = ((typeof(xcdr4564) !== 'undefined') ? xcdr4564 : undefined);
xcdr4564 = arg$xcdr4564;
try {
return (((((FN_consp)((xcdr4564))) !== false) ? ((function (arg$xcar4565, arg$xcdr4566) {
var old$xcar4565 = ((typeof(xcar4565) !== 'undefined') ? xcar4565 : undefined);
xcar4565 = arg$xcar4565;
var old$xcdr4566 = ((typeof(xcdr4566) !== 'undefined') ? xcdr4566 : undefined);
xcdr4566 = arg$xcdr4566;
try {
return (((((FN_not)(((FN_eq)((xcdr4566), (false))))) !== false) ? (false) : ((((FN_consp)((xcdr4558))) !== false) ? ((function (arg$xcar4567, arg$xcdr4568) {
var old$xcar4567 = ((typeof(xcar4567) !== 'undefined') ? xcar4567 : undefined);
xcar4567 = arg$xcar4567;
var old$xcdr4568 = ((typeof(xcdr4568) !== 'undefined') ? xcdr4568 : undefined);
xcdr4568 = arg$xcdr4568;
try {
return (((((FN_consp)((xcdr4568))) !== false) ? ((function (arg$xcar4569, arg$xcdr4570) {
var old$xcar4569 = ((typeof(xcar4569) !== 'undefined') ? xcar4569 : undefined);
xcar4569 = arg$xcar4569;
var old$xcdr4570 = ((typeof(xcdr4570) !== 'undefined') ? xcdr4570 : undefined);
xcdr4570 = arg$xcdr4570;
try {
return (((((FN_not)(((FN_eq)((xcdr4570), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr4556), (false))) !== false) ? ((function (arg$text_or_length_2, arg$position_2, arg$op_2, arg$text_or_length_1, arg$position_1, arg$op_1) {
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
return (((function (arg$x4571) {
var old$x4571 = ((typeof(x4571) !== 'undefined') ? x4571 : undefined);
x4571 = arg$x4571;
try {
return (((((FN_consp)((x4571))) !== false) ? ((function (arg$xcar4572, arg$xcdr4573) {
var old$xcar4572 = ((typeof(xcar4572) !== 'undefined') ? xcar4572 : undefined);
xcar4572 = arg$xcar4572;
var old$xcdr4573 = ((typeof(xcdr4573) !== 'undefined') ? xcdr4573 : undefined);
xcdr4573 = arg$xcdr4573;
try {
return (((((FN_eq)((xcar4572), ("insert"))) !== false) ? ((((FN_consp)((xcdr4573))) !== false) ? ((function (arg$xcar4574, arg$xcdr4575) {
var old$xcar4574 = ((typeof(xcar4574) !== 'undefined') ? xcar4574 : undefined);
xcar4574 = arg$xcar4574;
var old$xcdr4575 = ((typeof(xcdr4575) !== 'undefined') ? xcdr4575 : undefined);
xcdr4575 = arg$xcdr4575;
try {
return (((((FN_eq)((xcar4574), ("insert"))) !== false) ? ((((FN_eq)((xcdr4575), (false))) !== false) ? ((function () {
try {
return (((((function (arg$exp46614662) {
var old$exp46614662 = ((typeof(exp46614662) !== 'undefined') ? exp46614662 : undefined);
exp46614662 = arg$exp46614662;
try {
return ((((exp46614662) !== false) ? (exp46614662) : ((((FN_$EQ_)((position_1), (position_2))) !== false) ? ((FN_not)((cid_is_op))) : (false))));
} finally {exp46614662 = old$exp46614662;
}})(((FN_$LT_)((position_1), (position_2))))) !== false) ? ((FN_list)((op_1), (position_1), (text_1))) : ((FN_list)((op_1), ((FN_$PLUS_)((position_1), (length_2))), (text_1)))));
} finally {}})()) : (false)) : ((((FN_not)(((FN_eq)((xcar4574), ("delete"))))) !== false) ? (false) : ((((FN_eq)((xcdr4575), (false))) !== false) ? ((function () {
try {
return (((((FN_$GT_$EQ_)((position_1), (end_2))) !== false) ? ((FN_list)((op_1), ((FN__)((position_1), (length_2))), (text_1))) : ((((FN_$LT_)((position_1), (position_2))) !== false) ? ((FN_list)((op_1), (position_1), (text_1))) : (((true) !== false) ? ((FN_list)((op_1), (position_2), (text_1))) : (false)))));
} finally {}})()) : (((true) !== false) ? (false) : (false))))));
} finally {xcar4574 = old$xcar4574;
xcdr4575 = old$xcdr4575;
}})(((FN_car)((xcdr4573))), ((FN_cdr)((xcdr4573))))) : (false)) : ((((FN_not)(((FN_eq)((xcar4572), ("delete"))))) !== false) ? (false) : ((((FN_consp)((xcdr4573))) !== false) ? ((function (arg$xcar4578, arg$xcdr4579) {
var old$xcar4578 = ((typeof(xcar4578) !== 'undefined') ? xcar4578 : undefined);
xcar4578 = arg$xcar4578;
var old$xcdr4579 = ((typeof(xcdr4579) !== 'undefined') ? xcdr4579 : undefined);
xcdr4579 = arg$xcdr4579;
try {
return (((((FN_eq)((xcar4578), ("insert"))) !== false) ? ((((FN_eq)((xcdr4579), (false))) !== false) ? ((function () {
try {
return (((((FN_$GT_$EQ_)((position_2), (end_1))) !== false) ? ((FN_list)((op_1), (position_1), (length_1))) : ((((FN_$LT_$EQ_)((position_2), (position_1))) !== false) ? ((FN_list)((op_1), ((FN_$PLUS_)((position_1), (length_2))), (length_1))) : ((((((FN_$GT_)((position_2), (position_1))) !== false) ? ((FN_$LT_)((position_2), (end_1))) : (false)) !== false) ? ((FN_infinote_split_operation)((operation), ((FN__)((position_2), (position_1))), (length_2))) : (false)))));
} finally {}})()) : (false)) : ((((FN_not)(((FN_eq)((xcar4578), ("delete"))))) !== false) ? (false) : ((((FN_eq)((xcdr4579), (false))) !== false) ? ((function () {
try {
return (((((FN_$LT_$EQ_)((end_1), (position_2))) !== false) ? ((FN_list)((op_1), (position_1), (length_1))) : ((((FN_$GT_$EQ_)((position_1), (end_2))) !== false) ? ((FN_list)((op_1), ((FN__)((position_1), (length_2))), (length_1))) : ((((FN_$GT_$EQ_)((position_1), (position_2))) !== false) ? ((((FN_$LT_$EQ_)((end_1), (end_2))) !== false) ? ((FN_list)((op_1), (position_2), (0))) : ((FN_list)((op_1), (position_2), ((FN__)((end_1), (end_2)))))) : ((((FN_$LT_)((position_1), (position_2))) !== false) ? ((((FN_$LT_$EQ_)((end_1), (end_2))) !== false) ? ((FN_list)((op_1), (position_1), ((FN__)((position_2), (position_1))))) : ((FN_list)((op_1), (position_1), ((FN__)((length_1), (length_2)))))) : (false))))));
} finally {}})()) : (((true) !== false) ? (false) : (false))))));
} finally {xcar4578 = old$xcar4578;
xcdr4579 = old$xcdr4579;
}})(((FN_car)((xcdr4573))), ((FN_cdr)((xcdr4573))))) : (((true) !== false) ? (false) : (false))))));
} finally {xcar4572 = old$xcar4572;
xcdr4573 = old$xcdr4573;
}})(((FN_car)((x4571))), ((FN_cdr)((x4571))))) : (false)));
} finally {x4571 = old$x4571;
}})(((FN_list)(((FN_infinote_op_type)((op_1))), ((FN_infinote_op_type)((op_2))))))));
} finally {}})()));
} finally {end_2 = old$end_2;
}})(((FN_$PLUS_)((position_2), (length_2))))));
} finally {end_1 = old$end_1;
}})(((FN_$PLUS_)((position_1), (length_1))))));
} finally {length_2 = old$length_2;
}})(((function (arg$exp46634664) {
var old$exp46634664 = ((typeof(exp46634664) !== 'undefined') ? exp46634664 : undefined);
exp46634664 = arg$exp46634664;
try {
return ((((exp46634664) !== false) ? (exp46634664) : (text_or_length_2)));
} finally {exp46634664 = old$exp46634664;
}})((((text_2) !== false) ? ((FN_length)((text_2))) : (false)))))));
} finally {length_1 = old$length_1;
}})(((function (arg$exp46654666) {
var old$exp46654666 = ((typeof(exp46654666) !== 'undefined') ? exp46654666 : undefined);
exp46654666 = arg$exp46654666;
try {
return ((((exp46654666) !== false) ? (exp46654666) : (text_or_length_1)));
} finally {exp46654666 = old$exp46654666;
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
}})((xcar4569), (xcar4567), (xcar4557), (xcar4565), (xcar4563), (xcar4523))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4569 = old$xcar4569;
xcdr4570 = old$xcdr4570;
}})(((FN_car)((xcdr4568))), ((FN_cdr)((xcdr4568))))) : (false)));
} finally {xcar4567 = old$xcar4567;
xcdr4568 = old$xcdr4568;
}})(((FN_car)((xcdr4558))), ((FN_cdr)((xcdr4558))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4565 = old$xcar4565;
xcdr4566 = old$xcdr4566;
}})(((FN_car)((xcdr4564))), ((FN_cdr)((xcdr4564))))) : (false)));
} finally {xcar4563 = old$xcar4563;
xcdr4564 = old$xcdr4564;
}})(((FN_car)((xcdr4524))), ((FN_cdr)((xcdr4524))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4557 = old$xcar4557;
xcdr4558 = old$xcdr4558;
}})(((FN_car)((xcar4555))), ((FN_cdr)((xcar4555))))) : (false)));
} finally {xcar4555 = old$xcar4555;
xcdr4556 = old$xcdr4556;
}})(((FN_car)((xcdr4522))), ((FN_cdr)((xcdr4522))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4523 = old$xcar4523;
xcdr4524 = old$xcdr4524;
}})(((FN_car)((xcar4521))), ((FN_cdr)((xcar4521))))) : ((((FN_consp)((xcdr4522))) !== false) ? ((function (arg$xcar4584, arg$xcdr4585) {
var old$xcar4584 = ((typeof(xcar4584) !== 'undefined') ? xcar4584 : undefined);
xcar4584 = arg$xcar4584;
var old$xcdr4585 = ((typeof(xcdr4585) !== 'undefined') ? xcdr4585 : undefined);
xcdr4585 = arg$xcdr4585;
try {
return (((((FN_consp)((xcar4584))) !== false) ? ((function (arg$xcar4586, arg$xcdr4587) {
var old$xcar4586 = ((typeof(xcar4586) !== 'undefined') ? xcar4586 : undefined);
xcar4586 = arg$xcar4586;
var old$xcdr4587 = ((typeof(xcdr4587) !== 'undefined') ? xcdr4587 : undefined);
xcdr4587 = arg$xcdr4587;
try {
return (((((FN_not)(((FN_eq)((xcar4586), ("split"))))) !== false) ? (false) : ((((FN_consp)((xcdr4587))) !== false) ? ((function (arg$xcar4588, arg$xcdr4589) {
var old$xcar4588 = ((typeof(xcar4588) !== 'undefined') ? xcar4588 : undefined);
xcar4588 = arg$xcar4588;
var old$xcdr4589 = ((typeof(xcdr4589) !== 'undefined') ? xcdr4589 : undefined);
xcdr4589 = arg$xcdr4589;
try {
return (((((FN_consp)((xcdr4589))) !== false) ? ((function (arg$xcar4590, arg$xcdr4591) {
var old$xcar4590 = ((typeof(xcar4590) !== 'undefined') ? xcar4590 : undefined);
xcar4590 = arg$xcar4590;
var old$xcdr4591 = ((typeof(xcdr4591) !== 'undefined') ? xcdr4591 : undefined);
xcdr4591 = arg$xcdr4591;
try {
return (((((FN_not)(((FN_eq)((xcdr4591), (false))))) !== false) ? (false) : ((((FN_eq)((xcdr4585), (false))) !== false) ? ((FN_funcall)((pcase_14519), (xcar4590), (xcar4588), (xcar4521))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4590 = old$xcar4590;
xcdr4591 = old$xcdr4591;
}})(((FN_car)((xcdr4589))), ((FN_cdr)((xcdr4589))))) : (false)));
} finally {xcar4588 = old$xcar4588;
xcdr4589 = old$xcdr4589;
}})(((FN_car)((xcdr4587))), ((FN_cdr)((xcdr4587))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4586 = old$xcar4586;
xcdr4587 = old$xcdr4587;
}})(((FN_car)((xcar4584))), ((FN_cdr)((xcar4584))))) : (false)));
} finally {xcar4584 = old$xcar4584;
xcdr4585 = old$xcdr4585;
}})(((FN_car)((xcdr4522))), ((FN_cdr)((xcdr4522))))) : (((true) !== false) ? (false) : (false)))));
} finally {xcar4521 = old$xcar4521;
xcdr4522 = old$xcdr4522;
}})(((FN_car)((x4520))), ((FN_cdr)((x4520))))) : (false)));
} finally {pcase_14519 = old$pcase_14519;
x4520 = old$x4520;
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
return (((function (arg$__cl_rest__4667) {
var old$__cl_rest__4667 = ((typeof(__cl_rest__4667) !== 'undefined') ? __cl_rest__4667 : undefined);
__cl_rest__4667 = arg$__cl_rest__4667;
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
}})(((FN_car)((__cl_rest__4667))))));
} finally {closer_target_vector = old$closer_target_vector;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__4667);
false;
 (__cl_rest__4667=((FN_cdr)((__cl_rest__4667))));
return $ret;
})()))))));
} finally {closer_target_user = old$closer_target_user;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__4667))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__4667);
false;
 (__cl_rest__4667=((FN_cdr)((__cl_rest__4667))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__4667)))))))))));
} finally {__cl_rest__4667 = old$__cl_rest__4667;
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
return (((function (arg$__cl_var__4668) {
var old$__cl_var__4668 = ((typeof(__cl_var__4668) !== 'undefined') ? __cl_var__4668 : undefined);
__cl_var__4668 = arg$__cl_var__4668;
try {
return (((function (arg$__cl_var__4669) {
var old$__cl_var__4669 = ((typeof(__cl_var__4669) !== 'undefined') ? __cl_var__4669 : undefined);
__cl_var__4669 = arg$__cl_var__4669;
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
}})(((FN_car)((user_operations))), ((FN_cadr)((user_operations))))) !== false) ? ((__cl_var__4669=(false), ((__cl_var__4668=(false))))) : (true)) : (false)) !== false) {(user_operations=((FN_cddr)((user_operations))))};
})()),
(((__cl_var__4668) !== false) ? (true) : (__cl_var__4669)));
} finally {}})()));
} finally {__cl_var__4669 = old$__cl_var__4669;
}})((false))));
} finally {__cl_var__4668 = old$__cl_var__4668;
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
return (((function (arg$__cl_var__4670) {
var old$__cl_var__4670 = ((typeof(__cl_var__4670) !== 'undefined') ? __cl_var__4670 : undefined);
__cl_var__4670 = arg$__cl_var__4670;
try {
return (((function (arg$request) {
var old$request = ((typeof(request) !== 'undefined') ? request : undefined);
request = arg$request;
try {
return (((function (arg$__cl_var__4671) {
var old$__cl_var__4671 = ((typeof(__cl_var__4671) !== 'undefined') ? __cl_var__4671 : undefined);
__cl_var__4671 = arg$__cl_var__4671;
try {
return (((function (arg$__cl_var__4672) {
var old$__cl_var__4672 = ((typeof(__cl_var__4672) !== 'undefined') ? __cl_var__4672 : undefined);
__cl_var__4672 = arg$__cl_var__4672;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((__cl_var__4670))) !== false) ? (((false), ((request=((FN_car)((__cl_var__4670))))), ((((function (arg$__cl_rest__4673) {
var old$__cl_rest__4673 = ((typeof(__cl_rest__4673) !== 'undefined') ? __cl_rest__4673 : undefined);
__cl_rest__4673 = arg$__cl_rest__4673;
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
}})(((FN_car)((__cl_rest__4673))))));
} finally {vector = old$vector;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__4673);
false;
 (__cl_rest__4673=((FN_cdr)((__cl_rest__4673))));
return $ret;
})()))))));
} finally {user_id = old$user_id;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__4673))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__4673);
false;
 (__cl_rest__4673=((FN_cdr)((__cl_rest__4673))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__4673)))))))))));
} finally {__cl_rest__4673 = old$__cl_rest__4673;
}})((request))) !== false) ? (((false), ((infinote_request_queue=((FN_remove)((request), (infinote_request_queue))))), ((FN_apply)((FN_infinote_handle_request), (request))), ((__cl_var__4672=(false), ((__cl_var__4671=(false))))))) : (true)))) : (false)) !== false) {(__cl_var__4670=((FN_cdr)((__cl_var__4670))))};
})()),
(__cl_var__4672));
} finally {}})()));
} finally {__cl_var__4672 = old$__cl_var__4672;
}})((false))));
} finally {__cl_var__4671 = old$__cl_var__4671;
}})((true))));
} finally {request = old$request;
}})((false))));
} finally {__cl_var__4670 = old$__cl_var__4670;
}})((infinote_request_queue))));
} finally {my_vector = old$my_vector;
}})(((FN_infinote_my_vector)()))));
} finally {}});
FN_infinote_affected_text = (function (arg$operation) {
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
try {
return (((function (arg$__cl_rest__4674) {
var old$__cl_rest__4674 = ((typeof(__cl_rest__4674) !== 'undefined') ? __cl_rest__4674 : undefined);
__cl_rest__4674 = arg$__cl_rest__4674;
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
}})(((FN_car)((__cl_rest__4674))))));
} finally {pos = old$pos;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__4674);
false;
 (__cl_rest__4674=((FN_cdr)((__cl_rest__4674))));
return $ret;
})()))))));
} finally {op = old$op;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__4674))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__4674);
false;
 (__cl_rest__4674=((FN_cdr)((__cl_rest__4674))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__4674)))))))))));
} finally {__cl_rest__4674 = old$__cl_rest__4674;
}})((operation))));
} finally {operation = old$operation;
}});
FN_infinote_contextualize_delete = (function (arg$operation, arg$currently_applicable_operation) {
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
var old$currently_applicable_operation = ((typeof(currently_applicable_operation) !== 'undefined') ? currently_applicable_operation : undefined);
currently_applicable_operation = arg$currently_applicable_operation;
try {
return (((function (arg$__cl_rest__4675) {
var old$__cl_rest__4675 = ((typeof(__cl_rest__4675) !== 'undefined') ? __cl_rest__4675 : undefined);
__cl_rest__4675 = arg$__cl_rest__4675;
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
}})(((FN_car)((__cl_rest__4675))))));
} finally {pos = old$pos;
}})(((FN_car)(((function () {
var $ret = (__cl_rest__4675);
false;
 (__cl_rest__4675=((FN_cdr)((__cl_rest__4675))));
return $ret;
})()))))));
} finally {op = old$op;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__4675))), (3))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__4675);
false;
 (__cl_rest__4675=((FN_cdr)((__cl_rest__4675))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__4675)))))))))));
} finally {__cl_rest__4675 = old$__cl_rest__4675;
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
return (((((FN_consp)((operation))) !== false) ? ((function (arg$xcar4601, arg$xcdr4602) {
var old$xcar4601 = ((typeof(xcar4601) !== 'undefined') ? xcar4601 : undefined);
xcar4601 = arg$xcar4601;
var old$xcdr4602 = ((typeof(xcdr4602) !== 'undefined') ? xcdr4602 : undefined);
xcdr4602 = arg$xcdr4602;
try {
return (((((FN_eq)((xcar4601), ("split"))) !== false) ? ((((FN_consp)((xcdr4602))) !== false) ? ((function (arg$xcar4603, arg$xcdr4604) {
var old$xcar4603 = ((typeof(xcar4603) !== 'undefined') ? xcar4603 : undefined);
xcar4603 = arg$xcar4603;
var old$xcdr4604 = ((typeof(xcdr4604) !== 'undefined') ? xcdr4604 : undefined);
xcdr4604 = arg$xcdr4604;
try {
return (((((FN_consp)((xcdr4604))) !== false) ? ((function (arg$xcar4605, arg$xcdr4606) {
var old$xcar4605 = ((typeof(xcar4605) !== 'undefined') ? xcar4605 : undefined);
xcar4605 = arg$xcar4605;
var old$xcdr4606 = ((typeof(xcdr4606) !== 'undefined') ? xcdr4606 : undefined);
xcdr4606 = arg$xcdr4606;
try {
return (((((FN_eq)((xcdr4606), (false))) !== false) ? ((function (arg$operation_2, arg$operation_1) {
var old$operation_2 = ((typeof(operation_2) !== 'undefined') ? operation_2 : undefined);
operation_2 = arg$operation_2;
var old$operation_1 = ((typeof(operation_1) !== 'undefined') ? operation_1 : undefined);
operation_1 = arg$operation_1;
try {
return (((FN_infinote_apply_operation)((user_id), (operation_1))),
((FN_infinote_apply_operation)((user_id), ((FN_infinote_transform_operation)((operation_2), (operation_1), (true))))));
} finally {operation_2 = old$operation_2;
operation_1 = old$operation_1;
}})((xcar4605), (xcar4603))) : (false)));
} finally {xcar4605 = old$xcar4605;
xcdr4606 = old$xcdr4606;
}})(((FN_car)((xcdr4604))), ((FN_cdr)((xcdr4604))))) : (false)));
} finally {xcar4603 = old$xcar4603;
xcdr4604 = old$xcdr4604;
}})(((FN_car)((xcdr4602))), ((FN_cdr)((xcdr4602))))) : (false)) : ((((FN_eq)((xcar4601), ("insert"))) !== false) ? ((((FN_consp)((xcdr4602))) !== false) ? ((function (arg$xcar4607, arg$xcdr4608) {
var old$xcar4607 = ((typeof(xcar4607) !== 'undefined') ? xcar4607 : undefined);
xcar4607 = arg$xcar4607;
var old$xcdr4608 = ((typeof(xcdr4608) !== 'undefined') ? xcdr4608 : undefined);
xcdr4608 = arg$xcdr4608;
try {
return (((((FN_consp)((xcdr4608))) !== false) ? ((function (arg$xcar4609, arg$xcdr4610) {
var old$xcar4609 = ((typeof(xcar4609) !== 'undefined') ? xcar4609 : undefined);
xcar4609 = arg$xcar4609;
var old$xcdr4610 = ((typeof(xcdr4610) !== 'undefined') ? xcdr4610 : undefined);
xcdr4610 = arg$xcdr4610;
try {
return (((((FN_eq)((xcdr4610), (false))) !== false) ? ((function (arg$text, arg$pos) {
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
}})((xcar4609), (xcar4607))) : (false)));
} finally {xcar4609 = old$xcar4609;
xcdr4610 = old$xcdr4610;
}})(((FN_car)((xcdr4608))), ((FN_cdr)((xcdr4608))))) : (false)));
} finally {xcar4607 = old$xcar4607;
xcdr4608 = old$xcdr4608;
}})(((FN_car)((xcdr4602))), ((FN_cdr)((xcdr4602))))) : (false)) : ((((FN_eq)((xcar4601), ("insert-caret"))) !== false) ? ((((FN_consp)((xcdr4602))) !== false) ? ((function (arg$xcar4611, arg$xcdr4612) {
var old$xcar4611 = ((typeof(xcar4611) !== 'undefined') ? xcar4611 : undefined);
xcar4611 = arg$xcar4611;
var old$xcdr4612 = ((typeof(xcdr4612) !== 'undefined') ? xcdr4612 : undefined);
xcdr4612 = arg$xcdr4612;
try {
return (((((FN_consp)((xcdr4612))) !== false) ? ((function (arg$xcar4613, arg$xcdr4614) {
var old$xcar4613 = ((typeof(xcar4613) !== 'undefined') ? xcar4613 : undefined);
xcar4613 = arg$xcar4613;
var old$xcdr4614 = ((typeof(xcdr4614) !== 'undefined') ? xcdr4614 : undefined);
xcdr4614 = arg$xcdr4614;
try {
return (((((FN_eq)((xcdr4614), (false))) !== false) ? ((function (arg$text, arg$pos) {
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
}})((xcar4613), (xcar4611))) : (false)));
} finally {xcar4613 = old$xcar4613;
xcdr4614 = old$xcdr4614;
}})(((FN_car)((xcdr4612))), ((FN_cdr)((xcdr4612))))) : (false)));
} finally {xcar4611 = old$xcar4611;
xcdr4612 = old$xcdr4612;
}})(((FN_car)((xcdr4602))), ((FN_cdr)((xcdr4602))))) : (false)) : ((((FN_eq)((xcar4601), ("delete"))) !== false) ? ((((FN_consp)((xcdr4602))) !== false) ? ((function (arg$xcar4615, arg$xcdr4616) {
var old$xcar4615 = ((typeof(xcar4615) !== 'undefined') ? xcar4615 : undefined);
xcar4615 = arg$xcar4615;
var old$xcdr4616 = ((typeof(xcdr4616) !== 'undefined') ? xcdr4616 : undefined);
xcdr4616 = arg$xcdr4616;
try {
return (((((FN_consp)((xcdr4616))) !== false) ? ((function (arg$xcar4617, arg$xcdr4618) {
var old$xcar4617 = ((typeof(xcar4617) !== 'undefined') ? xcar4617 : undefined);
xcar4617 = arg$xcar4617;
var old$xcdr4618 = ((typeof(xcdr4618) !== 'undefined') ? xcdr4618 : undefined);
xcdr4618 = arg$xcdr4618;
try {
return (((((FN_eq)((xcdr4618), (false))) !== false) ? ((function (arg$len, arg$pos) {
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
}})((xcar4617), (xcar4615))) : (false)));
} finally {xcar4617 = old$xcar4617;
xcdr4618 = old$xcdr4618;
}})(((FN_car)((xcdr4616))), ((FN_cdr)((xcdr4616))))) : (false)));
} finally {xcar4615 = old$xcar4615;
xcdr4616 = old$xcdr4616;
}})(((FN_car)((xcdr4602))), ((FN_cdr)((xcdr4602))))) : (false)) : ((((FN_not)(((FN_eq)((xcar4601), ("delete-caret"))))) !== false) ? (false) : ((((FN_consp)((xcdr4602))) !== false) ? ((function (arg$xcar4619, arg$xcdr4620) {
var old$xcar4619 = ((typeof(xcar4619) !== 'undefined') ? xcar4619 : undefined);
xcar4619 = arg$xcar4619;
var old$xcdr4620 = ((typeof(xcdr4620) !== 'undefined') ? xcdr4620 : undefined);
xcdr4620 = arg$xcdr4620;
try {
return (((((FN_consp)((xcdr4620))) !== false) ? ((function (arg$xcar4621, arg$xcdr4622) {
var old$xcar4621 = ((typeof(xcar4621) !== 'undefined') ? xcar4621 : undefined);
xcar4621 = arg$xcar4621;
var old$xcdr4622 = ((typeof(xcdr4622) !== 'undefined') ? xcdr4622 : undefined);
xcdr4622 = arg$xcdr4622;
try {
return (((((FN_eq)((xcdr4622), (false))) !== false) ? ((function (arg$len, arg$pos) {
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
}})((xcar4621), (xcar4619))) : (false)));
} finally {xcar4621 = old$xcar4621;
xcdr4622 = old$xcdr4622;
}})(((FN_car)((xcdr4620))), ((FN_cdr)((xcdr4620))))) : (false)));
} finally {xcar4619 = old$xcar4619;
xcdr4620 = old$xcdr4620;
}})(((FN_car)((xcdr4602))), ((FN_cdr)((xcdr4602))))) : (((true) !== false) ? (false) : (false)))))))));
} finally {xcar4601 = old$xcar4601;
xcdr4602 = old$xcdr4602;
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
return (((function (arg$__cl_var__4676) {
var old$__cl_var__4676 = ((typeof(__cl_var__4676) !== 'undefined') ? __cl_var__4676 : undefined);
__cl_var__4676 = arg$__cl_var__4676;
try {
return (((function (arg$__cl_var__4677) {
var old$__cl_var__4677 = ((typeof(__cl_var__4677) !== 'undefined') ? __cl_var__4677 : undefined);
__cl_var__4677 = arg$__cl_var__4677;
try {
return (((function () {
try {
return (((function () {
while (((((FN_consp)((node))) !== false) ? ((((FN_equal)((id), ((FN_lax_plist_get)(((FN_cadr)((node))), ("id"))))) !== false) ? ((__cl_var__4677=((FN_cadr)((node))), ((__cl_var__4676=(false))))) : (true)) : (false)) !== false) {(node=((FN_cddr)((node))))};
})()),
(((__cl_var__4676) !== false) ? (false) : (__cl_var__4677)));
} finally {}})()));
} finally {__cl_var__4677 = old$__cl_var__4677;
}})((false))));
} finally {__cl_var__4676 = old$__cl_var__4676;
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
FN_infinote_cid_is_op = (function (arg$user, arg$vector, arg$operation, arg$against_user, arg$against_vector, arg$against_operation) {
var old$user = ((typeof(user) !== 'undefined') ? user : undefined);
user = arg$user;
var old$vector = ((typeof(vector) !== 'undefined') ? vector : undefined);
vector = arg$vector;
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
var old$against_user = ((typeof(against_user) !== 'undefined') ? against_user : undefined);
against_user = arg$against_user;
var old$against_vector = ((typeof(against_vector) !== 'undefined') ? against_vector : undefined);
against_vector = arg$against_vector;
var old$against_operation = ((typeof(against_operation) !== 'undefined') ? against_operation : undefined);
against_operation = arg$against_operation;
try {
return (((function (arg$op_1, arg$op_2) {
var old$op_1 = ((typeof(op_1) !== 'undefined') ? op_1 : undefined);
op_1 = arg$op_1;
var old$op_2 = ((typeof(op_2) !== 'undefined') ? op_2 : undefined);
op_2 = arg$op_2;
try {
return (((((FN_not)(((FN_member)((op_1), (FN_cons("insert", FN_cons("split", false))))))) !== false) ? (true) : ((((((FN_equal)((op_1), ("insert"))) !== false) ? ((((FN_member)((op_2), (FN_cons("insert", FN_cons("delete", false))))) !== false) ? ((FN_$SLASH_$EQ_)(((FN_cadr)((operation))), ((FN_cadr)((against_operation))))) : (false)) : (false)) !== false) ? ((FN_$GT_)(((FN_cadr)((operation))), ((FN_cadr)((against_operation))))) : ((FN_$LT_)((user), (against_user))))));
} finally {op_1 = old$op_1;
op_2 = old$op_2;
}})(((FN_infinote_op_type)(((FN_car)((operation))))), ((FN_infinote_op_type)(((FN_car)((against_operation))))))));
} finally {user = old$user;
vector = old$vector;
operation = old$operation;
against_user = old$against_user;
against_vector = old$against_vector;
against_operation = old$against_operation;
}});
FN_infinote_split_operation = (function (arg$operation, arg$split_at, arg$space) {
var old$operation = ((typeof(operation) !== 'undefined') ? operation : undefined);
operation = arg$operation;
var old$split_at = ((typeof(split_at) !== 'undefined') ? split_at : undefined);
split_at = arg$split_at;
var old$space = ((typeof(space) !== 'undefined') ? space : undefined);
space = arg$space;
try {
return (((function (arg$op, arg$pos, arg$length) {
var old$op = ((typeof(op) !== 'undefined') ? op : undefined);
op = arg$op;
var old$pos = ((typeof(pos) !== 'undefined') ? pos : undefined);
pos = arg$pos;
var old$length = ((typeof(length) !== 'undefined') ? length : undefined);
length = arg$length;
try {
return (((FN_list)(("split"), ((FN_list)(("delete"), (pos), (split_at))), ((FN_list)(("delete"), ((FN_$PLUS_)((split_at), (space))), ((FN__)((length), (split_at))))))));
} finally {op = old$op;
pos = old$pos;
length = old$length;
}})(((FN_car)((operation))), ((FN_cadr)((operation))), ((FN_car)(((FN_cddr)((operation))))))));
} finally {operation = old$operation;
split_at = old$split_at;
space = old$space;
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
return (((((FN_numberp)((form))) !== false) ? ((FN_number_to_string)((form))) : ((((FN_stringp)((form))) !== false) ? (form) : ((((FN_listp)((form))) !== false) ? ((function (arg$__cl_rest__4678) {
var old$__cl_rest__4678 = ((typeof(__cl_rest__4678) !== 'undefined') ? __cl_rest__4678 : undefined);
__cl_rest__4678 = arg$__cl_rest__4678;
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
}})(((FN_car)((__cl_rest__4678))))));
} finally {xml = old$xml;
}})(((((FN_$EQ_)(((FN_length)((__cl_rest__4678))), (2))) !== false) ? ((FN_car)(((function () {
var $ret = (__cl_rest__4678);
false;
 (__cl_rest__4678=((FN_cdr)((__cl_rest__4678))));
return $ret;
})()))) : ((FN_signal)(("wrong-number-of-arguments"), ((FN_list)((false), ((FN_length)((__cl_rest__4678)))))))))));
} finally {__cl_rest__4678 = old$__cl_rest__4678;
}})(((FN_xmlgen_extract_plist)((form))))) : (false)))));
} finally {level = old$level;
}})(((function (arg$exp46794680) {
var old$exp46794680 = ((typeof(exp46794680) !== 'undefined') ? exp46794680 : undefined);
exp46794680 = arg$exp46794680;
try {
return ((((exp46794680) !== false) ? (exp46794680) : (0)));
} finally {exp46794680 = old$exp46794680;
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
return (((((FN_consp)((xml_ns))) !== false) ? ((function (arg$__cl_dolist_temp__4681) {
var old$__cl_dolist_temp__4681 = ((typeof(__cl_dolist_temp__4681) !== 'undefined') ? __cl_dolist_temp__4681 : undefined);
__cl_dolist_temp__4681 = arg$__cl_dolist_temp__4681;
try {
return (((function () {
while ((__cl_dolist_temp__4681) !== false) {(function (arg$attr) {
var old$attr = ((typeof(attr) !== 'undefined') ? attr : undefined);
attr = arg$attr;
try {
return (((((((FN_consp)(((FN_car)((attr))))) !== false) ? ((FN_equal)(("http://www.w3.org/2000/xmlns/"), ((FN_caar)((attr))))) : (false)) !== false) ? ((((FN_symbolp)(((FN_car)((xml_ns))))) !== false) ? ((function (arg$__cl_arg1__4682) {
var old$__cl_arg1__4682 = ((typeof(__cl_arg1__4682) !== 'undefined') ? __cl_arg1__4682 : undefined);
__cl_arg1__4682 = arg$__cl_arg1__4682;
try {
return (((function () {
try {
return (((FN_setcdr)((xml_ns), ((FN_cons)((__cl_arg1__4682), ((FN_cdr)((xml_ns))))))));
} finally {}})()));
} finally {__cl_arg1__4682 = old$__cl_arg1__4682;
}})(((FN_cons)(((FN_cdar)((attr))), ((FN_cdr)((attr))))))) : ((xml_ns=((FN_cons)(((FN_cons)(((FN_cdar)((attr))), ((FN_cdr)((attr))))), (xml_ns)))))) : (false)),
((__cl_dolist_temp__4681=((FN_cdr)((__cl_dolist_temp__4681))))));
} finally {attr = old$attr;
}})(((FN_car)((__cl_dolist_temp__4681))))};
})()));
} finally {__cl_dolist_temp__4681 = old$__cl_dolist_temp__4681;
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
}})(((((FN_eq)((parse_ns), ("symbol-qnames"))) !== false) ? ((FN_cons)(("symbol-qnames"), (xml_default_ns))) : ((((function (arg$exp46834684) {
var old$exp46834684 = ((typeof(exp46834684) !== 'undefined') ? exp46834684 : undefined);
exp46834684 = arg$exp46834684;
try {
return ((((exp46834684) !== false) ? (exp46834684) : ((((FN_eq)(((FN_car_safe)((parse_ns))), ("symbol-qnames"))) !== false) ? ((FN_listp)(((FN_cdr)((parse_ns))))) : (false))));
} finally {exp46834684 = old$exp46834684;
}})(((FN_consp)(((FN_car_safe)((parse_ns))))))) !== false) ? (parse_ns) : (((parse_ns) !== false) ? (xml_default_ns) : (false)))))));
} finally {xml_validating_parser = old$xml_validating_parser;
}})(((function (arg$exp46854686) {
var old$exp46854686 = ((typeof(exp46854686) !== 'undefined') ? exp46854686 : undefined);
exp46854686 = arg$exp46854686;
try {
return ((((exp46854686) !== false) ? (exp46854686) : (xml_validating_parser)));
} finally {exp46854686 = old$exp46854686;
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
}})(((function (arg$exp46874688) {
var old$exp46874688 = ((typeof(exp46874688) !== 'undefined') ? exp46874688 : undefined);
exp46874688 = arg$exp46874688;
try {
return ((((exp46874688) !== false) ? (exp46874688) : ("")));
} finally {exp46874688 = old$exp46874688;
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
}})(((function (arg$exp46894690) {
var old$exp46894690 = ((typeof(exp46894690) !== 'undefined') ? exp46894690 : undefined);
exp46894690 = arg$exp46894690;
try {
return ((((exp46894690) !== false) ? (exp46894690) : (((xml_validating_parser) !== false) ? ((FN_error)(("XML: (Validity) Undefined entity `%s'"), (ref))) : (xml_undefined_entity))));
} finally {exp46894690 = old$exp46894690;
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
}})(((FN_match_data)()))))), ((((FN_null)((val))) !== false) ? (((xml_validating_parser) !== false) ? ((FN_error)(("XML: (Validity) Invalid character reference `%s'"), ((FN_match_string)((0))))) : (false)) : (false)), ((FN_replace_match)((((val) !== false) ? ((FN_string)((val))) : (xml_undefined_entity)), (true), (true))))) : (((false), ((ref=((FN_match_string)((3))), ((val=((FN_assoc)((ref), (xml_entity_alist))))))), ((((FN_null)((val))) !== false) ? (((xml_validating_parser) !== false) ? ((FN_error)(("XML: (Validity) Undefined entity `%s'"), (ref))) : (false)) : (false)), ((FN_replace_match)(((function (arg$exp46914692) {
var old$exp46914692 = ((typeof(exp46914692) !== 'undefined') ? exp46914692 : undefined);
exp46914692 = arg$exp46914692;
try {
return ((((exp46914692) !== false) ? (exp46914692) : (xml_undefined_entity)));
} finally {exp46914692 = old$exp46914692;
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
((function (arg$exp46934694) {
var old$exp46934694 = ((typeof(exp46934694) !== 'undefined') ? exp46934694 : undefined);
exp46934694 = arg$exp46934694;
try {
return ((((exp46934694) !== false) ? (exp46934694) : ("")));
} finally {exp46934694 = old$exp46934694;
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
infinote_hue = 0.5241138935089111;
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
