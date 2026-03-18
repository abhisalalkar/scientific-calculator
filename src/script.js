document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("cal-display");
  const button = document.getElementsByClassName("btn");

  let currentValue = "";

  function evaluateResult() {
    const convertedValue = currentValue
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/%/g, "*0.01")
      .replace(/−/g, "-");

    const result = eval(convertedValue);
    currentValue = result.toString();
    display.value = currentValue;
  }

  for (let i = 0; i < button.length; i++) {
    const btn = button[i];

    btn.addEventListener("click", function () {
      const value = btn.innerText;

      if (value == "AC") {
        currentValue = "";
        display.value = currentValue;
      } else if (value == "⌫") {
        currentValue = currentValue.slice(0, -1);
        display.value = currentValue;
      } else if (value == "=") {
        evaluateResult();
      } else {
        currentValue += value;
        display.value = currentValue;
      }
    });
  }
});
