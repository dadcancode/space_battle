const enemyShipAvatarArr = [
    "images/enemy1.jpg",
    "images/enemy2.jpg",
    "images/enemy3.jpg",
    "images/enemy4.jpg",
    "images/enemy5.jpg",
    "images/enemy6.jpg"
]

const uss = {
    hull: null,
    firepower: null,
    accuracy: null,
    avatar: null
}


class AlienShip {
    constructor(hull, firepower, accuracy, avatar) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.avatar = avatar;
    }
}

class AlienFleet {
    constructor() {
        this.fleetOfShips = [];
    }
    generateShip (hullMax, hullMin, fpMax, fpMin, accMax, accMin, quantity) {
        for(let i = 0; i < quantity; i++) {
            let randHull = Math.floor(Math.random() * (hullMax - hullMin) + hullMin);
            let randFp = Math.floor(Math.random() * (fpMax - fpMin) + fpMin);
            let randAcc = Math.random() * (accMax - accMin) + accMin;
            let randAv = enemyShipAvatarArr[Math.floor(Math.random() * enemyShipAvatarArr.length)];
            let newEnemy = new AlienShip(randHull, randFp, randAcc, randAv);
            this.fleetOfShips.push(newEnemy);
        }
    }
}

const newFleet = new AlienFleet();

const statusUpdate = () => {
    updateEnemy();
    let remainingShips = 0;
    for(let i = 0; i < newFleet.fleetOfShips.length; i++) {
        if(newFleet.fleetOfShips[i].hull > 0) {
            remainingShips++;
        }
    }
    updateHTML("status-message-data", `Your hull is at ${uss.hull * 5}%. There are ${remainingShips} ships left in the enemy fleet. What is our next move commander?`)
    // alert(`Your hull is at ${uss.hull * 5}%. There are ${remainingShips} ships left in the enemy fleet.`);
    // nowWhat();
}

const statusCheck = () => {
    if(uss.hull > 0) {
        for(let i = 0; i < newFleet.fleetOfShips.length; i++) {
            if(newFleet.fleetOfShips[i].hull > 0) {
                statusUpdate();
            }
        } //endGame('w');
    } else {
        endGame('l');
    }   
}


const updateHTML = (elemendID, updateData) => {
    document.getElementById(elemendID).innerText = updateData;
}

const start = () => {
    // alert('Welcome to SpaceBattle!');
    // alert('You are captain of the fabled USS Schwarzenegger and an alien fleet is coming right at us!');
    uss.hull = 20;
    uss.firepower = 5;
    uss.accuracy = .7;
    uss.avatar = "images/user1.jpg";
    newFleet.generateShip(6, 3, 5, 2, .81, .6, 6);
    updateHTML("user-firepower-data", uss.firepower);
    updateHTML("user-hull-data", uss.hull);
    updateHTML("user-accuracy-data", uss.accuracy);
    document.getElementById("user-avatar-data").src = uss.avatar;
    updateEnemy();
    document.getElementById("status-avatar-data").src = 'images/background2.jpg';
    statusUpdate();
}

// const nowWhat = () => {
//     let choice = prompt('What is our next move commander?(Select number)', '1 Attack / 2 Retreat');
//     if(choice === '1') {
//         attack();
//     } else if(choice === '2') {
//         alert('You coward! You are hit from behind as you run away and your entire crew is lost!');
//         start();
//     } else {
//         alert('Invalid selection');
//         nowWhat();
//     }
// }

const setOpponent = () => {
    for(let i = 0; i < newFleet.fleetOfShips.length; i++) {
        if(newFleet.fleetOfShips[i].hull > 0) {
            return newFleet.fleetOfShips[i];
        }
    }
}

const updateEnemy = () => {
    let nextEnemy = setOpponent();
    updateHTML("enemy-firepower-data", nextEnemy.firepower);
    updateHTML("enemy-hull-data", nextEnemy.hull);
    updateHTML("enemy-accuracy-data", nextEnemy.accuracy);
    document.getElementById("enemy-avatar-data").src = nextEnemy.avatar;
}

const attack = () => {
    let currEnemy = setOpponent();
    if(Math.random() < uss.accuracy) {
        currEnemy.hull -= uss.firepower;
        updateHTML("enemy-hull-data", currEnemy.hull);
        if(currEnemy.hull <= 0) {
            updateHTML("status-message-data", `Direct hit! You did ${uss.firepower} damage. The enemy has been destroyed.`);
            // alert(`Direct hit! You did ${uss.firepower} damage. The enemy has been destroyed.`);
            setTimeout(function () {statusCheck()}, 1500);
        } else {
            updateHTML("status-message-data", `Direct hit! You did ${uss.firepower} damage. The enemy's hull is down to ${currEnemy.hull}.`)
            // alert(`Direct hit! You did ${uss.firepower} damage. The enemy's hull is down to ${currEnemy.hull}.`)
            setTimeout(function () {enemyAttack(currEnemy)}, 1500);
        }
    } else {
        updateHTML("status-message-data", 'You missed!');
        // alert('You missed!')
        setTimeout(function () {enemyAttack(currEnemy)}, 1500);
    }
}

const enemyAttack = (attacker) => {
    if(Math.random() < attacker.accuracy) {
        uss.hull -= attacker.firepower;
        updateHTML("user-hull-data", uss.hull);
        updateHTML("status-message-data", `We have been hit! We have taken ${attacker.firepower} damage.`)
        // alert(`We have been hit! We have taken ${attacker.firepower} damage.`)
        setTimeout(function () {statusCheck()}, 1500);
    } else {
        updateHTML("status-message-data", 'Nice flying commander! The enemy missed!');
        // alert('Nice flying commander! The enemy missed!');
        setTimeout(function () {statusCheck()}, 1500);
    }
}

const endGame = (str) => {
    if(str === 'w') {
        updateHTML("status-message-data", "You did it! You have destroyed the enemy fleet!");
        // alert('You did it! You have destroyed the enemy fleet!');
    } else if(str === 'l') {
        updateHTML("status-message-data", "Our ship has been destroyed by the alien scurge!");
        // alert('Our ship has been destroyed by the alien scurge!');
    }
    // // let choice = prompt('Would you like to play again?', '1 Yes / 2 No');
    // if (choice === '1') {
    //     start();
    // }
}
start();
console.log(newFleet.fleetOfShips[0].avatar);