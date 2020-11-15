const gameController = {
	game : null,
	key : 's',
	keypressed : false,
	restartPressed : false,
	init(game){
		this.game = game
		this.listenningStartkey()
		this.restartPressed = false
		this.keypressed = false
	},
	listenningStartkey(){
		window.addEventListener('keydown',(e)=> {
			if(this.game.willstart === true){
				if(e.key ===/*this.key*/ 's' ){
					this.game.msg.endmsg()
					this.game.animate()
					this.game.willstart = false
				}
			}

			if (e.key === 'e') {
				if(this.game.songisplaying == false){
					this.game.trexSound.play()
					this.game.songisplaying = true
				}else{
					this.game.trexSound.pause()
					this.game.songisplaying = false
				}
			}

		})
	},
	listenningKey(){
		window.addEventListener('keydown',(e)=>{
			if (e.keyCode == '38') {
				if(this.keypressed == false){
					if(this.game.willstart == false){
						this.game.player.moveUp()
						this.game.jumpSound.play()
					}
				}
				this.keypressed = true //signale qu'une touche est down
			} else if (e.keyCode == '40') {
				this.keypressed = true
				this.game.player.crounch = true
			}else if ((e.keyCode == '83') && (this.game.willstart == false)) {
				this.game.willstart = true
				this.game.restartGame()
			}
		})
		window.addEventListener('keyup', (e)=>{
			if(e.keyCode == '40'){
				this.game.player.crounch = false
			}
		})
	},
	easter(){
		this.game.trexSound
	},
}

export default gameController;