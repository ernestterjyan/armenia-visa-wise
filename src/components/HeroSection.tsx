const HeroSection = () => {
  const badges = [
    "\u2713 90/180 \u056F\u0561\u0576\u0578\u0576",
    "\u2713 \u054F\u0565\u057D\u0578\u0572\u0561\u056F\u0561\u0576 progress bar",
    "\u2713 \u0548\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580\u056B timeline",
    "\u2713 \u054A\u0561\u0570\u057A\u0561\u0576\u0578\u0582\u0574 \u0567 \u057F\u057E\u0575\u0561\u056C\u0576\u0565\u0580\u0568 \u0562\u0580\u0561\u0578\u0582\u0566\u0565\u0580\u0578\u0582\u0574",
  ];

  return (
    <section
      className="relative overflow-hidden rounded-2xl p-6 md:p-8 text-primary-foreground"
      style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-hero)" }}
    >
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-foreground/10" />
      <h1 className="relative z-10 text-2xl md:text-[32px] font-bold mb-3 leading-tight">
        {"\u0547\u0565\u0576\u0563\u0565\u0576\u0575\u0561\u0576 \u0563\u0578\u057F\u0578\u0582 90/180 \u0570\u0561\u0577\u057E\u056B\u0579"}
      </h1>
      <p className="relative z-10 text-primary-foreground/90 max-w-2xl leading-relaxed text-sm md:text-base">
        {"\u0531\u057E\u0565\u056C\u0561\u0581\u0580\u0565\u0584 \u0571\u0565\u0580 \u0576\u0561\u056D\u0578\u0580\u0564 \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576\u0576\u0565\u0580\u0568, \u0568\u0576\u057F\u0580\u0565\u0584 \u0576\u0561\u056D\u0561\u057F\u0565\u057D\u057E\u0561\u056E \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568 \u0587 \u057F\u0565\u057D\u0565\u0584 \u0578\u0579 \u0574\u056B\u0561\u0575\u0576 \u0561\u0580\u0564\u0575\u0578\u0582\u0576\u0584\u0568, \u0561\u0575\u056C \u0576\u0561\u0587 \u0585\u0563\u057F\u0561\u0563\u0578\u0580\u056E\u057E\u0561\u056E \u0585\u0580\u0565\u0580\u056B \u057A\u0561\u057F\u056F\u0565\u0580\u0568\u0589"}
      </p>
      <div className="relative z-10 flex flex-wrap gap-2 mt-4">
        {badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-sm backdrop-blur-sm"
          >
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
