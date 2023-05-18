document.addEventListener('DOMContentLoaded', () => {
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1.
  async function part1() {
    try {
      let response = await fetch(`${baseURL}/new/draw/`);
      let data = await response.json();
      let { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    } catch (error) {
      console.log(error);
    }
  }
  part1();

  // 2.
  async function part2() {
    try {
      let response1 = await fetch(`${baseURL}/new/draw/`);
      let firstCardData = await response1.json();
      let deckId = firstCardData.deck_id;
      let response2 = await fetch(`${baseURL}/${deckId}/draw/`);
      let secondCardData = await response2.json();
      [firstCardData, secondCardData].forEach(card => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
  part2();

  // 3.
  async function setup() {
    let $btn = document.querySelector('button');
    let $cardArea = document.getElementById('card-area');

    try {
      let response = await fetch(`${baseURL}/new/shuffle/`);
      let deckData = await response.json();

      $btn.style.display = 'block';
      $btn.addEventListener('click', async () => {
        try {
          let response = await fetch(`${baseURL}/${deckData.deck_id}/draw/`);
          let cardData = await response.json();
          let cardSrc = cardData.cards[0].image;
          let angle = Math.random() * 90 - 45;
          let randomX = Math.random() * 40 - 20;
          let randomY = Math.random() * 40 - 20;
          let img = document.createElement('img');
          img.src = cardSrc;
          img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
          $cardArea.appendChild(img);
          if (cardData.remaining === 0) {
            $btn.remove();
          }
        } catch (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  setup();
});
