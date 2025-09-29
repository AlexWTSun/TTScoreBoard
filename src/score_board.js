class game
{
    constructor()
    {
        this.game_started = false;
        this.game_completion_status = [0, 0, 0, 0, 0, 0, 0]; // Marker for if game completed
        this.left_team = team1;
        this.right_team = team2;
        this.game_index = 0;
        this.ball_counts = 0;
        this.left_serve = 1;
        this.player_window = 0;
    }
}

let game_controller = new game();
let player_view_window = null;

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
    let rt = game_controller.right_team.score[game_controller.game_index]
    document.getElementById("leftTeamScore").innerText=lf;
    document.getElementById("rightTeamScore").innerText=rt;
    game_controller.ball_counts = lf+rt;
    if(player_view_window && !player_view_window.closed)
    {
        updatePlayerWindow();
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
            if(player_view_window && !player_view_window.closed)
            {
                player_view_window.document.getElementById("playerview-rightTeamPlayerName").style.backgroundColor="green";
            }
            game_controller.game_completion_status[game_controller.game_index] = 1;
            document.getElementById("nextGameButton").style.display="block";
        }
    }
    else if(point < 0)
    {
        game_controller.left_team.score[game_controller.game_index] = Math.max(score, 0);
        leftScore.innerText = game_controller.left_team.score[game_controller.game_index];
        document.getElementById("leftTeamPlayerName").style.backgroundColor="transparent"; // reset the completetion status
        game_controller.game_completion_status[game_controller.game_index] = 0; 
        document.getElementById("nextGameButton").style.display="none";
    }

    game_controller.ball_counts = game_controller.right_team.score[game_controller.game_index] + game_controller.left_team.score[game_controller.game_index];
    if((point > 0 && game_controller.ball_counts % 2 == 0) || (point < 0 && game_controller.ball_counts % 2 == 1) || game_controller.ball_counts >= 20)
    {
        changeServe();
    }

    if(player_view_window && !player_view_window.closed)
    {
        updatePlayerWindowScore();
        updatePlayerWindowServe();
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
            if(player_view_window && !player_view_window.closed)
            {
                player_view_window.document.getElementById("playerview-leftTeamPlayerName").style.backgroundColor = "green";
            }
            game_controller.game_completion_status[game_controller.game_index] = 1;
            document.getElementById("nextGameButton").style.display="block";
        }
    }
    else if(point < 0)
    {
        game_controller.right_team.score[game_controller.game_index] = Math.max(score, 0);
        rightScore.innerText = game_controller.right_team.score[game_controller.game_index];
        document.getElementById("rightTeamPlayerName").style.backgroundColor="transparent"; // reset the completetion status
        game_controller.game_completion_status[game_controller.game_index] = 0; 
    }

    game_controller.ball_counts = game_controller.right_team.score[game_controller.game_index] + game_controller.left_team.score[game_controller.game_index];
    if((point > 0 && game_controller.ball_counts % 2 == 0) || (point < 0 && game_controller.ball_counts % 2 == 1) || game_controller.ball_counts >= 20)
    {
        changeServe();
    }

    if(player_view_window && !player_view_window.closed)
    {
        updatePlayerWindowScore();
        updatePlayerWindowServe();
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
    if(player_view_window && !player_view_window.closed)
    {
        updatePlayerWindowScore();
        updatePlayerWindowServe();
    }
}

function startNextGame()
{
    let game_id = game_controller.game_index+1;
    document.getElementById("ScoreRecordT1G"+game_id).innerText = team1.score[game_controller.game_index];
    document.getElementById("ScoreRecordT2G"+game_id).innerText = team2.score[game_controller.game_index];
    game_controller.game_completion_status[game_controller.game_index] = 1;

    game_controller.game_index += 1;
    game_id += 1;
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

    if(player_view_window && !player_view_window.closed)
    {
        player_view_window.document.getElementById("playerview-rightTeamPlayerName").style.backgroundColor = "transparent";
        player_view_window.document.getElementById("playerview-leftTeamPlayerName").style.backgroundColor = "transparent";
        updatePlayerWindow();
    }
}

function openPlayerView()
{
    const features = "width=${screen.width},height=${screen.height}";
    player_view_window = window.open("./score_display.html", "player_view_window", features);
    game_controller.player_window = 1;
    player_view_window.onload = function(){
        player_view_window.document.getElementById("playerview-leftTeamPlayerName").style.backgroundColor="green";
    };
    updatePlayerWindow();
}

function updatePlayerWindow()
{
    // Left display on right; right display on left
    let left_team_name_text = player_view_window.document.getElementById("playerview-leftTeamName");
    let right_team_name_text = player_view_window.document.getElementById("playerview-rightTeamName");
    if (game_controller.game_index == 3 || game_controller.game_index == 4)
    {
        left_team_name_text.innerText = game_controller.right_team.player1_name;
        right_team_name_text.innerText = game_controller.left_team.player1_name;
    }
    else if (game_controller.game_index == 5 || game_controller.game_index == 6)
    {
        left_team_name_text.innerText = game_controller.right_team.player2_name;
        right_team_name_text.innerText = game_controller.left_team.player2_name;
    }
    else {
        left_team_name_text.innerText = game_controller.right_team.player1_name + " / " + game_controller.right_team.player2_name;
        right_team_name_text.innerText = game_controller.left_team.player1_name + " / " + game_controller.left_team.player2_name
    }
    updatePlayerWindowScore();
    updatePlayerWindowServe();
}

function updatePlayerWindowScore()
{
    console.log("updating player window score");
    let left_team_score = player_view_window.document.getElementById("playerview-leftTeamScore");
    let right_team_score = player_view_window.document.getElementById("playerview-rightTeamScore");
    left_team_score.innerText = game_controller.right_team.score[game_controller.game_index];
    right_team_score.innerText = game_controller.left_team.score[game_controller.game_index];
    console.log("Done updating player window score");
}

function updatePlayerWindowServe()
{
    if (game_controller.left_serve == 1) 
    {
        player_view_window.document.getElementById("playerview-leftServeMarker").style.display = "none";
        player_view_window.document.getElementById("playerview-rightServeMarker").style.display = "inline";
    }
    else
    {
        player_view_window.document.getElementById("playerview-leftServeMarker").style.display="inline";
        player_view_window.document.getElementById("playerview-rightServeMarker").style.display = "none";
    }
}