function updateGameIndex()
{
    let match_selection = document.getElementById("matchSelection");
    game_controller.game_index = parseInt(match_selection.options[match_selection.selectedIndex].value, 10) - 1;
    let left_team_name_text = document.getElementById("leftTeamName");
    let right_team_name_text = document.getElementById("rightTeamName");
    if(game_controller.game_index == 3 || game_controller.game_index == 4)
    {
        left_team_name_text.innerText=game_controller.left_team.player1_name;
        right_team_name_text.innerText=game_controller.right_team.player1_name;
    }
    else if(game_controller.game_index == 5 || game_controller.game_index == 6)
    {
        left_team_name_text.innerText=game_controller.left_team.player2_name;
        right_team_name_text.innerText=game_controller.right_team.player2_name;
    }
    else
    {
        left_team_name_text.innerText=game_controller.left_team.player1_name + " / " + game_controller.left_team.player2_name;
        right_team_name_text.innerText=game_controller.right_team.player1_name + " / " + game_controller.right_team.player2_name
    }
 
    let lf = game_controller.left_team.score[game_controller.game_index];
    let rt = game_controller.right_team.score[game_controller.game_index];
    document.getElementById("leftTeamScore").innerText=lf;
    document.getElementById("rightTeamScore").innerText=rt;
    game_controller.ball_counts = lf+rt;

    if(game_controller.game_completion_status[game_controller.game_index] == 1)
    {
        if(game_controller.left_team.score[game_controller.game_index] > game_controller.right_team.score[game_controller.game_index])
        {
            document.getElementById("leftTeamPlayerName").style.backgroundColor="green"; // reset the completetion status
            document.getElementById("rightTeamPlayerName").style.backgroundColor="transparent"; // reset the completetion status
            game_controller.winning_status[game_controller.game_index] = -1; // update this because the left and right display may have changed
        }
        else
        {
            document.getElementById("rightTeamPlayerName").style.backgroundColor="green"; // reset the completetion status
            document.getElementById("leftTeamPlayerName").style.backgroundColor="transparent"; // reset the completetion status
            game_controller.winning_status[game_controller.game_index] = 1; // update this because the left and right display may have changed
        }
    }
    else
    {
        document.getElementById("leftTeamPlayerName").style.backgroundColor="transparent"; // reset the completetion status
        document.getElementById("rightTeamPlayerName").style.backgroundColor="transparent"; // reset the completetion status
        // No need to reset winning status because it has to be 0.
    }

    if(game_controller.player_window == 1)
    {
        BroadcastScore();
        BroadcastTeamName();
    }
}

function addPointToLeft(point)
{
    let leftScore = document.getElementById("leftTeamScore");
    let score = game_controller.left_team.score[game_controller.game_index] + point;

    if(game_controller.game_completion_status[game_controller.game_index] == 0)
    {
        game_controller.left_team.score[game_controller.game_index] = Math.max(score, 0);
        leftScore.innerText = game_controller.left_team.score[game_controller.game_index];
        if(score > 10 && (score-game_controller.right_team.score[game_controller.game_index])>=2)
        {
            document.getElementById("leftTeamPlayerName").style.backgroundColor="green";
            game_controller.winning_status[game_controller.game_index] = -1; // left win;
            game_controller.game_completion_status[game_controller.game_index] = 1;
            game_controller.left_team.accumm_points += game_points[game_controller.game_index];
            recorScoreToScoreboard();
            document.getElementById("nextGameButton").style.display="block";
        }
    }
    else if(point < 0)
    {
        game_controller.left_team.score[game_controller.game_index] = Math.max(score, 0);
        leftScore.innerText = game_controller.left_team.score[game_controller.game_index];
        document.getElementById("leftTeamPlayerName").style.backgroundColor="transparent"; // reset the completetion status
        if(game_controller.game_completion_status[game_controller.game_index] == 1)
        {
            game_controller.left_team.accumm_points -= game_points[game_controller.game_index];
        }
        game_controller.game_completion_status[game_controller.game_index] = 0; 
        game_controller.winning_status[game_controller.game_index] = 0;
        document.getElementById("nextGameButton").style.display="none";
    }

    game_controller.ball_counts = game_controller.right_team.score[game_controller.game_index] + game_controller.left_team.score[game_controller.game_index];
    if((game_controller.game_completion_status[game_controller.game_index] == 0 || (game_controller.game_completion_status[game_controller.game_index] == 1 && point < 0)) &&
      ((point > 0 && game_controller.ball_counts % 2 == 0) || (point < 0 && game_controller.ball_counts % 2 == 1) || game_controller.ball_counts >= 20))
    {
        changeServe();
    }

    if(game_controller.player_window == 1)
    {
        BroadcastScore();
    }
}

