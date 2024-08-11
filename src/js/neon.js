window.addEventListener('DOMContentLoaded', function(){

    
    creaNeon();

});



function creaNeon(){

    let texto = document.querySelector('#text');
    let fuentes = document.querySelector('#fuentes');
    let color = 'rosado';
    let electricidad = 'encendido';

    document.querySelectorAll('.circulo').forEach(element =>{
        element.addEventListener('click', function(e){
            color = e.target.id;
            cambiaColor(color);
        })
    })

    let widget = document.querySelector('.widget-content');
    
    document.querySelector('.widget').addEventListener('click', function(){
        
        if(electricidad === 'encendido'){

            widget.classList.replace('encendido', 'apagado');
            electricidad = 'apagado';
            cambiaColor('');
        }else{
            widget.classList.replace('apagado', 'encendido');
            electricidad = 'encendido';
            cambiaColor(color)
        }
    })

    document.querySelector('#boton-form').addEventListener('click', function(e){
        e.preventDefault();
        let text = document.querySelector('.neon-crea h3').textContent;
        let font = fuentes.value;
        window.open(`https://api.whatsapp.com/send?phone=584120418065&text=Hola Repoxi! 👋 Quiero cotizar un neón. 🖊 Estoy interesado en, texto: ${text}, fuente: ${font}, color: ${color}`);
    });

    texto.addEventListener('input', function(e){
        e.preventDefault();

        let text = e.target.value;
        let font = fuentes.value;
        crearNeon(font, text, color);
    });

    fuentes.addEventListener('input', function(e){
        e.preventDefault();
        let text = document.querySelector('.neon-crea h3').textContent;
        let font = e.target.value;
        crearNeon(font , text, color);

    });


} 


function crearNeon(clase, text, color){
    let neon = document.querySelector('.neon-crea');
    let texto = sanitizarTexto(text);
    neon.innerHTML = `<h3 class="${clase}" data-color=${color}>${texto}</h3>
    <button class="widget">
                        <div class="widget-content encendido" title="boton encendido y apagado"></div>
                    </button>`
}

function cambiaColor(color){

    document.querySelector('.neon-crea h3').setAttribute('data-color', color);

}

// sanitizar 
function sanitizarTexto(texto) {
    let text = texto
    text = text.replace(/<[^>]*>/g, '');
    text = text.replace(/<script[^>]*>/g, '');
    text = text.replace(/<\/script>/g, '');

    text = text.replace(/"/g, '&quot;');
    text = text.replace(/'/g, '&apos;');
    text = text.replace(/</g, '&lt;');
    text = text.replace(/>/g, '&gt;');
    text = text.replace(/&/g, '&amp;');
    return text;
  }