# distributed-agents

proof of concept to experiment with building a distributed agent system.

## run project

1. create a codespace on the main branch

2. copy the `.env-example` file into a `.env` file and fill in the values

3. run the following commands in the terminal:

```bash
yarn install # install dependencies

yarn build # build all agents in src/agents

yarn start:execution-node # starts execution node agent on port 4000
yarn start:central-controller # starts central controller agent on port 3000
```

both of these agents extend the `WebAgent` base class. the execution node agent is able to execute commands, and is registered with the central controller agent. the central controller agent is able to generate commands and send them to the execution node agent for execution.

ex. send a command to the execution node agent:

```bash
curl -X POST http://localhost:3000/execute-command \
-H "Content-Type: application/json" \
-d '{"command": "ls", "args": ["-l", "-a"], "approved": true}'
```
