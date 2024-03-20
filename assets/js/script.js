$(document).ready(function () {

  $('#inputForm').submit(function (event) {
    event.preventDefault();
    validarSubmit();// Llama a la función para validar el formulario
    buscarSuperhero();// Llama a la función para conectar con la API
    $('#inputForm').trigger('reset');//Se resetea el formulario luego de cada envío
    CardCanvas();//Llama a la función para aplicar animación
  })
  //Función que valida el formulario
  function validarSubmit() {
    let idNumber = $('#buscarHero').val();
    if (!/^[1-9]\d*/.test(idNumber)) {
      alert('Por favor ingrese un NÚMERO mayor que cero.');
      return false;
    }
    return true;
  }
  //Función que conecta con la API
  function buscarSuperhero() {
    let id = $('#buscarHero').val();
    const urlApiId = `https://www.superheroapi.com/api.php/4905856019427443/${id}`;

    $.ajax({
      url: urlApiId,
      type: "GET",
      dataType: "json",
      success: function (info) {
        mostrarInfo(info);// Llama a la función mostrarInfo con la información del superhéroe
      }
    })
  }
  //Función que realiza animación en el body de html
  function CardCanvas() {
    $('html, body').animate({
      scrollTop: $('#CardCanvas').offset().top
    }, 'slow');
  }
  //Función que muestra la información de algunas propiedades obtenidas de la api
  function mostrarInfo(hero) {
    let cardInfo =
      `<h2 style = "text-align:center">SuperHero encontrado</h2>
        <div class="card mb-3">
            <div class="row">
                <div class="col-4">
                  <img src= "${hero.image['url']}" class="img-fluid rounded-start" alt="...">
                </div>
                  <div class="col-8">
                    <div class="card-body">
                      <h5 class="card-title">Nombre: ${hero.name}</h5>
                      <p class="card-text">Conexiones: ${hero.connections['group-affiliation']} </p>
                      <p class="my-0 card-text px-4"><small class="text-body-secondary"><i>Publicado por:</i> ${hero.biography['publisher']}</small></p>
                      <hr class= "my-1">
                      <p class="my-0 card-text px-4"><small class="text-body-secondary"><i>Ocupación:</i> ${hero.work['occupation']}</small></p>
                      <hr class= "my-1">
                      <p class="my-0 card-text px-4"><small class="text-body-secondary"><i>Primera aparición:</i> ${hero.biography['first-appearance']}</small></p>
                      <hr class= "my-1">
                      <p class="my-0 card-text px-4"><small class="text-body-secondary"><i>Altura:</i> ${hero.appearance['height']}</small></p>
                      <hr class= "my-1">
                      <p class="my-0 card-text px-4"><small class="text-body-secondary"><i>Peso:</i> ${hero.appearance['weight']}</small></p>
                      <hr class= "my-1">
                      <p class="my-0 card-text px-4"><small class="text-body-secondary"><i>Alianzas:</i> ${hero.biography['aliases']}</small></p>
                    </div>
                  </div>
            </div>
        </div>`

    $('#cardHero').html(cardInfo);//Inserta la información en la sección de html de Id cardHero

    // Itera sobre las propiedades de powerstats
    $.each(hero.powerstats, function(propiedad, valor){
      if (valor === 'null') {
        $('#Canvas').html(`<h2 class="text-center">No hay estadísticas de poder para este superhéroe.</h2>`);//Si el valor es null imprime h2
        return false;
      }
      else {
        let opciones = {
          animationEnabled: true,
          title: {
            text: `Estadísticas de Poder para ${hero.name}`
          },
          data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            indexLabel: "{label} {y}",
            dataPoints: [
              { label: "intelligence", y: hero.powerstats.intelligence },
              { label: "strength", y: hero.powerstats.strength },
              { label: "speed", y: hero.powerstats.speed },
              { label: "durability", y: hero.powerstats.durability },
              { label: "power", y: hero.powerstats.power },
              { label: "combat", y: hero.powerstats.combat },
            ]
          }]
        }
        $("#Canvas").CanvasJSChart(opciones);//Si el valor no es null imprime gráfico en sección del html de Id Canvas
      }
    });
  }
})



