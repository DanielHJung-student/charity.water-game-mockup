const OWNEDKEYWORD = "owned";
const EQUIPPEDKEYWORD = "equipped";
const UNOWNEDKEYWORD = "unowned";
const items = {
    houses: [],
    characters: [],
    landscapes: [],
    containers: []
};

items.houses = document.getElementById('storeHouses').children;
items.characters = document.getElementById('storeCharacters').children;
items.landscapes = document.getElementById('storeLandscapes').children;
items.containers = document.getElementById('storeContainers').children; //TODO add costs & 

for (const i in items) {
    for (const item of items[i]) {
        item.setAttribute("data-equipped", UNOWNEDKEYWORD); //you don't own any of the items by default (except the first one, which is equipped)
    }
    items[i][0].setAttribute("data-equipped", EQUIPPEDKEYWORD); //you own& have equipped all the default items by default (duh)
}

function remakeParallaxItems() {
    parallaxItems.length = 0; // Clear the parallaxItems array
    for (const i in items) {
        for (const item of items[i]) {
            if (item.getAttribute("data-equipped") === EQUIPPEDKEYWORD) {
                //parallaxItems.push(item.data-parallaxObjects); //TODO figure this out
            }
        }
    }
}

function setupButtons() {
    for (const i in items) {
        for (const item of items[i]) {
            const button = item.querySelector('.buyequip-button');
            if (item.getAttribute("data-equipped") === EQUIPPEDKEYWORD) {
                button.innerText = 'Equipped';
                button.onclick = null; // Disable the button when equipped
            } else if (item.getAttribute("data-equipped") === OWNEDKEYWORD) {
                button.innerText = 'Equip';
                button.onclick = () => {
                    //unequip all other items in this category
                    for (const otherItem of items[i]) {
                        otherItem.setAttribute("data-equipped", OWNEDKEYWORD);
                    }
                    //then equip this item
                    item.setAttribute("data-equipped", EQUIPPEDKEYWORD);
                    remakeParallaxItems();
                    setupButtons(); // Update button states after equipping
                }
            } else {
                button.innerText = 'Purchase';
                button.onclick = () => {
                    //check if we can purchase & purchase
                    if (playerPoints >= item.data-cost) {
                        playerPoints -= item.data-cost;
                        item.setAttribute("data-equipped", OWNEDKEYWORD);
                    }
                    else return; //not enough points to purchase
                    //than equip
                    for (const otherItem of items[i]) {
                        otherItem.setAttribute("data-equipped", OWNEDKEYWORD);
                    }
                    //then equip this item
                    item.setAttribute("data-equipped", EQUIPPEDKEYWORD);
                    remakeParallaxItems();
                    setupButtons(); // Update button states after equipping
                }
            }
        }
    }
}