let jugando=false;
let puntos;
let vidas;
const frutas=["apple","banana","cherry","grapes","mango","orange","peach","pera","watermelon","pine"];
let movimiento;
let accion;
$(function(){
     $("#inicioreset").click(()=>{
          if (jugando==true) {
               //recargar la pagina
               location.reload();
          } else {
               jugando=true;
               puntos=0;
               //.html es igual al innertext
               $("#puntos").html(puntos);

               //mostrar el cuadro de vidas
               $("#vidas").show();
               vidas=3;

               generarVidas();

               //ocultar gameover

               $("#gameover").hide();
               $("#inicioreset").html("Reiniciar Juego");

               comenzar();
          }

          

     });

     $('#fruta').mouseover(function () {
          puntos++;
          $('#puntos').html(puntos);
          $('#sonido')[0].play();
          clearInterval(accion);
          $('#fruta').hide("explode",100);

          setTimeout(comenzar,500);
     });

     function generarVidas(){
          $("#vidas").empty();
          for (let i = 0; i < vidas; i++) {
               $("#vidas").append('<img src="RecursosJquery/images/heart.png" class="vida">')
               
          }
     }
     
     function comenzar(){
          //generar una fruta
          $('#fruta').show();
          generarFruta();
          //ubica la fruta randomicamente
          $("#fruta").css({'left':Math.round(550*Math.random()),'top':-50});
     
          //desplazar
     
          movimiento=1+Math.round(5*Math.random());
     
          accion=setInterval(() => {
             //mover la fruta
             $('#fruta').css('top',$("#fruta").position().top+movimiento)
             //verificar si la fruta llega al final para quitar una vida
             if ($('#fruta').position().top > $('#contenedorfrutas').height()) {
                  if (vidas>1) {
                       $('#fruta').show();
                       generarFruta();
                       $("#fruta").css({'left':Math.round(550*Math.random()),'top':-50});
                       movimiento=1+Math.round(5*Math.random());
                       vidas--;
                       generarVidas();
                  }else{
                       //terminar juego
                       jugando=false;
                       $('#inicioreset').html("Iniciar Juego");
                       $('#gameover').show();
                       
                       $('#gameover').html('<p>Game Over!! </p><p>Su Puntaje es:'+puntos+'</p>');
                       $vidas.hide();
                       finalizar();
                  }
             }  
          },20);
     }
     
     function generarFruta() {
          //attr modifica los atributos de un elemento
          $('#fruta').attr('src','RecursosJquery/images/' + frutas[Math.round(9*Math.random())] + '.png')
     }
     
     function finalizar() {
          clearInterval(accion);
          $('#fruta').hide();
     }

});