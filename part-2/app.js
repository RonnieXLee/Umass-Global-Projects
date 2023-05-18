let baseURL = 'https://deckofcardsapi.com/api/deck';

// 1.
fetch(`${baseURL}/new/draw/`)
  .then(response => response.json())
  .then(data => {
    let { suit, value } = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  })
  .catch(error => {
    console.log(error);
  });

// 2.
let firstCard = null;
fetch(`${baseURL}/new/draw/`)
  .then(response => response.json())
  .then(data => {
    firstCard = data.cards[0];
    let deckId = data.deck_id;
    return fetch(`${baseURL}/${deckId}/draw/`);
  })
  .then(response => response.json())
  .then(data => {
    let secondCard = data.cards[0];
    [firstCard, secondCard].forEach(card => {
      console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`);
    });
  })
  .catch(error => {
    console.log(error);
  });

// 3.
let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');

fetch(`${baseURL}/new/shuffle/`)
  .then(response => response.json())
  .then(data => {
    deckId = data.deck_id;
    $btn.show();
  })
  .catch(error => {
    console.log(error);
  });

$btn.on('click', function() {
  fetch(`${baseURL}/${deckId}/draw/`)
    .then(response => response.json())
    .then(data => {
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (data.remaining === 0) $btn.remove();
    })
    .catch(error => {
      console.log(error);
    });
});
