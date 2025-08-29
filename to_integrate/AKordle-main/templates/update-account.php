<!--
    Credits / adapted code:
    Login page design: https://mdbootstrap.com/docs/standard/extended/login/
    Card component: https://getbootstrap.com/docs/4.0/components/card/
-->
<!DOCTYPE html>
<html class="h-100" lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1"> 
        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/login.css">

        <title>AKordle</title>

        <meta name="author" content="Anderson P & Kedar K">
        <meta name="description" content="New and improved Wordle">
        <meta name="keywords" content="akordle wordle">        
    </head>

    <body class="h-100" style="background-color: #eee;">
        <div class="container h-100 d-flex justify-content-center align-items-center">
            <div class="card rounded-3 text-black flex-row">
                <div class="column">
                    <div class="card-body p-md-6 mx-md-4">
                        
                        <div class="text-center">
                            <h1>AKordle</h1>
                        </div>
                    
                        <p class="h5">Update your account</p>
                        
                        <form action="?command=update-account" method="post" class="d-flex justify-content-center flex-column">
                            <div class="mb-3">
                                <label for="username" class="form-label">New Username</label>
                                <input type="username" class="form-control" name="username" autofocus>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">New Password</label>
                                <input type="password" class="form-control" name="password">
                            </div>

                            <button type="submit" class="btn btn-primary">Update</button>
                        </form>
                        <div class="d-flex align-items-center justify-content-center pt-3">
                            <?php
                                if (isset($_SESSION["incorrectUsername"])) {
                                    if ($_SESSION["incorrectUsername"]) {
                                        echo "<div class='alert alert-danger text-center'>Username already exists.</div>";
                                    }
                                    if ($_SESSION["incorrectPassword"]) {
                                        echo "<div class='alert alert-danger text-center'>Password is not long enough or uses invalid characters.</div>";
                                    }
                                }
                            ?>
                        </div>
                    </div>
                </div>
                <div class="column d-flex align-items-center">
                    <div class="text-black">
                        <p class="mb-4 h4 text-center">Please enter a new username or password (8-20 characters, alphanumeric and !@#$%^&*()-_=+). Leave either field blank to keep it the same.</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
