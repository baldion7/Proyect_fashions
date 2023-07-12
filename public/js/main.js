
var categorys_date = [];
var indextemp
var sideMenu = $('#side_menu');
var toggleSideMenu = $('#toggle_container');
var logo = $("#header");
$(document).ready(function () {
    ChangeCategory(function (category) {
        PrintCategory(category)
    });
    $(document).on("click", ".ps-preview-btn-garment", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        ViewGarments(indextemp)
    });
    $(document).on("click", ".card-container", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        window.location.href = `/Germents/${indextemp}`;

    });

    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        $(sideMenu).toggleClass('close');
    }

    $(toggleSideMenu).click(function (e) {
        $(sideMenu).toggleClass('close');
    });

    $('#search').keyup(function () {
        var search = $('#search').val();
        if (search.length > 2) {
            searchGarment(search);

        }
        if ($('#search').val().trim() == '') {
            ViewGarments(indextemp)
        }
    })

    $("#btn-logout").click(function () {
        $("#logout").modal("show");
    })

    $(".btn-close-modal").click(function () {
        $("#logout").modal("hide");
    })

});

function ChangeCategory(callback) {
    $.ajax({
        url: "/api/category",
        type: "get",
        success: function (response) {
            indextemp=response[0].Id
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
        imprimir+=`<li><a data-index="${opcion.Id}" class="ps-preview-btn-garment" >${opcion.Name}</a></li></a>`
    })
    $("#category_garments").html(imprimir)
}

function PrintGarments(garment) {
    var imprimir=" "
    let ruta=garment.garments
    ruta.forEach(function (opcion) {
        let img=opcion.imggarments
        img.forEach(function (item) {
            if (item.Name==="frontal")  {
            imprimir+=`<div class="card-container" data-index="${opcion.Id}">
                <div class="card-img">
                    <div class="card-label-container">
                        <p class="card-label">${garment.Name}</p>
                    </div>
                    <img src="/img/garments/${item.img_route}" alt="Blusa">
                </div>

                <div class="card-info">
                    <h3>${opcion.Name}</h3>
                    <p>Ref: ${opcion.Reference}</p>
                </div>
            </div>`
        }
        })
    })
    $("#all_garments").html(imprimir)
}
function searchGarment(search) {
    $.ajax({
        url: "/api/search/garment/",
        type: "post",
        data:{
            search:search
        },
        success: function (response) {
            PrintGarmentssearch(response)
        },
        error: function (xhr, status, error) {
            // Manejo de error
        }
    });
}

function PrintGarmentssearch(garment) {
    var imprimir=" "
    let ruta=garment
    ruta.forEach(function (opcion) {
        let img=opcion.imggarments
        img.forEach(function (item) {
            if (item.Name==="frontal")  {
                imprimir+=`<div class="card-container" data-index="${opcion.Id}">
                <div class="card-img">
                    <div class="card-label-container">
                        <p class="card-label">${opcion.category.Name}</p>
                    </div>
                    <img src="/img/garments/${item.img_route}" alt="Blusa">
                </div>

                <div class="card-info">
                    <h3>${opcion.Name}</h3>
                    <p>Ref: ${opcion.Reference}</p>
                </div>
            </div>`
            }
        })
    })
    $("#all_garments").html(imprimir)
}