"use client"

export function GuaranteeSection() {
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto relative z-10">
      <div className="bg-gradient-to-br from-black via-black to-black p-[1px] rounded-2xl shadow-[0_0_40px_rgba(0,200,255,0.12)]">
        <div className="bg-black/70 backdrop-blur-2xl p-8 md:p-12 rounded-2xl text-center border border-cyan-400/15">
          <p className="text-[11px] font-bold tracking-[0.55em] uppercase text-cyan-400 mb-3">
            The Guarantee
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-[0.12em] text-white" style={{ textShadow: "0 0 30px rgba(0,200,255,0.15)" }}>
            The <span className="text-cyan-400">Ariladia</span> Promise
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-12 max-w-2xl mx-auto italic font-medium">
            "I respect the indie grind. I want to ensure your $5 goes directly toward elevating your project, regardless of the lottery results. No one leaves empty-handed."
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {[
              {
                icon: "💰",
                title: "30% Off Your First Score",
                desc: "Your $5 submission acts as a voucher. If your project isn't drawn, you automatically lock in a 30% discount on our standard scoring rates for any project in 2026.",
              },
              {
                icon: "🎵",
                title: "Instant Cinematic Asset",
                desc: "Every director who submits receives a free, royalty-free cinematic audio asset (a premium ambient bed or impact) straight from the Ariladia studio to use in your edits immediately.",
              },
            ].map((benefit, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center shrink-0 border border-cyan-400/25 text-cyan-400 text-xl group-hover:bg-cyan-400/15 transition-colors">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-[0.1em] text-sm mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed font-medium">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
