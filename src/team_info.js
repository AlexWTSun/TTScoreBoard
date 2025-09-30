class Team
{
    constructor(){
        this.player1_name = "Name1";
        this.player2_name = "Name2";
        this.score = [0, 0, 0, 0, 0, 0, 0]; // Order: doublex3, player1 x2 , player2 x2
    }
}

var team1 = new Team();
var team2 = new Team();
let team1_names="";
let team2_names="";

function set_team_member_name()
{
    let team_setup_section = document.getElementById('PlayerNameInput');
    team1.player1_name = document.getElementById("t1p1").value;
    team1.player2_name = document.getElementById("t1p2").value;
    team2.player1_name = document.getElementById("t2p1").value;
    team2.player2_name = document.getElementById("t2p2").value;
    team_setup_section.style.display='none';
    team1.score = [0,0,0,0,0,0,0];
    team2.score = [0,0,0,0,0,0,0];

    let left_score_board_section = document.getElementById("leftScoreRecord");
    let right_score_board_section = document.getElementById("rightScoreRecord");

    while(left_score_board_section.firstChild)
    {
        left_score_board_section.removeChild(left_score_board_section.firstChild);
        right_score_board_section.removeChild(right_score_board_section.firstChild);
    }

    let team1_name = team1.player1_name + "/" + team1.player2_name;
    let team1_name_record_disp = document.createElement("p");
    team1_name_record_disp.id="ScoreRecordTeam1Name";
    team1_name_record_disp.innerText=team1_name;
    team1_name_record_disp.classList.add("scoreRecorderText");
    team1_name_record_disp.style.margin = "1em";
    left_score_board_section.appendChild(team1_name_record_disp);

    let team2_name = team2.player1_name + "/" + team2.player2_name;
    let team2_name_record_disp = document.createElement("p");
    team2_name_record_disp.id="ScoreRecordTeam1Name";
    team2_name_record_disp.innerText=team2_name;
    team2_name_record_disp.classList.add("scoreRecorderText");
    team2_name_record_disp.style.margin = "1em";
    right_score_board_section.appendChild(team2_name_record_disp);

    for(let row_idx = 1; row_idx < 8; row_idx++)
    {
        let team1_score = document.createElement("p");
        team1_score.id = "ScoreRecordT1G"+row_idx;
        team1_score.classList.add("scoreRecorderText");
        team1_score.innerText = team1.score[row_idx-1];
        left_score_board_section.appendChild(team1_score);

        let team2_score = document.createElement("p");
        team2_score.id = "ScoreRecordT2G"+row_idx;
        team2_score.classList.add("scoreRecorderText");
        team2_score.innerText = team2.score[row_idx-1];
        right_score_board_section.appendChild(team2_score);
    }
    game_controller = new game();

    let left_team_name_text = document.getElementById("leftTeamName");
    let right_team_name_text = document.getElementById("rightTeamName");
    left_team_name_text.innerText=game_controller.left_team.player1_name + " / " + game_controller.left_team.player2_name;
    right_team_name_text.innerText=game_controller.right_team.player1_name + " / " + game_controller.right_team.player2_name;

    game_controller.game_index = 0;
    game_controller.ball_counts = 0;
    game_controller.winning_status = 0;
    document.getElementById("rightServeMarker").style.display = "none";
    document.getElementById("leftServeMarker").style.display = "inline";
    let lf = game_controller.left_team.score[game_controller.game_index];
    let rt = game_controller.right_team.score[game_controller.game_index]
    document.getElementById("leftTeamScore").innerText=lf;
    document.getElementById("rightTeamScore").innerText=rt;

    if(game_controller.player_window == 1)
    {
        BroadcastScore();
    }
}


