class Bird {
    constructor(game){
        this.originx = 260
        this.game = game
        this.type = 'bird' //permet de différencier le cactus des bird dans le tableau opponent situé dans game
        this.frame = [
        {
            sx : 260,
            sy : 14,
            sw : 92,
            sh : 68,
            dw : 46,
            dh : 34
        },
        {
        sx : 356, 
        sy : 2,
        sw : 92,
        sh : 60,
        dw : 46,
        dh : 30,
        }
     ]
        this.dx = 0
        this.dy = 0
        this.step = 0
        this.maxStep = 1
        this.speed  = 2
        this.framescount = 0
    }

        init() {
        this.dx = this.game.canvas.width + 10;
        this.posSelector()
    }

    drawBird(){
        this.game.ctx.drawImage(this.game.sprite, this.frame[this.step].sx, this.frame[this.step].sy, this.frame[this.step].sw, this.frame[this.step].sh, this.dx, this.dy, this.frame[this.step].dw, this.frame[this.step].dh )
        //console.log(this.game.sprite, this.frame[this.step].sx, this.frame[this.step].sy, this.frame[this.step].sw, this.frame[this.step].sh, this.dx, this.dy, this.frame[this.step].dw, this.frame[this.step].dh)
    }

    update(){
        this.framescount = this.framescount + 1;
        if(this.framescount >= 8){
           this.step < this.maxStep ? this.step += 1 : this.step = 0;
            this.framescount = 0;
        }

        this.dx -= this.game.speed * 1.125
        
        this.drawBird();

    }
    posSelector(){
        const rand = Math.random() * 10
        if(rand > 5){
           this.dy =  this.game.canvas.height / 2
        }else{
           this.dy =  this.game.canvas.height - 40 
        }
    }

};

export default Bird;