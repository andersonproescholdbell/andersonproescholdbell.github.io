<?php
    
class GameController {
    private $command;
    private $data;
    private $db;

    public function __construct($command, $data) {
        $this->command = $command;
        $this->data = $data;
        $this->db = new Database();
    }

    public function run() {
        if (!function_exists('str_contains')) {
            function str_contains(string $haystack, string $needle): bool
            {
                return '' === $needle || false !== strpos($haystack, $needle);
            }
        }

        switch ($this->command) {
            case "state":
                $_SESSION["page"] = 'game';
                $this->stateInformation();
                break;
            case "concede":
                $_SESSION["page"] = 'game';
                $this->concedeCurrentGame();
                break;
            case "guess":
                $_SESSION["page"] = 'game';
                $this->evaluateGuess();
                break;
            case "hint":
                $_SESSION["page"] = 'game';
                $this->hint();
                break;
            case "login":
                $_SESSION["page"] = 'login';
                $this->login();
                break;
            case "game":
                $_SESSION["page"] = 'game';
                $this->game();
                break;
            case "stats":
                $_SESSION["page"] = 'stats';
                $this->stats();
                break;
            case "logout":
                $_SESSION["page"] = 'logout';
                $this->logout();
                break;
            case "create-account":
                $_SESSION["page"] = 'create-account';
                $this->create_account();
                break;
            case "update-account":
                $_SESSION["page"] = 'update-account';
                $this->update_account();
                break;
            default:
                $_SESSION["page"] = 'login';
                $this->login();
                break;
        }
    }

    private function login() {
        $_SESSION["incorrect"] = false;
        if (isset($_POST["username"])) {
            $username = $_POST["username"];
            $password = $_POST["password"];

            $this->verify_account($username, $password, "login.php");
        } else {
            include("templates/login.php");
            exit(0);
        }
    }

    private function setSession($id, $username, $password) {
        $_SESSION["userid"] = $id;
        $_SESSION["username"] = $username;
        $_SESSION["password"] = $password;
    }

    private function game() {
        $id = $_SESSION["userid"];
        $data = $this->db->query("SELECT * FROM games WHERE games.userid=$id and games.result='none'");
        
        if ($data) {
            $_SESSION["state"] = $data[0]["state"];
        } else {
            $_SESSION["state"] = false;
        }
        
        include("templates/game.php");
        exit(0);
    }

    private function stats() {
        include("templates/stats.php");
        exit(0);
    }

    private function logout() {
        $_SESSION = array();
        session_destroy();
        include("templates/login.php");
        exit(0);
    }

    private function create_account() {
        $_SESSION["incorrectUsername"] = false;
        $_SESSION["incorrectPassword"] = false;

        if (isset($_POST["username"])) {
            $username = $_POST["username"];
            $password = $_POST["password"];

            $this->verify_account($username, $password, "create-account.php");
        } else {
            include("templates/create-account.php");
            exit(0);
        }
    }

    private function update_account() {
        $_SESSION["incorrectUsername"] = false;
        $_SESSION["incorrectPassword"] = false;

        if (isset($_POST["username"])) {
            $username = $_POST["username"];
            $password = $_POST["password"];
            $id = $_SESSION["userid"];

            if ($username != '') {
                $data = $this->db->query("Select * from users where username=?", "s", $username);
                if (count($data) == 0) {
                    $this->db->query("UPDATE users SET users.username=? WHERE users.id=$id;", "s", $username);
                } else {
                    $_SESSION["incorrectUsername"] = true;
                    include("templates/update-account.php");
                    exit(0);
                }
            }
            if ($password != '') {
                if (preg_match("/[a-zA-Z0-9!@#$%^&*()-_=+]{8,20}/", $password)) {
                    $this->db->query("UPDATE users SET users.password=? WHERE users.id=$id;", "s", password_hash($password, PASSWORD_DEFAULT));
                } else {
                    $_SESSION["incorrectPassword"] = true;
                    include("templates/update-account.php");
                    exit(0);
                }
            }
            
            header("location: ?command=login");
        } else {
            include("templates/update-account.php");
            exit(0);
        }
    }

