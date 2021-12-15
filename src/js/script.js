// Format
// https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=830687438ae94448ac5a5bb1f3531ff3

// const url = 'https://newsapi.org/v2/everything?q=ফেসবুক&apiKey=';
const url = 'https://newsapi.org/v2/everything'
const headlines =
  'https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=830687438ae94448ac5a5bb1f3531ff3'

const apiKey = '830687438ae94448ac5a5bb1f3531ff3'

const endPoint = url + apiKey

for (let i = 0; i < 20; i++) {
  // Create the card
  let el = document.createElement('div')
  el.classList.add('card', `card__${i}`)

  let cardImage = document.createElement('div')
  cardImage.classList.add('card__image', 'empty')

  let cardTitle = document.createElement('div')
  cardTitle.classList.add('card__title', 'empty')

  cardTitle.append(document.createElement('div'), document.createElement('div'))

  let cardDetail = document.createElement('div')
  cardDetail.classList.add('card__detail', 'empty')

  el.append(cardImage, cardTitle, cardDetail)

  document.querySelector('.wrapper').appendChild(el)
}

function populateNewsItems(data) {
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

$(() => {
  grabNews()

  $('.search_form').on('submit', (e) => {
    e.preventDefault()
    let searchQuery = $('.search_bar').val()
    console.log(searchQuery)
    grabNews2(searchQuery)
  })
})

const grabNews2 = (query) => {
  console.log(query)

  // https://newsapi.org/v2/top-headlines
  axios
    .get(url, {
      params: {
        apiKey: apiKey,
        q: query,
        // country: 'us',
        // category: 'entertainment'
        // sortBy: publishedAt
      },
    })
    // axios.get('https://newsapi.org/v2/everything?q=' + query + '&apiKey=' + apiKey)
    .then((response) => {
      console.log(response)
      let articles = response.data.articles
      populateNewsItems(articles)
      let output = ''

      $.each(articles, (index, item) => {
        let title = item.title
        let trimTitle = title.substr(0, 70)
        let image = item.urlToImage
        if (image == null) {
          image = 'img/noimage.png'
        }
        output += `<div class="news_item">
            
                <a href="${item.url}" target="_blank">
                <div class="news_photo empty">
                <img class="news_photo" src="${image}" alt="${item.title}">
                </div>
                </a>
                <span><em>${item.source.name}</em></span>
                <h1 class="news_headline"><a href="${item.url}" target="_blank">${trimTitle}</a></h1>
                <p class="news_blurb">${item.description}</p>
            </div>`

        // console.log("Title: " + item.title);
        // console.log("Description: " + item.description);
        // console.log("Author: " + item.author);
        // console.log("Source: " + item.source.name);
        // console.log("Image: " + item.urlToImage);
      })

      $('.wrapper').html(output)

      // $.each()
    })
    .catch((err) => {
      console.log(err)
    })
}

const grabNews = () => {
  // console.log(query);
  $.get(headlines, (data) => {
    populateNewsItems(data.articles)
  })
}
