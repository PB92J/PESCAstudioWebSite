/* js/navigation.js - Gestore del menu mobile scorrevole */

document.addEventListener("DOMContentLoaded", () => {
  // Seleziona il menu principale della pagina.
  const navigation = document.querySelector(".nav-menu");
  const navigationContainer = navigation?.closest(".nav-container");
  const navigationList = navigation?.querySelector("ul");

  // Interrompe l'inizializzazione se il menu non è presente.
  if (!navigation || !navigationContainer || !navigationList) {
    return;
  }

  // Aggiorna l'indicatore in base alla posizione reale dello scroll.
  const updateScrollHint = () => {
    const hasOverflow = navigation.scrollWidth > navigation.clientWidth + 1;
    const isAtEnd = navigation.scrollLeft + navigation.clientWidth >= navigation.scrollWidth - 16;

    // Determina se almeno una voce del menu si trova su una riga diversa dalla prima.
    const firstItemTop = navigationList.firstElementChild?.offsetTop ?? 0;
    const isWrapped = [...navigationList.children].some((item) => {
      return Math.abs(item.offsetTop - firstItemTop) > 1;
    });

    // Rileva se il menu mobile contiene voci nascoste oltre il bordo destro.
    const isScrollable = hasOverflow && !isAtEnd;
    navigationContainer.classList.toggle("menu-wrapped", isWrapped);
    navigation.classList.toggle("has-more", isScrollable);
  };

  // Evita aggiornamenti eccessivi durante lo scorrimento con inerzia del telefono.
  let frameRequested = false;
  const scheduleScrollHintUpdate = () => {
    if (frameRequested) {
      return;
    }

    frameRequested = true;
    requestAnimationFrame(() => {
      frameRequested = false;
      updateScrollHint();
    });
  };

  // Aggiorna l'indicatore quando l'utente trascina il menu.
  navigation.addEventListener("scroll", scheduleScrollHintUpdate, { passive: true });

  // Ricalcola l'overflow quando cambia la larghezza della finestra.
  window.addEventListener("resize", scheduleScrollHintUpdate);

  // Esegue il primo controllo dopo il caricamento del layout.
  updateScrollHint();

  // Ricalcola la larghezza dopo il caricamento dei font, che può modificare l'overflow del menu.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateScrollHint);
  }
});