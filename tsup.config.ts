import { defineConfig } from 'tsup';

export default defineConfig({
    clean: true,
    dts: true,
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    minify: false,
    skipNodeModulesBundle: true,
    sourcemap: true,
    target: 'es2020',
    tsconfig: './tsconfig.json',
    keepNames: true
});
