const channel = new BroadcastChannel("score-board-channel");

channel.onmessage = function(event)
{
    console.log("received data, ", event.data);
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
    else if(event.data[0] == "table-name")
    {
        // ["table-name", team1.player1_name, team1.player2_name, team2.player1_name, team2.player2_name]
        document.getElementById("scoretable-T1name").innerText = event.data[1]+" / "+event.data[2];
        document.getElementById("scoretable-T2name").innerText = event.data[3]+" / "+event.data[4];
    }
    else if(event.data[0] == "table-score")
    {
        // ["table-score", gidx, team1.score[gidx], team2.score[gidx], team1.accum_points, team2.accum_points]
        let game_id = event.data[1]+1;
        let p1 = event.data[2];
        let p2 = event.data[3];
        document.getElementById("scoretable-T1Tot").innerText = event.data[4];
        document.getElementById("scoretable-T2Tot").innerText = event.data[5];
        document.getElementById("scoretable-T1G"+game_id).innerText = p1;
        document.getElementById("scoretable-T2G"+game_id).innerText = p2;
        if(p1 > p2)
        {
            document.getElementById("scoretable-T1G"+game_id).style="color:rgb(235,215,0);"
            document.getElementById("scoretable-T2G"+game_id).style="color:rgb(208,208,208);"
        }
        else if(p1 < p2)
        {
            document.getElementById("scoretable-T2G"+game_id).style="color:rgb(235,215,0);"
            document.getElementById("scoretable-T1G"+game_id).style="color:rgb(208,208,208);"
        }
        else
        {
            document.getElementById("scoretable-T2G"+game_id).style="color:rgb(208,208,208);"
            document.getElementById("scoretable-T1G"+game_id).style="color:rgb(208,208,208);"
        }
    }
    else if(event.data[0] == "reset")
    {
        document.getElementById("scoretable-T1Tot").innerText = 0;
        document.getElementById("scoretable-T2Tot").innerText = 0;
        for(var ii = 1; ii < 8; ii++)
        {
            document.getElementById("scoretable-T1G"+ii).innerText = 0;
            document.getElementById("scoretable-T2G"+ii).innerText = 0;
            document.getElementById("scoretable-T1G"+ii).style = "color:rgb(208,208,208);";
            document.getElementById("scoretable-T2G"+ii).style = "color:rgb(208,208,208);";
        }
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