export function OpportunitySection() {
  const stipulations = [
    { label: "Format", value: "Short / Game / Doc / Show" },
    { label: "Project Length", value: "1–3 Minutes" },
    { label: "Selection Method", value: "Random Lottery" },
    { label: "Drawing Date", value: "May 3, 2026" },
    { label: "Entry Fee", value: "$5 USD" },
    { label: "Winners Selected", value: "5 Projects" },
  ]

  return (
    <section className="py-28 px-6 max-w-5xl mx-auto relative">
      {/* Ambient glow - brighter */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,200,255,0.08) 0%, transparent 65%)" }}
      />

      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start relative z-10">
        {/* Left copy */}
        <div>
          <p className="text-[11px] font-bold tracking-[0.55em] uppercase text-cyan-400 mb-4">
            About the Initiative
          </p>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-[-0.03em] text-white text-balance mb-6 leading-[0.9]"
            style={{ textShadow: "0 0 40px rgba(0,200,255,0.15)" }}
          >
            The<br />Opportunity
          </h2>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed mb-5 font-medium">
            I&apos;m looking for the next five stories to bring to life.
          </p>
          <p className="text-slate-300 text-base leading-relaxed">
            This initiative is a random lottery designed to support independent
            creators. For a $5 entry, you stand to receive a custom,
            high-fidelity score tailored specifically to your visual narrative.
          </p>
        </div>

        {/* Glass stipulations panel */}
        <div className="bg-black/40 backdrop-blur-2xl rounded-2xl border border-cyan-400/15 p-8 shadow-[0_0_50px_rgba(0,200,255,0.07),inset_0_1px_0_rgba(255,255,255,0.05)]">
          <p className="text-[11px] font-bold tracking-[0.55em] uppercase text-cyan-400 mb-6">
            Submission Stipulations
          </p>
          <ul className="space-y-0">
            {stipulations.map((item) => (
              <li
                key={item.label}
                className="flex justify-between items-center border-b border-white/[0.06] py-3.5 last:border-b-0 last:pb-0"
              >
                <span className="text-sm text-slate-500 font-medium tracking-wide uppercase">{item.label}</span>
                <span className="text-sm font-bold text-cyan-100 tracking-wide">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
