import path from 'path';
import { homedir } from 'os';

export const WEXOND_DATA_PATH = path.resolve(homedir(), '.wexond');
