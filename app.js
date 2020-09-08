

document.addEventListener('DOMContentLoaded',()=>{

	const cardList = [
    	{
			name:'mom',
			img:'images/mom.jpg'
		},{
			name:'sujan',
			img:'images/sujan.png'
		},{
			name:'dad',
			img:'images/dad.jpg'
		},{
			name:'sijan',
			img:'images/sijan.jpg'
		},{
			name:'pizza',
			img:'images/pizza.png'
		},{
			name:'bidhan',
			img:'images/bidhan.png'
		},{
			name:'mom',
			img:'images/mom.jpg'
		},{
			name:'pizza',
			img:'images/pizza.png'
		},{
			name:'dad',
			img:'images/dad.jpg'
		},{
			name:'fries',
			img:'images/fries.png'
		},{
			name:'cheeseburger',
			img:'images/cheeseburger.png'
		},{
			name:'milkshake',
			img:'images/milkshake.png'
		},{
			name:'fox',
			img:'images/fox.png'
		},{
			name:'sijan',
			img:'images/sijan.jpg'
		},{
			name:'bidhan',
			img:'images/bidhan.png'
		},{
			name:'fox',
			img:'images/fox.png'
		},{
			name:'cheeseburger',
			img:'images/cheeseburger.png'
		},{
			name:'fries',
			img:'images/fries.png'
		},{
			name:'milkshake',
			img:'images/milkshake.png'
		},{
			name:'sujan',
			img:'images/sujan.png'
		},{
			name:'hotdog',
			img:'images/hotdog.png'
		},{
			name:'ice-cream',
			img:'images/ice-cream.png'
		},{
			name:'hotdog',
			img:'images/hotdog.png'
		},{
			name:'ice-cream',
			img:'images/ice-cream.png'
		}
  ]

	

	const stage=document.querySelector('.grid');
	const chance=document.querySelector('#chance');
	const highscoreRecord= document.querySelector('#scoreRecord');
	const result= document.querySelector('#score');

	var selectedCardNames=[]
	var selectedCardIds=[]
	var wonCards=[]

	let chanceCounter=0;
  	cardList.sort( () => 0.5 - Math.random() )



	if(! localStorage.getItem('highscore')){
		setHighScoreContent('Chrome','75')
	}
	highscoreRecord.textContent=getHighScoreContent();



	// Called to display the deck of cards to select from
	function playground(){
		for (var i = 0; i < cardList.length; i++) {
			const card=document.createElement('img');
			card.setAttribute('card-id',i);
			card.setAttribute('src','images/blank.png');
			card.addEventListener('click', flipCard);
			stage.appendChild(card);
		}
	}

	// called whenever a card is clicked
	function flipCard(){
		const selectedCardID=this.getAttribute('card-id');
		const selectedCardName=cardList[selectedCardID].name;

		if(!isItTwiceClicked(selectedCardID,selectedCardName)){
			chanceCounter++;
			chance.textContent=chanceCounter;
			this.setAttribute('src',cardList[selectedCardID].img);
			selectedCardNames.push(selectedCardName);
			selectedCardIds.push(selectedCardID);
			if (selectedCardIds.length === 2) {
				setTimeout(matchCards,500);
			}
		}
	}

	// Called when two cards are selected
	function matchCards(){
		var allCards= document.querySelectorAll('img');
		if(selectedCardNames[0] === selectedCardNames[1]){
			wonCards.push(selectedCardNames[0]);
			console.log("Match found");
			result.textContent=wonCards.length;
			allCards[selectedCardIds[0]].setAttribute('src','images/white.png');
			allCards[selectedCardIds[1]].setAttribute('src','images/white.png');
			if( wonCards.length === cardList.length/2){
				result.textContent= "बधाई छ! तपाईंले खेल जित्नुभयो :)";
				var winner = prompt("तपाईंको नाम के होला?")
				setHighScoreContent(winner,chanceCounter)
			}

		}else{
			allCards[selectedCardIds[0]].setAttribute('src','images/blank.png');
			allCards[selectedCardIds[1]].setAttribute('src','images/blank.png');
		}
		selectedCardNames=[]
		selectedCardIds=[]
	}

	// to stop clicking same element twice
	function isItTwiceClicked(cardId,name){

		if(isCardAlreadyWon(name)){
			return true;
		}else{
			return selectedCardIds.includes(cardId);
		}
	}

	// to check if clicked card is already won card.
	function isCardAlreadyWon(name){
		return wonCards.includes(name);
	}

	//
	function getHighScoreContent(){
		return `${localStorage.getItem('player')}   :  ${localStorage.getItem('highscore')} `
	}

	function setHighScoreContent(player,chances){
		localStorage.setItem('highscore',chances);
		localStorage.setItem('player',player);
	}
	playground();

})
