// Objeto de configuración para una imagen con Magic Zoom Plus
const configImagen1 = {
    urlImagen: '/img/camisa-fs-formal-azul-claro-platxdezbufe41gs7kufx6eonyianr5m6bgdc5zwlo.png',
    botones: [
        { texto: '<img src="/img/icons8-button-32.png" alt="Descripción de la imagen">', x: 48.5, y: 28  ,id:'btn1'},
        { texto: '', x: 10, y: 15,id:'btn2' },
        { texto: '', x: 20, y: 20,id:'btn3' }
    ],
    colorBoton: '#0077FF',
    zoom: true
};

// Función para crear un contenedor con una imagen y varios botones con Magic Zoom Plus
function crearContenedorImagen(config) {
    const contenedor = $('<div>').css('position', 'relative');

    const imagen = $('<img>').attr({
        src: config.urlImagen,
        'data-magiczoomplus': `zoomPosition: '${config.zoomPosition || 'inner'}', expand: '${config.expand || 'true'}'`
    }).addClass('imgprenda');;

    contenedor.append(imagen);

    const botones = [];

    config.botones.forEach((botonConfig) => {
        const boton = $('<button>').css({
            position: 'absolute',
            top: `${botonConfig.y}%`,
            left: `${botonConfig.x}%`,
            transform: `translate(-${botonConfig.y}%, -${botonConfig.x}%)`,
            background: config.colorBoton,
            padding: '10px 20px',
            textDecoration: 'none',
            borderRadius: '5px',
            fontSize: '1em',
            fontWeight: 'bold',
            transition: 'background-color 0.5s ease',
            borderRadius:'50%'
        })
            .attr({
                tabindex: '-1',
                'aria-labelledby': 'exampleModalLabel',
                'aria-hidden': 'true',
                class: 'btn btn-primary',
                id:botonConfig.id
            });

        contenedor.append(boton);
        botones.push(boton);
    });

    contenedor.hover(function () {
        botones.forEach((boton) => {
            boton.css('background-color', '#0055DD');
        });
    }, function () {
        botones.forEach((boton) => {
            boton.css('background-color', config.colorBoton);
        });
    });

    return contenedor;
}

// Crear el contenedor de imagen con varios botones y Magic Zoom Plus
const contenedorImagenes = $('#container_img_garments');
contenedorImagenes.append(crearContenedorImagen(configImagen1));



// Inicializar Magic Zoom Plus
//MagicZoomPlus.start();

$(document).ready(function() {
    configImagen1.botones.forEach((botonConfig) => {
        $("#"+botonConfig.id).html(botonConfig.texto)
        $("#"+botonConfig.id).click(function () {
            $("#exampleModal").modal("show");
        })
    })



// Obtener el elemento en el que se quiere cambiar el tamaño de fuente (en este caso, body)
    var fontElement = $('label');

// Función para aumentar la fuente
    $('.zoom-in').click(function() {
        var currentFontSize = parseInt(fontElement.css('font-size'));
        fontElement.css('font-size', currentFontSize + 1);
        console.log("hola");
    });

// Función para disminuir la fuente
    $('.zoom-out').click(function() {
        var currentFontSize = parseInt(fontElement.css('font-size'));
        fontElement.css('font-size', currentFontSize - 1);
        console.log("no estoy");
    });


});


