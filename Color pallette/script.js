const generateBtn = document.getElementById("button-click");
const colorConatiner = document.querySelector(".color-container");
const copyBtn = document.querySelectorAll(".copy-btn");

colorConatiner.addEventListener("click", (e) => {
  console.log("else", e.target.classList.contains("color"));
  console.log("if", e.target.classList.contains("copy-btn"));
  if (e.target.classList.contains("copy-btn")) {
    let hexValue = e.target.previousElementSibling.textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() => showSuccessMessage(e.target))
      .catch((err) => console.log(err));
  } else if (e.target.classList.contains("color")) {
    let hexValue =
      e.target.nextElementSibling.querySelector(".hex-value").textContent;

    console.log(hexValue);
    navigator.clipboard
      .writeText(hexValue)
      .then(() =>
        showSuccessMessage(
          e.target.nextElementSibling.querySelector(".copy-btn")
        )
      )
      .catch((err) => console.log(err));
  }
});

function showSuccessMessage(element) {
  console.log(element);
  element.classList.remove("fa-copy");
  element.classList.add("fa-check");

  element.style.color = "#27ae60";

  setTimeout(() => {
    element.classList.remove("fa-check");
    element.classList.add("fa-copy");
    element.style.color = "";
  }, 1000);
}

generateBtn.addEventListener("click", generateColors);
generateRandomColors();

function generateColors() {
  let colors = [];
  for (let i = 0; i < 5; i++) {
    colors.push(generateRandomColors());
  }

  console.log(colors);
  updatePalette(colors);
}

function generateRandomColors() {
  const colorscode = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += colorscode[Math.floor(Math.random() * 16)];
  }

  return color;
}

function updatePalette(colors) {
  const colorBoxes = document.querySelectorAll(".color-hex-holder");
  console.log(colorBoxes);

  colorBoxes.forEach((Element, index) => {
    let colorDiv = Element.querySelector(".color");
    let hexvalue = Element.querySelector(".hex-value");

    colorDiv.style.backgroundColor = colors[index];
    hexvalue.textContent = colors[index];
  });
}
