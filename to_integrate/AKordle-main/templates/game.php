<!-- Resources used:
    https://stackoverflow.com/questions/3381609/button-image-as-form-input-submit-button
-->

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/game.css">
        <link rel="stylesheet" href="styles/header.css">

        <title>AKordle</title>

        <meta name="author" content="Anderson P & Kedar K">
        <meta name="description" content="New and improved Wordle">
        <meta name="keywords" content="akordle wordle">
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>   
    </head>  

    <body>
        <div id="main">
            <?php include("templates/header.php"); ?>

            <div id="boxes-con">
                <div id="boxes"></div>
            </div>

            <div id="keyboard"></div>
        </div>

        <div id="winPanel">
            <h2 id="winPanelText"></h2>
            <h3 id="winPanelWord"></h3>
            <h3 id="winPanelScore"></h3>
            <div class="d-flex flex-row">
                <button id="hideWinPanel" class="btn btn-light m-2">Hide Panel</button>
                <button id="newGame2" class="btn btn-primary m-2">Start New Game</button>
            </div>
        </div>

        <script src="js/game.js"></script>
        <script src="js/header.js"></script>
    </body>
</html>