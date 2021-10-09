const btnDaily = document.querySelector("#btn-daily");
const btnWeekly = document.querySelector("#btn-weekly");
const btnMonthly = document.querySelector("#btn-monthly");

const cardContent = document.querySelectorAll('.card__content');
let cardName = document.querySelectorAll(".card_name");
let timeCurrent = document.querySelectorAll(".card__time--current");
let timePrevious = document.querySelectorAll(".card__time--previous");
let ellipsis = document.querySelectorAll('.card__ellipsis')

/**
 * Load Cards' content onLoad
 */
document.addEventListener('DOMContentLoaded', function () {
  requestAllData();
  requestTimeData();
});

/**
 * Make request to json file
 * Get data from json file
 * when the file is loaded
 */
async function requestAllData() {
  //Request Data from local json file on the page load 
  const response = await fetch('data.json');
  const data = await response.json();
  ellipsis.forEach(element => element.innerHTML = '<svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd" /></svg>');
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
 * when the option is clicked
 */
async function requestTimeData() {
  const response = await fetch('data.json');
  const data = await response.json();

  // Listen to the Daily btn click
  btnDaily.addEventListener("click", event => {
    event.preventDefault();

    //Iterates through the cards and pushes time data to each card
    cardContent.forEach(element => {
      for (let i = 0; i < data.length; i++) {
        timeCurrent[i].textContent = data[i].timeframes.daily.current + (data[i].timeframes.daily.current > 1 ? "hrs" : "hr");
        timePrevious[i].textContent = "Yesterday - " + data[i].timeframes.daily.previous + (data[i].timeframes.daily.previous > 1 ? "hrs" : "hr");
      }
    });
    activeOption(btnDaily, btnWeekly, btnMonthly);
  });

  // Listen to the Weekly btn click
  btnWeekly.addEventListener("click", event => {
    cardContent.forEach(element => {
      event.preventDefault();

      //Iterates through the cards and pushes time data to each card
      for (let i = 0; i < data.length; i++) {
        timeCurrent[i].textContent = data[i].timeframes.weekly.current + "hrs";
        timePrevious[i].textContent = "Last Week - " + data[i].timeframes.weekly.previous + "hrs";
      }
    });
    activeOption(btnWeekly, btnDaily, btnMonthly);
  });

  // Listen to the Monthly btn click
  btnMonthly.addEventListener("click", event => {
    cardContent.forEach(element => {
      event.preventDefault();

      //Iterates through the cards and pushes time data to each card
      for (let i = 0; i < data.length; i++) {
        timeCurrent[i].textContent = data[i].timeframes.monthly.current + "hrs";
        timePrevious[i].textContent = "Last Month - " + data[i].timeframes.monthly.previous + "hrs";
      }
    })
    activeOption(btnMonthly, btnWeekly, btnDaily);
  })
}


/**
 * Removes active class with the previous active option
 * Add active class to active option
 */
function activeOption(element, previousActiveOption1, previousActiveOption2) {
  previousActiveOption1.classList.remove("option--active");
  previousActiveOption2.classList.remove("option--active");
  element.classList.add("option--active");
}