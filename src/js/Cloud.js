class Cloud {
	constructor(game){
        this.game = game
        this.frame = {
            'sx': 174,
            'sy': 2,
            'sw': 84,
            'sh': 27,
            'dw': 84 / 2,
            'dh': 27 / 2,
        }
        this.dx = 0, 
        this.dy = 0,
        this.speed = 1
    }

    drawCloud(){
    	this.game.ctx.drawImage(this.game.sprite, this.frame.sx, this.frame.sy, this.frame.sw, this.frame.sh, this.dx, this.dy, this.frame.dw, this.frame.dh)
    }
    init(game){
        this.game = game
        this.dx = Math.ceil(Math.random()*this.game.canvas.width + this.frame.dw) // définit la première valeur de la position en X affecté dans update
        this.dy = Math.floor(Math.random()*(this.game.canvas.height/3))// définit la première valeur de la position en Y affecté dans update
    }
    update(){
        if((this.dx + this.frame.dw)<0){
            this.dx = this.game.canvas.width + Math.ceil(Math.random() * 250)
        }
        this.dx += - this.speed //ajoute le vitesse de déplacement en X qui est contante
        this.drawCloud()
    }
}

export default Cloud