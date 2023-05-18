let favNumber = 5;
let baseURL = "http://numbersapi.com";

// 1.
fetch(`${baseURL}/${favNumber}?json`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

// 2.
let favNumbers = [7, 11, 22];
fetch(`${baseURL}/${favNumbers}?json`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

// 3.
let promises = Array.from({ length: 4 }, () => {
  return fetch(`${baseURL}/${favNumber}?json`).then(response => response.json());
});

Promise.all(promises)
  .then(facts => {
    facts.forEach(data => {
      $("body").append(`<p>${data.text}</p>`);
    });
  })
  .catch(error => {
    console.log(error);
  });
