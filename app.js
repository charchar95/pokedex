$(() => {

////Sticky Nav//////
window.onscroll = function() {stickyFunction()};
let navbar = document.getElementById("sticky-nav");
let sticky = navbar.offsetTop;
const stickyFunction = () => {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
let action = 1;

$('#search').on('click', function(event){
    event.preventDefault();
    $('#searching').show();
    $('#random-poke').hide();
})

///Simple Search///
$('form').on('submit', (event) => {
    event.preventDefault();
    $('#search-box').trigger('reset');
    const userInput = $('#search-box').val();
    lowerCaseInput = userInput.toLowerCase()
    $.ajax({
        url:'https://pokeapi.co/api/v2/pokemon/' + lowerCaseInput,
    }).then(
        (data)=>{
            let $imageSource = data.sprites.front_default;  
            let $searchPokemon = $('<div>').attr('id', 'popup').addClass("grid")
            $("#modal-pop").fadeIn();
                $("#modal-pop").css('display', 'block');
                $("#modal-info").append(data.name, '<br>')
                $("#modal-info").append('ID: #' + data.id, '<br>')
                $("#modal-info").append('HEIGHT: ' + data.height, '<br>')
                $("#modal-info").append('WEIGHT: ' + data.weight, '<br>')
                $("#modal-image").attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png" )
                    if (data.types[0] && data.types[1] ) {
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").append("TYPE 2 " + data.types[1].type.name)
                    } else { 
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").hide()
                    }   
                },
        ()=>{
            console.log("failure")
             }
        )
    });



// Close Modal//
//clears out the past pokemon info
const $closeBtn = $('#close') 
const closeModal = () => {
    $("#modal-info").text('')
    $("#modal-image").attr('src', '')
    $("#modal-type").text('')
    $("#type-one").text('')
    $("#type-two").text('').show();
    $("#modal-pop").css('display', 'none');
    $("#search-box").val('')
    }
$closeBtn.on('click', closeModal);


///Shuffle Pokemon///

$('#random-poke').hide();

$('#random-pokemon').on('click', function(event){
    event.preventDefault();
    $('#random-poke').show();
    $('#searching').hide();
})


const shuffler = () => {
    let action = 1
    const randomNumber = Math.floor(Math.random() * 723) 
    
    // console.log(randomNumber)
    $.ajax({
        url:'https://pokeapi.co/api/v2/pokemon/' + randomNumber,
    }).then(
        (data)=>{
            // logic for replacing the image using a random number 
            if ( action === 1 ) { 
             $("#picture").attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + randomNumber + ".png" ) 
             $("#info").text('')   
             $("#info").append(data.name + ('<br>') + '#' + data.id)
             action = 2
         } else {
             $("#picture").attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + randomNumber + ".png" ) 
             $("#info").text('')  
             $("#info").append(data.name + ('<br>') + '#' + data.id)
             action = 1
         }
        // event listener for modal popup //
            $("#picture").on('click', function(){
            $("#modal-pop").fadeIn();
        // empty the modal textbox //
            $("#modal-info").text('')
            $("#modal-image").attr('src', '')
            $("#modal-type").text('')
            $("#type-one").text('')
            $("#type-two").text('').show();
            $("#modal-pop").css('display', 'none');
        // Code to dynamically display pokedex info //
            $("#modal-pop").fadeIn();
                $("#modal-pop").css('display', 'block');
                $("#modal-info").append(data.name, '<br>')
                $("#modal-info").append('ID: #' + data.id, '<br>')
                $("#modal-info").append('HEIGHT: ' + data.height, '<br>')
                $("#modal-info").append('WEIGHT: ' + data.weight, '<br>')
                $("#modal-image").attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png" )
                    // logic for one or two data types appended to modal // 
                if (data.types[0] && data.types[1] ) {
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").append("TYPE 2 " + data.types[1].type.name)
                    } else { 
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").hide()
                    }   
            })  
    },
        ()=>{
            console.log("failure")
             }
        )
    };
$("#shuffle").on("click", shuffler);




//Make a Grid of First Gen Pokemon//    
const firstGen = () => {
    const urls = []
    for (i=1; i<152; i+=1) {     
      urls.push('https://pokeapi.co/api/v2/pokemon/' + i)
    }
     Promise.all(urls.map(url =>
        $.ajax(url)
        ))   
    .then(
        (data)=>{
            // add title to grid //
            let $text = $('<h3>')
            $text.text('First Generation')
            $('#title').prepend($text)
         data.forEach(data => {
            // console.log(data.id)
            let $imageSource = data.sprites.front_default;  
            let $pokemon = $('<div>').addClass("grid").attr('id', 'popup')
        
            $('#container').append($pokemon)
            $pokemon.append("<img src =" + $imageSource + ">" + ('<br>') + data.name + ('<br>') + '#' + data.id)
            
            //modal popup listener
            $pokemon.on('click', function(){
            // Code to dynamically display pokedex info //
                $("#modal-pop").fadeIn();
                $("#modal-pop").css('display', 'block');
                $("#modal-info").append(data.name, '<br>')
                $("#modal-info").append('ID: #' + data.id, '<br>')
                $("#modal-info").append('HEIGHT: ' + data.height, '<br>')
                $("#modal-info").append('WEIGHT: ' + data.weight, '<br>')
                $("#modal-image").attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png" )
                    if (data.types[0] && data.types[1] ) {
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").append("TYPE 2 " + data.types[1].type.name)
                    } else { 
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").hide()
                    }   
            })

           })
        },
        ()=>{
            console.log("failure")
             }
        )    
    }
firstGen();
$('#kanto').on('click', function(){
    $('#title').empty();
    firstGen();

});


// https://teamtreehouse.com/library/manage-multiple-requests-with-promiseall
// Before using promise.all to load the pokemon they were loading on the page in a different order each time
// using a loop, ajax had to make a request 151 times 
// Using promise.all makes sure that everything is loaded before the .then
// I also tried using a setTimeout. That loaded the same pokemon 151 times. 

// Grid of Second Gen//
const secondGen = () => {
    const urls = []
    for (i=152; i<252; i+=1) {     
      urls.push('https://pokeapi.co/api/v2/pokemon/' + i)
    }
     Promise.all(urls.map(url =>
        $.ajax(url)
        ))   
    .then(
        (data)=>{
           data.forEach(data => {
            // console.log(data.id)
            let $imageSource = data.sprites.front_default;  
            let $pokemon = $('<div>').addClass("grid").attr('id', 'popup')
            
            $('#container').append($pokemon)
            $pokemon.append("<img src =" + $imageSource + ">" + ('<br>') + data.name + ('<br>') + '#' + data.id)

            //modal popup listener
            $pokemon.on('click', function(){
                // Code to dynamically display pokedex info //
                $("#modal-pop").fadeIn();
                $("#modal-pop").css('display', 'block');
                $("#modal-info").append(data.name, '<br>')
                $("#modal-info").append('ID: #' + data.id, '<br>')
                $("#modal-info").append('HEIGHT: ' + data.height, '<br>')
                $("#modal-info").append('WEIGHT: ' + data.weight, '<br>')
                $("#modal-image").attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png" )
                    if (data.types[0] && data.types[1] ) {
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").append("TYPE 2 " + data.types[1].type.name)
                    } else { 
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").hide()
                    }   
            })

           })
        },
        ()=>{
            console.log("failure")
             }
        )    
    } 
    $('#johto').on('click', function(){
        $('#container').empty();
        $('#title').text('');
        secondGen();
        // add title to grid //
        let $text = $('<h3>')
        $text.text('Second Generation')
        $('#title').prepend($text)

});    


// Grid of Third Gen//
const thirdGen = () => {
    const urls = []
    for (i=252; i<387; i+=1) {     
      urls.push('https://pokeapi.co/api/v2/pokemon/' + i)
    }
     Promise.all(urls.map(url =>
        $.ajax(url)
        ))   
    .then(
        (data)=>{
           
           data.forEach(data => {
            // console.log(data.id)
            let $imageSource = data.sprites.front_default;  
            let $pokemon = $('<div>').addClass("grid").attr('id', 'popup')
           
            $('#container').append($pokemon)
            $pokemon.append("<img src =" + $imageSource + ">" + ('<br>') + data.name + ('<br>') + '#' + data.id)

            //modal popup listener
            $pokemon.on('click', function(){
                // Code to dynamically display pokedex info //
                $("#modal-pop").fadeIn();
                $("#modal-pop").css('display', 'block');
                $("#modal-info").append(data.name, '<br>')
                $("#modal-info").append('ID: #' + data.id, '<br>')
                $("#modal-info").append('HEIGHT: ' + data.height, '<br>')
                $("#modal-info").append('WEIGHT: ' + data.weight, '<br>')
                $("#modal-image").attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png" )
                    if (data.types[0] && data.types[1] ) {
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").append("TYPE 2 " + data.types[1].type.name)
                    } else { 
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").hide()
                    }   
            })

           })
        },
        ()=>{
            console.log("failure")
             }
        )    
    } 
    $('#hoenn').on('click', function(){
        $('#container').empty();
        $('#title').text('');
        thirdGen();
        // add title to grid //
        let $text = $('<h3>')
        $text.text('Third Generation')
        $('#title').prepend($text)

});  

// Grid of Fourth Gen//
const fourthGen = () => {
    const urls = []
    for (i=387; i<494; i+=1) {     
      urls.push('https://pokeapi.co/api/v2/pokemon/' + i)
    }
     Promise.all(urls.map(url =>
        $.ajax(url)
        ))   
    .then(
        (data)=>{
           data.forEach(data => {
            // console.log(data.id)
            let $imageSource = data.sprites.front_default;  
            let $pokemon = $('<div>').addClass("grid").attr('id', 'popup')

            $('#container').append($pokemon)
            $pokemon.append("<img src =" + $imageSource + ">" + ('<br>') + data.name + ('<br>') + '#' + data.id)
            //modal popup listener
            $pokemon.on('click', function(){
                // Code to dynamically display pokedex info //
                $("#modal-pop").fadeIn();
                $("#modal-pop").css('display', 'block');
                $("#modal-info").append(data.name, '<br>')
                $("#modal-info").append('ID: #' + data.id, '<br>')
                $("#modal-info").append('HEIGHT: ' + data.height, '<br>')
                $("#modal-info").append('WEIGHT: ' + data.weight, '<br>')
                $("#modal-image").attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png" )
                    if (data.types[0] && data.types[1] ) {
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").append("TYPE 2 " + data.types[1].type.name)
                    } else { 
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").hide()
                    }   
            })

           })
        },
        ()=>{
            console.log("failure")
             }
        )    
    } 
    $('#sinnoh').on('click', function(){
        $('#container').empty();
        $('#title').text('');
        fourthGen();
        // add title to grid //
        let $text = $('<h3>')
        $text.text('Fourth Generation')
        $('#title').prepend($text)
        
}); 



// Grid of Fifth Gen//
const fifthGen = () => {
    const urls = []
    for (i=494; i<650; i+=1) {     
      urls.push('https://pokeapi.co/api/v2/pokemon/' + i)
    }
     Promise.all(urls.map(url =>
        $.ajax(url)
        ))   
    .then(
        (data)=>{
           data.forEach(data => {
            // console.log(data.id)
            let $imageSource = data.sprites.front_default;  
            let $pokemon = $('<div>').addClass("grid").attr('id', 'popup')
            $('#container').append($pokemon)
            $pokemon.append("<img src =" + $imageSource + ">" + ('<br>') + data.name + ('<br>') + '#' + data.id)
            //modal popup listener
            $pokemon.on('click', function(){
                // Code to dynamically display pokedex info //
                $("#modal-pop").fadeIn();
                $("#modal-pop").css('display', 'block');
                $("#modal-info").append(data.name, '<br>')
                $("#modal-info").append('ID: #' + data.id, '<br>')
                $("#modal-info").append('HEIGHT: ' + data.height, '<br>')
                $("#modal-info").append('WEIGHT: ' + data.weight, '<br>')
                $("#modal-image").attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png" )
                    if (data.types[0] && data.types[1] ) {
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").append("TYPE 2 " + data.types[1].type.name)
                    } else { 
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").hide()
                    }   
            })

           })
        },
        ()=>{
            console.log("failure")
             }
        )    
    } 
    $('#unova').on('click', function(){
        $('#container').empty();
        $('#title').text('');
        fifthGen();
        // add title to grid //
        let $text = $('<h3>')
        $text.text('Fifth Generation')
        $('#title').prepend($text)
}); 


// Grid of Sixth Gen//
const sixthGen = () => {
    const urls = []
    for (i=650; i<722; i+=1) {     
      urls.push('https://pokeapi.co/api/v2/pokemon/' + i)
    }
     Promise.all(urls.map(url =>
        $.ajax(url)
        ))   
    .then(
        (data)=>{
           data.forEach(data => {
            // console.log(data.id)
            let $imageSource = data.sprites.front_default;  
            let $pokemon = $('<div>').addClass("grid").attr('id', 'popup')
            $('#container').append($pokemon)
            $pokemon.append("<img src =" + $imageSource + ">" + ('<br>') + data.name + ('<br>') + '#' + data.id)

            //modal popup listener
            $pokemon.on('click', function(){
                // Code to dynamically display pokedex info //
                $("#modal-pop").fadeIn();
                $("#modal-pop").css('display', 'block');
                $("#modal-info").append(data.name, '<br>')
                $("#modal-info").append('ID: #' + data.id, '<br>')
                $("#modal-info").append('HEIGHT: ' + data.height, '<br>')
                $("#modal-info").append('WEIGHT: ' + data.weight, '<br>')
                $("#modal-image").attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + data.id + ".png" )
                    if (data.types[0] && data.types[1] ) {
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").append("TYPE 2 " + data.types[1].type.name)
                    } else { 
                        $("#type-one").append("TYPE 1 " + data.types[0].type.name)
                        $("#type-two").hide()
                    }   
            })

           })
        },
        ()=>{
            console.log("failure")
             }
        )    
    } 
    $('#kalos').on('click', function(){
        $('#container').empty();
        $('#title').text('');
        sixthGen();
        // add title to grid //
        let $text = $('<h3>')
        $text.text('Sixth Generation')
        $('#title').prepend($text)

}); 






});