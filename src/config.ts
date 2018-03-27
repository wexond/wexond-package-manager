import { resolve } from 'path';
import { homedir } from 'os';

export const pluginsPath = resolve(homedir(), '.wexond', 'plugins');
