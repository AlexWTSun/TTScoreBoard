class game
{
    constructor()
    {
        this.game_started = false;
        this.game_completion_status = [0, 0, 0, 0, 0, 0, 0]; // Marker for if game completed
        this.left_team = team1;
        this.right_team = team2;
        this.game_index = 0;
    }
}

let game_controller = new game();

function updateGameIndex()
{
    let match_selection = document.getElementById("matchSelection");
    game_controller.game_index = parseInt(match_selection.options[match_selection.selectedIndex].value, 10) - 1;
}