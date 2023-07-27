import puppeteer from 'puppeteer';
import {Garment} from "../models/GarmentModel.js";
import {Models} from "../models/MoldsModel.js";
import {ArmadiTutorials} from "../models/ArmadiTutorialsModel.js";
import {TechnicalInfo} from "../models/TechnicalInfoModel.js";
import {ArmedInfo} from "../models/ArmedInfoModels.js";
import {ImgGarment} from "../models/ImgGarmentModel.js";
var contentHTML
// Controlador para generar el PDF
export const generarPDF= async (req, res)=>{
    var id=req.params.id
    garmentsInfo(id)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Configurar la orientación de la página
    await page.emulateMediaType('screen');
    await page.setViewport({ width: 1100, height: 800, deviceScaleFactor: 1, isLandscape: true });



    await page.setContent(contentHTML);

    const pdfBuffer = await page.pdf({ format: 'A3', landscape: true });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=archivo.pdf');
    res.send(pdfBuffer);

    console.log('PDF generado correctamente.');

    await browser.close();
}

async function garmentsInfo(id) {
    try {
        const respuesta = await Garment.findOne({
            include: [
                {
                    model: Models,
                },
                {
                    model: ArmadiTutorials,
                },
                {
                    model: TechnicalInfo,
                },
                {
                    model: ArmedInfo,
                },
                {
                    model: ImgGarment,

                },
            ],
            where: {
                Id: id, // Corregido: usar el parámetro "id" en lugar de "req.params.id"
            },
        });
       formatHmtl(respuesta)
    } catch (error) {
       return error;
    }
}

function formatHmtl(info) {
    var imggarments=""
    info.imggarments.forEach((element) => {
        imggarments+=` <img src='http://localhost:5000/img/garments/${element.img_route}' alt="" width="100%" style="border-radius: 10px;"/>`
    });
 var avisos=""
    info.armedInfos.forEach((element) => {
        avisos+=` <li>${element.Description}</li> <br>`
    });
    contentHTML = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://kit.fontawesome.com/c89d5783e0.js" crossorigin="anonymous"></script>
    <title>Document</title>
  </head>
  <body style="border: 1px solid; border-radius: 16px;">
    <nav>
      <div style="display: flex; align-items: center; justify-content: center">
        <div
          style="
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <img src="http://localhost:5000/img/logo.svg" alt="" style="width: 40px" />
        </div>
        <div
          style="
            background: #b9b2b2;
            margin-right: 20%;
            width: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-top: 1px solid;
          "
        >
          <h1>FICHA TECNICA</h1>
        </div>
      </div>
    </nav>
    <div
      style="
        display: flex;
        flex-direction: row;
        border-top: 1px solid;
        border-bottom: 1px solid;
      "
    >
      <div
        style="
          display: flex;
          justify-content: center;
          flex-direction: column;
          width: 30%;
        "
      >
        <div style="border-bottom: 1px solid; border-right: 1px solid; display: flex; align-items: center;  min-height: 5px; padding-left: 4px;">
          <span>REFERENCIAS: ${info.Reference}</span>
        </div>
        <div style="border-right: 1px solid display: flex; align-items: center; min-height: 5px; padding-left: 4px;">
          <span>TALLA UNICA</span>
        </div>
      </div>
      <div style="width: 70%; display: flex; align-items: center;  border-left: 1px solid; padding-left: 4px;">
        <span> DESCRIPCIÓN: ${info.Name}</span>
      </div>
    </div>
    <div style="margin: 10px">
      <div style="display: flex; flex-direction: row">
        <div
          style="
            display: flex;
            flex-direction: column;
            width: 30%;
            border: 1px solid;
            border-radius: 10px;
            margin-right: 4px;
          "
        >
          <div style="display: flex; justify-content: center">
            <h3>Avisos</h3>
          </div>
          <div>
         <ul>
          ${avisos}
         </ul>
          </div>
        </div>
        <div
          style="
            width: 60%;
            border: 1px solid;
            border-radius: 10px;
            margin-right: 4px;
          "
        >
          <div style="display: flex; justify-content: center; border-left: 1px solid">
            <h3>MOLDERIA</h3>
          </div>
         <div style="border-left: 1px solid; display: flex; justify-content: center">
         <img src="http://localhost:5000/img/molds/${info.molds[0].img_route}" alt="" style="width: 90%" />
         </div>
        </div>
        <div
          style="
            display: flex;
            flex-direction: column;
            width: 30%;
            border: 1px solid;
            border-radius: 10px;
            margin-right: 4px;
          "
        >
          <div style="display: flex; justify-content: center;">
            <h3>REFERENCIAS VISUAL</h3>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: center">
          ${imggarments}    
          </div>   
        </div>
      </div>
    </div>
  </body>
</html>

  `;

}