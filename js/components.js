/* js/components.js - Gestore caricamento moduli HTML */

async function loadIncludes() {
  // Seleziona tutti gli elementi con l'attributo data-include.
  const includes = document.querySelectorAll("[data-include]");

  // Carica tutti i moduli in parallelo e attende il completamento delle richieste.
  await Promise.all([...includes].map(async (element) => {
    // Legge il percorso del frammento HTML da caricare.
    const file = element.getAttribute("data-include");

    // Ignora contenitori privi di un percorso valido.
    if (!file) {
      return;
    }

    try {
      // Richiede il frammento HTML al server che ospita il sito.
      const response = await fetch(file);

      // Trasforma le risposte HTTP fallite in errori gestibili dal catch.
      if (!response.ok) {
        throw new Error(`Risposta HTTP ${response.status}`);
      }

      // Sostituisce il wrapper con il partial completo, mantenendo i suoi tag semantici radice.
      element.outerHTML = await response.text();
    } catch (error) {
      // Registra i dettagli tecnici nella console per facilitare il debug.
      console.error(`Errore durante l'importazione di ${file}:`, error);

      // Mostra all'utente un messaggio accessibile al posto della sezione mancante.
      element.innerHTML = `<p class="include-error" role="alert">Impossibile caricare questa sezione.</p>`;
    }
  }));
}

// Avvia il caricamento dopo che il documento HTML iniziale è stato interpretato.
document.addEventListener("DOMContentLoaded", loadIncludes);