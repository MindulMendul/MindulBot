import { Message, PermissionResolvable } from 'discord.js';

export interface CMD {
  name: string;
  cmd: string[];
  type: string;
  permission: Array<PermissionResolvable>;
  execute: (arg0: Message, arg1?: string[]) => Promise<void | string | Message> | undefined;
}

export type Embed = {
  color: number;
  author: {
    name: string;
    icon_url: string;
  };
  description: string;
  image: { url: string };
}
