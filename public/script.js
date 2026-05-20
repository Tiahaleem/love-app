const app = document.getElementById("app");

const SECRET_PASSWORD = "pookie123";

function login() {
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  if (password === SECRET_PASSWORD) {
    showPage("Do you love me? 🥺❤️", "Please choose wisely", "yes1", "no1");
  } else {
    error.textContent = "Wrong password baby 😂";
  }
}

function card(title, text, yesAction, noAction, emoji = "") {
  app.innerHTML = `
    <div class="card">
      ${emoji ? `<div class="emoji">${emoji}</div>` : ""}
      <h1>${title}</h1>
      <p>${text}</p>

      <button onclick="${yesAction}">Yes</button>
      <button class="no-btn" onclick="${noAction}">No</button>
    </div>
  `;
}

function showPage(title, text, yesType, noType) {
  card(
    title,
    text,
    `handleChoice('${yesType}')`,
    `handleChoice('${noType}')`
  );
}

function handleChoice(choice) {
  saveAnswer(choice);

  if (choice === "yes1") {
    finalLovePage();
  }

  if (choice === "no1") {
    showPage("Are you sure? 😭", "Think about it again baby", "yes2", "no2");
  }

  if (choice === "yes2") {
    finalCryPage();
  }

  if (choice === "no2") {
    showPage("You don't love me? 🥺", "Answer well ooo", "yes3", "no3");
  }

  if (choice === "yes3") {
    finalCryPage();
  }

  if (choice === "no3") {
    showPage("So you love me? 😍", "I knew it baby", "yes4", "no4");
  }

  if (choice === "yes4") {
    finalLovePage();
  }

  if (choice === "no4") {
    finalCryPage();
  }
}

function finalLovePage() {
  app.innerHTML = `
    <div class="card">
      <div class="emoji">❤️🥹</div>
      <h1>I love you too</h1>
      <p>You just made me the happiest person ever.</p>
      <button onclick="location.reload()">Start Again</button>
    </div>
  `;
}

function finalCryPage() {
  app.innerHTML = `
    <div class="card">
      <div class="emoji">😭💔</div>
      <h1>I'm crying now</h1>
      <p>How can you do this to me?</p>
      <button onclick="location.reload()">Try Again</button>
    </div>
  `;
}

function saveAnswer(answer) {
  fetch("/save-answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      answer: answer
    })
  });
}