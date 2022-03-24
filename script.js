const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //* permet de charger tout les methodes 2d et seront accessibles via la const ctx
// pour voir les proprietes que l'on peut modifier dans ctx on peut lui faire un console.log

console.log(ctx);
// nous allon sutiliser principalement draw image method pour faire l'animation de notre sprite

// Pour éviter les problemes de calculs et de scaling nous allons donner la même taille à notre canvas qu'à notre élément dans le css.
// Nous Mettons des majuscule pour specifier que cette constante sera "globale"
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

// nous allons voir 2 méthodes pour animer un sprite: une façon plus simple et une façon plus poussée:


// pour commencer je declare une variable image: C'est un constructeur de class image.
// cela va créer une image html identique à si nous avions créer avec balise img
// on peut l'afficher dans le html mais elle va nous servir ici à store notre spreadsheet image
const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

// animons quelquechose dans notre canvas:
// cette function sera notre animation loop

let frameX = 0 ; //* permet de choisir le numero du sprite sur la ligne
let frameY = 5 ; //* permet de choisir la ligne dans la spreadsheet
// pour changer la vitesse d'animation trick simple:
let gameFrame = 0;
const staggerFrame = 6; // valeur qui ralentira la vitesse d'animation

function animate () {
    // tout d'abord nous effaçons l'intérieur du canvas avant chaque animation frame
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ****************** //
    //* METHODE DRAW IMAGE //
    // ****************** //
    //* 3/5 ARGUMENTS      //
    // ****************** //  
    //! la methode draw image necessite 3, 5 ou 9 arguments.
    // le premier est toujours l'image que l'on souhaite utiliser
    // puis coordonnées de départ x, y 
    // 4eme et 5eme arguments sont widht et height pour redimensionner
    // dans ce cas l'image complète est redimensionner et étirée (donc la spreadsheet omage complète est redimentionné (scale) et étirée (stretch) selon les dimensions choisis.) Ici les dimensions sont la taille du canvas.
    // ctx.drawImage(playerImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // dans le cas de 9 arguments (forcement pour notre spreadsheet) les arguments ne sont plus les même:

    // ********************** //
    //* DRAW IMAGE 9 ARGUMENTS //
    // ********************** //
    // 1 l'image toujours que l'on souhaite utiliser:
    // 2,3 source x et y dans l'image(spreadsheet)
    // 4,5 width et height du morceau découpé
    // 6,7 destination x et y sur notre canvas
    // 8,9 width et height sur notre canvas
    const spriteWidth = 575;
    // (pour connaître cette valeur je prends la largeur de ma feuille et la divise par le nombre de colonne)
    const spriteHeight = 523;
    
    ctx.drawImage(playerImage, frameX*spriteWidth, frameY*spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    
    // j'appelle l'animationFrame et relance la function à chaque fois en modifiant la capture utilisée
    //* gameFrame augmente de 1 à chaque tour.
    //*si staggerFrame = 5 alors le modulo sera == à 0 toutes les 5 passages
    //* ou par exemple tout les 5 passages ou change l'image ce qui permettra de ralentir l'animation
    //* plus staggerFrame est haut et plus l'animation ralentira.
    if (gameFrame % staggerFrame == 0) {
        if (frameX < 4) frameX++; //! attention nous demarrons à 0 ce nombre doit être adapté au nombre de frame de la ligne selectionnée dans la spreadsheet
        else frameX = 0;
    }
    gameFrame++;
    requestAnimationFrame(animate);
};
animate();


// ******************************************************** //
//* SECONDE METHODE POUR CHOISIR LE NOMBRE DE FRAME BY LINE //
// ******************************************************** //

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

canvas2.width = 600;
canvas2.height = 600;

// const playerImage = new Image();
// playerImage.src = 'shadow_dog.png';

let frameX2 = 0 ; //* permet de choisir le numero du sprite sur la ligne
let frameY2 = 0 ; //* permet de choisir la ligne dans la spreadsheet
// pour changer la vitesse d'animation trick simple:
let gameFrame2 = 0; // numéro de l'image
const staggerFrame2 = 7; // valeur qui ralentira la vitesse d'animation

function animate2 () {

    ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    const spriteWidth = 575;
    const spriteHeight = 523;
    
    let position = Math.floor(gameFrame2/staggerFrame2) % 6; // on donne à position la frame actuelle de la ligne
    // math.floor permet de retourner l'integer du dessous.
    // donc si staggerFrame2 = 5 et gameFrame2 = 0 et que l'on augmente gameFrame2 à chaque passage:
    // position sera sur 1 pour les 5 premiers passages puis 2 pendant 5 passages, ...
    // le modulo 6 permet de spécifier le nombre de frame sur la ligne. Dès que le résultat = 0 c'est que l'on a atteint notre quota de frame et l'on pourra faire une condition avec si position == 0 (donc modulo == 0 car la division à atteint le nombre derrière le modulo)
    // 0 % 6 = 0 (position)
    // 1 % 6 = 1 (position)
    // 2 % 6 = 2 (position)
    // ..
    // 6 % 6 = 0 (position)
    // 7 % 6 = 1 (position)
    // 8 % 6 = 2 (position)
    // ..
    // 12 % 6 = 0 (position)
    // ..
    frameX2 = spriteWidth*position; // frameX contient alors le nombre de pixel en partant du début de la frame actuelle
    // on peut donc le mettre directement en second argument de la ligne suivante
    ctx2.drawImage(playerImage, frameX2, frameY2*spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    
    gameFrame2++;
    requestAnimationFrame(animate2);
};
animate2();

// ******************************************************** //
//* Troisieme METHODE POUR CHOISIR LE NOMBRE DE FRAME BY LINE //
// ******************************************************** //

// ******************************* //
//* CHAQUE LIGNE SERA UN OBJET    //
//* CHAQUE OBJET PEUT CONTENIR:   //
//* pixelvalueswidht and height   //
//* qui pourrait être différente for each frame or each objet   //
//* pourrait contenir un tableau de location pour chaque frame   //
// ****************************** //
const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas3.getContext('2d');
canvas3.width = 600;
canvas3.height = 600;

const spriteWidth = 575;
const spriteHeight = 523;

// let frameX3 = 0 ; //* permet de choisir le numero du sprite sur la ligne
// let frameY3 = 0 ; //* permet de choisir la ligne dans la spreadsheet
// pour changer la vitesse d'animation trick simple:

const spriteAnimations = []; // contiendra par la suite l'ensemble de nos lignes sous formes d'une clé représentant le nom de l'animationassocié à un objet contenant l'ensemble des frame (dans le tableau loc) de la ligne correspondante à la key.
// dans le tableau suivant je vais définir les animations de ma spreadsheet
const animationStates = [// notre tableau contient plusieurs objets
    // 1 objet = 1 animation: idle, jump, run, ...
    // les crochets permettent de créer un objet
    // comme notre spreadsheat a des sprites tous de la même taille
    // nous n'avons pas besoin de définir autre chose que le name et les frames
    // sinon pour chaque objet nous pourrions définir des width and height différents.
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'gethit',
        frames: 4,
    }
];


// forEach() appelle une function pour each element of array
// dans notre cas, on met directement la function ici avec =>
// forEach(element, index)
// state sera objet 0 puis 1 ...
// Pour le premier objet
// state.name = 'idle'
// state.frame = 7
// index = 0
animationStates.forEach((state, index) => {
    // nous allons créer un objet frames qui contiendra un tableau de location de chaque frame de l'animation (idle pour la premiere boucle)
    let frames = {
        loc: []
    }
    for (let j = 0; j < state.frames; j++){ // state.frames correspond au nombre de frame de l'objet idle au premier tour de boucle 
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        //on ajoute la frame sous forme d'objet à notre tableau loc:
        frames.loc.push({x: positionX, y: positionY});
    }

    // nous ajoutons alors dans notre tableau spriteAnimations l'objet frames crée et nous lui donnerons comme clé le nom récupéré de la clé du forEach:
    spriteAnimations[state.name] = frames;
    // à la fin de toute les boucles notre tableau spriteAnimations 
    // srea donc rempli de frames (objet contenant l'ensemble des frames d'une ligne) avec comme clé le nom de l'animation.
});

console.log(spriteAnimations);
let playerState = 'idle'; //* choix de l'animation. playerState car for a game. On va le rendre dynamique avec Js en fonction du choix de l'utilisateur
let gameFrame3 = 0; // numéro de l'image
let staggerFrame3 = 5; //* valeur qui ralentira la vitesse d'animation idem renndu dynamique ci dessous:

// changement du playerState selon la selection de l'user:
const chooseAnimation = document.getElementById('animations');
chooseAnimation.addEventListener('change', function(e) {
    playerState = e.target.value;
})

// changement du staggerFrame3 (vitesse animation) selaon selection de l'user:
const chooseSpeed = document.getElementById('speed');
chooseSpeed.addEventListener('change', function(e) {
    staggerFrame3 = e.target.value;
})

function animate3 () {

    ctx3.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    let position = Math.floor(gameFrame3/staggerFrame3) % spriteAnimations[playerState].loc.length;  

    let frameX3 = spriteAnimations[playerState].loc[position].x; 
    let frameY3 = spriteAnimations[playerState].loc[position].y; 

    ctx3.drawImage(playerImage, frameX3, frameY3, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    
    gameFrame3++;
    requestAnimationFrame(animate3);
};
animate3()
