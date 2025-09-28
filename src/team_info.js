class Team
{
    constructor(){
        this.player1_name = "Name1";
        this.player2_name = "Name2";
        this.double_score = [0, 0, 0];
        this.player1_score = [0, 0];
        this.player2_score = [0, 0];
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

    let score_board_label_section = document.getElementById("scoreRecordLabel");
}


