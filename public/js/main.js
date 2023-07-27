
var categorys_date = [];
var indextemp;
var sideMenu = $('#side_menu');
var toggleSideMenu = $('#toggle_container');
var logo = $("#header");


$(document).ready(function () {

    var button = $('#btn-logout');
    var popup = $('#popup');
    var popup_2 = $('#popup_2');
    var body = $('body');
    var blur = $('#blur');
    var button_cancel = $('#btn_cancel')

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

    setTimeout(() => {
        if ($("#category_garments").height() >= 480 || $("#category_garments").height() >= 100) {
            $("#category_garments").css('overflow-y', 'scroll');
        }
    }, 100);

    if (!hasModalBeenShown()) {
        onBoarding();
    }

    $("#btn-logout, #btn_cancel").click(function (e) {

        e.preventDefault();
        setTimeout(() => {
            $(body).toggleClass('active');
            $(blur).toggleClass('active');
            $(popup).toggleClass('active');
            if ($(blur).hasClass('active')) {
                $(body).css('overflow-y', 'auto');
            } else {
                $(body).css('overflow-y', 'auto');
            }
        }, 1);
    });
});


function ChangeCategory(callback) {
    $.ajax({
        url: "/api/category",
        type: "get",
        success: function (response) {
            indextemp = response[0].Id
            ViewGarments(response[0].Id)
            callback(response);
        },
        error: function (xhr, status, error) {
        }
    });
}

function ViewGarments(id) {
    $.ajax({
        url: "/api/category/" + id,
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
    var imprimir = " "
    category.forEach(function (opcion) {
        imprimir += `<li><a data-index="${opcion.Id}" class="ps-preview-btn-garment" >${opcion.Name}</a></li></a>`
    })
    $("#category_garments").html(imprimir)
    //$("#category_garments").html('<li><a data-index="2" class="ps-preview-btn-garment">Blusa</a></li><li><a data-index="2" class="ps-preview-btn-garment">Blusa</a></li><li><a data-index="2" class="ps-preview-btn-garment">Blusa</a></li><li><a data-index="2" class="ps-preview-btn-garment">Blusa</a></li><li><a data-index="2" class="ps-preview-btn-garment">Blusa</a></li><li><a data-index="2" class="ps-preview-btn-garment">Blusa</a></li><li><a data-index="2" class="ps-preview-btn-garment">Blusa</a></li>')
}

function PrintGarments(garment) {
    var imprimir = " "
    let ruta = garment.garments
    ruta.forEach(function (opcion) {
        let img = opcion.imggarments
        img.forEach(function (item) {
            if (item.Name === "frontal") {
                imprimir += `<div class="card-container" data-index="${opcion.Id}">
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
        data: {
            search: search
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
    var imprimir = " "
    let ruta = garment
    ruta.forEach(function (opcion) {
        let img = opcion.imggarments
        img.forEach(function (item) {
            if (item.Name === "frontal") {
                imprimir += `<div class="card-container" data-index="${opcion.Id}">
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

function onBoarding() {
    let button_next = $('#button_next');
    let button_next_2 = $('#button_next_2');
    let button_exit = $('#button_exit');
    let blur = $('#blur');
    let popups = $('#popup, #popup_2, #popup_3, #popup_4');
    var popup = $('#popup');
    let popup_1 = $('#popup_2');
    let popup_2 = $('#popup_3');
    let popup_3 = $('#popup_4')
    let body = $('body');

    setTimeout(() => {
        $(body).toggleClass('active');
        $(blur).toggleClass('active');
        $(popup_1).toggleClass('active');
        if ($(blur).hasClass('active')) {
            $(body).css('overflow', 'auto');
        } else {
            $(body).css('overflow-y', 'auto');
        }
    }, 1000);

    $(button_next).click(function (e) {
        e.preventDefault();
        $(body).toggleClass('active');
        $(popup_1).toggleClass('active');
        $(blur).toggleClass('active');
        setTimeout(() => {
            $(body).toggleClass('active');
            $(blur).toggleClass('active');
            $(popup_2).toggleClass('active');
        }, 500);
    });

    $(button_next_2).click(function (e) {
        e.preventDefault();
        $(body).toggleClass('active');
        $(blur).toggleClass('active');
        $(popup_2).toggleClass('active');
        setTimeout(() => {
            $(body).toggleClass('active');
            $(blur).toggleClass('active');
            $(popup_3).toggleClass('active');
        }, 500);
    });

    $(button_exit).click(function (e) {
        e.preventDefault();
        $(body).toggleClass('active');
        $(blur).toggleClass('active');
        $(popups).removeClass('active');
        $(body).css('overflow-y', 'auto');
        setModalAsShown()
    });

    $(body).click(function (e) {
        if ($(blur).hasClass('active')) {
            $(body).toggleClass('active');
            $(blur).toggleClass('active');
            $(popups).removeClass('active');
            $(body).css('overflow-y', 'auto');
        };
    });

    $(popups).click(function (e) {
        if ($(blur).hasClass('active') && ($(popups).hasClass('active'))) {
            e.stopPropagation();
        };
    });


}

function setModalAsShown() {
    localStorage.setItem('menuModalShown', 'true');

}

function setModalAsNoShown() {
    localStorage.setItem('menuModalShown', 'false');

}

function hasModalBeenShown() {
    return localStorage.getItem('menuModalShown') === 'true';
}