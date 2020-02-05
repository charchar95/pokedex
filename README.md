# Pokedex!

## Description
This a tool to see Pokemon lists by region (normal and shiny), search by name or id number, and play with random pokemon shuffler. 

## Technologies Used
CSS, HTML, Javascript, jQuery, AJAX, and key frames for animations. 

## Approach
Using the pokeapi I pulled pictures, name, and id, to put them in a flexbox grid. Each square of the grid is clickable and opens a modal for that pokemon with some more basic info - types, height, weight, name and number. 

In order to populate the pokemon in the correct order, based on their id number, and not in the order of which loads the fastest, I used promise.all and an array. This allows each object to load in its own time and be in the correct spot. 

## Installation
None :)

## Unsolved Problems
I would have liked to build a complex search feature that allowed users to toggle between a variety of filters (type, height, weight, color of pokemon, legendary, baby, weakness, etc)

