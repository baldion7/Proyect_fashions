const nav_bar = $('#side_nav')
const open_nav_bar = $('#btn_open_sidenav')
const close_nav_bar = $('#btn_close_sidenav')
const zoom_in_icon = $('#zoom_in_icon')
const zoom_out_icon = $('#zoom_out_icon')
const home_icon = $('#home_icon')
const header_logo = $('#header_logo')


if (nav_bar.hasClass('active')) {
    open_nav_bar.hide();
    close_nav_bar.click(function (e) {
        e.preventDefault();
        nav_bar.removeClass('active');
        nav_bar.addClass('inactive')
        nav_bar.hide();
        open_nav_bar.show();
        if (window.matchMedia("(max-width: 768px)").matches) {
            zoom_in_icon.show()
            zoom_out_icon.show()
            home_icon.show()
            header_logo.show()
        }
    });
}


open_nav_bar.click(function (e) {
    e.preventDefault();
    nav_bar.removeClass('inactive');
    nav_bar.addClass('active')
    nav_bar.show();
    open_nav_bar.hide();
    if (window.matchMedia("(max-width: 768px)").matches) {
        zoom_in_icon.hide()
        zoom_out_icon.hide()
        home_icon.hide()
        header_logo.hide()
    }
})

checkMediaQuery();

$(window).resize(function() {
  checkMediaQuery();
});

function checkMediaQuery() {
  if (window.matchMedia("(max-width: 768px)").matches) {
        nav_bar.removeClass('active');
        nav_bar.addClass('inactive')
        nav_bar.hide();
        open_nav_bar.show();
  } else {
    nav_bar.removeClass('inactive');
    nav_bar.addClass('active')
    nav_bar.show();
    open_nav_bar.hide();
  }
}

var categorys_date = [];
var categorys = []
$(document).ready(function () {
    ChangeCategory(function (category) {
        PrintCategory(category)
    });
    $(document).on("click", ".ps-preview-btn-garment", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        ViewGarments(indextemp)
    });
});

function ChangeCategory(callback) {
    $.ajax({
        url: "/api/category",
        type: "get",
        success: function (response) {
            ViewGarments(response[0].Id)
            callback(response);
        },
        error: function (xhr, status, error) {
        }
    });
}

function ViewGarments(id) {
    $.ajax({
        url: "/api/category/"+id,
        type: "get",
        success: function (response) {
            PrintGarments(response)
        },
        error: function (xhr, status, error) {
            // Manejo de error
        }
    });
}

function PrintCategory(category) {
     var imprimir=" "
    category.forEach(function (opcion) {
        imprimir+=`<a class="text-decoration-none ps-preview-btn-garment" data-index="${opcion.Id}"  >${opcion.Name}</a>`
    })
    $("#category").html(`<li class="nav-item">`+imprimir+`</li>`)
    console.log( categorys_date)
}

function PrintGarments(garment) {
    var imprimir=" "
    let ruta=garment.garments
    ruta.forEach(function (opcion) {
        imprimir+=`<div class="cards-container text-center">
                <div class="card m-3 g-col-6" style="width: 18rem;">
                    <img src="/img/camisa-fs-formal-azul-claro-platxdezbufe41gs7kufx6eonyianr5m6bgdc5zwlo.png" class="card-img-top" alt="Camisa">
                    <div class="card-body">
                        <h5 class="card-title">${opcion.Description}</h5>
                        <p class="card-text">Ref: ${opcion.Reference}</p>
                        <a data-index="${opcion.Id}"  href="Germents/${opcion.Id}" class="btn btn-primary">Ver prenda</a>
                    </div>
                </div>
            </div>`
    })
    $("#all_garments").html(imprimir)
}