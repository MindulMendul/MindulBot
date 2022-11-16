import { Message } from "discord.js"

export interface cmd {
    name: string
    cmd: Array<string>
    type: string
    permission: Array<string>
    execute: (arg0: Message, arg1?: Array<string>) => Promise<void | string | Message>
}

export interface embed {
    color: number,
    author: {
        name: string,
        icon_url: string,
    },
    description: string,
    image: {url: string}
}