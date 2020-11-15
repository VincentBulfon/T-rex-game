class Cactus{
	constructor(game){
		this.game = game
		this.type = 'cactus'
		this.spriteframes = [
			{
				sx : 446,
				sy : 2,
				sw : 68,
				sh : 70, 
				dw : 34,
				dh : 35
			},
			{
				sx : 514,
				sy : 2,
				sw : 68,
				sh : 70, 
				dw : 34,
				dh : 35
			},
			{
				sx : 581,
				sy : 2,
				sw : 68,
				sh : 70, 
				dw : 34,
				dh : 35
			},
			{
				sx : 652,
				sy : 2,
				sw : 98,
				sh : 100, 
				dw : 49,
				dh : 50
			},
			{
				sx : 752,
				sy : 2,
				sw : 98,
				sh : 100, 
				dw : 49,
				dh : 50
			},
			{
				sx : 850,
				sy : 2,
				sw : 98,
				sh : 102, 
				dw : 49,
				dh : 50
			},
		]
		this.dx = 0
		this.dy = 0
		this.cactusType = 0
		this.speedX = 0
	}
	init(){
		this.speedX = this.game.speed
		this.cactusType = Math.floor(Math.random()* this.spriteframes.length)
		this.dx = this.game.canvas.width + this.spriteframes[this.cactusType].dw
		this.dy = this.game.canvas.height - this.spriteframes[this.cactusType].dh -4
	}

	drawCactus(){
		this.game.ctx.drawImage(
			this.game.sprite,
			this.spriteframes[this.cactusType].sx,
			this.spriteframes[this.cactusType].sy,
			this.spriteframes[this.cactusType].sw, 
			this.spriteframes[this.cactusType].sh, 
			this.dx,
			this.dy, 
			this.spriteframes[this.cactusType].dw, 
			this.spriteframes[this.cactusType].dh
			)
	}

	update(){
		this.dx -= this.game.speed
		this.drawCactus()
	}

}

export default Cactus