// eslint.config.mjs
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  // 1. Configs to apply to all files
  ...tseslint.configs.recommended,
  {
    // 2. Next.js specific configs
    // This *already includes* core-web-vitals
    ...nextPlugin.configs.recommended,
  },
  {
    // 3. Global ignores
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
  {
    // 4. Custom rules (optional)
    rules: {
      // You can override or add rules here
    },
  },
);
