const app = document.getElementById("app");

const SECRET_PASSWORD = "Olami_Is_Pretty";

let actualPassword = "";

/* =========================
   WELCOME PAGE
========================= */

function showWelcome() {

  app.innerHTML = `
    <div class="card welcome-card">

      <div class="emoji">❤️</div>

      <h1>For Mi ❤️</h1>

      <p>
        Before you continue,
        I made a little surprise for you 🥺❤️
      </p>

      <button onclick="showLogin()">
        Open My Surprise Babyyy 🎁
      </button>

    </div>
  `;

}
/* =========================
   LOGIN PAGE
========================= */

function showLogin() {

  actualPassword = "";

  app.innerHTML = `
    <div class="card">

      <h1>Login ❤️</h1>

      <p>
        Enter Your Password
      </p>

      <input
        type="text"
        id="password"
        placeholder="Enter password..."
        autocomplete="off">

      <button onclick="login()">
        Login ❤️
      </button>

      <small id="error"></small>

    </div>
  `;

  setupPasswordInput();

}

function setupPasswordInput() {

  const input = document.getElementById("password");

  input.addEventListener("input", (e) => {

    const value = e.target.value;

    if (value.length > actualPassword.length) {

      actualPassword += value.slice(-1);

    } else {

      actualPassword =
        actualPassword.slice(0, value.length);

    }

    const lastChar =
      actualPassword.slice(-1);

    input.value =
      "•".repeat(actualPassword.length - 1)
      + lastChar;

    setTimeout(() => {

      if (actualPassword.length > 0) {

        input.value =
          "•".repeat(actualPassword.length);

      }

    }, 500);

  });

}

function login() {

  const password = actualPassword;

  const error =
    document.getElementById("error");

  if (password === SECRET_PASSWORD) {

    startQuiz();

  } else {

    error.textContent =
      "Wrong password baby 😂❤️";

  }

}
/* =========================
   LOVE QUIZ
========================= */

function startQuiz() {

  app.innerHTML = `
    <div class="card">

      <div class="emoji">🥺❤️</div>

      <h1>Love Quiz</h1>

      <p>
        Who loves who more? 🤔❤️
      </p>

      <button onclick="quiz1()">
        Me ❤️
      </button>

      <button onclick="quiz1()">
        You ❤️
      </button>

    </div>
  `;

}

function quiz1() {

  app.innerHTML = `
    <div class="card">

      <div class="emoji">😂❤️</div>

      <h1>Correct ❤️</h1>

      <p>
        Next Question 😌❤️
      </p>

      <button onclick="quiz2()">
        Continue ❤️
      </button>

    </div>
  `;

}

function quiz2() {

  app.innerHTML = `
    <div class="card">

      <div class="emoji">🌹❤️</div>

      <h1>Question 2</h1>

      <p>
        Who is the prettiest girl? 😍
      </p>

      <button onclick="quiz3()">
        Esther 🙈❤️
      </button>

      <button onclick="quiz3()">
        My Baby 🙈❤️
      </button>

    </div>
  `;

}

function quiz3() {

  app.innerHTML = `
    <div class="card">

      <div class="emoji">😍❤️</div>

      <h1>Last Question</h1>

      <p>
        Do you know how much I love you?
      </p>

      <button onclick="quizFinish()">
        A Lot babe ❤️
      </button>

      <button onclick="quizFinish()">
        More Than A Lot baby ❤️
      </button>

    </div>
  `;

}

function quizFinish() {

  showPage(
    "Do you love me? 🥺❤️",
    "Please choose wisely 😭❤️",
    "yes1",
    "no1"
  );

}
/* =========================
   LOVE QUESTION FLOW
========================= */

function card(
  title,
  text,
  yesAction,
  noAction,
  emoji = ""
) {

  app.innerHTML = `
    <div class="card">

      ${emoji
        ? `<div class="emoji">${emoji}</div>`
        : ""
      }

      <h1>${title}</h1>

      <p>${text}</p>

      <button onclick="${yesAction}">
        Yes ❤️
      </button>

      <button
        class="no-btn"
        onmouseover="runAway(this)"
        onclick="${noAction}">

        No 😭

      </button>

    </div>
  `;

}

