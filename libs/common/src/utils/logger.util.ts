import { toKebabCase } from 'naming-conventions-modeler';
import * as log from 'log';

export const logger = (namespace: string): ReturnType<typeof log.get> =>
  log.get(toKebabCase(namespace));

export const date = (str: string) => `[${new Date().toLocaleString()}] ${str}`;
