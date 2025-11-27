const offer = [{
    img_url: '/images/offer.png',
    text: 'Sourdough Super Save'
}, {
    img_url: '/images/offer1.png',
    text: 'Today’s Holiday Dessert Pick'
}, {
    img_url: '/images/offer2.png',
    text: 'Christmas Deals'
}, {
    img_url: '/images/offer3.png',
    text: 'Breakfast For Everyone'
}]

const randomID = (max) => {
    return Math.floor(Math.random () * max)
}

console.log(randomID(3))


const generateOffer = () => {
    const offersSectionEl = document.querySelector('.offers')
    const offerCardEl = document.querySelector('.offer-card')
    const cardText = document.querySelector('.offer-text')
}