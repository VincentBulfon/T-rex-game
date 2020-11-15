const msg = {
	game : null,
	txt : "Press S to start and restart the game. Use the ARROWS keys to control the dino and E to play and pause the song",
	Elt : null,
	parent : null,
	frames : [
		{
			sx : 2,
			sy : 2,
			sw : 72,
			sh :64,
			dx : 0,
			dy : 0,
			dw : 36,
			dh : 32
		},
		{
			sx : 954,
			sy : 29,
			sw : 381,
			sh : 21,
			dx : 0,
			dy : 0,
			dw : 190,
			dh : 10
		}
	],
	init(game){
		this.game = game
		this.Elt = document.createElement('p')
		this.Elt.style.color = '#2071FF'
		this.Elt.style.position = 'absolute'
		this.Elt.style.marginTop = '180px'
		let Txt = document.createTextNode(this.txt)
		this.Elt.appendChild(Txt)
		this.parent = document.getElementsByClassName("game")[0]
		this.parent.appendChild(this.Elt)
		this.frames.forEach( elt => {
			elt.dx = this.game.canvas.width / 2 - elt.dw / 2
		});
		this.frames[1].dy = this.game.canvas.height / 2 - this.frames[0].dh
		this.frames[0].dy = this.game.canvas.height / 2
	},

	drawMsg(frame){
		this.game.ctx.drawImage(this.game.sprite, frame.sx, frame.sy, frame.sw, frame.sh, frame.dx, frame.dy, frame.dw, frame.dh)
	},

	endmsg(){
 		this.Elt.style.display = 'none'
	},

	gameOverMsg(){
		this.frames.forEach( elt => {
			this.drawMsg(elt)
		});
	}
}

export default msg;