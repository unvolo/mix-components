import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  open: 'demo',
  appIndex: 'demo/index.html',
  watch: true,
  nodeResolve: true,
  plugins: [esbuildPlugin({ ts: true, target: 'auto' })],
};
