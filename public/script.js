const app = document.getElementById("app");

const SECRET_PASSWORD = "Olami_Is_Pretty";

let actualPassword = "";

const passwordInput = document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("password");

  input.addEventListener("input", (e) => {

    const value = e.target.value;

    if (value.length > actualPassword.length) {
      actualPassword += value.slice(-1);
    } else {
      actualPassword = actualPassword.slice(0, value.length);
    }

    const lastChar = actualPassword.slice(-1);

    input.value =
      "•".repeat(actualPassword.length - 1) + lastChar;

    setTimeout(() => {
      if (actualPassword.length > 0) {
        input.value = "•".repeat(actualPassword.length);
      }
    }, 500);

  });

});

function login() {
  const password = actualPassword;
  const error = document.getElementById("error");

  if (password === SECRET_PASSWORD) {
    showPage("Do you love me? 🥺❤️", "Please choose", "yes1", "no1");
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
      <button class="no-btn" onmouseover="runAway(this)" onclick="${noAction}">No</button>
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
      <div class="emoji">Mi 🥺❤️</div>
      <h1 class="final-title">I Love You So Much ❤️</h1>

      <div class="photo-box">
        <img src="public/love.JPEG" class="love-photo" alt="Want me to add your pic babe?">
      </div>

      <p class="love-letter">
        I was bored yesterday, Mi 🤭❤️, so I decided to make this little page for you. It's not much, but I wanted to do something that would make you smile, because seeing you happy always makes my day better. 🥺❤️
      </p>

<button onclick="window.open('https://music.youtube.com/watch?v=8mMWeh42a0o', '_blank')">
  🎵 Play 
</button>

      <button onclick="location.reload()">Start Again</button>
    </div>
  `;

  playMusic();
}

function finalCryPage() {
  app.innerHTML = `
    <div class="card">
      <div class="emoji">😭💔</div>
      <h1>I'm crying now</h1>
      <p>My Heart😭💔</p>
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

function createHearts() {
  const heartsContainer = document.querySelector(".hearts");

  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }, 400);
}

function playMusic() {
  const music = document.getElementById("bgMusic");

  if (music) {
    music.play().catch(() => {
      console.log("Music will play after user interaction");
    });
  }
}

createHearts();

function runAway(button) {
  button.style.position = "relative";
  button.style.left = Math.random() * 120 - 60 + "px";
  button.style.top = Math.random() * 80 - 40 + "px";
}