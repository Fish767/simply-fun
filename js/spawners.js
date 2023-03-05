var spawnerProperties=["x", "y", "id"]

class Spawner {
    constructor(x, y, id) {
        for (let i=0; i<spawnerProperties.length; i++) {
            this[spawnerProperties[i]]=arguments[i]
        }
    }
}


var Spawners={
    numberOfSpawners: 100,
    spawnerList: [],
    createSpawners() {
        this.spawnerList=[]
        let perimeter=window.innerHeight*2+window.innerWidth*2+64*4;
        let x=-64;
        let y=-64;
        let increment=perimeter/this.numberOfSpawners;
        for (let i=0; i<this.numberOfSpawners; i++) {
            this.spawnerList.push(new Spawner(x,y,i));
            x+=increment;
            if (x>window.innerWidth) {
                y+=x-window.innerWidth
                x=window.innerWidth
            }
            if (y>window.innerHeight) {
                increment*=-1
                x-=y-window.innerHeight
                y=window.innerHeight
            }
            if (x<-64) {
                y+=x
                x=-64
            }
            if (y<-64) {
                return;
            }
        }
    },
    spawnEnemy(num, enemy) {
        console.log(enemy)
        document.getElementById("enemyContainer").innerHTML+="<div id=\"enemy"+enemy.id+"\" class=\"enemy "+Bestiary[enemy.specimen].name+"\"></div>"
        document.getElementById("enemy"+enemy.id).style.top=enemy.y+"px"
        document.getElementById("enemy"+enemy.id).style.left=enemy.x+"px"
    },
    spawnerTick() {
        if (enemies.queuedEnemies.length>0) {
            for (let i=0; i<enemies.queuedEnemies.length;) {
                let enemy=enemies.queuedEnemies[i]
                let ranNum=Math.floor(Math.random()*Spawners.numberOfSpawners)
                let spawner=Spawners.spawnerList[ranNum]
                console.log(enemy.x)
                try {
                    enemy.x=spawner.x
                    enemy.y=spawner.y
                } catch (error) {
                    console.log(error)
                }
                Spawners.spawnEnemy(ranNum, enemy)
                enemies.currentEnemies.push(enemies.queuedEnemies.splice(0,1)[0])
            }
        }
    }
}


