// Javascript - Phaser


//Creamos las variables a utilizar en el codigo:

    //Tamaño del canvas que vamos que crear
    var ancho = 1276; //El ancho
    var alto = 1284; //La altura

    // Variables para escalar las imagenes, por ejemplo las estrellas en las cuales se ubican los lugares.
    var escala_mapa = 0.5;
    var escala_lugar=0.1;

    // Los elementos propios que usaremos en el "juego" como:
    var background; //El fondo
    var text = ""; //Texto

    // Los elementos de los lugares en la imagen de fondo
    var lugares = []; //Los lugares
    //Las posiciones de los lugares
    var lugar_x = [1275, 1075, 1420, 1680, 830, 1075, 1440, 1400]; 
    var lugar_y = [1250, 1650, 1600, 1280, 1250, 900, 940, 640];
    //El nombre de los lugares
    var lugar_name = ['Corazón de Elíseo', 'Casa de las Diosas', 'Centro Politico', 'Mirador de la Atlantida', 'El salto de los Dioses', 'Vista desde la casa de las ideas divinas', 'Estatua de la justicia', 'La cabeza del Toro'];
    // Las imagenes de los lugares
    var lugar_img = ["imagenes/foto1.jpeg", "imagenes/foto8.jpg", "imagenes/foto7.jpg", "imagenes/foto6.jpg", "imagenes/foto2.jpeg", "imagenes/foto4.jpg", "imagenes/foto10.jpeg", "imagenes/foto3.jpeg"];

    var info; // Almacena las imagenes de los lugares.
    var boton_cerrar; // Guarda el boton de cerrar las imagenes.


    // Aquí se crea el mapa interactivo con Phaser
    var Mapa_Interactivo = new Phaser.Game(ancho, alto, Phaser.CANVAS, "mapa"); //En el cargamos los parametros de las variables ya definidas por el tamaño del canvas y esto se creara en el div que esta en el archivo mapa.html que tienes id="mapa"


// Variable que almacenara el estado del mapa interactivo.
    var mapaAct = 
    {
      preload: function(){ //Funcion que carga los elemento que se utilizaran en el "juego"
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // Modificamos la escala para mostrar todo
        Mapa_Interactivo.load.image("background", "imagenes/MapaACO.jpg"); // El fondo de pantalla que sera pues el mapa
        // Carga la imagen del icono de las ubicaciones
        Mapa_Interactivo.load.image("lugar", "imagenes/BotonLugar.png"); // El icono que destacara en las ubicaciones del mapa con las cuales podremos interactuar
        for (var i = 0; i < lugar_name.length; i++) { // Cargamos las imaganes de los lugares con un ciclo for pues estan en todas en un array
          Mapa_Interactivo.load.image(lugar_name[i],lugar_img[i]);}
        // Carga el boton del lugar
        Mapa_Interactivo.load.image("btn lugar", "imagenes/Logo1.png"); // Cargamos la imagen del boton de los lugares
        // Carga la imagen para cerrar las imagenes
        Mapa_Interactivo.load.image("boton_cerrar","imagenes/hide.png"); // Cargamos la imagen del boton para cerrar las imagenes
      },
    
      create: function(){ //Funcion donde creamos los elementos del "juego"
        background = Mapa_Interactivo.add.tileSprite(0,0,ancho,alto,"background");
        for (var i = 0; i < lugar_x.length; i++) 
        { // Usamos otro ciclo for para crear los lugares y los "widgets" que utilizaremos
            lugar = Mapa_Interactivo.add.sprite(lugar_x[i]*escala_mapa,lugar_y[i]*escala_mapa,"lugar");
            lugar.scale.setTo(escala_lugar); // Escalamos la imagen del mapa
            lugar.anchor.setTo(0.5);
          
            // Interactividad
            lugar.inputEnabled = true;
            lugar.input.useHandCursor = true;
            lugar.custom_texto = lugar_name[i];
            
            // Creamos el texto que que aparece cuando el cursor esta encima del boton del lugar
            text = Mapa_Interactivo.add.text(Math.floor(-lugar.width/1.1),Math.floor(-lugar.height*1.25),"  "+lugar_name[i]+"  ",{font: "164px Ancizar Sans-Regular", backgroundColor: "#b1bf48", align: "center"});
            lugar.addChild(text);
            // Ocultamos el texto
            lugar.children[0].visible = false; // Cuando el cursor no este encima no uestra el texto
            
            // Funcion clicked que mostrará la foto del lugar
            lugar.events.onInputDown.add(clickedLugar,this);
            info = Mapa_Interactivo.add.sprite(Mapa_Interactivo.world.centerX-(lugar_x[i]*escala_mapa), Mapa_Interactivo.world.centerY-(lugar_y[i]*escala_mapa), lugar_name[i]);
            
            //Ajustamos la opciones del boton cerrar imagen
            if (info.width > 1500) 
            {
                boton_cerrar = Mapa_Interactivo.add.sprite(info.width/2.0-270,-info.height/2.0+80,"close");
                boton_cerrar.scale.setTo(0.80);
                info.scale.setTo(1.5);
                
            } 
            else if (info.width > 1300) 
            {
                boton_cerrar = Mapa_Interactivo.add.sprite(info.width/2.0-90,-info.height/2.0+15,"close");
                boton_cerrar.scale.setTo(0.75);
                info.scale.setTo(4.6);
            } 
            else 
            {
                boton_cerrar = Mapa_Interactivo.add.sprite(info.width/2.0-90,-info.height/2.0+10,"close");
                boton_cerrar.scale.setTo(0.35);
                info.scale.setTo(2.6);
            }
            
            boton_cerrar.inputEnabled = true;
            // Se cambia el cursor para mostrar interactividad
            boton_cerrar.input.useHandCursor = true;
            boton_cerrar.events.onInputDown.add(closeLugarImage,this);
            info.addChild(boton_cerrar);
            info.anchor.setTo(0.5);
            
            // Activamos la interactividad
            info.inputEnabled = true;
            info.visible = false;
            // Se agrega la foto del lugar al icono del lugar del mapa
            lugar.addChild(info);
            lugares.push(lugar);
        }
      },

    
     update: function(){ // Funcino que actualiza el juego con cierta frecuencia
        for (var i = 0; i < lugares.length; i++) {
            if (lugares[i].input.pointerOver()) {
                lugares[i].children[0].visible = true;
                Mapa_Interactivo.world.bringToTop(lugares[i].children[0]);
            } else {
                lugares[i].children[0].visible = false;
            }
        }
     },
    }


// Creamos la funcion para mostrar las fotos de los lugares
function clickedLugar(lugar) {
  lugar.children[1].visible = true;
  Mapa_Interactivo.world.bringToTop(lugar);
}


// Creamos la funcion para cerrar la imagen la imagen
function closeLugarImage(close) {
  close.parent.visible = false;
}

Mapa_Interactivo.state.add("active", mapaAct);
Mapa_Interactivo.state.start("active");