var mapInfo = new Map();

function createData(msg){
    mapInfo.set(msg.member.id,
        {
            gameName: undefined, stage: 0,
        }
    )
    return mapInfo.get(msg.member.id);
}

function getData(msg) {return mapInfo.get(msg.member.id);}
function setData(id, data) {mapInfo.set(id,data);}

module.exports={createData, getData, setData};