import { Message, PermissionResolvable } from 'discord.js';

export type CMD = {
  name: string;
  cmd: string[];
  type: string;
  permission: Array<PermissionResolvable>;
  execute: (msg: Message, args?: string[]) => Promise<any>;
}

export type metadata = {
  title: string;
  url: string;
}