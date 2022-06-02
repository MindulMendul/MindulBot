<<<<<<< HEAD
import { Message, PermissionResolvable } from 'discord.js';

export interface CMD {
  name: string;
  cmd: string[];
  type: string;
  permission: Array<PermissionResolvable>;
  execute: (arg0: Message, arg1?: string[]) => Promise<void | string | Message> | undefined;
}

export type Embed = {
=======
import { Message, PermissionResolvable, TextChannel } from 'discord.js';

export interface CMD {
  name: string;
  cmd: Array<string>;
  type: string;
  permission: Array<PermissionResolvable>;
  execute: (arg0: Message, arg1: Array<string>) => Promise<void | string | Message> | undefined;
}

export interface embed {
>>>>>>> 92fc5a7c (music 부분 고치는 중)
  color: number;
  author: {
    name: string;
    icon_url: string;
  };
  description: string;
  image: { url: string };
}