function addPointToRight(point)
{
    let rightScore = document.getElementById("rightTeamScore");
    let score = game_controller.right_team.score[game_controller.game_index] + point;

    if(game_controller.game_completion_status[game_controller.game_index] == 0)
    {
        game_controller.right_team.score[game_controller.game_index] = Math.max(score, 0);
        rightScore.innerText = game_controller.right_team.score[game_controller.game_index];
        if(score > 10 && (score-game_controller.left_team.score[game_controller.game_index])>=2)
        {
            document.getElementById("rightTeamPlayerName").style.backgroundColor="green";
            game_controller.winning_status[game_controller.game_index] = 1;
            game_controller.game_completion_status[game_controller.game_index] = 1;
            game_controller.right_team.accumm_points += game_points[game_controller.game_index];
            recorScoreToScoreboard();
            document.getElementById("nextGameButton").style.display="block";
        }
    }
    else if(point < 0)
    {
        game_controller.right_team.score[game_controller.game_index] = Math.max(score, 0);
        rightScore.innerText = game_controller.right_team.score[game_controller.game_index];
        document.getElementById("rightTeamPlayerName").style.backgroundColor="transparent"; // reset the completetion status
        if(game_controller.game_completion_status[game_controller.game_index] == 1)
        {
            game_controller.right_team.accumm_points -= game_points[game_controller.game_index];
        }
        game_controller.winning_status[game_controller.game_index] = 0;
        game_controller.game_completion_status[game_controller.game_index] = 0; 
    }

    game_controller.ball_counts = game_controller.right_team.score[game_controller.game_index] + game_controller.left_team.score[game_controller.game_index];
    if((game_controller.game_completion_status[game_controller.game_index] == 0 || (game_controller.game_completion_status[game_controller.game_index] == 1 && point < 0)) &&
      ((point > 0 && game_controller.ball_counts % 2 == 0) || (point < 0 && game_controller.ball_counts % 2 == 1) || game_controller.ball_counts >= 20))
    {
        changeServe();
    }

    if(game_controller.player_window == 1)
    {
        BroadcastScore(); // must be called after change serve;
    }
}

function flipSide()
{
    let temp_team = game_controller.left_team;
    game_controller.left_team = game_controller.right_team;
    game_controller.right_team = temp_team;
    updateGameIndex();
}

function changeServe()
{
    if(game_controller.left_serve == 1)
    {
        game_controller.left_serve = 0;
        document.getElementById("leftServeMarker").style.display="none";
        document.getElementById("rightServeMarker").style.display="inline";
    }
    else
    {
        game_controller.left_serve = 1;
        document.getElementById("leftServeMarker").style.display="inline";
        document.getElementById("rightServeMarker").style.display="none";
    }
    if(game_controller.player_window == 1)
    {
        BroadcastScore();
    }
}

function recorScoreToScoreboard()
{
    if(game_controller.game_completion_status[game_controller.game_index] == 1)
    {
        let game_id = game_controller.game_index+1;
        document.getElementById("ScoreRecordT1G"+game_id).innerText = team1.score[game_controller.game_index];
        document.getElementById("ScoreRecordT2G"+game_id).innerText = team2.score[game_controller.game_index];

        if(game_controller.player_window == 1)
        {
            BroadcastScoreTablePoints();
        }
    }
}

function startNextGame()
{
    let game_id = game_controller.game_index+1;
    document.getElementById("ScoreRecordT1G"+game_id).innerText = team1.score[game_controller.game_index];
    document.getElementById("ScoreRecordT2G"+game_id).innerText = team2.score[game_controller.game_index];

    game_controller.game_index += 1;
    game_id += 1;
    game_controller.game_index = Math.min(game_controller.game_index, 6);
    game_id = Math.min(game_id, 7);
    let match_selection = document.getElementById("matchSelection");
    match_selection.value = game_id.toString();
    updateGameIndex();
    flipSide();

    game_controller.ball_counts = 0;
    game_controller.left_serve = 1;
    document.getElementById("nextGameButton").style.display="none";
    document.getElementById("rightTeamPlayerName").style.backgroundColor="transparent";
    document.getElementById("leftTeamPlayerName").style.backgroundColor="transparent";
    document.getElementById("rightServeMarker").style.display = "none";
    document.getElementById("leftServeMarker").style.display = "inline";

    if(game_controller.player_window == 1)
    {
        BroadcastScore();
        BroadcastTeamName();
    }
}

function openPlayerView()
{
    const features = "width=${screen.width},height=${screen.height}";
    let player_view_window = window.open("./score_display.html", "player_view_window", features);
    game_controller.player_window = 1;
}

function refreshPlayerView()
{
    BroadcastScore();
    BroadcastTeamName();
    BroadcastScoreTableName();
}