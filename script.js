const punishmentSelect = document.getElementById("punishment-select");
const timeInput = document.getElementById("time-input");
const ruleInput = document.getElementById("rule-input");
const generateButton = document.getElementById("generate-button");
const addToSessionButton = document.getElementById("add-to-session-button");

punishmentSelect.addEventListener("change", function () {
  if (punishmentSelect.value === "offban") {
    timeInput.placeholder = "Время (дней)";
  } else if (punishmentSelect.value === "offwarn") {
    timeInput.placeholder = "Не требуется";
    timeInput.disabled = true;
  } else {
    timeInput.placeholder = "Время (мин)";
    timeInput.disabled = false;
  }
});

generateButton.addEventListener("click", function () {
  const command = generateCommand(punishmentSelect.value, timeInput.value, ruleInput.value);
  navigator.clipboard.writeText(command)
    .then(() => alert("Команда скопирована: " + command))
    .catch(() => alert("Ошибка копирования"));
});

addToSessionButton.addEventListener("click", function () {
  const command = generateCommand(punishmentSelect.value, timeInput.value, ruleInput.value);
  saveToHistory(command);
  alert("Команда добавлена в сессию: " + command);
});
function navigateToComplaintsPage() {
  const complaintsPageUrl = "https://grnd.gg/admin/complaints"; // Укажите правильный URL
  window.location.href = complaintsPageUrl;

  // Ждем загрузки страницы
  window.addEventListener("load", function () {
    const observer = new MutationObserver(function (mutations) {
      const infoBlock = document.querySelector(".content-info");
      if (infoBlock) {
        // Элемент найден, можно выполнять код
        observer.disconnect(); // Остановить наблюдение
        console.log("Информационный блок найден:", infoBlock);
        // Ваш код для работы с infoBlock
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}

navigateToComplaintsPage();
function generateCommand(type, time, rule) {
  return `/${type} Nickname ${time} ${rule}`;
}

function saveToHistory(command) {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(command);
  localStorage.setItem("history", JSON.stringify(history));
}