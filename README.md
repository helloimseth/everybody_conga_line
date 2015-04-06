# EVERBODY CONGA LINE

## Link
[Live link] (http://helloimseth.com/conga)

## Description
You're at an event. Everyone is standing awkardly, looking in various directions - how will you get the party started?

EVERYBODY CONGA LINE is a browser game written with JavaScript and jQuery inspired by the classic mobile game, Snake. You play as the party master, leading a conga line around the room picking up bored people along the way, making your conga line longer and longer.

How long can you get the conga line without hitting the walls or itself?

##Implementation
A few details about the implementation:
* Each segment of the conga line is an object which knows its direction and index in the snake.
..* This enables the segment to know if it's a corner or not and therefore rotate the segment's Person.png rendering accordingly
* To DRY out code, Snake class (the conga line) holds object literals mapping corners to directions and classes, as well as directions to movement deltas 
* The difficulty and score modifier dynamically update based on the length of the snake

##Libraries/APIs
This game uses Underscore for its various Array helper functions. It also uses Google fonts for the typeface, Gorditas.

##To Do
I want to add the option to switch skins so that the game goes from a conga line to a traditional snake game. I'd also like redesign the bystander-creation so that the bystanders start from off the screen and travel to their resting spots, using jQuery, to make it seem like they're walking onto the dancefloor. 
