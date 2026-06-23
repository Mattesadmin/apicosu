export function AgbPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 space-y-6 text-sm text-zinc-200">
      <h1 className="text-2xl font-semibold text-white">Nutzungsbedingungen (AGB)</h1>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">1. Leistungsbeschreibung</h2>
        <p>
          APICOSU bietet KI-gestützte Analysefunktionen zur Unterstützung von Consulting-Prozessen.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">2. Nutzungsvoraussetzungen</h2>
        <p>
          Nutzer dürfen keine personenbezogenen oder vertraulichen Kundendaten hochladen.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">3. Keine Gewähr</h2>
        <p>
          KI-Ergebnisse sind Vorschläge und müssen fachlich geprüft werden.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">4. Haftung</h2>
        <p>
          Eine Haftung für Schäden aus KI-Ausgaben ist ausgeschlossen, außer bei Vorsatz oder grober Fahrlässigkeit.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">5. Verfügbarkeit</h2>
        <p>
          Es besteht kein Anspruch auf permanente Verfügbarkeit der Anwendung.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">6. Kündigung</h2>
        <p>
          Abonnements können jederzeit über den Bereich „Vertrag kündigen“ beendet werden.
        </p>
      </section>
    </div>
  );
}