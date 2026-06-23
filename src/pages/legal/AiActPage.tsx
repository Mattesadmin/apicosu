export function AiActPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 space-y-6 text-sm text-zinc-200">
      <h1 className="text-2xl font-semibold text-white">Hinweis nach EU AI Act</h1>

      <section className="space-y-2">
        <p>
          Diese Anwendung nutzt KI zur Analyse und Generierung von Lösungsvorschlägen.
          Das System wird gemäß EU AI Act als <strong>Limited-Risk AI System</strong> eingestuft.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Transparenzhinweis</h2>
        <p>
          Die Ergebnisse werden ganz oder teilweise durch KI erzeugt und dienen ausschließlich der Unterstützung.
          Sie ersetzen keine fachliche Prüfung.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Menschliche Kontrolle</h2>
        <p>
          Alle Entscheidungen über die Umsetzung von Vorschlägen liegen beim Nutzer.
          Die Anwendung nimmt keine Änderungen an Produktivsystemen vor.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Datenkategorien</h2>
        <p>
          Es werden keine biometrischen Daten, keine sensiblen Daten und keine Daten zur Profilbildung verarbeitet.
        </p>
      </section>
    </div>
  );
}