    private function verify_account($username, $password, $page) {
        $data = $this->db->query("Select * from users Where username=?", "s", $username);

        if ($page === "create-account.php") {
            if ($data) {
                $_SESSION["incorrectUsername"] = true;
                include("templates/" . $page);
                exit(0);
            } else {
                if (preg_match("/[a-zA-Z0-9!@#$%^&*()-_=+]{8,20}/", $password)) {
                    $this->db->query("Insert Into users (username, password) Values (?, ?);", "ss",
                    $username, password_hash($password, PASSWORD_DEFAULT));
                    // get their new id
                    $data = $this->db->query("Select * from users Where username=?", "s", $username);          
                    $this->setSession($data[0]["id"], $username, $password);
                    header("location: ?command=game");
                } else {
                    $_SESSION["incorrectPassword"] = true;
                    include("templates/create-account.php");
                    exit(0);
                }
            }
        } else if ($data && password_verify($password, $data[0]["password"])) {
            $this->setSession($data[0]["id"], $username, $password);
            header("location: ?command=game");
        } else {
            $_SESSION["incorrect"] = true;
            include("templates/" . $page);
            exit(0);
        }
    }

    private function getCurrentGameData() {
        // return the user's current game or false if they don't have a game in progress
        $id = $_SESSION["userid"];
        $data = $this->db->query("SELECT * FROM games WHERE games.userid=$id and games.result='none';");
        if (isset($data[0]["word"])) {
            return $data[0];
        } else {
            return false;
        }
    }

    private function getWord($length) {
        $data = $this->db->query("Select word From words Where CHAR_LENGTH(word) = {$length}");
        return strtoupper($data[rand(0, count($data))]["word"]);
    }

    private function getState($str, $previous) {
        $state = "";
        
        if ($previous) {
            $state = $previous . ',';
        }

        for ($i = 0; $i < strlen($str); $i++) {
            $state .= $str[$i];
            if ($i != strlen($str)-1) {
                $state .= ',';
            }
        }

        return $state;
    }

    private function getColors($str, $previous) {
        if ($previous) {
            return $previous . ',' . $str;
        } else {
            return $str;
        }
    }

