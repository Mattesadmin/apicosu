export function HaftungPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 space-y-6 text-sm text-zinc-200">
      <h1 className="text-2xl font-semibold text-white">Haftungsausschluss für KI-Ergebnisse</h1>

      <section className="space-y-2">
        <p>
          Die bereitgestellten KI-Ergebnisse dienen ausschließlich der Unterstützung und stellen keine verbindliche Beratung dar.
        </p>
        <p>
          Ergebnisse können unvollständig oder fehlerhaft sein und müssen fachlich geprüft werden.
        </p>
        <p>
          Eine Haftung für Entscheidungen, die allein auf KI-Ausgaben basieren, wird ausgeschlossen.
        </p>
      </section>
    </div>
  );
}