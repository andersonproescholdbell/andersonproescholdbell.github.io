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

        <title>AKordle</title>

        <meta name="author" content="Anderson P & Kedar K">
        <meta name="description" content="New and improved Wordle">
        <meta name="keywords" content="akordle wordle">   
        
        <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="styles/login.css">
    </head>

    <body class="h-100" style="background-color: #eee;">
        <div class="container h-100 d-flex justify-content-center align-items-center">
            <div class="card rounded-3 text-black flex-row">
                <div class="column">
                    <div class="card-body p-md-6 mx-md-4">
                        <div class="text-center">
                            <h1>AKordle</h1>
                        </div>
                    
                        <p class="h5">Login to your account</p>
                        
                        <form action="?command=login" method="post" class="d-flex justify-content-center flex-column">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="username" class="form-control" name="username" required="required" autofocus>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" name="password" required="required">
                            </div>

                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>

                        <div class="d-flex align-items-center justify-content-center pt-3">
                            <p class="mb-0 me-2 text-center">Don't have an account?</p>
                            <form action="?command=create-account" method="post" class="d-flex justify-content-center flex-column">
                                <button type="submit" class="btn btn-outline-danger md">Create new</button>
                            </form>
                        </div>
                        <div class="d-flex align-items-center justify-content-center pt-3">
                            <?php
                                if(isset($_SESSION["incorrect"]) && $_SESSION["incorrect"]) {
                                    echo "<div class='alert alert-danger'>Incorrect username or password.</div>";
                                }
                            ?>
                        </div>
                    </div>
                </div>
                <div class="column d-flex align-items-center">
                    <div class="text-black">
                        <p class="mb-4 h4 text-center">Welcome to the new and improved Wordle!</p>
                        <p class="small mb-0 text-center">Enjoy many features such as tracking your statistics, varied-length guesses, and competing with your friends!</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
