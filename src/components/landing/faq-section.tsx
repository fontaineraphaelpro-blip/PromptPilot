const faqs = [
  {
    q: "Quelles IA sont supportées ?",
    a: "ChatGPT, Claude, Gemini, Midjourney, DALL·E, Runway, Sora, Veo, Lovable, Bolt, Cursor et Replit.",
  },
  {
    q: "Combien de prompts gratuits par jour ?",
    a: "Le plan Free inclut 3 générations par jour. Les plans Pro et Creator sont illimités.",
  },
  {
    q: "Mes prompts sont-ils sauvegardés ?",
    a: "Oui, chaque génération est enregistrée dans ton historique. Tu peux les marquer en favoris.",
  },
  {
    q: "Puis-je annuler mon abonnement ?",
    a: "Oui, à tout moment via le portail Stripe dans Paramètres > Facturation.",
  },
];

export function FaqSection() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold">FAQ</h2>
        <dl className="mt-10 space-y-6">
          {faqs.map(({ q, a }) => (
            <div key={q} className="rounded-xl border border-border bg-card p-6">
              <dt className="font-semibold">{q}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
