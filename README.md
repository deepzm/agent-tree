# agent-tree

A Claude Code mod: a pane docked beside the transcript that shows every agent
and its delegation as a live tree.

A fork of [kw0de/agent-tree](https://github.com/kw0de/agent-tree) (MIT) that
also shows the model each agent runs on.

## Install

Inside Claude Code:

```
/plugin marketplace add deepzm/agent-tree
/plugin install agent-tree@deepak-agent-tree
```

The plugin is named `agent-tree`, as upstream's is: do not enable both.

### From a local clone (for development)

1. Clone the repo:

   ```sh
   git clone https://github.com/deepzm/agent-tree.git ~/.claude/mods/agent-tree
   ```

2. Add the folder to `CLAUDE_CODE_PLUGIN_DIRS` in `~/.claude/settings.json`
   (colon-separated if you already load other mods):

   ```json
   {
     "env": {
       "CLAUDE_CODE_PLUGIN_DIRS": "/Users/you/.claude/mods/agent-tree"
     }
   }
   ```

3. Restart Claude Code.

## Usage

The pane opens on its own in terminals 144 columns or wider. Otherwise, open
it yourself:

| Command              | What it does                                   |
| -------------------- | ---------------------------------------------- |
| `/agent-tree`        | Open the agents pane                           |
| `/agent-tree clear`  | Remove finished agents from the tree           |
| `/agent-tree close`  | Close the pane (the tree is kept)              |

Click a row, or use the arrow keys after `ctrl+x tab` focuses the pane, to
see that agent's details below the tree.

The model each agent runs on shows as a `◆ sonnet 5.5` line under its row, and
Main's model follows its time. The details carry the full model id. The advisor
shows no model: the API does not report one.

## Run the tests

The tests use only Node's built-in test runner, with no dependencies to
install. They need Node 23.6+ (to run TypeScript directly):

```sh
node --test tests/tree.spec.ts
```

The pane's wiring to the engine is checked by `claude plugin test .`.

## License

[MIT](LICENSE)
