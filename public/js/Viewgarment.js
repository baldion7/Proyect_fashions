var idgerments
var btn = []
var cont_img = 1;
$(document).ready(function () {
    idgerments = $("#id_germants").val()
    idrol = $("#id_rol").val()
    changgerments()

    $(document).on("click", ".card-container", function (e) {
        indextemp = $(e.currentTarget).attr("data-index");
        window.location.href = `/Germents/${indextemp}`;

    });
    $(".video-tutorial").click(function () {
        searcvideo(idgerments)
    })

    $(document).on("click", ".Bubble", function (e) {
        indextempmodal = $(e.currentTarget).attr("data-index");
        modalviews(indextempmodal)
        $("#detailsgarments").modal("show");

    });

    $('.generatePdf').click(function () {
        window.location.href = `/api/pdf/${idgerments}`;
    });

    $(".btn-arrows-garments-left").click(function () {
        if (cont_img % 2 === 1) {
            changebtn("trasera");

            cont_img -= 1;
            if (cont_img < 0) {
                cont_img = 2;
            }
        } else if (cont_img % 2 === 0) {
            changebtn("frontal");

            cont_img += 1;
        }
    });
    $(".btn-arrows-garments-right").click(function () {
        if (cont_img % 2 === 1) {
            changebtn("trasera");
            cont_img -= 1;
            if (cont_img === 0) {
                cont_img = 2;
            }
        } else if (cont_img % 2 === 0) {
            changebtn("frontal");

            cont_img += 1;
        }
    });


});

function changgerments() {
    $.ajax({
        url: "/api/garment/" + idgerments,
        type: "get",
        success: function (response) {
            botones(response)
            instructions(response)
            changgermentsrecommends(response.categoryId)
            botones(response)
            extra(response)
        },
        error: function (xhr, status, error) {
            // Manejo de error
        }
    });
}

function botones(response) {
    response.imggarments.forEach((item) => {
        if (item.Name === "frontal") {
            const botones = item.btndetails.map((obj) => ({
                texto: obj.Name,
                x: obj.CoordinatesX,
                y: obj.CoordinatesY,
                id: 'btn' + obj.Id,
                class: "Bubble",
                dataindex: obj.Id,
            }));

            const nuevoObjeto = {
                urlImagen: `/img/garments/${item.img_route}`,
                botones: botones,
                colorBoton: '#0077FF',
                zoom: true,
                name: "frontal",
            };

            btn.push(nuevoObjeto);
        } else if (item.Name === "trasera") {
            const botones = item.btndetails.map((obj) => ({
                texto: obj.Name,
                x: obj.CoordinatesX,
                y: obj.CoordinatesY,
                id: 'btn' + obj.Id,
                class: "Bubble",
                dataindex: obj.Id,
            }));

            const nuevoObjeto = {
                urlImagen: `/img/garments/${item.img_route}`,
                botones: botones,
                colorBoton: '#0077FF',
                zoom: true,
                name: "trasera",
            };

            btn.push(nuevoObjeto);
        }
    });

    changebtn("frontal");
}

function changebtn(action) {
    btn.forEach((item) => {
        if (action === item.name) {
            const contenedorImagenes = $('#container_img_garments');
            contenedorImagenes.html(crearContenedorImagen(item));
            zoom()
        }

    })

    btn.forEach((item) => {
        var ruta = item.botones
        ruta.forEach((botonConfig) => {
            $("#" + botonConfig.id).html(`<img src="/img/btn/${botonConfig.texto}" alt="" >`)
        })
    })
}

function crearContenedorImagen(config) {
    const contenedor = $('<div>').css('position', 'relative');

    const imagen = $('<img>').attr({
        src: config.urlImagen
    }).addClass('imgprenda');

    contenedor.append(imagen);

    const botones = [];

    config.botones.forEach((botonConfig) => {
        const boton = $('<button>').css({
            position: 'absolute',
            top: `${botonConfig.y}%`,
            left: `${botonConfig.x}%`,
            transform: `translate(-${botonConfig.y}%, -${botonConfig.x}%)`,
        })
            .attr({
                tabindex: '-1',
                'aria-hidden': 'true',
                class: botonConfig.class,
                id: botonConfig.id,
                "data-index": botonConfig.dataindex
            });

        contenedor.append(boton);
        botones.push(boton);

    });
    const imagens = $("<img>")
        .attr({
            src: config.urlImagen,
            "data-zoom": `${config.urlImagen}`,
        })
        .addClass("zoom-garment");
    contenedor.append(imagens);
    return contenedor;
}

function zoom() {
    new Drift(document.querySelector(".zoom-garment"), {
        paneContainer: document.querySelector(".prueba"),
        inlinePane: 375,
        inlineOffsetY: -85,
        containInline: true,
        hoverBoundingBox: true,
        hoverDelay: 0,
    })
}

function instructions(response) {
    var ruta = response.armedInfos
    var imp = ""
    ruta.forEach((item) => {
        imp += `<li class="punts-instructions-garment">${item.Description}</li>`
    })
    $("#instructions-garments-text").html(imp)

    if (idrol == 1) {
        imp = ""
        ruta = response.technicalinfos
        ruta.forEach((item) => {
            imp += `<li class="punts-instructions-garment">${item.Description}</li>`
        })
        $("#instructions_garment").append(`<div class="instructions-garment-content" >
                <h1>Armado de la prenda</h1>
                <p>
                <ul id="instructions-garments-text">
                ${imp}
                </ul>
                </p>
            </div>`)
    }
    var fontElement = $('.punts-instructions-garment');
    $('.zoom-in').click(function () {
        var currentFontSize = parseInt(fontElement.css('font-size'));
        fontElement.css('font-size', currentFontSize + 1);

    });

    $('.zoom-out').click(function () {
        var currentFontSize = parseInt(fontElement.css('font-size'));
        fontElement.css('font-size', currentFontSize - 1);

    });


}

