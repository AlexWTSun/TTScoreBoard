class Team
{
    constructor(){
        this.player1_name = "Name1";
        this.player2_name = "Name2";
        this.score = [0, 0, 0, 0, 0, 0, 0]; // Order: doublex3, player1 x2 , player2 x2
        this.accum_points = 0;
    }
}

var team1 = new Team();
var team2 = new Team();

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
        this.winning_status = [0, 0, 0, 0, 0, 0, 0]; // -1: left win; 1: right win; 0: on-going
    }
}

let game_controller = new game();

const game_points = [2, 2, 2, 1, 1, 1, 1]; // Change this when double and single game order changes;