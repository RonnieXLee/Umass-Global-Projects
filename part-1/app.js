let favNumber = 5;
let baseURL = "http://numbersapi.com";

// 1.
async function part1() {
  try {
    let response = await fetch(`${baseURL}/${favNumber}?json`);
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
part1();

// 2.
const favNumbers = [7, 11, 22];
async function part2() {
  try {
    let response = await fetch(`${baseURL}/${favNumbers}?json`);
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
part2();

// 3.
async function part3() {
  try {
    let promises = Array.from({ length: 4 }, () => fetch(`${baseURL}/${favNumber}?json`));
    let responses = await Promise.all(promises);
    let facts = await Promise.all(responses.map(response => response.json()));
    facts.forEach(data => {
      $('body').append(`<p>${data.text}</p>`);
    });
  } catch (error) {
    console.log(error);
  }
}
part3();
