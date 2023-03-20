export function constructHierachy(teams, teamEmployees) {
    let teamMap = {}
    teams.forEach(item => {
        if(!teamMap[item.id]) {
            teamMap[item.id] = {};
            teamMap[item.id].children = [];
            teamMap[item.id].name = item.name;
            teamMap[item.id].id = item.id;
            teamMap[item.id].isOpened = false;
        }
    })
    teamEmployees.forEach(item => {
        if(teamMap[item.teamID]) {
            teamMap[item.teamID].children.push(item);
        } else {
            teamMap[item.teamID] = {};
            teamMap[item.teamID].children = [];
            teamMap[item.teamID].name = item.teamName;
            teamMap[item.teamID].id = item.teamID;
            teamMap[item.teamID].isOpened = false;
        }
    })
    let data = Object.values(teamMap)
    return data ;
}
