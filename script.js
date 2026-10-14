(() => {
  const cover = document.getElementById("cover");

  function hide() {
    cover.classList.add("gone");
    document.body.classList.remove("locked");
    cover.setAttribute("aria-hidden", "true");
    cover.tabIndex = -1;
  }

  cover.addEventListener("click", hide);
  cover.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hide(); }
  });

  // Direktlink …/#text zeigt sofort den Text
  if (location.hash === "#text") {
    cover.style.transition = "none";
    hide();
  } else {
    cover.focus({ preventScroll: true });
  }
})();
