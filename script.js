const dino = document.querySelector('.dino');
console.log(dino);
let pulando = false;
const container = document.querySelector('.background');
let posicaoDino = 0;
let morreu = false;

document.addEventListener('keydown', (e) => {
    if(e.keyCode === 32 && !pulando && !morreu) {
        pular();
    }
});

function pular(){
    if(morreu) return;

    let sobeIntervalo = setInterval(()=>{
        if (posicaoDino >= 160){
            clearInterval(sobeIntervalo);

        let desceIntervalo = setInterval( ()=>{           
                pulando = true;
                posicaoDino -= 15;
                dino.style.bottom = posicaoDino + 'px';
            if(posicaoDino <= 0){
                clearInterval(desceIntervalo);
                pulando = false;
            }
        },20);
        }else{
            pulando = true;
            posicaoDino += 20;
            dino.style.bottom = posicaoDino + 'px';
        }
    },20);
}

function geraCactus(){
    let posicaoCactus = 1000;
    const cactus = document.createElement('div');
    let aleatorio = Math.random() * 10000;
   
    cactus.classList.add('cactus');
    container.appendChild(cactus);
    cactus.style.left = posicaoCactus + 'px';
    

    let moveCactus = setInterval( ()=>{
        if (morreu) return;
        posicaoCactus -= 10;
        if(posicaoCactus <= -60){
            clearInterval(moveCactus);
            container.removeChild(cactus);
            //colisão
        }else if(posicaoCactus >= 0 && posicaoCactus <= 60 && posicaoDino < 50 ){
            clearInterval(moveCactus);
            morreu = true;
            gameOver();
        }else{
            cactus.style.left = posicaoCactus + 'px';
        }
    },20);
    if (!morreu) setTimeout(geraCactus, aleatorio);
}
function gameOver(){
    console.log("Game Over");
    let fimDejogo  = document.createElement("h1");
    let text = document.createTextNode("Game Over");
    fimDejogo.classList.add('gameOver')
    fimDejogo.appendChild(text);    
    document.body.appendChild(fimDejogo);
    morreu = true;
    container.classList.remove('background')
    container.classList.add('backgroundParado')
}

geraCactus();


