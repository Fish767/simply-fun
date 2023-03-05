var Battle={
    playerStatList: ["Name","HP","ATK","DEF","AGI"],
    State: {
        turn: 0,
        phase: 0,
        ticker: null
    },
    battleContainer: document.getElementById("battleContainer"),
    initialize(enemy, location) {
        console.log(enemy)
        document.getElementById("battleContainer").style.visibility="visible";
        Sounds.pauseCurrent()
        let random=Math.floor(Math.random()*2);
        Sounds.cache[random].play()
        Sounds.cache[random].loop=true
        State.inBattle=true;
        State.enemyBase=enemy
        State.enemyLocation=location
        this.battleContainer.innerHTML+="<div id=\"enemyHealthBar\"><div id=\"enemyBattleHealthBar\"></div></div><div id=\"enemyAutoAttackCooldown\"><div id=\"enemyBattleFillBar\"></div></div><div id=\"enemyPic\"></div><div id=\"playerAutoAttackCooldown\"><div id=\"playerBattleFillBar\"></div></div><div id=\"playerHealthBar\"><div id=\"playerBattleHealthBar\"></div></div><div id=\"playerPic\"></div><div id=\"playerStats\"></div>"
        switch (enemy.specimen){
            case "miniGhost":
                document.getElementById("enemyPic").innerHTML+="<img src=\".\\pics\\Enemies\\MiniGhost\\MiniGhost_Idle.gif\">"
        }
        document.getElementById("playerPic").innerHTML+="<img src=\".\\pics\\Player\\Werebeast_4\\Werebeast_4_10.png\">"
        let tempString1, tempString2=null;
        for (let i=0; i<this.playerStatList.length; i++) {
            switch (this.playerStatList[i]) {
                case "Name":
                    tempString1=PlayerBattleStats.stats[PlayerBattleStats.statPropertyNames[0]]
                    break;
                case "HP":
                    tempString1=PlayerBattleStats.stats[PlayerBattleStats.statPropertyNames[1]]
                    tempString2=PlayerBattleStats.stats[PlayerBattleStats.statPropertyNames[2]]
                    break;
                case "ATK":
                    tempString1=PlayerBattleStats.stats[PlayerBattleStats.statPropertyNames[3]]
                    break;
                case "DEF":
                    tempString1=PlayerBattleStats.stats[PlayerBattleStats.statPropertyNames[4]]
                    break;
                case "AGI":
                    tempString1=PlayerBattleStats.stats[PlayerBattleStats.statPropertyNames[5]]
                    break;
            }
            if (tempString2!==null) {
                document.getElementById("playerStats").innerHTML+="<div class=\"playerBattleStats\">"+this.playerStatList[i]+": "+tempString1+"/"+tempString2+"</div>"
            }else {
                document.getElementById("playerStats").innerHTML+="<div class=\"playerBattleStats\">"+this.playerStatList[i]+": "+tempString1+"</div>"
            }
            tempString2=null
        }
        this.State.tempEnemy={
            hp: Bestiary[enemy.specimen].hp,
            maxHp: Bestiary[enemy.specimen].hp,
            atk: Bestiary[enemy.specimen].atk,
            def: Bestiary[enemy.specimen].def,
            cd: Bestiary[enemy.specimen].cooldown
        }
        this.State.battleStart=Date.now()
        this.State.playerLastAutoAttack=this.State.battleStart
        this.State.enemyLastAutoAttack=this.State.battleStart
        this.State.ticker=setInterval(()=>{Battle.tick()}, 1000/60)
    },
    playerAutoAttack() {
        this.State.playerLastAutoAttack=Date.now()
        this.State.tempEnemy.hp-=(PlayerBattleStats.stats.atk-this.State.tempEnemy.def)
        console.log(this.State.tempEnemy.hp)
        Battle.drawEnemyHealthBar()
    },
    enemyAutoAttack() {
        this.State.enemyLastAutoAttack=Date.now()
        PlayerBattleStats.stats.hp-=(this.State.tempEnemy.atk-PlayerBattleStats.stats.def)
        console.log(PlayerBattleStats.stats.hp)
        Battle.drawPlayerHealthBar()
    },
    drawCdBars() {
        document.getElementById("playerBattleFillBar").style.width=(this.State.calcStart-this.State.playerLastAutoAttack)/1000/PlayerBattleStats.stats.autoAttackCooldown*100+"%"
        document.getElementById("enemyBattleFillBar").style.width=(this.State.calcStart-this.State.enemyLastAutoAttack)/1000/this.State.tempEnemy.cd*100+"%"
    },
    drawPlayerHealthBar() {
        if (PlayerBattleStats.stats.hp<=0) {
            document.getElementById("playerBattleHealthBar").style.width=0+"%"
            return
        }else {
            document.getElementById("playerBattleHealthBar").style.width=PlayerBattleStats.stats.hp/PlayerBattleStats.stats.maxHP*100+"%"
        }
    },
    drawEnemyHealthBar() {
        if (this.State.tempEnemy.hp<=0) {
            document.getElementById("enemyBattleHealthBar").style.width=0+"%"
            return
        }else {
            document.getElementById("enemyBattleHealthBar").style.width=this.State.tempEnemy.hp/this.State.tempEnemy.maxHp*100+"%"
        }
    },
    tick() {
        this.State.calcStart=Date.now()
        if (this.State.tempEnemy.hp<=0) {
            this.win()
        }
        Battle.drawCdBars()
        if ((this.State.calcStart-this.State.playerLastAutoAttack)/1000>PlayerBattleStats.stats.autoAttackCooldown) {
            Battle.playerAutoAttack()
        }
        if ((this.State.calcStart-this.State.enemyLastAutoAttack)/1000>this.State.tempEnemy.cd) {
            Battle.enemyAutoAttack()
        }
    },
    win() {
        clearInterval(Battle.State.ticker)
        alert("You won!!")
        enemies.removeEnemy(State.enemyLocation)
        this.battleContainer.style.visibility="hidden"
        State.inBattle=false
    }
    
}