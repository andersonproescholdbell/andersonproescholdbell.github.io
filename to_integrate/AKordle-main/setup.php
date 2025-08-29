<?php

spl_autoload_register(function ($classname) {
    include "classes/$classname.php";
});

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$db = new mysqli(Config::$db["host"], Config::$db["user"], Config::$db["pass"], Config::$db["database"]);

$db->query("drop table if exists games;");
$db->query("drop table if exists users;");
$db->query("drop table if exists words;");

$db->query("create table users (
                id int not null auto_increment,
                username text not null,
                password text not null,
                primary key (id)
            );");

$db->query("create table games(
                id int not null auto_increment,
                userid int not null,
                date text not null,
                word text not null,
                guesses int not null,
                start decimal not null,
                totalTime decimal(10,2) not null,
                score int not null,
                length int not null,
                state text not null,
                colors text not null,
                result text not null,
                primary key (id),
                foreign key (userid)
                    references users(id)
                    on delete cascade
            );");

$db->query("create table words(
    id int not null auto_increment,
    word text not null,
    primary key (id)
);");


/** Load data into the database */
$arr = file("./dictionary/english-short.txt", FILE_IGNORE_NEW_LINES);
foreach ($arr as $word) {
    $db->query("Insert Into words (word) Values(\"{$word}\");");
    // $db->query("INSERT INTO words (word) VALUES ('" . $word . "');");
    // print_r($word . ', ');
}
// print_r($arr);


echo "Success";

//$stmt = $db->prepare("insert into users (name, email, password) values (?, ?, ?);");
// $email = "email@gmail.com";
// $password = "securepass";
// for ($i = 0; $i < 8; $i++) {
//     $name = "name". $i;
//     $stmt->bind_param("sss", $name, $email, $password);
//     if (!$stmt->execute()) {
//         echo "Could not add user $i";
//     }
// }

// $db->query("drop table if exists transactions;");
// $db->query("create table transactions (
//     id int not null auto_increment,
//     userid int not null,
//     name text not null,
//     category text not null,
//     date text not null,
//     amount decimal(10,2) not null,
//     type text not null,
//     primary key (id)
// );");

?>