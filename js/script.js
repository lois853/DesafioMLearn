
$( document ).ready(function() { // executa apatir do momento em que a pagina é carregada
  function Pesquisar(){
    $('[name="Pesquisar"]').off('keyup').on('keyup', () => {
        carregarApi('https://swapi.co/api/people/?search='+$('[name="Pesquisar"]').val())
    })
  }
  Pesquisar()
});
var page = {
  nextPage: null,
  previousPage: null
}

function carregarApi(url) {
    $.ajax({
        url: url, //Define qual será a api usada
        type: 'GET',
        success: function (retorno) {
            var personagens = retorno.results

            $('.personagens h2').html('') //Define qual será a classe do html onde serão inseridos os valores

            personagens.forEach(function (element) { // Cria um modal pra cada elemento da api
                $('.personagens').append(`<h2 url="${element.url}" data-toggle="modal" title="a" data-target="#modal">${element.name}</h2>`)
            })
            carregarInformacoes()

            page.nextPage = retorno.next
            page.previousPage = retorno.previous


            previousPage() // pegando a url retornada da api para voltar a pagina
            nextPage()

        },
        error: function (err) { //Insere unm alerta para o usuário caso a consulta der errado
            console.error(err)
            alert('Ocorreu um erro ao executar a consulta')
        }
    })
}




function carregarInformacoes() {
    $('.personagens h2').on('click', function (event) {
        var element = event.target
        $.ajax({
            url: $(element).attr('url'),
            success: function (personagem) {
                $('.nome').html(`<b>Nome:</b> ${personagem.name}`)  //Insere os valores da api no html
                $('.altura').html(`<b>Altura:</b> ${personagem.height}`)
                $('.peso').html(`<b>Peso:</b> ${personagem.mass}`)
                $('.corCabelo').html(`<b>Cor do Cabelo:</b> ${personagem.hair_color}`)
                $('.corPele').html(`<b>Cor da Pele:</b> ${personagem.skin_color}`)
                $('.corOlho').html(`<b>Cor do olho:</b> ${personagem.eye_color}`)
                $('.anoNascimento').html(`<b>Nascimento:</b> ${personagem.birth_year}`)
                $('.genero').html(`<b>Gênero:</b> ${personagem.gender}`)
            },
            error: function (err) {
                console.error(err);
                alert('Erro ao carregar informações');
            }
        })
    })
}
function previousPage() { //Função para ir para página anterior
    if(page.previousPage == null){
      $('[name="previousPage"]').attr('disabled', true)
    }else{
      $('[name="previousPage"]').attr('disabled', false)
      $('[name="previousPage"]').off('click').on('click', () => {
        carregarApi(page.previousPage);
      })
    }

}

function nextPage() {//Função para ir para a proxima página
  if(page.nextPage == null){
    $('[name="nextPage"]').attr('disabled', true)
  }else{
    $('[name="nextPage"]').attr('disabled', false)
    $('[name="nextPage"]').off('click').on('click', () => {
      carregarApi(page.nextPage);
    })
  }
}



carregarApi('https://swapi.co/api/people?page=1')