function changgermentsrecommends(idcategory) {
    $.ajax({
        url: "/api/category/" + idcategory,
        type: "get",
        success: function (response) {
            printrecommends(response)
        },
        error: function (xhr, status, error) {
        }
    });
}

function printrecommends(response) {
    $("#suggestions_garment_cards").html("")
    let numeros = []
    let numerosAleatorios = [];
    let ruta = response.garments
    let imprimir = ""
    if (response.garments.length <= 5) {
        ruta.forEach((item) => {
            var imggarmest = item.imggarments
            if (item.Id == item.Id) {
                imggarmest.forEach((items) => {
                    if (items.Name === "frontal") {
                        imprimir += `<div class="card-container" data-index="${item.Id}">
                <div class="card-img">
                    <div class="card-label-container">
                        <p class="card-label">${response.Name}</p>
                    </div>
                    <img src="/img/garments/${items.img_route}" alt="Blusa">
                </div>

                <div class="card-info">
                    <h3>${item.Name}</h3>
                    <p>Ref: ${item.Reference}</p>
                </div>
            </div>`
                    }
                })
            }
        })
    } else {
        ruta.forEach((item) => {
            numeros.push(item.Id);
            while (numeros.length > 0) {
                for (var i = 0; i <= 5; i++) {
                    var indiceAleatorio = Math.floor(Math.random() * numeros.length);
                    var numeroAleatorio = numeros[indiceAleatorio];
                    numerosAleatorios.push(numeroAleatorio);
                    numeros.splice(indiceAleatorio, 1);
                }
            }
            ruta.forEach((item) => {
                var imggarmest = item.imggarments
                if (idgerments != item.Id) {
                    if (numerosAleatorios.includes(item.Id)) {
                        imggarmest.forEach((items) => {

                            if (items.Name === "frontal") {
                                imprimir += `<div class="card-container" data-index="${item.Id}">
                <div class="card-img">
                    <div class="card-label-container">
                        <p class="card-label">${garment.Name}</p>
                    </div>
                    <img src="/img/garments/${items.img_route}" alt="Blusa">
                </div>

                <div class="card-info">
                    <h3>${items.Name}</h3>
                    <p>Ref: ${items.Reference}</p>
                </div>
            </div>`
                            }
                        })
                    }
                }
            })
        })
    }
    $("#suggestions_garment_cards").html(imprimir)


}

function extra(response) {
    $("#title_reference").html(response.Reference)
    $("#title_general").html(response.Name)
    let ruta = response.molds
    ruta.forEach((item) => {
        $("#moldes").html(`<img src="/img/molds/${item.img_route}" alt="">`)
    })

}

function modalviews(id) {
    $.ajax({
        url: "/api/btndetails/" + id,
        type: "get",
        success: function (response) {
            printmodal(response)
        },
        error: function (xhr, status, error) {
        }
    });
}

function printmodal(response) {
    let Name = obtenerObjetoConNombreMasRepetido(response.allowArmedInfos)
    var imp = ""
    $("#modal_title").html(Name)
    let ruta = response.allowArmedInfos
    ruta.forEach((item) => {
        imp += ` <label for=""><i class="fa-solid fa-circle"></i> ${item.armedInfo.Description}</label>`
    })
    $("#container_content_modal_indications").html(imp);
    $("#container_content_modal_img").html(`<img src="/img/details/${response.imgdetails[0].img_route}" data-zoom="/img/details/${response.imgdetails[0].img_route}" class="zoom-modal" alt="">`)
    zoommodal()
}


function obtenerObjetoConNombreMasRepetido(array) {
    var contador = {};
    for (var i = 0; i < array.length; i++) {
        var objeto = array[i];
        var nombre = objeto.armedInfo.Name;
        if (contador[nombre]) {
            contador[nombre]++;
        } else {
            contador[nombre] = 1;
        }
    }

    var nombreMasRepetido;
    var repeticiones = 0;
    for (var nombre in contador) {
        if (contador.hasOwnProperty(nombre)) {
            if (contador[nombre] > repeticiones) {
                repeticiones = contador[nombre];
                nombreMasRepetido = nombre;
            }
        }
    }

    var objetoMasRepetido = array.find(function (objeto) {
        return objeto.armedInfo.Name === nombreMasRepetido;
    });

    return objetoMasRepetido.armedInfo.Name;
}



function zoommodal() {
    new Drift(document.querySelector(".zoom-modal"), {
        paneContainer: document.querySelector("#container_content_modal_indications"),
        inlinePane: 375,
        inlineOffsetY: -85,
        containInline: true,
        hoverBoundingBox: true,
        hoverDelay: 0,
    })
}

function searcvideo(id) {
    $.ajax({
        url: "/api/garment/armaditutorials/" + id,
        type: "get",
        success: function (response) {
            printvideo(response)
        },
        error: function (xhr, status, error) {

        }
    });
}

function printvideo(response) {
    let imp = ""
    response.forEach((item) => {
        imp += `
<h2>${item.Name}</h2>
<video id="videoPlayer" controls>
    <source src="/video/${item.video_route}" type="video/mp4">
    Tu navegador no admite la reproducción de video.
  </video>
`
    })
    $("#video_tutorial_contenido").html(`<div class="videos-tutoriasl"><h1>Videos tutoriales</h1>${imp}</div>`)
}
