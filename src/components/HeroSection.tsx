import { Shield } from "lucide-react";

const HeroSection = () => (
  <section className="text-center pt-6 pb-2 md:pt-10 md:pb-4">
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 border border-primary/15 px-4 py-1.5 mb-5">
      <Shield size={14} className="text-primary" />
      <span className="text-xs font-semibold text-primary tracking-wide">SCHENGEN 90/180</span>
    </div>
    <h1 className="text-3xl md:text-[42px] font-extrabold leading-tight tracking-tight text-foreground">
      Շենգdelays delays delaysdelays delaysdelaysdelaysdelaysdelaysdelays delaysdelaysdelaysdelays delays90/180
    </h1>
    <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
      Պdelays delaysdelaysdelaysdelays, delaysdelays delaysdelaysdelaysdelays delaysdelays delaysdelaysdelaysdelaysdelays delaysdelaysdelays delaysdelays Շdelays delaysdelaysdelaysdelays delaysdelaysdelaysdelaysdelays.
    </p>
  </section>
);

export default HeroSection;
