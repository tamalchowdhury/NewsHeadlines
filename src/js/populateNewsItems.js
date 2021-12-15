export default function populateNewsItems(data) {
  data.forEach((item, index) => {
    let { title, urlToImage, description } = item

    let card = document.querySelector(`.card__${index}`)
    let cardTitle = card.querySelector('.card__title')
    cardTitle.textContent = title
    let cardDetail = card.querySelector('.card__detail')
    cardDetail.textContent = description

    let image = document.createElement('img')
    image.src = urlToImage || 'https://via.placeholder.com/260x145'
    image.alt = title

    card.querySelector('.card__image').appendChild(image)

    card.querySelectorAll('.empty').forEach((el) => {
      el.classList.remove('empty')
      el.classList.add('loaded')
    })
  })
}
