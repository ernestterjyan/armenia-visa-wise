import { Shield } from "lucide-react";

const HeroSection = () => (
  <section className="border-b border-border pb-6 pt-4 md:pb-8 md:pt-6">
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield size={15} className="text-primary" />
          <span>{"90/180 \u056F\u0561\u0576\u0578\u0576"}</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl">
          {"\u0547\u0565\u0576\u0563\u0565\u0576\u0575\u0561\u0576 \u0585\u0580\u0565\u0580\u056B \u0570\u0561\u0577\u057E\u056B\u0579"}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          {"\u0546\u0577\u0565\u0584 \u057A\u056C\u0561\u0576\u0561\u057E\u0578\u0580\u057E\u0561\u056E \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568, \u0561\u057E\u0565\u056C\u0561\u0581\u0580\u0565\u0584 \u0571\u0565\u0580 \u0576\u0561\u056D\u0578\u0580\u0564 \u0574\u0578\u0582\u057F\u0584/\u0565\u056C\u0584 \u0568\u0576\u0569\u0561\u0581\u0584\u0576\u0565\u0580\u0568 \u0587 \u057F\u0565\u057D\u0565\u0584, \u0569\u0565 \u0584\u0561\u0576\u056B \u0585\u0580 \u0565\u0584 \u056F\u0561\u0580\u0578\u0572 \u0574\u0576\u0561\u056C\u0589"}
        </p>
      </div>

      <dl className="grid gap-3 sm:grid-cols-2 lg:min-w-[360px]">
        <div className="rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
          <dt className="text-sm text-muted-foreground">{"\u0540\u0561\u0577\u057E\u0561\u0580\u056F"}</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {"\u0547\u0565\u0576\u0563\u0565\u0576\u0578\u0582\u0574 90 \u0585\u0580 180-\u0585\u0580\u0575\u0561 \u057A\u0561\u057F\u0578\u0582\u0570\u0561\u0576\u056B \u0574\u0565\u057B"}
          </dd>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
          <dt className="text-sm text-muted-foreground">{"\u054F\u057E\u0575\u0561\u056C\u0576\u0565\u0580"}</dt>
          <dd className="mt-1 text-sm font-medium text-foreground">
            {"\u054A\u0561\u0570\u057E\u0578\u0582\u0574 \u0565\u0576 \u0571\u0565\u0580 \u057D\u0561\u0580\u0584\u0578\u0582\u0574"}
          </dd>
        </div>
      </dl>
    </div>
  </section>
);

export default HeroSection;
