document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM is fully loaded and ready");

  const display = document.getElementById("cal-display");
  const button = document.getElementsByClassName("btn");

  let currentValue = "";

  function evaluateResult(value) {
    const convertedValue = currentValue
      .replace("×", "*")
      .replace("÷", "/")
      .replace("%", "*0.01")
      .replace("−", "-");

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
      } else if (value == "=") {
        evaluateResult();
      } else {
        currentValue += value;
        display.value = currentValue;
      }
    });
  }
});
