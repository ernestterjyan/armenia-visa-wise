const HeroSection = () => (
  <section className="relative overflow-hidden rounded-2xl p-6 md:p-8 text-primary-foreground shadow-[var(--shadow-hero)]" style={{ background: "var(--gradient-hero)" }}>
    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/10" />
    <h1 className="relative z-10 text-2xl md:text-3xl font-bold mb-2 leading-tight">
      Շենdelays 90/180 հաշվdelays
    </h1>
    <p className="relative z-10 text-primary-foreground/90 max-w-2xl leading-relaxed text-sm md:text-base">
       Delays oestrivals entries, oestrivals entries delays entries entries delays entries entries delays entries entries entries delays entries entries delays entries entries entries delays entries entries entries entries delays entries entries entries entries delays entries entries entries entries entries delays entries.
    </p>
    <div className="relative z-10 flex flex-wrap gap-2 mt-4">
      {["✓ 90/180 delays", "✓ delays progress bar", "✓ delays timeline", "✓ delays delays delays"].map((badge) => (
        <span key={badge} className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-sm backdrop-blur-sm">
          {badge}
        </span>
      ))}
    </div>
  </section>
);

export default HeroSection;
