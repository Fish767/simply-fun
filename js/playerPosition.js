var playerPosition={
        coords: [0,0],
        acceleration:[0,0],
        interval: false,
        playerDirection: "down",
        playerFrame: 1,
        playerSubFrame: 0,
        tick() {
            if (Keys.aPressed) {
                if (playerPosition.acceleration[0]<5) {
                    playerPosition.acceleration[0]+=5;
                }
            }
            if (Keys.dPressed) {
                if (playerPosition.acceleration[0]>-5) {
                    playerPosition.acceleration[0]-=5;
                }
            }
            if (Keys.wPressed) {
                if (playerPosition.acceleration[1]<5) {
                    playerPosition.acceleration[1]+=5;
                }
            }
            if (Keys.sPressed) {
                if (playerPosition.acceleration[1]>-5) {
                    playerPosition.acceleration[1]-=5;
                }
            }
            playerPosition.coords[0]+=playerPosition.acceleration[0]
            playerPosition.coords[1]+=playerPosition.acceleration[1]
            enemies.xOffset+=playerPosition.acceleration[0]
            enemies.yOffset+=playerPosition.acceleration[1]
            playerPosition.acceleration[0]=0
            playerPosition.acceleration[1]=0
            document.getElementById("background").style.backgroundPositionX=playerPosition.coords[0]+"px"
            document.getElementById("background").style.backgroundPositionY=playerPosition.coords[1]+"px"
            playerPosition.setPlayerDirection()
        },
        setPlayerDirection() {
            document.getElementById("player").classList.remove(this.playerDirection+this.playerFrame)
            if (Keys.wPressed||Keys.sPressed||Keys.dPressed||Keys.aPressed) {
                this.playerSubFrame++;
                if (this.playerSubFrame>=10) {
                    this.playerFrame++;
                    this.playerSubFrame=0
                }
                if (this.playerFrame>3) {
                    this.playerFrame=1
                }
            }else {
                this.playerFrame=1
                this.playerSubFrame=10
            }
            if (Keys.wPressed) {
                if (this.playerDirection!="up") {
                    this.playerDirection="up"
                    this.playerFrame=1
                }
            }else if (Keys.sPressed) {
                if (this.playerDirection!="down") {
                    this.playerDirection="down"
                    this.playerFrame=1
                }
            }else if (Keys.aPressed) {
                if (this.playerDirection!="right") {
                    this.playerDirection="right"
                    this.playerFrame=1
                }
            }else if (Keys.dPressed) {
                if (this.playerDirection!="left") {
                    this.playerDirection="left"
                    this.playerFrame=1
                }
            }
            document.getElementById("player").classList.add(this.playerDirection+this.playerFrame)
        }
    };