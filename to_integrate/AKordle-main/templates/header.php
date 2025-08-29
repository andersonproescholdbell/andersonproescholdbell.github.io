<!-- Resources Used:
    https://www.svgrepo.com/svg/220818/logout
-->

<header class="row">
    <div id="left" class="d-flex flex-row">
        <a id="settings">
            <img alt="Settings" src="img/settings.svg" height="24" width="24">
        </a>

        <a id="hint">
            <img alt="Get hint" src="img/question.svg" height="24" width="24">
        </a>
    </div>
    
    <?php
        if ($_SESSION["page"] == "stats") {
            echo '<a id="site2" href="?command=game"><h1 id="site">AKordle</h1></a>';
        } else {
            echo '<h1 id="site">AKordle</h1>';
        }
    ?>
    
    <div id="right" class="d-flex flex-row">
        <a href="?command=stats">
            <img alt="Stats page" src="img/stats.svg" height="24" width="24">
        </a>
        
        <a href="?command=logout">
            <img alt="Logout" src="img/logout.svg" height="24" width="24">
        </a>
    </div>
</header>

<div id="panel" class="flex-column">
    <a href="?command=update-account" class="d-flex">Update Account Settings</a>
    
    <?php
        if ($_SESSION["page"] == "game") {
            echo '<p id="rangeLength" class="text-center mb-0">Word Length - 5</p>';
            echo '<input type="range" class="form-range" id="range" min="1" max="15" step="1" value="5">';
            echo '<button id="newGame" class="btn btn-primary">Start New Game</button>';
        }
    ?>
</div>