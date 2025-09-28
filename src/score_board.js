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
    }
}

let game_controller = new game();

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
}

function addPointToLeft(point)
{
    let leftScore = document.getElementById("leftTeamScore");
    let score = game_controller.left_team.score[game_controller.game_index] + point;
    game_controller.left_team.score[game_controller.game_index] = Math.max(score, 0);
    game_controller.ball_counts = game_controller.right_team.score[game_controller.game_index] + game_controller.left_team.score[game_controller.game_index];
    
    if((point > 0 && game_controller.ball_counts % 2 == 0) || (point < 0 && game_controller.ball_counts % 2 == 1) || game_controller.ball_counts >= 20)
    {
        changeServe();
    }
    if(game_controller.game_completion_status[game_controller.game_index] == 0)
    {
        leftScore.innerText = game_controller.left_team.score[game_controller.game_index];
        if(score > 10 && (score-game_controller.right_team.score[game_controller.game_index])>=2)
        {
            document.getElementById("leftTeamPlayerName").style.backgroundColor="green";
            game_controller.game_completion_status[game_controller.game_index] = 1;
            // TODO press anykey to continue;
        }
    }
    else if(point < 0)
    {
        leftScore.innerText = game_controller.left_team.score[game_controller.game_index];
        document.getElementById("leftTeamPlayerName").style.backgroundColor="transparent"; // reset the completetion status
        game_controller.game_completion_status[game_controller.game_index] = 0; 
    }
}

function addPointToRight(point)
{
    let rightScore = document.getElementById("rightTeamScore");
    let score = game_controller.right_team.score[game_controller.game_index] + point;
    game_controller.right_team.score[game_controller.game_index] = Math.max(score, 0);
    game_controller.ball_counts = game_controller.right_team.score[game_controller.game_index] + game_controller.left_team.score[game_controller.game_index];

    if((point > 0 && game_controller.ball_counts % 2 == 0) || (point < 0 && game_controller.ball_counts % 2 == 1) || game_controller.ball_counts >= 20)
    {
        changeServe();
    }
    if(game_controller.game_completion_status[game_controller.game_index] == 0)
    {
        rightScore.innerText = game_controller.right_team.score[game_controller.game_index];
        if(score > 10 && (score-game_controller.left_team.score[game_controller.game_index])>=2)
        {
            document.getElementById("rightTeamPlayerName").style.backgroundColor="green";
            game_controller.game_completion_status[game_controller.game_index] = 1;
            // TODO press anykey to continue;
        }
    }
    else if(point < 0)
    {
        rightScore.innerText = game_controller.right_team.score[game_controller.game_index];
        document.getElementById("rightTeamPlayerName").style.backgroundColor="transparent"; // reset the completetion status
        game_controller.game_completion_status[game_controller.game_index] = 0; 
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
}