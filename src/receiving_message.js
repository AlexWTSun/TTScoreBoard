const channel = new BroadcastChannel("score-board-channel");

channel.onmessage = function(event)
{
    //console.log("received data, ", event.data);
    if(event.data[0] == "score")
    {
        // ["score", left_team_score, right_team_score, left_serve_status, winning_status];
        //console.log("update score\n");
        let left_team_score = document.getElementById("playerview-leftTeamScore");
        let right_team_score = document.getElementById("playerview-rightTeamScore");
        left_team_score.innerText = event.data[2];
        right_team_score.innerText =event.data[1];
        if (event.data[3] == 1) 
        {
            document.getElementById("playerview-leftServeMarker").style.display = "none";
            document.getElementById("playerview-rightServeMarker").style.display = "inline";
        }
        else
        {
            document.getElementById("playerview-leftServeMarker").style.display="inline";
            document.getElementById("playerview-rightServeMarker").style.display = "none";
        }
        setWinningTeam(event.data[4]);
    }
    else if(event.data[0] == "name")
    {
        //console.log("update name\n");
        // ["name", left_team_name, right_team_name, winning_status]; 
        // Left display on right; right display on left
        let left_team_name_text = document.getElementById("playerview-leftTeamName");
        let right_team_name_text = document.getElementById("playerview-rightTeamName");
        left_team_name_text.innerText=event.data[2];
        right_team_name_text.innerText=event.data[1];
        setWinningTeam(event.data[3]);
    }
}

function setWinningTeam(winning_status) 
{
    if (winning_status == 0) {
        document.getElementById("playerview-rightTeamPlayerName").style.backgroundColor = "transparent";
        document.getElementById("playerview-leftTeamPlayerName").style.backgroundColor = "transparent";
    }
    else if (winning_status == -1) {
        document.getElementById("playerview-rightTeamPlayerName").style.backgroundColor = "green";
        document.getElementById("playerview-leftTeamPlayerName").style.backgroundColor = "transparent";
    }
    else if (winning_status == 1) {
        document.getElementById("playerview-leftTeamPlayerName").style.backgroundColor = "green";
        document.getElementById("playerview-rightTeamPlayerName").style.backgroundColor = "transparent";
    }
}