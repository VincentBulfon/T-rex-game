const ground = {
	game : null,
	maxOffset : 600,
	offset : 0,
	sx : 2,
	sy : 104,
	sw : 2400,
	sh : 24,
	dx : 0,
	dy : 0,
	dw : 1200,
	dh : 11,
	init(game){
	this.game = game
	this.dy = this.game.canvas.height - this.dh
	this.drawBg()
	},
	drawBg(){
	this.game.ctx.drawImage(this.game.sprite, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh );
	}, 
	update(){
		if(this.dx > -this.maxOffset ){
			this.dx += -this.game.speed
			this.drawBg()
		}else{
			this.dx = 0
			this.drawBg()
		}
	}
}

export default ground;