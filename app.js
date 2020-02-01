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
$('form').on('submit', (event) => {
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
    const randomNumber = Math.floor(Math.random() * 809) 
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
    for (i=1; i<152; i+=1) {
    $.ajax({
        url:'https://pokeapi.co/api/v2/pokemon/' + i,
    }).then(
        (data)=>{
            let $name = data.name;
            let $imageSource = data.sprites.front_default;  
            console.log(data)
            // $('#',i).append("<img src =" + $imageSource + ">")
            $('#container').append("<img src =" + $imageSource + ">")
            // $name.attr("id", data.id);
            // $('#name').html(data.name);
            // $('#id').html(data.id);
        },
        ()=>{
            console.log("failure")
             }
        )
    }
};

// $(document).ajaxComplete(function(){
//     addImageGrid();
//   });
  addImageGrid();
// $(document).ready(function(){
//   $(document).ajaxStart(function(){
//     $("#wait").css("display", "block");
//   });
  
//   $("button").click(function(){
//     $("#txt").load("demo_ajax_load.asp");
//   });


});