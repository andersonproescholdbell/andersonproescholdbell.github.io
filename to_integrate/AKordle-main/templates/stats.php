<!--
    Credits / adapted code:
    Tables: https://getbootstrap.com/docs/4.0/content/tables/
-->
<!DOCTYPE html>
<html class="h-100" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/stats.css">
        <link rel="stylesheet" href="styles/header.css">

        <title>AKordle</title>

        <meta name="author" content="Anderson P & Kedar K">
        <meta name="description" content="New and improved Wordle">
        <meta name="keywords" content="akordle wordle">     

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>   
    </head>

    <body>
        <?php include("templates/header.php"); ?>
        
        <div id="table-1">
            <?php
                $db = new Database();

                $result = $db->query("Select games.length, AVG(games.guesses), AVG(games.totalTime), AVG(games.score)
                From games
                Where games.userid = {$_SESSION["userid"]} and games.result<>'none'
                Group by games.length;
                ");

                echo "<h2 class='text-white'>Career</h2>";
                echo "<table class='table table-dark'>";
                echo "<thead>
                <tr>
                    <th scope='col'>Length</th>
                    <th scope='col'>Avg. Guesses</th>
                    <th scope='col'>Avg. Time (hh:mm:ss)</th>
                    <th scope='col'>Avg. Score</th>
                </tr>
                </thead>";

                echo "<tbody>";
                $count = 1;
                foreach($result as $key => $row) {
                    echo "<tr>";
                    foreach($row as $key2 => $value) {
                        if ($key2 === "userid" || $key2 === "id") { continue; }
                        if ($key2 == "AVG(games.guesses)" || $key2 == "AVG(games.score)") {
                            echo "<td>" . number_format($value, 2, '.', '') . "</td>";
                        } else if ($key2 == "AVG(games.totalTime)") {
                            if ($value%60 < 10) {
                                if (($value/60)%60 < 10) {
                                    echo "<td>" . round($value / 3600) . ":0" . round(($value / 60) % 60) . ":0" . ($value % 60) . "</td>";
                                } else {
                                    echo "<td>" . round($value / 3600) . ":" . round(($value / 60) % 60) . ":0" . ($value % 60) . "</td>";
                                }
                            } else {
                                if (($value/60)%60 < 10) {
                                    echo "<td>" . round($value / 3600) . ":0" . round(($value / 60) % 60) . ":" . ($value % 60) . "</td>";
                                } else {
                                    echo "<td>" . round($value / 3600) . ":" . round(($value / 60) % 60) . ":" . ($value % 60) . "</td>";
                                }
                            }
                        } else {
                            echo "<td>" . $value . "</td>";
                        }
                    }
                    echo "</tr>";
                }
                echo "</tbody>";
                echo "</table>";

                // -------------------------------------------------------------------------------

                $result = $db->query("Select Distinct games.date, games.word, games.guesses, games.totalTime, games.score 
                From games
                Where games.userid = {$_SESSION["userid"]} and games.result<>'none'
                Order By start DESC");

                echo "<h2 class='text-white'>Games</h2>";
                echo "<table class='table table-dark'>";
                echo "<thead>
                <tr>
                    <th scope='col'>Date</th>
                    <th scope='col'>Word (click to reveal)</th>
                    <th scope='col'>Guesses</th>
                    <th scope='col'>Time (hh:mm:ss)</th>
                    <th scope='col'>Score</th>
                </tr>
                </thead>";

                echo "<tbody>";
                $count = 1;
                foreach($result as $key => $row) {
                    echo "<tr>";
                    foreach($row as $key2 => $value) {
                        if ($key2 === "userid" || $key2 === "id") { continue; }
                        if ($key2 == "word") {
                            $hidden = "";
                            for ($i = 0; $i < strlen($value); $i++) {
                                $hidden = $hidden . "*";
                            }
                            echo '<td class="word" data-word="' . $value . '" data-hidden="' . $hidden . '" onclick="reveal(this)">' . $hidden . "</td>";
                        } else if ($key2 == "totalTime") {
                            if ($value%60 < 10) {
                                if (($value/60)%60 < 10) {
                                    echo "<td>" . round($value / 3600) . ":0" . round(($value / 60) % 60) . ":0" . ($value % 60) . "</td>";
                                } else {
                                    echo "<td>" . round($value / 3600) . ":" . round(($value / 60) % 60) . ":0" . ($value % 60) . "</td>";
                                }
                            } else {
                                if (($value/60)%60 < 10) {
                                    echo "<td>" . round($value / 3600) . ":0" . round(($value / 60) % 60) . ":" . ($value % 60) . "</td>";
                                } else {
                                    echo "<td>" . round($value / 3600) . ":" . round(($value / 60) % 60) . ":" . ($value % 60) . "</td>";
                                }
                            }
                        } else {
                            echo "<td>" . $value . "</td>";
                        }
                    }
                    echo "</tr>";
                }
                echo "</tbody>";
                echo "</table>";
            ?>
        </div>

        <script src="js/header.js"></script>   
        <script src="js/stats.js"></script>   
    </body>
</html>