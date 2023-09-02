const API_KEY ='49d396b626aa4d2c8981a59c4a028e06';
const url ='https://newsapi.org/v2/everything?q=';

window.addEventListener('load', ()=> fetchNews('India'));
// url fetch the data 
async function fetchNews(query){
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data =await res.json();
   console.log(data);
   bindData(data.articles);
}
function bindData(articles){
    const cardContener = document.getElementById('cardContainer');
    const tempelet = document.getElementById('temp');

    cardContener.innerHTML = '';

    if (!articles || articles.length === 0) {
        // Handle the case when no articles are available
        cardContener.innerHTML = '<p>No articles found.</p>';
        return;
    }
    
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = tempelet.content.cloneNode(true);
        fillData(cardClone,article);
        cardContener.appendChild(cardClone);
    });
}

// fetch data and set the data to verable 
function fillData(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,'_black')
    })
}


// nav bar onlick event to neviget to the perticuler topic 

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
}


// search Bar working only get the id of input and button and filed it 
const searchButton = document.getElementById('searchButton');
const newsInput = document.getElementById('searchinput');

searchButton.addEventListener('click',()=>{
    const query = newsInput.value;
    if(!query) return;
    fetchNews(query);
})