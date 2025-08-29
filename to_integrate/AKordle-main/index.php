<?php
// CS4640 Server URLs: https://cs4640.cs.virginia.edu/akp4ujp/akordle/
//                     https://cs4640.cs.virginia.edu/ksk6rz/akordle/

spl_autoload_register(function ($classname) {
    include "classes/$classname.php";
});

session_start();


$command = "login";
$data = false;
if (isset($_GET["command"])) {
    $command = $_GET["command"];
}
if (isset($_POST["guess"])) {
    $command = "guess";
    $data = $_POST["guess"];
} else if (isset($_POST["hint"])) {
    $command = "hint";
    $data = $_POST["hint"];
} else if (isset($_POST["concede"])) {
    $command = "concede";
} else if (isset($_POST["state"])) {
    $command = "state";
}

$game = new GameController($command, $data);
$game->run();


?>

<!-- 
Formal requirements
    ✓ client side form data js validation -> create-account page password
    ✓ provide user-appropriate error messages with js -> create-account page password
    ✓ perform DOM manipulation -> game page typing letters
    ✓ Modify style and layout of your screens (or views) when a specific event occurs -> game page typing letters
    ✓ Use at least one event listener -> game page typing letters
    ✓ Implement and use at least one anonymous function -> game page typing letters event listener
    ✓ Implement and use at least one arrow function -> game page createKey event listener
    Define, instantiate, and use at least one JavaScript object
    ✓ Use jQuery in at least one (but not all) of your screens (or views) to provide dynamic behavior. -> game page event listener
    ✓ Use at least one asynchronous AJAX query that consumes your JSON from Sprint 3 and modifies the DOM to include that data in the page -> game page submitting guess and getting that data back to change the page
-->