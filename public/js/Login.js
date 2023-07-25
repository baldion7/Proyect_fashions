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

  customAlert();

});

function customAlert() {
  var button = $("h1");
  var alert = $(".alert");

  $(button).click(function (e) {
      e.preventDefault();

      if ($(alert).css("visibility") == "hidden") {
          $(alert).css("visibility", "visible");
          $(alert).toggleClass("active");
      } else {
          $(alert).css("visibility", "hidden");
          $(alert).toggleClass("active");
      }


      setTimeout(() => {
          $(alert).css("visibility", "hidden");
          $(alert).toggleClass("active");
      }, 5000);
  });
};
