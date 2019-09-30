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

// let amountVND = prompt("How much VND?");

document.getElementById("call-convert").addEventListener("click", function() {
  if (checkInput()) {
    convertCalculation();
  } else {
    document.getElementById("check-input").innerHTML =
      "<span style='color:red'>Please enter a number</span>";
    document.getElementById("converted-value").innerHTML = "";
    document.getElementById("your-amount").innerHTML = "";
  }
});

document.getElementById("increase").addEventListener("click", function() {
  let inputVal = document.getElementById("current-value").value;
  if(!isNaN(inputVal) || inputVal != "") document.getElementById("current-value").value = parseFloat(inputVal) + 1;
  if (checkInput()) {
    convertCalculation();
  }
});

document.getElementById("decrease").addEventListener("click", function() {
  let inputVal = document.getElementById("current-value").value;
  if (!isNaN(inputVal) && inputVal != "") {
    document.getElementById("current-value").value = parseFloat(inputVal) - 1;
    let tempVal = document.getElementById("current-value").value;
    if (checkInput()) {
      convertCalculation();
    } else {
      document.getElementById("check-input").innerHTML =
        "<span style='color:red'>Please enter a number bigger than 0</span>";
      document.getElementById("converted-value").innerHTML = "";
      document.getElementById("your-amount").innerHTML = "";
    }
  }
});

// let curr1 = prompt("Enter your curent curreny ");
// let curr2 = prompt("Enter currency you want to exchange");

// function vndToUsd(amountVND, curr1, curr2) {
//   let rate = exchangeRates[curr1][curr2];

//   return (parseFloat(amountVND) * rate).toFixed(2);
// }

function convertCalculation() {
  let amount = document.getElementById("current-value").value;
  let curr1 = document.getElementById("currency-one").value;
  let curr2 = document.getElementById("currency-two").value;
  let rate;

  if (curr1 == curr2) {
    rate = 1;
  } else {
    rate = exchangeRates[curr1][curr2];
    // rate = callApi(curr1, curr2);
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

  if (isNaN(amount) || amount == "" || amount < 0) {
    return false;
  }

  return true;
}

function formatCurrency(value, curr) {
  const formartter = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: curr
  });

  return formartter.format(value);
}

async function callApi(curr1, curr2) {
  let url =
    "https://free.currconv.com/api/v7/convert?q=" +
    curr1 +
    "_" +
    curr2 +
    "&compact=ultra&apiKey=85bd58a0e41f220756d2";
  let result = await fetch(url);
  let json = await result.json();
  let currency = (curr1 + "_" + curr2).toUpperCase();
  updateResults(json, currency);
}

function updateResults(response, currency) {
  console.log(response[currency]);
}

callApi("usd", "vnd");
