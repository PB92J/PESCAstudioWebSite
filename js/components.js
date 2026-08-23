/* js/components.js - Gestore caricamento moduli HTML */

document.addEventListener("DOMContentLoaded", () => {
  // Seleziona tutti gli elementi con l'attributo data-include
  const includes = document.querySelectorAll("[data-include]");

  includes.forEach(async (element) => {
    const file = element.getAttribute("data-include");
    
    try {
      // Esegue la richiesta HTTP locale/remota per recuperare il modulo
      const response = await fetch(file);
      if (response.ok) {
        // Sostituisce il contenuto del contenitore con l'HTML del modulo
        element.innerHTML = await response.text();
      } else {
        element.innerHTML = `<p style="color: red;">Errore nel caricamento del modulo: ${file}</p>`;
      }
    } catch (error) {
      console.error(`Errore di rete durante l'importazione di ${file}:`, error);
    }
  });
});