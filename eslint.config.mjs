import nextVitals from 'eslint-config-next/core-web-vitals'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // Regra estrita nova (eslint-plugin-react-hooks): há vários efeitos legítimos (mount, navegação, fetch ao selecionar). Reduzir gradualmente.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
  globalIgnores(['.next/**', 'node_modules/**', 'out/**', 'build/**', 'next-env.d.ts']),
])