    private function createGame($length, $guess) {
        // create game database entry for user and return the chosen word for that game
        $id = $_SESSION["userid"];
        $word = $this->getWord($length);
        $start = time(); // the start time of the game
        $date = date('Y-m-d');
        $this->db->query("INSERT INTO games (userid, date, word, guesses, start, totalTime, score, length, state, colors, result) 
                                Values($id, '$date', '$word', 0, '$start', 0, 0, $length, '', '', 'none');");
        
        return $word;
    }

    private function calculateGameScore($guesses, $totalTime, $win_if) {
        if ($win_if == "loss") {
            return 0;
        }

        return round(max((10000 - pow($guesses-1, 2)*200 - $totalTime*0.1), 1));
    }

    private function updateCurrentGame($guess, $colors) {
        $id = $_SESSION["userid"];
        $currentData = $this->getCurrentGameData();
        $guesses = $currentData["guesses"] + 1;
        $state = $this->getState($guess, $currentData["state"]);
        $this->db->query("UPDATE games SET games.guesses=$guesses, games.state='$state', games.colors='$colors'
                          WHERE games.userid=$id and games.result='none';");
    }

    private function getTotalTime() {
        $data = $this->getCurrentGameData();
        return time() - $data["start"];
    }

    private function finishCurrentGame($guess, $won, $colors) {
        $id = $_SESSION["userid"];
        $currentData = $this->getCurrentGameData();
        $guesses = $currentData["guesses"] + 1;
        $totalTime = $this->getTotalTime();
        $score = $this->calculateGameScore($guesses, $totalTime, $won);
        $state = $this->getState($guess, $currentData["state"]);
        $this->db->query("UPDATE games SET games.totalTime=$totalTime, games.score=$score, games.guesses=$guesses, games.result='$won', games.state='$state', games.colors='$colors'
                          WHERE games.userid=$id and games.result='none';");
    }

    private function checkGameOver($guess, $data) {
        if ($guess == strtoupper($data["word"])) { // correct guess
            return "win";
        } else { // incorrect guess
            if ($data["guesses"]+1 == 6) {
                return "loss";
            } else {
                return false;
            }
        }
    }

    private function generate_colors_arr($guess, $correctWord) {
        // returning string of b, y, g
        $str = "";
        for ($i = 0; $i < strlen($correctWord); $i++) {
            $str .= 'x';
        }

        // get number of correct letters for each letter in correctWord
        $wordCorrect = [];
        $guessCorrect = [];
        for ($i = 0; $i < strlen($correctWord); $i++) {
            if (!array_key_exists($correctWord[$i], $wordCorrect)) {
               $wordCorrect[$correctWord[$i]] = 1;
               $guessCorrect[$correctWord[$i]] = 0;
            } else {
               $wordCorrect[$correctWord[$i]] = $wordCorrect[$correctWord[$i]] + 1;
            }
        }

        // check for blanks
        for ($i = 0; $i < strlen($correctWord); $i++) {
            if (!str_contains($correctWord, $guess[$i])) {
                $str[$i] = 'b';
            }
        }

        // check for greens
        for ($i = 0; $i < strlen($correctWord); $i++) {
            if ($guess[$i] == $correctWord[$i]) {
                $str[$i] = 'g';
                $guessCorrect[$guess[$i]] = $guessCorrect[$guess[$i]] + 1;
            }
        }

        // check for oranges
        for ($i = 0; $i < strlen($correctWord); $i++) {
            if (str_contains($correctWord, $guess[$i]) && $guess[$i] != $correctWord[$i]) { // if letter is in word but not at that spot
                if ($guessCorrect[$guess[$i]] < $wordCorrect[$guess[$i]]) {
                    $str[$i] = 'y';
                    $guessCorrect[$guess[$i]] = $guessCorrect[$guess[$i]] + 1;
                }
            }
        }

        // add commas and return
        $ret = "";
        for ($i = 0; $i < strlen($correctWord); $i++) {
            $ret .= $str[$i];
            if ($i+1 != strlen($correctWord)) {
                $ret .= ',';
            }
        }
        return $ret;
    }

    private function convert_to_trifecta($colors) {
        $arr_all = array();
        $green = array();
        $yellow = array();
        $gray = array();

        $i = 0;
        $index = 0;
        while($index < strlen($colors)) {
            if($colors[$index] === ",") { $index++; continue; }
            if($colors[$index] === "g") {
                array_push($green, $i);
            } else if($colors[$index] === "y") {
                array_push($yellow, $i);
            } else {
                array_push($gray, $i);
            }

            $index++;
            $i++;
        }

        array_push($arr_all, $green);
        array_push($arr_all, $yellow);
        array_push($arr_all, $gray);

        return $arr_all;
    }

    private function concedeCurrentGame() {
        // concede current game so we can start a new one
        $id = $_SESSION["userid"];

        $data = $this->getCurrentGameData();
        if ($data != false) {
            $totalTime = $this->getTotalTime();
            $guesses = $data["guesses"];
            $score = $this->calculateGameScore($guesses, $totalTime, "loss");
            $this->db->query("UPDATE games SET games.totalTime=$totalTime, games.score=$score, games.result='loss'
                                WHERE games.userid=$id and games.result='none';");
        }

        $clientData = [
            "success" => true,
            "currentGameData" => $data
        ];

        // return data to client
        header("Content-type: application/json");
        echo json_encode($clientData, JSON_PRETTY_PRINT);
        exit(0);
    }

    private function validateGuess($guess) {
        return isset($this->db->query("Select word From words Where word = \"{$guess}\"")[0]["word"]);
    }

    private function getMostRecentGameData() {
        $id = $_SESSION["userid"];
        $data = $this->db->query("SELECT * FROM games WHERE userid=$id ORDER BY start DESC LIMIT 1;");
        if (isset($data[0]["word"])) {
            return $data[0];
        } else {
            return false;
        }
    }

    private function evaluateGuess() {
        $guess = $_POST["guess"];

        // only allow valid words as guesses
        if (!$this->validateGuess($guess)) {
            $clientData = [
                "bad" => true
            ];
            
            // return data to client
            header("Content-type: application/json");
            echo json_encode($clientData, JSON_PRETTY_PRINT);    

          exit(0);
        }

        $id = $_SESSION["userid"];
        $data = $this->getCurrentGameData();
        
        $correctWord = false;
        if ($data) {
            $correctWord = $data["word"];
        }

        if (!$correctWord) { // there is no current game for the user at the moment so we create one
            $length = strlen($guess);
            $correctWord = $this->createGame($length, $guess);
            $data = $this->getCurrentGameData();
        }

        $gameOver = $this->checkGameOver($guess, $data);
            
        $current_color_set = $this->generate_colors_arr($guess, $correctWord);
        $colors = $this->getColors($current_color_set, $data["colors"]); 

        if ($gameOver) { // game over
            $this->finishCurrentGame($guess, $gameOver, $colors);
        } else { // game not over
            $this->updateCurrentGame($guess, $colors);
        }
        
        $newData = $this->getMostRecentGameData();

        $colors_arr = $this->convert_to_trifecta($current_color_set);
        if ($gameOver) {
            $clientData = [
                "grey" => $colors_arr[2],
                "orange" => $colors_arr[1],
                "green" => $colors_arr[0],
                "over" => $gameOver,
                "guesses" => $newData["guesses"],
                "word" => $correctWord,
                "score" => $newData["score"],
                "bad" => false,
            ];
        } else {
            $clientData = [
                "grey" => $colors_arr[2],
                "orange" => $colors_arr[1],
                "green" => $colors_arr[0],
                "over" => $gameOver,
                "guesses" => $newData["guesses"],
                "score" => $newData["score"],
                "bad" => false,
            ];
        }
        
        // return data to client
        header("Content-type: application/json");
        echo json_encode($clientData, JSON_PRETTY_PRINT);
        exit(0);
    }

    private function hint() {
        // CALL FUNCTION HERE TO GET THE ACTUAL VALUES FOR WHAT SHOULD BE GIVEN AS HINT
        $data = $this->getCurrentGameData();
        $guess = str_replace(",", "", substr($data["state"], -1*($data["length"]*2)));
        $colors = str_replace(",", "", substr($data["colors"], -1*($data["length"]*2)));
        $correctWord = false;
        $clientData = [];
        if ($data) {
            $correctWord = $data["word"];

            $letter_changed = "";
            $pos = 0;
            for ($i = 0; $i < strlen($correctWord); $i++) {
                if ($correctWord[$i] !== $guess[$i] && $colors[$i] !== 'y') {
                    $letter_changed = $correctWord[$i];
                    $pos = $i;
                    
                    break;
                }
            }

            if($letter_changed === "") {
                for ($i = 0; $i < strlen($correctWord); $i++) {
                    if ($correctWord[$i] !== $guess[$i]) {
                        $letter_changed = $correctWord[$i];
                        $pos = $i;
                        
                        break;
                    }
                }                
            }

            $change_blank = array();
            for($i = 0; $i < strlen($colors); $i++) {
                if($colors[$i] === 'y' && $guess[$i] == $letter_changed) {
                    array_push($change_blank, $i);
                }
            }

            $clientData = [
                "letter" => $letter_changed,
                "position" => $pos,
                "change_blank" => $change_blank
            ];
        } else {
            $clientData = [
                "letter" => null,
                "position" => null,
                "change_blank" => null
            ];
        }
        
        header("Content-type: application/json");
        echo json_encode($clientData, JSON_PRETTY_PRINT);
        exit(0);
    }

    private function stateInformation() {
        $currentData = $this->getCurrentGameData();
        $data = [];

        if (!$currentData) {
            $data = [
                "currentGame" => false
            ];
        } else {
            $data = [
                "currentGame" => true,
                "rows" => 6,
                "cols" => strlen($currentData["word"]),
                "state" => $currentData["state"],
                "colors" => $currentData["colors"]
            ];
        }
        
        header("Content-type: application/json");
        echo json_encode($data, JSON_PRETTY_PRINT);
        exit(0);
    }
}

?>