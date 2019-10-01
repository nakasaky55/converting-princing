const exchangeRates = {
  usd: {
    eur: 0.91,
    aud: 1.48,
    krw: 1203.0,
    vnd: 23200.7
  },
  eur: {
    usd: 1.09,
    aud: 1.62,
    krw: 1316.21,
    vnd: 25383.96
  },
  aud: {
    usd: 0.68,
    eur: 0.62,
    krw: 813.58,
    vnd: 15690.63
  },
  krw: {
    usd: 0.00083,
    aud: 0.0012,
    eur: 0.00076,
    vnd: 19.29
  },
  vnd: {
    krw: 0.052,
    usd: 0.000043,
    aud: 0.000064,
    eur: 0.000039
  }
};

// document.getElementById("call-convert").addEventListener("click", mainFunction);

document
  .getElementById("current-value")
  .addEventListener("keypress", mainFunction);
document
  .getElementById("current-value")
  .addEventListener("keyup", mainFunction);

document
  .getElementById("current-value")
  .addEventListener("change", mainFunction);

document
  .getElementById("currency-one")
  .addEventListener("change", mainFunction);

document
  .getElementById("currency-two")
  .addEventListener("change", mainFunction);

// document
//   .getElementById("switch-currency")
//   .addEventListener("click", function() {
  
//   });
// let curr1 = prompt("Enter your curent curreny ");
// let curr2 = prompt("Enter currency you want to exchange");

// function vndToUsd(amountVND, curr1, curr2) {
//   let rate = exchangeRates[curr1][curr2];

//   return (parseFloat(amountVND) * rate).toFixed(2);
// }

function mainFunction() {
  if (checkInput()) {
    callApi();
  } else {
    printError();
  }
}

function convertCalculation(curr1, curr2, rate_API) {
  let amount = document.getElementById("current-value").value;

  if (curr1 == curr2) {
    rate = 1;
  } else {
    rate = rate_API;
  }

  let valueConverted = rate * amount;
  const formatedValue = formatCurrency(valueConverted, curr2);
  const formatedAmount = formatCurrency(amount, curr1);
  //   console.log(formatedValue);
  document.getElementById("converted-value").innerHTML = formatedValue;
  document.getElementById("your-amount").innerHTML = formatedAmount;
  document.getElementById("check-input").innerHTML = "";
}

function checkInput() {
  let amount = document.getElementById("current-value").value;

  if (amount == "" || amount < 0) {
    return false;
  }

  return true;
}

function printError() {
  document.getElementById("check-input").innerHTML =
    "<span style='color:red'>Please enter a number equal or greater than 0</span>";
  document.getElementById("converted-value").innerHTML = "";
  document.getElementById("your-amount").innerHTML = "";
}

function formatCurrency(value, curr) {
  const formartter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: curr
  });

  return formartter.format(value);
}

async function callApi() {
  let curr1 = document.getElementById("currency-one").value;
  let curr2 = document.getElementById("currency-two").value;
  let url =
    "https://free.currconv.com/api/v7/convert?q=" +
    curr1 +
    "_" +
    curr2 +
    "&compact=ultra&apiKey=85bd58a0e41f220756d2";
  let result = await fetch(url);
  let json = await result.json();
  let currency = (curr1 + "_" + curr2).toUpperCase();
  let rateUpdate = json[currency];

  convertCalculation(curr1, curr2, rateUpdate);
}

function updateResults(response, currency) {
  return response[currency];
}
