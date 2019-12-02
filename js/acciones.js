// JavaScript Document

$(document).ready(function(e) {
	var arreglocomentarios=[];
	var comentarios;
	var estrellas;
	
	var estrella = '<span class="fa fa-star ${votada}"></span>';
	var usuario = [];
	
	$('#btn-enviar').on('click', function(){
		$('#modal').show();
		$.when($.post("http://192.168.4.70/fitpath/buscarusuari.php",{user: $('#usuario').val(), pass: $('#contraseña').val()})).then(
			function exito(datos){
			usuario=JSON.parse(datos);
			if(usuario.length>0)
				{
					//si se econtro el usuario
					alert (usuario[0].idAdministrador);
					$('#modal').hide();
				}
			else
				{
					$('#modal').hide();
					$('#contraseña').val("");
					$('#contraseña').focus();
					alert ("no se encontro el usuario");					
					//no se encontro el usuario
				}
		}, function error() {
			alert ("error, no se puede conectar con el servidor");
			$('#modal').hide();
		});
	});

	
	
	
function buscarcomentarios(cuales, orden)
	{
		cuales = $("input:radio[name ='cuales']:checked").val();
		orden = $("input:radio[name ='orden']:checked").val();
		$.when($.post("http://192.168.1.65/fitpath/buscarcomentarios.php",{cuales: 'todos', orden: 'actuales'})).then(function exito(datos) {
		//append a contenedor-comentarios
		alert (datos);
	},
		function error() {
			alert ("No hay respuesta del servidor");
		}
	);
	}

	$("#comentarios").on( "pagebeforeshow", function( event, ui ) {	
	$.when($.get("http://192.168.1.65/fitpath/buscarcomentarios.php",{cuales: 'todos', orden: 'actuales'})).then(function exito(datos) {
		//append a contenedor-comentarios
	 
		arreglocomentarios = JSON.parse(datos);
		
		var nombre = arreglocomentarios[0].idComentario;
		var texto = "";
		var idcomentario = "";
		var estrellas = "";
var comentario = `<div class="comentario"><div class="datos-comentario"><div class="contenedor-nombre">${nombre}</div><div class="contenedor-estrellas">${estrellas}</div><div class="contenedor-texto">${texto}</div></div><div class="activar-comentario"><select id="flip" data-role="slider" data-mini="true" name="${idcomentario}"><option value="0"></option><option value="1"></option></select></div></div>`;		
		console.log (`<div class="comentario"><div class="datos-comentario"><div class="contenedor-nombre">${nombre}</div><div class="contenedor-estrellas">${estrellas}</div><div class="contenedor-texto">${texto}</div></div><div class="activar-comentario"><select id="flip" data-role="slider" data-mini="true" name="${idcomentario}"><option value="0"></option><option value="1"></option></select></div></div>`);
		alert (comentario);
		
	},
		function error() {
			alert ("No hay respuesta del servidor");
		}
	);
} );
	
	
}); //deviceready

