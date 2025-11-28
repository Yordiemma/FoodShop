const offer = [{
    img_url: '/src/images/offer.png',
    text: 'Sourdough Super Save!'
}, {
    img_url: '/src/images/offer1.png',
    text: 'Today’s Holiday Dessert Pick!'
}, {
    img_url: '/src/images/offer2.png',
    text: 'Christmas Deals!'
}, {
    img_url: '/src/images/offer3.png',
    text: 'Breakfast For Everyone!'
}, {
    img_url: '/src/images/offer4.png',
    text: 'Bake With Berries!'
}]

const randomID = (max) => {
    return Math.floor(Math.random() * max)
}

const firstID = randomID(offer.length)
let secondID = 0;

const getSecondID = () => {
    secondID = randomID(offer.length)
    while (secondID === firstID) {
        secondID = randomID(offer.length)
    }
    return secondID
}

getSecondID()

const generateOffer = () => {
    const offersSectionEl = document.querySelector('.offers')

    offersSectionEl.firstElementChild.style.backgroundImage = `url('${offer[firstID].img_url}')`;
    offersSectionEl.lastElementChild.style.backgroundImage = `url('${offer[secondID].img_url}')`;

    const firstOfferText = offersSectionEl.firstElementChild.firstElementChild
    const lastOfferText = offersSectionEl.lastElementChild.firstElementChild

    firstOfferText.textContent = offer[firstID].text
    lastOfferText.textContent = offer[secondID].text
}

generateOffer()
