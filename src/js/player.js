const player = {
	game : null,
	origindy : 0,
	originxAnimation : 0,
	speedUp : 0,
	lowerSpeed : -5,
	collisionTolerance : 0, //sert à ajouter une tolérence de collision pour que le rectangle de collision du dino ne détecte pas de collision alors que lors d'un saut le dino ne touche pas le cactus cela rétréci la hitbox rectangulaire la seule utilité est de rendre le jeu plus jouable
	spriteframes : [
	{
		originx : 1338,
		sx : 1338,
		sy : 2,
		sw : 88,
		sh : 94,
		dx : 15, 
		dy : 0,
		dw : 44, 
		dh : 48,
		increment : 4
	},
	{
		originx : 1866,
		sx : 1866, 
		sy : 35,
		sw : 120,
		sh : 60,
		dx : 15,
		dy : 0,
		dw : 60,
		dh : 30,
		increment : 2
	},
	{
		sx : 1782,
		sy : 2,
		sw : 80,
		sh : 90,
		dx : 15, 
		dy : 0,
		dw : 40,
		dh : 48,
	}
	],
	framesCount : 0, //compte pour le changement changer les frames d'animations
	framesCount2 : 0, // compteur pour la décélration
	crounch: false,
	frameNbr : 0,

	init(game){
		this.game = game;	
		this.frameNbr = 0;
		this.speedUp = 0; //assure que même lors d'un restart du jeu le joueur ne finira pas sa montée le cas échéant
		this.originxAnimation = this.spriteframes[this.frameNbr].originx + (2 * this.spriteframes[this.frameNbr].sw)
		this.spriteframes[0].dy = (this.game.canvas.height - this.spriteframes[0].dh) - 4;
		this.origindy = (this.game.canvas.height - this.spriteframes[0].dh) - 4;
		this.collisionTolerance = this.spriteframes[0].dw / 3 //ne paramétrer à zero pour voir la différence lors d'un saut par dessus un cactus
		this.drawPlayer();
	},

	drawPlayer(){
		this.game.ctx.drawImage(
			this.game.sprite, 
			this.spriteframes[this.frameNbr].sx, 
			this.spriteframes[this.frameNbr].sy, 
			this.spriteframes[this.frameNbr].sw, 
			this.spriteframes[this.frameNbr].sh, 
			this.spriteframes[this.frameNbr].dx, 
			this.spriteframes[this.frameNbr].dy, 
			this.spriteframes[this.frameNbr].dw, 
			this.spriteframes[this.frameNbr].dh)
	},

	update(){
		this.framesCount ++ //compteur pour le changement de sprite de course
		this.framesCount2 ++ //compteur pour la décélération
		this.spriteframes[0].dy += -this.speedUp
		if(this.spriteframes[0].dy <= 4){
			this.spriteframes[0].dy = 4
			this.speedUp += -1
		}

		//ajoute la décélaration en fonction du temps 
		if(this.framesCount2 >= 6){
			this.framesCount2 = 0;
			this.speedUp -= 2;
			if(this.crounch === true){
				this.speedUp -= 4
			}
		}

		//s'assure que le trex ne peut pas aller plus bas que la valeur de départ
		if( this.spriteframes[0].dy >= this.origindy){
			this.spriteframes[0].dy = this.origindy
			this.speedUp = 0
			this.game.gameController.keypressed = false
		}

		//change les frames en fontion d'un temps donné
		if (this.framesCount >= 7) {
			this.framesCount = 0
			this.spriteframes[this.frameNbr].sx += this.spriteframes[this.frameNbr].sw
			if (this.spriteframes[this.frameNbr].sx >= this.spriteframes[this.frameNbr].originx + (this.spriteframes[this.frameNbr].increment * this.spriteframes[this.frameNbr].sw)) {
				this.spriteframes[this.frameNbr].sx = this.originxAnimation
			}
		}
		//change la frame pour le saut quand le trex est plus haut que le niveau de base
		if(this.spriteframes[0].dy < this.origindy){
			this.spriteframes[0].sx = this.spriteframes[this.frameNbr].originx //changer le sprite pour mettre l'image de saut
		}

		//si la posY est egale à origindy et si la touche down est active met le sprite du trex couché
		if((this.spriteframes[0].dy == this.origindy) && (this.crounch === true)){
			this.frameNbr = 1
			this.originxAnimation = this.spriteframes[this.frameNbr].originx
		}else{
			this.frameNbr = 0
			this.originxAnimation = this.spriteframes[this.frameNbr].originx + (2 * this.spriteframes[this.frameNbr].sw)
		}
		// recalcule la position en Y en fonction de la frame affiché
		if(this.frameNbr == 1){
			this.spriteframes[this.frameNbr].dy = (this.game.canvas.height - this.spriteframes[this.frameNbr].dh) - 4;
		}
		this.checkCollision()
		this.drawPlayer()
	},
	moveUp(){ 
		this.speedUp += 7
		this.framesCount2 = 0 //remet le compteur décélération à zero pour éviter le fluctuation dans la décélération par l'ajout de la vitesse de décélération trop si le compteur se touvais proche de la lilite au moment de la vérification du framescount
		//console.log(this.speedUp)
	},

	checkCollision(){
		this.game.opponent.forEach( (elt) => {
			if(elt.type === 'cactus'){ //identifie le type d'opposant présent est un catus don vérifie les collision par rappot au catus 
				if((this.spriteframes[this.frameNbr].dx + this.spriteframes[this.frameNbr].dw - this.collisionTolerance) >= elt.dx && this.spriteframes[this.frameNbr].dx + this.collisionTolerance <= elt.dx + elt.spriteframes[elt.cactusType].dw ){
					//console.log('je suis au dessus d‘un cactus')
					if((this.spriteframes[this.frameNbr].dy + this.spriteframes[this.frameNbr].dh) >= elt.dy ){
						//console.log('AIE AIE je me pique')
						const dy = this.spriteframes[this.frameNbr].dy
						this.frameNbr = 2
						this.spriteframes[this.frameNbr].dy = dy
						this.drawPlayer()
						this.game.gameOver()
					}
				}
			}else{//si ce n'est pas un catus vérifie par rapport à bird
				if((this.spriteframes[this.frameNbr].dx + this.spriteframes[this.frameNbr].dw - this.collisionTolerance) >= elt.dx && this.spriteframes[this.frameNbr].dx + this.collisionTolerance <= (elt.dx + elt.frame[elt.step].dw) ){
					//console.log('Captain it‘s a bird ')
					if(this.spriteframes[this.frameNbr].dy >= elt.dy - elt.frame[elt.step].dh && this.spriteframes[this.frameNbr].dy - this.spriteframes[this.frameNbr].dh <= elt.dy ){
						const dy = this.spriteframes[this.frameNbr].dy
						this.frameNbr = 2
						this.spriteframes[this.frameNbr].dy = dy
						this.drawPlayer()
						this.game.gameOver()
					}
				} 
			};
		});
	}

}

export default player;