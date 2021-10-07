const btnDaily = document.querySelector("#btn-daily")
const btnWeekly = document.querySelector("#btn-weekly");
const btnMonthly = document.querySelector("#btn-monthly");

const cardContent = document.querySelectorAll('#card__content');
let timeCurrent = document.querySelectorAll("#card__time--current");
let timePrevious = document.querySelectorAll("#card__time--previous");


document.addEventListener('DOMContentLoaded', function () {
  requestAllData();
  requestTimeData();
});