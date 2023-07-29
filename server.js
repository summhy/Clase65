import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import hbs from "hbs";

//Crear variable __dirname con el directorio local
import {dirname} from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const correos = [{nombre: "Nibaldo", mail:"nibaldoquezada@hotmail.com"},
              {nombre: "Boris", mail:"borisandres.guinez@gmail.com"},
              {nombre: "David", mail:"davidtorresim@gmail.com"},
              {nombre: "Paula", mail:"macaya.paula@gmail.com"}
            ];

//crear constante par aaplicación express
const app = express();


//configuración del motor de plantilla a utilizar
app.set("view engine", "hbs");
//configuración rutas de partials
hbs.registerPartials(__dirname+"/views/partials");
//configuración ruta archivos estaticos
app.use(express.static("public"));
//configuración json
app.use(express.json());
//configurar bodyParser
app.use(bodyParser.urlencoded({extender:false}));

//constante para correo

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'ad-jscript-0002@hotmail.com',
      pass: 'bootcamp..'
    }
  });

//función envío del correo
async function main(para, asunto, cuerpo) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "ad-jscript-0002@hotmail.com", // sender address
      to: para, // list of receivers
      subject: asunto, // Subject line
      //text: "Hello world?", // plain text body
      html: cuerpo, // html body
    });
}


//ruta raíz get
app.get("/", (req, res)=>{
    res.render("formulario", {personas:correos});
});

//ruta raíz post
app.post("/", async (req, res)=>{
    const body = req.body;
    try{
        await main(body.txtPara, body.txtAsunto, body.txtMensaje)
    }catch{
        res.render("formulario", {error:"Error en el envío de Mail"});
    }
    res.render("formulario",{mesaje:"Mail enviado correctamente"});
   
});

app.get("/correos", (req, res)=>{
  console.log("servidor");
  console.log(correos);
  res.json(correos);
});

//servicio levantado
app.listen(3000, ()=>{console.log("Servidor arriba")});