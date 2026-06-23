export function WiderrufPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 space-y-6 text-sm text-zinc-200">
      <h1 className="text-2xl font-semibold text-white">Widerrufsbelehrung</h1>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Widerrufsrecht</h2>
        <p>
          Verbraucher haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Erlöschen des Widerrufsrechts</h2>
        <p>
          Das Widerrufsrecht kann erlöschen, wenn du ausdrücklich zustimmst, dass die digitale Leistung sofort erbracht wird.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold text-white">Ausübung</h2>
        <p>
          Zur Ausübung des Widerrufs genügt eine eindeutige Erklärung per E-Mail an: [Deine E-Mail].
        </p>
      </section>
    </div>
  );
}