class Pokedex {
	constructor(){
		this.pokemonArray = pokemonArray;
	  this.fav = [];
	}
	getList(){
		for (var i = 0; i < this.pokemonArray.length; i++) {
			$('.pokemon-array').append('<div class="pokemon_name" data-name="' + this.pokemonArray[i] + '">' + this.pokemonArray[i] + '</div>');
		}
	}
	displayDetails(pokemon_name){
		cachedFetch('https:pokeapi.co/api/v2/pokemon/' + pokemon_name)
			.then(r => r.json()) 
			.then(res => { 
				this.currentPoke = res.pokemon_name;
				$('.info').html(`<div class ="info_item">No.${res.id}: ${res.name}</div>
					<div class ="info_item">Weight: ${res.weight}</div>
					<div class ="info_item">Height: ${res.height}</div>
					<div class="info_item">Type: ${res.types[0].type.name}</div>`);
	
				let {sprites} = res;
				$('.pics').html(`
						${sprites.front_default ? `<img class="pic" src="${sprites.front_default}"/>` : ``}
						${sprites.back_default ? `<img class="pic" src="${sprites.back_default}"/>` : ``}
						${sprites.back_female ? `<img class="pic" src="${sprites.back_female}"/>` : ``}
						${sprites.back_shiny ? `<img class="pic" src="${sprites.back_shiny}"/>` : ``}
						${sprites.back_shiny_female ? `<img class="pic" src="${sprites.back_shiny_female}"/>` : ``}
						${sprites.front_female ? `<img class="pic" src="${sprites.front_female}"/>` : ``}
						${sprites.front_shiny ? `<img class="pic" src="${sprites.front_shiny}"/>` : ``}
						${sprites.front_shiny_female ? `<img class="pic" src="${sprites.front_shiny_female}"/>` : ``}
				`);//append
			});//then
	}
	addfav(pokemon_name) {
		this.fav.push(pokemon_name);
		this.updateFav();
	} // displayDetails
	removeFav(pokemon_name){
		this.fav = this.fav.filter(name => name !== pokemon_name);
		this.updateFav();
	}
	updateFav(){
		$('.favorites ul').html(this.fav.map(name => `<li>${name}</li>`));
	}
}// Pokedex

$(function(){
	var pokedex = new Pokedex();
	pokedex.getList();	

	$(document).on('click','.pokemon_name', function(){
		var pokemon_name = $(this).data('name');
			$('.active').removeClass('active'); 
			$(this).addClass('active');
			pokedex.displayDetails(pokemon_name);
	});
	var favorites = $('.favorites');
	$(document).on('click', '#addfavbutton', function(){
		var pokemon_name = $('.active').data('name');
		console.log(pokedex.fav);
		pokedex.addfav(pokemon_name);
		console.log(pokedex.fav);
	});
	$(document).on('click', '#excludefavbutton', function(){
		var pokemon_name = $('.active').data('name');
		console.log(pokedex.fav);
		pokedex.removeFav(pokemon_name);
		console.log(pokedex.fav)
	})
}); // dom ready








//click function for the call and the buttons
// when the call happens(big blue button)then use the click(add event listener) to call the information
