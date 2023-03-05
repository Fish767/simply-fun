var Keys={
    keyChecker: [],
    ctrlPressed: false,
    altPressed: false,
    aPressed: false,
    dPressed: false,
    wPressed: false,
    sPressed: false,
    bindings(char,keyCode) {
        for(let i=0; i<this.keyChecker.length; i++) {
            if (this.keyChecker[i]===keyCode) {
                return;
            }
        }
        
        if (keyCode===87){
            this.wPressed=true;
        }else if (keyCode===83){
            this.sPressed=true;
        }else if (keyCode===68){
            this.dPressed=true;
        }else if (keyCode===65) {
            this.aPressed=true;
        }else if (keyCode===17) {
            this.ctrlPressed=true
        }else if (keyCode===18) {
            this.altPressed=true
        }else {
            console.log(keyCode)
            console.log(char)
        }
        this.keyChecker.push(keyCode)

    },
    up(char,keyCode) {
        for(let i=0; i<this.keyChecker.length; i++) {
            if (keyCode===87){
                this.wPressed=false;
            }else if (keyCode===83){
                this.sPressed=false;
            }else if (keyCode===68){
                this.dPressed=false;
            }else if (keyCode===65) {
                this.aPressed=false;
            }else if (keyCode===17) {
                this.ctrlPressed=false
            }else if (keyCode===18) {
                this.altPressed=false
            }
            if (this.keyChecker[i]===keyCode) {
                this.keyChecker.splice(i,1)
                return;
            }
        }
    }
}

function initializeKeys() {
    document.addEventListener('keydown', function(event){
        let char=String.fromCharCode(event.keyCode)
        Keys.bindings(char||null,event.keyCode)
    });
    document.addEventListener('keyup', function(event){
        let char=String.fromCharCode(event.keyCode)
        Keys.up(char||null,event.keyCode)
    });
}