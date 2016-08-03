Nature of problem:

When pinning on just the role:'redis' the client.js topics are built from just that pin.

However, in server.js if you pin a listen on role:'redis' the transport utils seems to also loop through and append
pattern parameters to the topics. Therefore, cmd gets appended to the topic as seen below:

client.js(pin:'role:sockets') is publishing and subscribing to topics:

"subscribe" "seneca_role_redis__res"
"publish" "seneca_role_redis__act"

server.js(pin:'role:sockets) is subscribing to topics:

"subscribe" "seneca_cmd_role_redis__act"

Line 425 of transport-util.js inside of function listen_topics(initiated by server.js) is looping through and appending 
the extra 'cmd' parameter to the subscribe topic.
