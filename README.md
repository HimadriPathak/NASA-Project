a way to run server and client

```bash
"server": "cd server && npm run watch",
"client": "cd client && npm start",
```

or

```bash
"server": "npm run watch --prefix server",
"client": "npm start --prefix client",
```

'''bash
"watch": "npm run server & npm run client",
'''

the difference b/w & and && ->
& = running the both the commands simultaniously
while
&& = executes first task and move to next
