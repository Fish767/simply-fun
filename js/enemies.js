var enemyProperties=["id","specimen","accelleration","x","y","frame","subFrame","direction","attacking"]
var specimenProperties=["id","name","displayName","hp","atk","def","accelleration", "cooldown"]

class Specimen {
    constructor(id, name, displayName, hp, atk, def, accelleration, cooldown) {
        for (let i=0; i<specimenProperties.length; i++) {
            if (i<arguments.length) {
                this[specimenProperties[i]]=arguments[i]
            }
        }
    }
}

var Bestiary = {
    species: 0,
    list: []
}

class Enemy {
    constructor(id,specimen) {
        for (let i=0; i<enemyProperties.length; i++) {
            if (i<arguments.length) {
                this[enemyProperties[i]]=arguments[i]
            }else {
                this[enemyProperties[i]]=0
            }
        }
        this.accelleration=Bestiary[this.specimen].accelleration
        this.x=-64
        this.y=-64
    }
}

var enemies={
    ids: [],
    queuedEnemies: [],
    currentEnemies: [],
    xOffset: 0,
    yOffset: 0,
    createEnemy() {
        if (this.ids.length>=1) {
            this.queuedEnemies.push(new Enemy(this.ids.splice(0,1)[0],Bestiary.list[Math.floor(Math.random()*Bestiary.species)]))
        }
    },
    moveEnemies() {
        for (let i=0; i<this.currentEnemies.length; i++) {
            let enemy=this.currentEnemies[i]
            document.getElementById("enemy"+enemy.id).classList.remove(enemy.direction)
            if (document.getElementById("enemy"+enemy.id).classList.contains("attacking")) {
                Battle.initialize(enemy, i);
                console.log("attacking")
            }else {
                if (enemy.x+10+this.xOffset>window.innerWidth/2) {
                    if (enemy.x+10+this.xOffset-(window.innerWidth/2)>enemy.accelleration) {
                        enemy.x-=enemy.accelleration
                        enemy.direction="left"
                        enemy.attacking=false
                    }else {
                        enemy.x=window.innerWidth/2-10-this.xOffset
                        enemy.attacking=true
                    }
                }else if (enemy.x+56+this.xOffset<window.innerWidth/2) {
                    if (enemy.x+56+this.xOffset+window.innerWidth/2>enemy.accelleration) {
                        enemy.x+=enemy.accelleration
                        enemy.direction="right";
                        enemy.attacking=false
                    }else {
                        enemy.x-=window.innerWidth/2-56-this.xOffset
                    }
                }
                if (enemy.y+32+this.yOffset>window.innerHeight/2) {
                    if (enemy.y+32+this.yOffset-(window.innerHeight/2)>enemy.accelleration) {
                        enemy.y-=enemy.accelleration
                    }else {
                        enemy.y=window.innerHeight/2-32-this.yOffset
                    }
                }else if (enemy.y+32+this.yOffset<window.innerHeight/2) {
                    if (enemy.y+32+this.yOffset+(window.innerHeight/2)>enemy.accelleration) {
                        enemy.y+=enemy.accelleration
                    }else {
                        enemy.y=window.innerHeight/2-32-this.yOffset
                    }
                }
                if (enemy.y + 80 + this.yOffset >= window.innerHeight / 2 && enemy.y - 12 + this.yOffset <= window.innerHeight / 2 && enemy.x + 10 + this.xOffset <= window.innerWidth / 2 && enemy.x + 56 + this.xOffset >= window.innerWidth / 2) {
                    enemy.attacking=true
                }else {
                    enemy.attacking=false
                }
            } 
            document.getElementById("enemy"+enemy.id).style.top=enemy.y+this.yOffset+"px"
            document.getElementById("enemy"+enemy.id).style.left=enemy.x+this.xOffset+"px"
            document.getElementById("enemy"+enemy.id).classList.add(enemy.direction)
            if (enemy.attacking){document.getElementById("enemy"+enemy.id).classList.add("attacking")}
        }
    },
    removeEnemy(num) {
        let enemy=this.currentEnemies[num]
        document.getElementById("enemy"+enemy.id).remove()
        enemies.currentEnemies.splice(num,1)

    }
}

for (let i=0; i<150; i++) {
    enemies.ids.push(i)
}


/** {
 * miniGhost
 * right to right 22px
 * left to left 20px
 * top to top 24px
 * bottom to bottom 4px
 * attack frames 4-6
 * max attack animation frames 10
 * attack left to left 10px
 * attack height 25px
 * attack bottom to bottom 14px} */