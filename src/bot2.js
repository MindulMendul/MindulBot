const Commando = require('discord.js-commando')

const client = new Commando.Client({
    owner: '소유자 아이디'
})

const path = require('path')

client.registry
    // 명령어들의 그룹들을 등록합니다.
    .registerGroups([
        ['fun', 'Fun commands'],
        ['some', 'Some group'],
        ['other', 'Some other group']
    ])

    // 기본 명령어, 그룹 등을 등록합니다.
    .registerDefaults()

    // 다른 폴더 (여기서는 commands) 에 있는 명령어 파일 들을 불러오고 등록합니다.
    .registerCommandsIn(path.join(__dirname, 'commands'));

const sqlite = require('sqlite');
// Commando에는 길드 별 접두사, 명령어 활성화 또는 비활성화 등의 기능이 있지만, 이를 저장해 놓으려면 데이터베이스가 필요하기 때문에 sqlite를 이용합니다.
client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

bot.login(process.env.DISCORDJS_BOT_TOKEN);