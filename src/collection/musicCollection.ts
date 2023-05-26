import { Collection } from "discord.js";
import { MusicEntity } from "../func/music/musicEntity";

export const musicCollection: Collection<string, MusicEntity> = new Collection(); // 노래관련 맵
