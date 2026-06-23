export function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 space-y-6 text-sm text-zinc-200">
      <h1 className="text-2xl font-semibold text-white">Datenschutzerklärung</h1>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">1. Verantwortlicher</h2>
        <p>
          APICOSU – Application for Intelligent Consulting Support<br />
          [Von-Seeckt-Straße 3, 45130, Essen, Deutschland]<br />
          E-Mail: [support@apicosu.com]
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">2. Art der verarbeiteten Daten</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Hochgeladene Dateien (Log-Dateien, Texte, Customizing-Daten)</li>
          <li>Freitexteingaben</li>
          <li>Technische Nutzungsdaten (Browsertyp, Zeitstempel)</li>
          <li>E-Mail-Adresse bei Nutzung des Kündigungsformulars</li>
        </ul>
        <p>
          Die Anwendung ist so konzipiert, dass keine personenbezogenen Daten erforderlich sind.
          Nutzer werden ausdrücklich aufgefordert, keine personenbezogenen Daten in Dateien oder Freitexten hochzuladen.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">3. Zweck der Verarbeitung</h2>
        <p>
          Die Verarbeitung der Daten erfolgt ausschließlich zum Zweck der Analyse von Inhalten
          und zur Generierung von Lösungsvorschlägen mittels KI-gestützter Verfahren.
        </p>
        <p>
          Bei Nutzung des Kündigungsformulars wird die angegebene E-Mail-Adresse ausschließlich
          zur Bearbeitung der Kündigung verarbeitet und – vorbehaltlich gesetzlicher
          Aufbewahrungspflichten – nach Abschluss des Vorgangs gelöscht.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">4. Einsatz von KI-Diensten</h2>
        <p>
          Für die Analyse können externe KI-Dienste (z. B. OpenAI / Azure OpenAI) genutzt werden.
          Inhalte werden ausschließlich zur Bearbeitung der Anfrage verwendet und nicht zu
          Trainingszwecken gespeichert (gemäß den jeweiligen Anbieterrichtlinien).
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">5. Speicherdauer</h2>
        <p>
          Hochgeladene Dateien und Analyseinhalte werden nur für die Dauer der Sitzung verarbeitet
          und anschließend gelöscht, sofern keine gesetzliche Aufbewahrungspflicht besteht.
        </p>
        <p>
          Daten aus dem Kündigungsformular werden nur so lange gespeichert, wie dies zur
          Dokumentation und Bearbeitung der Kündigung erforderlich ist.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">6. Rechte der Nutzer</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Recht auf Auskunft</li>
          <li>Recht auf Berichtigung oder Löschung</li>
          <li>Recht auf Einschränkung der Verarbeitung</li>
          <li>Recht auf Widerspruch gegen die Verarbeitung</li>
        </ul>
        <p>Zur Ausübung dieser Rechte kannst du dich jederzeit an [support@apicosu.com] wenden.</p>
      </section>
    </div>
  );
}