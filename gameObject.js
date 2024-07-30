class GameObject {
    static width = 32;
    static height = 32;
    //static img = new Image();
    //static string = '';

    constructor(x, y, t){
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.angle = 0;
        this.t = t;
    }

    draw(ctx) {

        switch(this.t) {
            case 1:
                this.string = '🧻';
                break;
            case 2:
                this.string = '💎';
                break;
            case 3:
                this.string = '✂️';
                break;
        }

        ctx.fillText(this.string, this.x, this.y);
    }

    moveTowards(targetX, targetY) {
        this.angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.x += (this.speed + 2) * Math.cos(this.angle);
        this.y += (this.speed + 2) * Math.sin(this.angle);
        this.avoidBorder();
    }

    moveAway(targetX, targetY) {
        this.angle = Math.atan2(targetY - this.y, targetX - this.x);
        this.x -= this.speed * Math.cos(this.angle);
        this.y -= this.speed * Math.sin(this.angle);
        this.avoidBorder();
    }

    //calcDistance(targetX, targetY) {
        //return Math.sqrt((this.x - targetX) ** 2  + (this.y - targetY) ** 2);
    //}

    avoidBorder() {
        if (this.x < 20 ) {
            this.moveTowards(this.x + 20, this.y);
        } else if (this.x > 800 - 20) {
            this.moveTowards(this.x - 20, this.y);
        }

        if (this.y < 20) {
            this.moveTowards(this.x, this.y + 20);
        }
        else if (this.y > 600 - 20) {
            this.moveTowards(this.x, this.y - 20);
        }


    }
}
export {GameObject};