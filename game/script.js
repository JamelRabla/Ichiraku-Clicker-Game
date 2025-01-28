// Déclaration variables <------------------------------------------------>

const nbrclic = document.getElementById('nbrclic');
const nbrramen = document.getElementById('nbrramen');
const bonus = document.getElementById('bonus');
const bonuslist = document.getElementById('bonuslist');
const clic = document.getElementById('clic');
const son = document.getElementById('son');
const entrer = document.body;

let clic_val = 1;
let click=0;
let ramen=0;
let bonusbuy= "";

let bonusDisp = {
    'uzumaki': {
        'icon': '🍥',
        'cost':50,
        'buy': false,
        'multiplier':1
    },
    'onigiri': {
        'icon': '🍙',
        'cost': 100,
        'buy': false,
        'multiplier': 2
    },
    'sushi': {
        'icon': '🍣',
        'cost': 1000,
        'buy': false,
        'multiplier': 3
    },
    'sakura': {
        'icon': '🌸',
        'cost': 2500,
        'buy': false,
        'multiplier': 4
    },
    'kurama': {
        'icon': '🦊',
        'cost': 5000,
        'buy': false,
        'multiplier': 5
    },
}

// Fonctions <------------------------------------------------>
function ramenClic(){
    nbrclic.innerText = click;
}

function ramenNbr(){
    nbrramen.innerText = Math.round(ramen); //Math.round sert à arrondire la valeur de ramen
}

function listBonus(){
    if(bonusbuy === ""){
        bonus.innerText = "Aucun";
    }
    else{
        bonus.innerText = bonusbuy;
    }
}

function buttonBonus(){
    for(let i in bonusDisp){
        let button = document.createElement('button');
        button.disabled = true;
        button.id = i;
        let texte = document.createTextNode(bonusDisp[i]['icon']);
        button.appendChild(texte);
        bonuslist.appendChild(button);
    }
}

function checkBonus(){
    for(let i in bonusDisp){
        if(bonusDisp[i]['cost']<=ramen && !bonusDisp[i]['buy'] && ramen-bonusDisp[i]['cost'] >= 0){
            document.getElementById(i).disabled = false;
        }else{
            document.getElementById(i).disabled = true;
        }
    }
}

function addRamen(){
    click+=1;
    ramen+=clic_val;
    checkBonus();
    ramenNbr();
    ramenClic();
}

function buyBonus(e){
    if(ramen-bonusDisp[e.target.id]['cost']<0 || bonusDisp[e.target.id]['buy']){
        return;
    }
    else{
        ramen-=bonusDisp[e.target.id]['cost'];
        clic_val+=bonusDisp[e.target.id]['multiplier'];
        bonusDisp[e.target.id]['buy']=true;
        bonusbuy+=bonusDisp[e.target.id]['icon'];
        document.getElementById(e.target.id).style.display="none";
        ramenNbr();  
        listBonus();
        e.stopPropagation();
    }
}

/// <------------------------------------------------>

ramenClic();
ramenNbr();
listBonus();
buttonBonus();

clic.addEventListener('click',()=>{
    son.currentTime = 0;
    son.volume = 0.2;
    son.play();
    addRamen();
});

bonuslist.addEventListener('click',buyBonus);

