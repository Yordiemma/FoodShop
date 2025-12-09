const offer = [{
    img_url: '/src/images/offer.png',
    badge: 'Sale',
    text: 'Sourdough Super Save!'
}, {
    img_url: '/src/images/offer1.png',
    badge: 'Inspiration',
    text: 'Today’s Holiday Dessert Pick!'
}, {
    img_url: '/src/images/offer2.png',
    badge: 'Sale',
    text: 'Christmas Deals!'
}, {
    img_url: '/src/images/offer3.png',
    badge: 'Inspiration',
    text: 'Breakfast For Everyone!'
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

    const firstBadgeText = offersSectionEl.firstElementChild.firstElementChild
    const lastBadgeText = offersSectionEl.lastElementChild.firstElementChild

    const firstOfferText = offersSectionEl.firstElementChild.lastElementChild
    const lastOfferText = offersSectionEl.lastElementChild.lastElementChild

    firstBadgeText.textContent = offer[firstID].badge
    lastBadgeText.textContent = offer[secondID].badge

    firstOfferText.textContent = offer[firstID].text
    lastOfferText.textContent = offer[secondID].text
}

generateOffer()


