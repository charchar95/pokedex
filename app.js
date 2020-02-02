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

// const makeGrid = () => {
//     for (i=1; i<10; i+=1) {
//         const $square = $('<div>').addClass('grid');
//         $square.attr("id", i);
//         $('#container').append($square);
//         // console.log(i);
//         }
//     }   
 
// makeGrid();


///Simple Search///
$('#search-box').on('submit', (event) => {
    event.preventDefault();
    const userInput = $('#search-box').val();
    $.ajax({
        url:'https://pokeapi.co/api/v2/pokemon-species/' + userInput,
    }).then(
        (data)=>{
            console.log(data)
            $('#name').html(data.name);
            $('#id').html(data.id);
        },
        ()=>{
            console.log("failure")
             }
        )
    });

///Shuffle Pokemon///

let action = 1;

const shuffler = (event) => {
    const randomNumber = Math.floor(Math.random() * 151) 
    // console.log(randomNumber)
    $.ajax({
        url:'https://pokeapi.co/api/v2/pokemon/' + randomNumber,
    }).then(
        (data)=>{
             let $imageSource = data.sprites.front_default; 
            //  $('#picture').attr("id", "replace")
            if ( action === 1 ) {        
            $('#picture').attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + randomNumber + ".png" )
            // .css('background-image', 'url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"' + randomNumber + '".png")')
            // $('#picture').detach()  
            action = 2
            console.log(action)
         } else {
            // $('#picture').detach()
            $('#picture:first').attr('src', "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + randomNumber + ".png" )
            // .css('background-image', 'url("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"' + randomNumber + '".png")')
            action = 1
            console.log(action)
         }
    },
// console.log(data)
            
//             $(event.currentTarget).on("click", () => {
//                 $('#picture').hide();
//                 $('#replace').replaceWith(
//                     "<img src =" + "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + randomNumber + ".png" + ">"
                 
        ()=>{
            console.log("failure")
             }
        )
    };

$("#shuffle").on("click", shuffler);

   











//Make a Grid of First Gen Pokemon//    
const addImageGrid = () => {
    const urls = []
    for (i=1; i<152; i+=1) {     
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
            // .addClass(data.name)
            $('#container').append($pokemon)
            $pokemon.append("<img src =" + $imageSource + ">")
           })
        },
        ()=>{
            console.log("failure")
             }
        )    
    }
addImageGrid();
// https://teamtreehouse.com/library/manage-multiple-requests-with-promiseall
// Before using promise.all to load the pokemon they were loading on the page in a different order each time
// using a loop, ajax had to make a request 151 times 
// Using promise.all makes sure that everything is loaded before the .then
// I also tried using a setTimeout. That loaded the same pokemon 151 times. 



//Modal//
const $closeBtn = $('#close')
const openModal = (event) => {
    event.currentTarget();
    $("#modal-pop").css('display', 'block');
    // $button.append(data.name)
    }   
const closeModal = () => {
    $closeBtn.css('display', 'hide');
    }

//Add event listener to Close button
$closeBtn.on('click', closeModal);

$("#popup").on('click', openModal);






//Advance Search//
// $('#advance').on('submit', (event) => {
//     event.preventDefault();
//     $('#container').hide();
//     const searchList = []
// for (i=1; i<152; i+=1) {
// $.ajax({
//     url:'https://pokeapi.co/api/v2/pokemon/' + i,
// }).then(
//     (data)=>{
//         // console.log(data)
//         searchList.push(data)
//         if ($('#type') === "fairy" && data.type === "fairy")
//         console.log(data.name)
//     },
//     ()=>{
//         console.log("failure")
//          }
//     )
// }
// });











});