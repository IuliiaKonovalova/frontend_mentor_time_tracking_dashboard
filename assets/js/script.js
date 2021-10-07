const btnDaily = document.querySelector("#btn-daily")
const btnWeekly = document.querySelector("#btn-weekly");
const btnMonthly = document.querySelector("#btn-monthly");

const cardContent = document.querySelectorAll('#card__content');
let cardName = document.querySelectorAll("#card_name");
let timeCurrent = document.querySelectorAll("#card__time--current");
let timePrevious = document.querySelectorAll("#card__time--previous");


document.addEventListener('DOMContentLoaded', function () {
  requestAllData();
  requestTimeData();
});

/**
 * Load Cards' content onLoad
 */
async function requestAllData() {
  //Request Data from local json file on the page load 
  const response = await fetch('data.json');
  const data = await response.json();
  cardContent.forEach(element => {
    for (let i = 0; i < data.length; i++) {
      cardName[i].textContent = data[i].title;
      timeCurrent[i].textContent = data[i].timeframes.daily.current + (data[i].timeframes.daily.current > 1 ? "hrs" : "hr");
      timePrevious[i].textContent = "Yesterday - " + data[i].timeframes.daily.previous + (data[i].timeframes.daily.previous > 1 ? "hrs" : "hr");
    }
  })
};


/**
 * Make request to json file
 * Get data from json file
 */
async function requestTimeData() {
  const response = await fetch('data.json');
  const data = await response.json();

  // Listen to the Daily btn click //
  btnDaily.addEventListener("click", event => {
    event.preventDefault();
    //Iterates through the cards and pushes time data to the cards
    cardContent.forEach(element => {
      for (let i = 0; i < data.length; i++) {
        timeCurrent[i].textContent = data[i].timeframes.daily.current + (data[i].timeframes.daily.current > 1 ? "hrs" : "hr");
        timePrevious[i].textContent = "Yesterday - " + data[i].timeframes.daily.previous + (data[i].timeframes.daily.previous > 1 ? "hrs" : "hr");
      }
    });
  });

}