const romanticNames = [
  "Rahiiiiiii, the prettiest distraction alive.",
  "Babyyyy, professional heart thief.",
  "Titir pakhi, soft chaos in human form.",
  "My darling drama queen with a kissable little attitude.",
  "My favorite notification, my favorite face, my favorite problem.",
];

const flirtyMissions = [
  "Mission: make her blush in under ten seconds with a shameless compliment.",
  "Mission: tell Babyyyy that her smile should be classified as dangerous.",
  "Mission: steal one selfie, give ten kisses, ask for one more.",
  "Mission: remind Titir pakhi that being this cute should require a license.",
  "Mission: plan a date dramatic enough for her standards and soft enough for forehead kisses.",
];

const titles = [
  "The queen of my attention.",
  "The face card that never declines.",
  "My favorite pretty problem.",
  "CEO of making me stare shamelessly.",
  "The sweetest menace with the softest lips.",
];

const moods = [
  "Sweet enough to melt me, savage enough to tease me after.",
  "One kiss away from being extra dramatic and even prettier.",
  "Looking innocent. Planning trouble.",
  "Soft voice, sharp attitude, perfect balance.",
  "Too cute to argue with and too tempting to ignore.",
];

const blushLines = [
  "If I stared any harder, your photo frame might get jealous.",
  "You wear cute like it was invented for you.",
  "Every time you smile, my standards for beauty get ruined.",
  "You are exactly the kind of distraction I would choose on purpose every single time.",
  "Even your attitude looks flirtatious on you.",
];

const meterLines = [
  "86% charming. Still unfair to the rest of the world.",
  "93% gorgeous. Productivity officially cancelled for kissing reasons.",
  "97% lethal. Eye contact not survivable.",
  "99% perfect. Please stop attacking my peace with that face.",
  "101% Babyyyy. Science cannot explain this level of flirt damage.",
];

const secretNotes = [
  "Secret note: if you come closer, I am absolutely not responsible for how flirtatious I become.",
  "Secret note: your face is illegally pretty and I need to admire it for a few business days.",
  "Secret note: Babyyyy, you make romance feel embarrassingly easy.",
  "Secret note: Titir pakhi, one smile from you and I forget every serious thought I had.",
];

const funnyLines = [
  "Case update: smiling like that while pretending to be normal is now considered a public hazard.",
  "Official report: 74% adorable, 26% nonsense, 100% guilty of causing distraction.",
  "Emergency reading: entered the room, acted innocent, ruined everybody's focus immediately.",
  "Scientific conclusion: she is not dramatic, the universe is just reacting to her properly.",
  "Final charge sheet: excessive cuteness, suspicious laughter, and repeated theft of attention.",
];

const dateResponses = {
  soft: [
    "Soft date selected: slow music, forehead kisses, hand-holding, and a stare that lasts too long.",
    "Soft date selected: cozy lights, sweet teasing, and you looking unfairly pretty across the table.",
  ],
  chaotic: [
    "Chaotic date selected: mock arguments, stolen fries, loud laughing, and one very smug pretty girl.",
    "Chaotic date selected: teasing all night, dramatic eyes, and zero chance of behaving normally.",
  ],
  luxury: [
    "Luxury date selected: gold lights, elegant outfits, and you acting like the princess you clearly are.",
    "Luxury date selected: polished plans, expensive-looking energy, and me staring at you more than the decor.",
  ],
};

const photoConfig = {
  main: {
    src: "./assets/rahi-main.jpeg",
    position: "center 18%",
    scale: "1.02",
  },
  second: {
    src: "./assets/rahi-pottery.jpeg",
    position: "center 68%",
    scale: "1.08",
  },
  third: {
    src: "./assets/rahi-red.jpeg",
    position: "center 28%",
    scale: "1.05",
  },
  fourth: {
    src: "./assets/rahi-laugh.jpeg",
    position: "center 22%",
    scale: "1.03",
  },
  fifth: {
    src: "./assets/rahi-luxury.jpeg",
    position: "center 30%",
    scale: "1.06",
  },
  sixth: {
    src: "./assets/saree-gold-blue.jpeg",
    position: "center 26%",
    scale: "1.04",
  },
  seventh: {
    src: "./assets/saree-maroon.jpeg",
    position: "center 22%",
    scale: "1.03",
  },
  eighth: {
    src: "./assets/saree-red-festive.jpeg",
    position: "center 24%",
    scale: "1.04",
  },
  ninth: {
    src: "./assets/saree-floral.jpeg",
    position: "center 20%",
    scale: "1.04",
  },
  tenth: {
    src: "./assets/saree-navy.jpeg",
    position: "center 24%",
    scale: "1.03",
  },
  eleventh: {
    src: "./assets/saree-grey-floral.jpeg",
    position: "center 18%",
    scale: "1.03",
  },
  twelfth: {
    src: "./assets/saree-pink-pattern.jpeg",
    position: "center 18%",
    scale: "1.03",
  },
};

