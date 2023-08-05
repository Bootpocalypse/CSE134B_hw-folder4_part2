function init(){
    let element = document.getElementById('Load_local');
    element.addEventListener('click', function () {
        LocalFill();
    });
    element = document.getElementById('Load_remote');
    element.addEventListener('click', function () {
        CloudFill();
    });
    let card_data= {
        "cards": [{
                "name": "Stormcast",
                "imagelink": "https://images.unsplash.com/photo-1529981188441-8a2e6fe30103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                "alt": "Stormcast Eternal on dragon",
                "info": "According to all known law of aviation, dragons should not be able to fly",
                "link": "https://astounding-clafoutis-7db48c.netlify.app/"
            },
            {
                "name": "test ork",
                "imagelink": "https://images.unsplash.com/photo-1568223880170-bb6fcceab9ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                "alt": "Sweet little fungus boi",
                "info": "Hey guys, in term of...",
                "link": "https://astounding-clafoutis-7db48c.netlify.app/"
            }
        ]
    }
    localStorage.setItem("card_data", JSON.stringify(card_data));
}

class projectCard extends HTMLElement {
    constructor() {
        super();
    }
        connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        let card=document.createElement('section');

        card.classList.add('card-style');
        let title = this.title;
        let imageLink = this.imageLink;
        let alt = this.alt;
        let info = this.info;
        let link = this.link;
        card.innerHTML = `
        <style>
    .card-style{
        width: 300px;
        border: 15px ridge green;
        padding: 10px;
        margin: 20px;
        height: 400px;
        display: grid;
        grid-template-rows: 20% 70% auto;
        grid-template-columns: 50% 10% auto;
        justify-items: center;
        font-family: Garamond, Sans-Serif;
    }
    .card-head {
        font-size: 2rem;
        text-transform: capitalize;
        font-weight: bold;
        margin: 0;
        grid-row-start: 1;
        grid-row-end: 2;
        grid-column-start: 1;
        grid-column-end: 3;
    }
    .image {
      border:solid 0.3em black;
        margin: 0;
        width:100%;
        max-width:150px;
        grid-row-start: 2;
        grid-row-end: 4;
        grid-column-start: 1;
        grid-column-end: 3;
    }
    .info {
        margin: 0;
        font-style: italic;
        grid-row-start: 2;
        grid-row-end: 3;
        grid-column-start: 3;
        grid-column-end: 4;
    }
    .link {
        margin: 0;
        grid-row-start: 3;
        grid-row-end: 4;
        grid-column-start: 3;
        grid-column-end: 4;
    }
    </style>
        <h2 class="card-head">${title}</h2>
        <img src=${imageLink} alt=${alt} class="image">
        <p class="info">${info}</p>
        <a href=${link} class="link">Read More</a>
      `;
      shadow.appendChild(card);
      }
      get title() {
        return this.getAttribute('title') || '';
      }
      get imageLink() {
        return this.getAttribute('imageLink') || '';
      }
      get alt() {
        return this.getAttribute('alt') || '';
      }
      get info() {
        return this.getAttribute('info') || '';
      }
      get link() {
        return this.getAttribute('link') || '';
      }
  }


customElements.define("project-card", projectCard);

function LocalFill(){
    let inputplacing = document.getElementById('controls');
    let data = localStorage.getItem("card_data");
    console.log("data: ", JSON.parse(data)['cards']);
    for (let i = 0; i < JSON.parse(data)['cards'].length; i++){
        const newCard = document.createElement("project-card");
        newCard.setAttribute('title',JSON.parse(data)['cards'][i]['name']);
        newCard.setAttribute('imageLink',JSON.parse(data)['cards'][i]['imagelink']);
        newCard.setAttribute('alt',JSON.parse(data)['cards'][i]['alt']);
        newCard.setAttribute('info',JSON.parse(data)['cards'][i]['info']);
        newCard.setAttribute('link',JSON.parse(data)['cards'][i]['link']);
        inputplacing.appendChild(newCard);
    }
}
function CloudFill(){
    let xhReq = new XMLHttpRequest();
    xhReq.open("GET", 'https://api.jsonbin.io/v3/b/64ce0b399d312622a38c3fba', false);
    xhReq.send(null);
    let jsonObject = JSON.parse(xhReq.responseText);
    let inputplacing = document.getElementById('controls');
    for (let i = 0; i < jsonObject['record']["cards"].length; i++){
        const newCard = document.createElement("project-card");
        newCard.setAttribute('title',jsonObject['record']['cards'][i]['name']);
        newCard.setAttribute('imageLink',jsonObject['record']['cards'][i]['imagelink']);
        newCard.setAttribute('alt',jsonObject['record']['cards'][i]['alt']);
        newCard.setAttribute('info',jsonObject['record']['cards'][i]['info']);
        newCard.setAttribute('link',jsonObject['record']['cards'][i]['link']);
        inputplacing.appendChild(newCard);
    }
}
window.addEventListener('DOMContentLoaded', init);