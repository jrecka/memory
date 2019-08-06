const cardsColor = ['soldat', 'soldat', 'dark', 'dark', 'camel', 'camel', 'seaman', 'seaman', 'weed', 'weed', 'island', 'island', 'sand', 'sand', 'violet', 'violet', 'lotos', 'lotos'];

let cards = document.querySelectorAll('div');
cards = [...cards]; //18

const startTime = new Date().getTime();

let activeCard = '';
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;

const clickCard = function () {
	activeCard = this;

	if (activeCard == activeCards[0]) return;

	activeCard.classList.remove('hidden');
	//czy to pierwsze klikniecie
	if (activeCards.length === 0) {
		activeCards[0] = activeCard;
		console.log('1')
		return;
	} else {
		console.log('2')
		//czy to drugie
		cards.forEach(card => card.removeEventListener('click', clickCard))
		activeCards[1] = activeCard;

		setTimeout(function () {
			if (activeCards[0].className === activeCards[1].className) {
				console.log('win');
				activeCards.forEach(card => card.classList.add('off'))
				gameResult++;
				cards = cards.filter(card => !card.classList.contains('off'))
				if (gameResult == gamePairs) {
					const endTime = new Date().getTime();
					const gameTime = (endTime - startTime) / 1000
					alert(`udało się twoj wynik to: ${gameTime}s`)
					location.reload();
				}
			} else {
				console.log('lost');
				activeCards.forEach(card => card.classList.add('hidden'))
			}
			activeCard = '';
			activeCards.length = 0;
			cards.forEach(card => card.addEventListener('click', clickCard))
		}, 500)
	}
}


const init = () => {
	cards.forEach(card => {
		let position = Math.floor(Math.random() * cardsColor.length); //0-17
		card.classList.add(cardsColor[position]);
		cardsColor.splice(position, 1);
	})

	setTimeout(() => {
		cards.forEach(card => {
			card.classList.add('hidden');
			card.addEventListener('click', clickCard);
		})
	}, 1500)
}

init();
