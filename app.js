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
$('#shuffle').on('click', (event) => {
    const randomNumber = Math.floor(Math.random() * 151) 
    console.log(randomNumber)
    $.ajax({
        url:'https://pokeapi.co/api/v2/pokemon/' + randomNumber,
    }).then(
        (data)=>{
            console.log(data)
            let $imageSource = data.sprites.front_default;  
            $('#picture').append("<img src =" + $imageSource + ">")
        },
        ()=>{
            console.log("failure")
             }
        )
    });


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
            console.log(data.id)
            let $imageSource = data.sprites.front_default;  
            let $pokemon = $('<div>').addClass("grid").attr('id', data.name)
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