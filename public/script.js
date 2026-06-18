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
        <img src="babyyyy.jpeg" class="love-photo" alt="olami is pretty asf">
      </div>

      <p class="love-letter">
        My love ❤️,

If there's one thing I hope you never doubt, it's how much you mean to me. You have become one of the most beautiful parts of my life, and every day I'm grateful that I get to know you, talk to you, laugh with you, and love you.

You bring a kind of happiness that I can't really put into words. Even on the most ordinary days, somehow you make everything feel a little brighter. Your smile, your heart, your kindness, and even the little things you do have a way of staying on my mind.

I know I'm not perfect, and I may not always find the right words, but one thing I know for sure is that I care about you deeply. More than you probably realize. You have become my favorite person, my comfort, my peace, and one of the best things that has ever happened to me.

So if you ever wonder what this little page is about, it's simply a reminder that you are loved, appreciated, and incredibly special to me.

I love you, Mi. Today, tomorrow, and every day after that. 🥺❤️

      </p>

<button onclick="window.open('https://music.youtube.com/watch?v=koHfRN-M9dU&si=ZWLVxXPGY8VUwLhu', '_blank')">
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