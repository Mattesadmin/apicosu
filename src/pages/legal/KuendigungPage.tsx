import { useState } from "react";

export function KuendigungPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Hier deine API / Mail-Logik einbauen
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10 text-sm text-zinc-200">
      <h1 className="text-2xl font-semibold text-white mb-4">Vertrag / Abo kündigen</h1>

      <p className="mb-4">
        Hier kannst du dein bestehendes Abonnement gemäß § 312k BGB einfach und direkt kündigen.
        Fülle das folgende Formular aus. Du erhältst im Anschluss eine Bestätigung der Kündigung.
      </p>

      {submitted ? (
        <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-emerald-200">
          Deine Kündigung wurde übermittelt. Du erhältst in Kürze eine Bestätigung per E-Mail.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-zinc-400">
              E-Mail-Adresse (für die das Abo läuft)
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-[#2a2a2a] bg-[#111] px-3 py-2 text-sm text-white outline-none focus:border-[#39a5ff]"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-medium text-zinc-400">
              Optionale Nachricht
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-[#2a2a2a] bg-[#111] px-3 py-2 text-sm text-white outline-none focus:border-[#39a5ff]"
              placeholder="Optional: Kundennummer, gewünschtes Kündigungsdatum, Feedback ..."
            />
          </div>

          <p className="text-xs text-zinc-500">
            Hinweis: Deine E-Mail-Adresse wird ausschließlich zur Bearbeitung deiner Kündigung
            verwendet und – vorbehaltlich gesetzlicher Aufbewahrungspflichten – anschließend gelöscht.
            Weitere Informationen findest du in unserer Datenschutzerklärung.
          </p>

          <button
            type="submit"
            className="rounded-full bg-[#0A6ED1] px-5 py-2 text-sm font-medium text-white shadow-lg shadow-[#0A6ED1]/40 hover:bg-[#0b7ff0] transition"
          >
            Jetzt kündigen
          </button>
        </form>
      )}
    </div>
  );
}