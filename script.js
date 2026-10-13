(() => {
  const body = document.body;
  const scene = document.getElementById("scene");
  const card = document.getElementById("card");
  const page = document.getElementById("page");
  const replay = document.getElementById("replay");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? Math.min(ms, 60) : ms));

  let busy = false;

  function showPage() {
    scene.hidden = true;
    page.hidden = false;
    body.classList.remove("intro");
    window.scrollTo(0, 0);
    history.replaceState(null, "", "#brief");
  }

  async function open() {
    if (busy) return;
    busy = true;
    card.setAttribute("aria-disabled", "true");

    scene.classList.add("flipped");      // Postkarte dreht sich zum Umschlag
    await wait(1150);
    scene.classList.add("unsealed");     // Siegel bricht, Lasche öffnet sich
    await wait(450);
    scene.classList.add("flap-behind");  // Lasche hinter den Brief legen
    await wait(450);
    scene.classList.add("rising");       // Brief gleitet heraus
    await wait(1300);
    scene.classList.add("leaving");      // Szene blendet aus
    await wait(650);
    showPage();
    busy = false;
  }

  function close() {
    page.hidden = true;
    scene.hidden = false;
    scene.className = "scene";
    card.removeAttribute("aria-disabled");
    body.classList.add("intro");
    history.replaceState(null, "", location.pathname);
    window.scrollTo(0, 0);
    card.focus({ preventScroll: true });
  }

  card.addEventListener("click", open);
  replay.addEventListener("click", close);

  // Direktlink: …/#brief öffnet sofort den Brief
  if (location.hash === "#brief") showPage();
})();
