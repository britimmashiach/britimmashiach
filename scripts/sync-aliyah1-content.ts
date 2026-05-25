/**
 * @deprecated Use sync-aliyot-content.ts (--only=1)
 * Mantido para compatibilidade com npm run sync:aliyah1
 */
import { spawnSync } from 'child_process'
import { resolve } from 'path'

const script = resolve(__dirname, 'sync-aliyot-content.ts')
const extra = process.argv.slice(2)
if (!extra.some((a) => a.startsWith('--only='))) {
  extra.unshift('--only=1')
}

const result = spawnSync('npx', ['tsx', '--env-file=.env.local', script, ...extra], {
  stdio: 'inherit',
  shell: true,
  cwd: resolve(__dirname, '..'),
})

process.exit(result.status ?? 1)

