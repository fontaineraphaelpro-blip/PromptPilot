/** Fond pleine largeur — évite les « bandes noires » vides sur grands écrans */
export function MarketingAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#020202]" />
      <div className="absolute inset-0 bg-grid-wide" />
      <div className="absolute inset-0 bg-gradient-radial-wide" />
      <div className="orb orb-wide orb-wide-1" />
      <div className="orb orb-wide orb-wide-2" />
      <div className="absolute inset-y-0 left-0 w-1/3 max-w-md bg-gradient-to-r from-white/[0.03] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-1/3 max-w-md bg-gradient-to-l from-white/[0.03] to-transparent" />
    </div>
  );
}
