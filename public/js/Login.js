$(document).ready(function() {
  $('#togglePassword').click(function() {
    var passwordField = $('#passwordField');
    var passwordFieldType = passwordField.attr('type');

    if (passwordFieldType === 'password') {
      passwordField.attr('type', 'text');
      $(this).removeClass('fa-eye').addClass('fa-eye-slash');
    } else {
      passwordField.attr('type', 'password');
      $(this).removeClass('fa-eye-slash').addClass('fa-eye');
    }
  });

});
