import { resolve } from 'path';
import { homedir } from 'os';

export default {
  path: resolve(homedir(), '.wexond', 'plugins'),
};
