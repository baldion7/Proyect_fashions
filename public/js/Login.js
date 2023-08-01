$(document).ready(function() {
  console.error = function() {};
  $('#togglePassword').click(function() {
    var passwordField = $('#passwordField');
    var passwordFieldType = passwordField.attr('type');

    if (passwordFieldType === 'password') {
      passwordField.attr('type', 'text');
      $(this).removeClass('fa-eye-slash').addClass('fa-eye');
    } else {
      passwordField.attr('type', 'password');
      $(this).removeClass('fa-eye').addClass('fa-eye-slash');
    }
  });
  $("#loginForm").submit(function(event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function() {
        me()
      }
    });
  });

});

function me() {
    $.ajax({
      type: "get",
      url: "/api/me",
      success: function(response) {
        console.log(response)
        if (response==="/Germent") {
          window.location.href = '/Germent';
        }else {
        customAlert()
        }
      }
    });

}
function customAlert() {

  var alert = $(".alert");



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
      }, 4000);

};