let kissCount = 0;
let hasRevealedSite = false;

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function setText(id, value) {
  const element = document.querySelector(`#${id}`);

  if (element) {
    element.textContent = value;
  }
}

function wireButton(buttonId, outputId, collection) {
  const button = document.querySelector(`#${buttonId}`);

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    setText(outputId, randomItem(collection));
  });
}

function applyPhotos() {
  const portraits = document.querySelectorAll("[data-photo-slot]");

  portraits.forEach((portrait) => {
    const slot = portrait.getAttribute("data-photo-slot");
    const photo = photoConfig[slot];

    if (!photo || !photo.src) {
      return;
    }

    portrait.style.setProperty("--photo-image", `url("${photo.src}")`);
    portrait.style.setProperty("--photo-opacity", "1");
    portrait.style.setProperty("--photo-position", photo.position ?? "center");
    portrait.style.setProperty("--photo-scale", photo.scale ?? "1");
  });
}

function wireMeter() {
  const button = document.querySelector("#meter-button");
  const fill = document.querySelector("#meter-fill");

  if (!button || !fill) {
    return;
  }

  button.addEventListener("click", () => {
    const value = 86 + Math.floor(Math.random() * 16);
    fill.style.width = `${Math.min(value, 100)}%`;
    setText("meter-output", randomItem(meterLines));
  });
}

function wireSecretNote() {
  const button = document.querySelector("#secret-button");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    setText("secret-output", randomItem(secretNotes));
  });
}

function wireDateChoices() {
  const buttons = document.querySelectorAll("[data-date-choice]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.getAttribute("data-date-choice");
      const responsePool = dateResponses[key];

      if (responsePool) {
        setText("date-output", randomItem(responsePool));
      }
    });
  });
}

function wireKissCounter() {
  const button = document.querySelector("#kiss-button");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    kissCount += 1;

    const suffix = kissCount === 1
      ? " One kiss delivered. She still deserves more."
      : ` ${kissCount} kisses collected and counting.`;

    setText("kiss-output", `Kisses collected: ${kissCount}.${suffix}`);
  });
}

function burstHearts(event) {
  const layer = document.querySelector("#heart-layer");

  if (!layer) {
    return;
  }

  for (let index = 0; index < 6; index += 1) {
    const heart = document.createElement("span");
    heart.className = "heart-pop";
    heart.style.left = `${event.clientX + (Math.random() * 30 - 15)}px`;
    heart.style.top = `${event.clientY + (Math.random() * 16 - 8)}px`;
    heart.style.setProperty("--heart-x", `${Math.random() * 80 - 40}px`);
    heart.style.animationDelay = `${index * 35}ms`;
    layer.appendChild(heart);

    window.setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}

function wireHeartBursts() {
  const buttons = document.querySelectorAll(".button");

  buttons.forEach((button) => {
    button.addEventListener("click", burstHearts);
  });
}

function startDownload(url, filename) {
  const tempLink = document.createElement("a");
  tempLink.href = url;
  tempLink.download = filename;
  tempLink.rel = "noopener";
  document.body.appendChild(tempLink);
  tempLink.click();
  tempLink.remove();
}

function revealSite() {
  if (hasRevealedSite) {
    return;
  }

  hasRevealedSite = true;

  const intro = document.querySelector("#intro-screen");
  const site = document.querySelector("#romantic-site");

  if (intro) {
    intro.classList.add("intro-screen--leaving");
  }

  if (site) {
    site.removeAttribute("aria-hidden");
    site.classList.remove("page-shell--hidden");
    site.classList.add("page-shell--revealing");
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  window.setTimeout(() => {
    if (intro) {
      intro.hidden = true;
    }

    if (site) {
      window.setTimeout(() => {
        site.classList.remove("page-shell--revealing");
      }, 900);
    }
  }, 380);
}

function wireIntroFlow() {
  const downloadLink = document.querySelector("#download-link");

  if (downloadLink) {
    downloadLink.addEventListener("click", (event) => {
      event.preventDefault();
      const url = downloadLink.getAttribute("href");
      const filename = downloadLink.getAttribute("download") || "download.pptx";
      startDownload(url, filename);
      revealSite();
    });
  }
}

wireButton("nickname-button", "nickname-output", romanticNames);
wireButton("mission-button", "mission-output", flirtyMissions);
wireButton("title-button", "title-output", titles);
wireButton("mood-button", "mood-output", moods);
wireButton("blush-button", "blush-output", blushLines);
wireButton("funny-button", "funny-output", funnyLines);
wireMeter();
wireSecretNote();
wireDateChoices();
wireKissCounter();
wireHeartBursts();
wireIntroFlow();
applyPhotos();
