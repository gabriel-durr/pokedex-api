const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const buttonOnOf = document.querySelector(".btn-on");

let searchPokemon = 1;

function isButtonOnOf() {
	if (!buttonOnOf.value) {
		pokemonImage.style.visibility = "hidden";
		buttonOnOf.value = "on";
		endLights();
	} else {
		startLights();
		setTimeout(() => {
			pokemonImage.style.visibility = "visible";
			buttonOnOf.value = "";
		}, 3900);
	}
}

function startLights() {
	let green = document.getElementById("green");
	let red = document.getElementById("red");
	let yellow = document.getElementById("yellow");

	setTimeout(function () {
		red.className = "led-red";
	}, 1000);

	setTimeout(function () {
		yellow.className = "led-yellow";
	}, 2000);

	setTimeout(function () {
		green.className = "led-green";
	}, 3000);
}

function endLights() {
	red.className = "";
	yellow.className = "";
	green.className = "";
}

const fetchPokemon = async pokemon => {
	const APIResponse = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${pokemon}`
	);

	if (APIResponse.status === 200) {
		const data = await APIResponse.json();
		return data;
	}
};

const renderPokemon = async pokemon => {
	pokemonName.innerHTML = "Loading...";
	pokemonNumber.innerHTML = "";

	const data = await fetchPokemon(pokemon);
	const pokesData =
		data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
			"front_default"
		];

	if (data) {
		pokemonImage.style.display = "block";
		pokemonName.innerHTML = data.name;
		pokemonNumber.innerHTML = data.id;
		pokemonImage.src = pokesData;
		input.value = "";
		searchPokemon = data.id;
	} else {
		pokemonImage.style.display = "none";
		pokemonName.innerHTML = "Not found :c";
		pokemonNumber.innerHTML = "";
	}
};

form.addEventListener("submit", event => {
	event.preventDefault();
	renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
	if (searchPokemon > 1) {
		searchPokemon -= 1;
		renderPokemon(searchPokemon);
	}
});

buttonNext.addEventListener("click", () => {
	searchPokemon += 1;
	renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
