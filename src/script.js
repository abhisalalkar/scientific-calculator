document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("calc-display");
  const buttons = document.getElementsByClassName("btn");

  let currentValue = "";

  function evaluateResult() {
    try {
      let convertedValue = currentValue
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/%/g, "*0.01")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/√/g, "Math.sqrt")
        .replace(/\^/g, "**");

      
      convertedValue = convertedValue
        .replace(
          /sin\((.*?)\)/g,
          (_, val) => `Math.sin(${val} * Math.PI / 180)`,
        )
        .replace(
          /cos\((.*?)\)/g,
          (_, val) => `Math.cos(${val} * Math.PI / 180)`,
        )
        .replace(
          /tan\((.*?)\)/g,
          (_, val) => `Math.tan(${val} * Math.PI / 180)`,
        )
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log");

      const result = eval(convertedValue);

      currentValue = result.toString();
      display.value = currentValue;
    } catch {
      currentValue = "ERROR";
      display.value = currentValue;
    }
  }

  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];

    btn.addEventListener("click", function () {
      const value = btn.innerText;

      if (value === "AC" || value === "C") {
        currentValue = "";
      } else if (value === "⌫") {
        currentValue = currentValue.slice(0, -1);
      } else if (value === "=") {
        evaluateResult();
        return;
      } else if (value === "x²") {
        currentValue += "**2";
      } else if (["sin", "cos", "tan", "log", "ln", "√"].includes(value)) {
        currentValue += value + "(";
      } else {
        currentValue += value;
      }

      display.value = currentValue;
    });
  }

  document.addEventListener("keydown", function (e) {
    const key = e.key;

    if (!isNaN(key) || "+-*/().".includes(key)) {
      currentValue += key;
    } else if (key === "Enter") {
      evaluateResult();
    } else if (key === "Backspace") {
      currentValue = currentValue.slice(0, -1);
    }

    display.value = currentValue;
  });
});
