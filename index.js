const calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener("click", function () {
  calculateRoomCost();
});

function getRoomRate(checkinDate, roomType) {
  const isPeakSeason =
    checkinDate.getMonth() >= 5 && checkinDate.getMonth() <= 7;

  if (isPeakSeason) {
    if (roomType === "Queen" || roomType === "King") {
      return 250;
    } else if (roomType === "2-Bedroom Suite") {
      return 350;
    }
  } else {
    if (roomType === "Queen" || roomType === "King") {
      return 150;
    } else if (roomType === "2-Bedroom Suite") {
      return 210;
    }
  }
}

function calculateRoomCost() {
  const checkinDate = new Date(document.getElementById("checkinDate").value);
  const numNights = parseInt(document.getElementById("numNights").value);
  const roomType = document.querySelector(
    'input[name="roomType"]:checked'
  ).value;

  const numAdults = parseInt(document.getElementById("numAdults").value);
  const numChildren = parseInt(document.getElementById("numChildren").value);
  const discount = document.querySelector('input[name="discount"]:checked');

  const nightlyRate = getRoomRate(checkinDate, roomType);

  let maxGuests = 0;
  if (roomType === "Queen") {
    maxGuests = 5;
  } else if (roomType === "King") {
    maxGuests = 2;
  } else if (roomType === "2-Bedroom Suite") {
    maxGuests = 6;
  }

  if (numAdults + numChildren > maxGuests) {
    const result = document.getElementById("result");
    result.innerHTML = "The room you selected will not hold your party.";
    return;
  }

  const originalRoomCost = nightlyRate * numNights;

  let discountAmount = 1;
  if (discount.value === "senior") {
    discountAmount = 0.9;
    discountPercentage = 10
  } else if (discount.value === "military") {
    discountAmount = 0.8;
    discountPercentage = 20
  } else {
    discountAmount = 1
    discountPercentage = 0
  }

  
  const discountedRoomCost = originalRoomCost * discountAmount;
  const tax =  discountedRoomCost * 0.12;

  const totalCost = discountedRoomCost + tax;

  const resultMessage = `
            Original Room Cost: $${originalRoomCost.toFixed(2)}<br>
            Discount: ${discountPercentage}%<br>
            Discounted Room Cost: $${discountedRoomCost.toFixed(2)}<br>
            Tax: $${tax.toFixed(2)}<br>
            Total Cost of the Stay: $${totalCost.toFixed(2)}
        `;

  result.innerHTML = resultMessage;
}
