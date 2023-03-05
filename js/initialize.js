var theBigInterval;

function theBigTick() {
    if (!State.inBattle) {
        playerPosition.tick()
        Spawners.spawnerTick()
        enemies.moveEnemies()
    }
}

function initialize () {
    Spawners.createSpawners()
    window.addEventListener("resize",()=>{Spawners.createSpawners()})
    Bestiary["miniGhost"]=new Specimen(0,"miniGhost","Mini Ghost",20,11,5,2,2.5)
    Bestiary.species++;
    Bestiary.list.push("miniGhost")
    enemies.createEnemy()
    initializeKeys()
    theBigInterval=setInterval(theBigTick,1000/60)
    Sounds.cache[2].loop=true
    Sounds.cache[2].play()
    Sounds.currentSound=1;
}

initialize()