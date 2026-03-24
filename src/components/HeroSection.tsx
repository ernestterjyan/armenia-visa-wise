import { Shield } from "lucide-react";

const HeroSection = () => (
  <section className="text-center pt-6 pb-2 md:pt-10 md:pb-4">
    <div className="inline-flex items-center gap-2 rounded-full bg-primary/8 border border-primary/15 px-4 py-1.5 mb-5">
      <Shield size={14} className="text-primary" />
      <span className="text-xs font-semibold text-primary tracking-wide">SCHENGEN 90/180</span>
    </div>
    <h1 className="text-3xl md:text-[42px] font-extrabold leading-tight tracking-tight text-foreground">
      {"Շdelays\u0547\u0565\u0576\u0563\u0565\u0576\u0575\u0561\u0576 \u0585\u0580\u0565\u0580\u056B \u0570\u0561\u0577\u057E\u056B\u0579"}
    </h1>
    <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
      {" Delays\u054A\u0561\u0580\u0566\u0565\u0584, \u0569\u0565 \u0584\u0561\u0576\u056B \u0585\u0580 \u056F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0574\u0576\u0561\u056C \u0547\u0565\u0576\u0563\u0565\u0576\u0575\u0561\u0576 \u0563\u0578\u057F\u0578\u0582\u0574\u0589"}
    </p>
  </section>
);

export default HeroSection;
