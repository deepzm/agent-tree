import { expect, test } from 'claude-code/testing'

const PANE = {
  plugin: 'agent-tree',
  component: 'Pane',
  requestId: 'agent-tree',
  props: {
    title: 'Agents',
    isFocused: false,
    bodyColumns: 40,
    placement: 'dock',
    scroll: { offset: 0, bodyRows: 20 },
    view: {},
  },
} as const

test('the pane shows the main model and the model a subagent resolved to', async ($, on) => {
  // Nothing sits beneath the plugin: each hook here stands for the engine.
  on('command.register', () => ({ value: { command: 'agent-tree' } }))
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('clock.now', () => ({ value: 1_000 }))
  on('clock.every', () => ({ value: { cancel: () => {} } }))
  on('env.get', () => ({ value: 'en_US.UTF-8' }))
  on('session.model', () => ({ value: 'claude-sonnet-5-5' }))
  on('agent.spawn', () => ({ model: 'claude-haiku-4-5-20251001', agentId: 'a1' }))

  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })
  await $.agent.spawn({ prompt: 'scan the repo', description: 'scan', subagentType: 'Explore' })

  const ui = await $.ui.mount({ ...PANE, surface: 'terminal' })

  expect((await ui.find({ type: 'Text', text: /sonnet 5\.5/ }))?.text).toContain('sonnet 5.5')
  expect((await ui.find({ type: 'Text', text: /haiku 4\.5/ }))?.text).toContain('haiku 4.5')
  await ui.unmount()
})
