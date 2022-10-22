<<<<<<< HEAD
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
=======
import { Message, PermissionResolvable } from 'discord.js';
>>>>>>> 3ce689fd (노래 삭제기능 수정 & 노래 검색함수 수정 & 전체적인 리펙토링)

export interface CMD {
  name: string;
  cmd: string[];
  type: string;
  permission: Array<PermissionResolvable>;
  execute: (arg0: Message, arg1?: string[]) => Promise<void | string | Message> | undefined;
}

<<<<<<< HEAD
export interface embed {
>>>>>>> 92fc5a7c (music 부분 고치는 중)
=======
export type Embed = {
>>>>>>> 3ce689fd (노래 삭제기능 수정 & 노래 검색함수 수정 & 전체적인 리펙토링)
  color: number;
  author: {
    name: string;
    icon_url: string;
  };
  description: string;
  image: { url: string };
}
