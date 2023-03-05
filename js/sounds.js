var Sounds={
    initialize() {

    },
    currentSound: false,
    cache: [new Audio(".\\music\\bgm\\Battle_-_Eldritch_Enemies.ogg"),new Audio(".\\music\\bgm\\Battle_-_Spider_Slayer.ogg"),new Audio(".\\music\\bgm\\Dungeon_-_Beastly_Barrows.ogg")],
    pauseCurrent() {
        this.cache[this.currentSound].pause()
    }
}