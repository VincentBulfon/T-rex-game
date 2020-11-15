const rootElt = document.getElementsByTagName('html')[0];
if(rootElt.className ==='nojs'){
	rootElt.className='js'
}

import player from './player.js'; 
import msg from './msg.js';
import gameController from './gameController.js';
import ground from './ground.js'
import Cloud from './Cloud.js'
import Bird from './Bird.js'
import Cactus from './Cactus.js'

const game = {
	player,
	msg,
	gameController,
	ground,
	willstart : null,
	timeCount : 0,
	timeBeforeSpeedUp : (60 * 15),
	speed : 0,
	maxspeed : 12,
	cloudNbr : 3,
	clouds : [],
	opponent : [],
	opponentDelay : 0,
	gravity : 1,
	canvas: null,
	ctx: null,
	sprite : new Image(),
	src : './images/sprite.png',
	requestId : 0,
	crashSound : new Audio("./sounds/die.mp3"),
	jumpSound : new Audio("./sounds/jump.mp3"),
	trexSound : new Audio("./sounds/trex.mp3"),
	songisplaying : false,
	pointdelay : 0,
	points : 0,
	init(){
		this.pointdelay = 0
		this.opponentDelay = 0
		this.timeCount = 0
		this.pointdelay = 0
		this.speed = 5
		this.willstart = true
		this.canvas = document.getElementsByClassName('game__canvas')[0]
		this.ctx = this.canvas.getContext("2d")
		this.sprite.src = this.src
		this.resize()
		this.points = document.getElementsByClassName('score')[0]
		this.points.textContent = '0'
		this.msg.init(this)
		this.sprite.addEventListener('load', ()=> {
			this.gameController.init(this)//doit être sur que le sprite est chargé pour que lorsque l'on appuie sur la touche de démarrage le dino puisse s'afficher
			this.ground.init(this)
			this.player.init(this)
			
		})

		for (let i = 0; i < this.cloudNbr; i++) { //ajoute X nuages
        const cloud = new Cloud() //créer un nouvel objet pour chaque nuage
        cloud.init(this) //initialise le nuage en cours
        this.clouds.push(cloud) // ajoute le nuage au tableau
    }
},
	resize(){ //je peux l'utiliser pour paraméter dynamiquement les dimension du canvas avec un event listener resize sur window
	const section = document.getElementsByClassName('game')[0]
	this.canvas.width = 600
	this.canvas.height = 150
},

randomizeOpp(){
	let randomize = Math.random() * 10 //randomisation du choix de l'opposant
	if(randomize < 7 ){
		const cactus = new Cactus(this)
		cactus.init() 
		this.opponent.push(cactus)
	}else{
		const bird  = new Bird(this)
		bird.init()
		this.opponent.push(bird)
	}
},

removeOpp(){
	this.opponent.forEach( (elt) => {
			elt.update() // update l'element du tableau
			if(elt.type === 'cactus'){ //identifie le type d'opposant présent 
				if(elt.dx + elt.spriteframes[elt.cactusType].dw < 0){ //supression de l'opposant cactus s'il sort du champ
					this.opponent.shift()
			}
		}else{
				if(elt.dx + elt.frame[elt.step].dw < 0){//supression de l'opposant bird s'il sort du champ
					this.opponent.shift()
			}
		}
	});
},

animate(){
		this.requestId = window.requestAnimationFrame(()=> this.animate()) //rapelle animate a chaque repaint
		this.opponentDelay ++
		this.timeCount ++
		this.pointdelay ++
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.gameController.listenningKey() //ajoute l'ecoute des autre touches
		this.ground.update(); //anime le ground
		this.clouds.forEach(cloud =>  //anime chaque nuage
			cloud.update()
			)

		if(this.timeCount >= this.timeBeforeSpeedUp){
			this.timeCount = 0
			this.speed += 0.5
			if(this.speed >= this.maxspeed){
				this.speed = this.maxspeed
			}
		}

		if(this.opponentDelay >= ((220 / this.speed) + Math.ceil(Math.random() * 240))){ //ajoute un cactus ou un bird tous les X temps en fonction du nbr d'images ecoulées
			this.randomizeOpp()
		this.opponentDelay = 0
		}
		if(this.pointdelay == 45){
			this.pointdelay = 0
			let points = parseInt(this.points.textContent, 10)
			points ++
			points = points.toString(10)
			this.points.textContent = points
		}

		if(this.opponent.length > 0){ //lance upadate des cactus quand un est présent dans le tableau
			this.removeOpp()
		}
		this.player.update() // anime le joueur en dernier pour qu'il soit situé par dessus les autres dessins affichés
	},



	gameOver(){
		this.msg.gameOverMsg()
		this.crashSound.play()
		window.cancelAnimationFrame(this.requestId)
		this.restart = true
	},


	restartGame(){
		console.log('executed');
		window.cancelAnimationFrame(this.requestId)
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		
		if(this.clouds.length > 0){ //vide les nuages
			this.clouds = []
		}

		if(this.opponent.length > 0){ //vide les opposants
			this.opponent = []
		}

		this.init()

	}

}
game.init();