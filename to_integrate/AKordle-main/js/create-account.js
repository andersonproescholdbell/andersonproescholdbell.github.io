function validate() {
    var pass = $('[name="password"').val();
    if (pass.search(/[a-zA-Z0-9!@#$%^&*()-_=+]{8,20}/) >= 0) {
        return true;
    } else {
        $('#warning').empty();
        $('#warning').append($("<div class='alert alert-danger text-center'>Password is not long enough or uses invalid characters.</div>"));
        return false;
    }
}