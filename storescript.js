const OWNEDKEYWORD = "owned";
const EQUIPPEDKEYWORD = "equipped";
const UNOWNEDKEYWORD = "unowned";
const parallaxItems = [];
var items = {
    houses: [],
    characters: [],
    landscapes: [],
    containers: []
};


for (const cat of ["storeHouses", "storeCharacters", "storeLandscapes", "storeContainers"]) {
    for (let elmID=0;elmID < document.getElementById(cat).children.length;elmID++) {
        const elm = document.getElementById(cat).children[elmID];
        items[cat.replace("store","").toLowerCase()][elmID] = {html: elm, cost:0, parallaxObjects: [], owned:UNOWNEDKEYWORD};
        if (elmID==0) items[cat.replace("store","").toLowerCase()][elmID].owned = EQUIPPEDKEYWORD; //first item in each category is default, so you own it by default
    }
}

function remakeParallaxItems() {
    parallaxItems.length = 0; // Clear the parallaxItems array
    for (const i in items) {
        for (const item of items[i]) {
            if (item.owned === EQUIPPEDKEYWORD) {
                parallaxItems.push(...item.parallaxObjects); //TODO figure this out
            }
        }
    }
}

function setupButtons() {
    for (const i in items) {
        for (const item of items[i]) {
            const button = item.html.querySelector('.buyequip-button');
            if (item.owned === EQUIPPEDKEYWORD) {
                button.innerText = 'Equipped';
                button.onclick = null; // Disable the button when equipped
            } else if (item.owned === OWNEDKEYWORD) {
                button.innerText = 'Equip';
                button.onclick = () => {
                    //unequip all other items in this category
                    for (const otherItem of items[i]) {
                        otherItem.owned = OWNEDKEYWORD;
                    }
                    //then equip this item
                    item.owned = EQUIPPEDKEYWORD;
                    remakeParallaxItems();
                    setupButtons(); // Update button states after equipping
                }
            } else {
                button.innerText = 'Purchase';
                button.onclick = () => {
                    //check if we can purchase & then purchase
                    if (playerPoints >= item.cost) {
                        playerPoints -= item.cost;
                    }
                    else return; //not enough points to purchase
                    //than equip
                    for (const otherItem of items[i]) {
                        otherItem.owned = OWNEDKEYWORD;
                    }
                    //then equip this item
                    item.owned = EQUIPPEDKEYWORD;
                    remakeParallaxItems();
                    setupButtons(); // Update button states after equipping
                }
            }
        }
    }
}

//TODO table of data entries
let house0= new Image();house0.src = "assets/Manica House.png"
items.houses[0].parallaxObjects = [new ParallaxObject(house0, 1, false, false, {x:100,y:()=>{return window.innerHeight*3/4-house0.height}})];
let landscape0= new Image();landscape0.src = "assets/Basic Mountains.png"
items.landscapes[0].parallaxObjects = [new ParallaxObject(landscape0, 0.2, true,false, {x:0,y:0},true)];


remakeParallaxItems();