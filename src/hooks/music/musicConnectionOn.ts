import { VoiceConnectionStatus } from "@discordjs/voice";
import { musicCollection } from "../../../bot";
import { musicEntity } from "../../types/musicType";
import { musicExecutePlay } from "./musicExecutePlay";

export const musicCollectionOn = (msg:any, guildId:string, resource:any, connection:any) => {
	const entity = musicCollection.get(guildId) as musicEntity;

	//준비가 되면 연결해서 노래를 틀어야지!
	connection.on(VoiceConnectionStatus.Ready, async () => {
		await musicExecutePlay(msg, resource); //아래에 있는 play함수 호출
		musicCollection.set(guildId, entity);
	});

	connection.on(VoiceConnectionStatus.Disconnected, () => {
		if (entity) { // 안에 살아있는 친구들 다 죽이기
			entity.audioPlayer.stop();
			entity.connection.destroy();
			entity.reactCollector?.stop();
			entity.subscription.unsubscribe();
			musicCollection.delete(guildId);
		}
	})
};