var idgerments
var btn = []
var cont_img = 1;

//TEMPORAL solo para mostrar botones en el panel
const lista = ['Cierre interior', 'Cierre exterior', 'Bolsillo interior', 'Bolsillo interior', 'Bota','Cierre interior', 'Cierre exterior', 'Bolsillo interior', 'Bolsillo interior', 'Bota',];

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
        detailsModal()
        /* $("#detailsgarments").modal("show"); */
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

    if (!hasModalBeenShown()) {
        onBoarding();
    }

    show_button(lista);

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
                urlImagen: `${item.img_route}`,
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
                urlImagen: `${item.img_route}`,
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
            //$("#" + botonConfig.id).html(`<img src="/img/btn/${botonConfig.texto}" alt="" >`)
            $("#" + botonConfig.id).html(`<i class="fa-solid fa-magnifying-glass"></i>`)
        })
    })
}

function crearContenedorImagen(config) {
    const contenedor = $('<div>').css('position', 'relative');

    const imagen = $('<img>').attr({
        src: config.urlImagen,
        loading: "lazy"
    }).addClass('imgprenda');

    contenedor.append(imagen);

    const botones = [];

    config.botones.forEach((botonConfig) => {
        const boton = $('<button>').css({
            position: 'absolute',
            top: `${botonConfig.y}%`,
            left: `${botonConfig.x}%`,
            transform: `translate(-${botonConfig.y}%, -${botonConfig.x}%) rotate(-45deg)`,
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
            loading: "lazy",
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
    var ruta = response.technicalinfos
    var imp = ""
    ruta.forEach((item) => {
        imp += `<li class="punts-instructions-garment">${item.Description}</li>`
    })
    $("#instructions-garments-text").html(imp)

    imp = ""
    ruta = response.operatingprocesses
    ruta.forEach((item) => {
        imp += `<li class="punts-instructions-garment">${item.Description}</li>`
    })
    $("#proceso_operativo").append(`<div class="instructions-garment-content" >
                <h1>Proceso operativo</h1>
                <p>
                <ul id="instructions-garments-text">
                ${imp}
                </ul>
                </p>
            </div>`)

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
                    <img src="${items.img_route}" alt="Blusa" loading="lazy">
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
                    <img src="${items.img_route}" alt="Blusa" loading="lazy">
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
        $("#moldes").html(`<img src="${item.img_route}" alt="" loading="lazy"> `)
        $("#img-trazo").html(`<img src="${item.img_route}" alt="" loading="lazy"> `)
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
    $("#container_content_modal_img").html(`<img src="${response.imgdetails[0].img_route}" data-zoom="${response.imgdetails[0].img_route}" class="zoom-modal" alt="" loading="lazy"> `)
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

function onBoarding() {
    let button_next = $('#btn_next');
    let button_exit = $('#button_exit');
    let blur = $('#blur');
    let popups = $('#popup, #popup_2, #popup_3, #detailsgarments');
    let popup = $('#popup');
    let popup_2 = $('#popup_2');
    let popup_3 = $('#popup_3')
    let body = $('body');

    setTimeout(() => {
        $(blur).toggleClass('active');
        $(popup).toggleClass('active');
        if ($(blur).hasClass('active')) {
            $(body).css('overflow', 'auto');
        } else {
            $(body).css('overflow', 'auto');
        }
    }, 1000);

    $(button_next).click(function (e) {
        e.preventDefault();
        $(popup).toggleClass('active');
        $(blur).toggleClass('active');
        setTimeout(() => {
            $(popup_2).toggleClass('active');
            $(blur).toggleClass('active');
        }, 500);
    });

    $(button_next_2).click(function (e) {
        e.preventDefault();
        $(popup_2).toggleClass('active');
        $(blur).toggleClass('active');
        setTimeout(() => {
            $(popup_3).toggleClass('active');
            $(blur).toggleClass('active');
        }, 500);
    });

    $(button_exit).click(function (e) {
        e.preventDefault();
        $(blur).toggleClass('active');
        $(popups).removeClass('active');
        $(body).css('overflow', 'auto');
        setModalAsShown();
    });

    $(body).click(function (e) {
        if ($(blur).hasClass('active')) {
            $(blur).toggleClass('active');
            $(popups).removeClass('active');
            $(body).css('overflow', 'auto');
        };
    });

    $(popups).click(function (e) {
        if ($(blur).hasClass('active') && ($(popups).hasClass('active'))) {
            e.stopPropagation();
        };
    });

}

function detailsModal() {
    let blur = $('#blur');
    let body = $('body');
    let popup = $('#detailsgarments');
    let btn_exit = $('#button_exit_2');

    $(blur).toggleClass('active');
    $(popup).toggleClass('active');

    $(body).click(function (e) {
        if ($(blur).hasClass('active')) {
            $(blur).removeClass('active');
            $(popup).removeClass('active');
            $(body).css('overflow', 'auto');
        };
    });

    $(popup).click(function (e) {
        if ($(blur).hasClass('active') && ($(popup).hasClass('active'))) {
            e.stopPropagation();
        };
    });

    $(btn_exit).click(function (e) {
        $(blur).removeClass('active');
        $(popup).removeClass('active');
        $(body).css('overflow', 'auto');
        $("#modal_title").html(" ");
        $("#container_content_modal_img").html(" ");
        $("#container_content_modal_indications").html(" ");
    });
}

function setModalAsShown() {
    localStorage.setItem('modalShown', 'true');

}

function setModalAsNoShown() {
    localStorage.setItem('modalShown', 'false');

}

function hasModalBeenShown() {
    return localStorage.getItem('modalShown') === 'true';
}


function show_button(lista) {
    let buttons = '';
    let button_id = 0;
    
    lista.forEach(category => {
        button_id += 1;
        let button = document.createElement('a');
        let span = document.createElement('span');
        
        button.setAttribute('id', `button_${button_id}`);
        button.setAttribute('class', 'button');
        button.setAttribute('href', `#${category.replace(/ /g, '_').toLowerCase()}`);

        span.textContent= `${category}`;
        button.appendChild(span);

        button_panel.appendChild(button);

        /* buttons += `<a id='button_${button_id}' class='button' href='   '><span>${category}</span></a>`;
        button_panel.insertAdjacentHTML('afterend', buttons); */
    });
};