function showPage(
  title,
  text,
  yesType,
  noType
) {

  card(
    title,
    text,
    `handleChoice('${yesType}')`,
    `handleChoice('${noType}')`
  );

}

function handleChoice(choice) {
  
  if (choice === "yes1") {
    finalLovePage();
  }

  if (choice === "no1") {
    showPage(
      "Are you sure? 😭",
      "Think about it again baby ❤️",
      "yes2",
      "no2"
    );
  }

  if (choice === "yes2") {
    finalCryPage();
  }

  if (choice === "no2") {
    showPage(
      "You don't love me? 🥺",
      "Answer carefully 😭❤️",
      "yes3",
      "no3"
    );
  }

  if (choice === "yes3") {
    finalCryPage();
  }

  if (choice === "no3") {
    showPage(
      "So you love me? 😍",
      "I knew it ❤️",
      "yes4",
      "no4"
    );
  }

  if (choice === "yes4") {
    finalLovePage();
  }

  if (choice === "no4") {
    finalCryPage();
  }

}
/* =========================
   RUNAWAY BUTTON
========================= */

function runAway(button) {

  button.style.position = "relative";

  button.style.left =
    Math.random() * 120 - 60 + "px";

  button.style.top =
    Math.random() * 80 - 40 + "px";

}
/* =========================
   FINAL LOVE PAGE
========================= */

function finalLovePage() {

  app.innerHTML = `
    <div class="card">

      <div class="emoji">
        ❤️🥺❤️
      </div>

      <h1 class="final-title">
        I Love You So Much ❤️
      </h1>

      <div class="love-counter">
        ❤️ My Favorite Person Forever ❤️
      </div>

      <div class="photo-box">

        <img
          src="babyyyy.jpeg"
          class="love-photo"
          alt="Mi ❤️">

      </div>

      <p class="love-letter">

My love ❤️,

If there's one thing I hope you never doubt, it's how much you mean to me.

You have become one of the most beautiful parts of my life and every day I'm grateful that I get to know you, talk to you, laugh with you and love you.

You bring a kind of happiness that I can't really put into words.

Your smile, your heart, your kindness and even the little things you do always stay on my mind.

You have become my comfort, my peace and one of the best things that has ever happened to me.

I love you so much, Mi ❤️🥺

      </p>

      <div class="memory-box">

        <h3>
          💌 A Little Secret
        </h3>

        <p>
          No matter what happens,
          I hope you never forget
          how special you are to me ❤️
        </p>

      </div>

      <button
        class="secret-btn"
        onclick="showSecret()">

        🎁 Open Secret

      </button>

      <button
        onclick="window.open(
        'https://music.youtube.com/watch?v=WVlfEuMdfkQ&si=SbIeCEJoXIvvNgYF',
        '_blank')">

        🎵 Our Song

      </button>

      <button onclick="location.reload()">

        Start Again ❤️

      </button>
    </div>
  `;

}
/* =========================
   SECRET MESSAGE CARD
========================= */

function showSecret() {

  const secretCard =
    document.createElement("div");

  secretCard.className =
    "secret-card";

  secretCard.innerHTML = `

    <h2>
      💌 Just For You ❤️
    </h2>

    <p>

Meeting you was one of the most beautiful things that has ever happened to me babyy.❤️

You came into my life and somehow made ordinary days feel special. Your smile, your kindness, your love, and even the little things you do have a way of making me happy.

Thank you for being such an important part of my life. No matter what happens, you'll always have a special place in my heart. I love you Esther 😭❤️


    </p>

    <button
      onclick="this.parentElement.remove()">

      Close ❤️

    </button>

  `;

  document.body.appendChild(
    secretCard
  );

}
/* =========================
   CRY PAGE
========================= */

function finalCryPage() {

  app.innerHTML = `
    <div class="card">

      <div class="emoji">
        😭💔
      </div>

      <h1>
        I'm Crying Now
      </h1>

      <p>
        My Poor Heart 😭💔
      </p>

      <button
        onclick="location.reload()">

        Try Again

      </button>

    </div>
  `;

}