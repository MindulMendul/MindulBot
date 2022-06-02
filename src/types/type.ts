import { Message, PermissionResolvable, TextChannel } from 'discord.js';

export interface CMD {
  name: string;
  cmd: Array<string>;
  type: string;
  permission: Array<PermissionResolvable>;
  execute: (arg0: Message, arg1: Array<string>) => Promise<void | string | Message> | undefined;
}

export interface embed {
  color: number;
  author: {
    name: string;
    icon_url: string;
  };
  description: string;
  image: { url: string };
}
