#Nature of "problem":

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

#redis monitor output of running server.js then client.js

```
1470238106.350491 [0 127.0.0.1:60168] "info"
1470238106.351634 [0 127.0.0.1:60169] "info"
1470238106.354483 [0 127.0.0.1:60168] "subscribe" "seneca_cmd_role_redis__act" (server.js pinned to role:redis, why is cmd in the topic!?)
1470238110.392043 [0 127.0.0.1:60170] "info"
1470238110.392727 [0 127.0.0.1:60171] "info"
1470238110.395363 [0 127.0.0.1:60170] "subscribe" "seneca_role_redis__res"
1470238110.396148 [0 127.0.0.1:60171] "publish" "seneca_role_redis__act" "{\"id\":\"r8aonkl52jgz/y2wz5a0cc49s\",\"kind\":\"act\",\"origin\":\"ggqxir31cx2b/1470238109926/15456/-\",\"track\":[\"ggqxir31cx2b/1470238109926/15456/-\"],\"time\":{\"client_sent\":1470238110388},\"act\":{\"role\":\"redis\",\"cmd\":\"test\"},\"sync\":true}"
                                      (publish from client.js, notice cmd not present)  
```
