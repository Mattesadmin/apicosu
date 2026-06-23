export function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 space-y-6 text-sm text-zinc-200">
      <h1 className="text-2xl font-semibold text-white">Impressum</h1>

      <div className="space-y-2">
        <p><strong>APICOSU – Application for Intelligent Consulting Support</strong></p>
        <p>Inhaber: [Matthias Langhoff]</p>
        <p>Adresse: [Von-Seeckt-Straße 3, 45130, Essen]</p>
        <p>E-Mail: [support@apicosu.com]</p>
        <p>USt-IdNr.: [falls vorhanden]</p>
      </div>

      <div className="space-y-2">
        <p>
          <strong>Inhaltlich verantwortlich gemäß § 18 Abs. 2 MStV:</strong><br />
          [Matthias Langhoff], [Von-Seeckt-Straße 3, 45130 Essen, Deutschland]
        </p>
      </div>
    </div>
  );
}