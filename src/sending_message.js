const channel = new BroadcastChannel('score-board-channel');
function BroadcastScore()
{
    // The order of the message is
    // ["score", left_team_score, right_team_score, left_serve_status, winning_status];
    const message = ["score", game_controller.left_team.score[game_controller.game_index], game_controller.right_team.score[game_controller.game_index], 
        game_controller.left_serve, game_controller.winning_status[game_controller.game_index]];
    channel.postMessage(message);
    //console.log("send score", message);
}

function BroadcastTeamName()
{
    // The order of the message is
    // ["name", left_team_name, right_team_name, winning_status]; 
    // wining status: -1: left win; 0: not decided; 1: right win
    let left_team_name_text = document.getElementById("leftTeamName");
    let right_team_name_text = document.getElementById("rightTeamName");
    const message = ["name", left_team_name_text.innerText, right_team_name_text.innerText, game_controller.winning_status[game_controller.game_index]];
    channel.postMessage(message);
    //console.log("send name", message);
}

function BroadcastScoreTableName()
{
    const message=["table-name", team1.player1_name, team1.player2_name, team2.player1_name, team2.player2_name];
    channel.postMessage(message);
}
function BroadcastScoreTablePoints()
{
    let gidx = game_controller.game_index;
    const message=["table-score", gidx, team1.score[gidx], team2.score[gidx], team1.accumm_points, team2.accumm_points];
    channel.postMessage(message);
    console.log("send table points", message);
}