import { Shield } from "lucide-react";

interface Props {
  dashboard: {
    tripCount: number;
    totalRecorded: number;
    remainingBefore: number | null;
  };
  plannedEntry: string;
}

const HeroSection = ({ dashboard, plannedEntry }: Props) => (
  <section className="rounded-xl border border-border bg-card shadow-[var(--shadow-card)]">
    <div className="grid gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1.2fr)_420px] lg:px-8 lg:py-8">
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield size={15} className="text-primary" />
          <span>{"Schengen 90 / 180"}</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-foreground md:text-[3.25rem] md:leading-[1]">
          {"\u0547\u0565\u0576\u0563\u0565\u0576\u0575\u0561\u0576 \u0585\u0580\u0565\u0580\u056B \u0570\u0561\u0577\u057E\u056B\u0579"}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          {"\u054D\u0561 \u0573\u0561\u0576\u0561\u057A\u0561\u0580\u0570\u056B \u057A\u056C\u0561\u0576\u0561\u057E\u0578\u0580\u0574\u0561\u0576 \u0563\u0578\u0580\u056E\u056B\u0584 \u0567. \u0574\u0578\u0582\u057F\u0584\u056B \u0585\u0580\u0568 \u0576\u0577\u0565\u056C\u0578\u0582\u0581 \u0570\u0565\u057F\u0578 \u056F\u057F\u0565\u057D\u0576\u0565\u0584 \u0578\u0580\u0584\u0561\u0576 \u056F\u0561\u0580\u0578\u0572 \u0565\u0584 \u0574\u0576\u0561\u056C, \u0565\u0580\u0562 \u0565\u0584 \u0576\u0578\u0580\u056B\u0581 \u0578\u0582\u0576\u0565\u0576\u0561\u0574 \u0585\u0580\u0565\u0580, \u0587 \u056B\u0576\u0579 \u056F\u0583\u0578\u056D\u057E\u056B \u0565\u0569\u0565 \u0574\u0578\u0582\u057F\u0584\u0568 \u057F\u0565\u0572\u0561\u0583\u0578\u056D\u0565\u0584\u0589"}
        </p>
      </div>

      <dl className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        <div className="rounded-lg border border-border bg-secondary px-4 py-4">
          <dt className="text-sm text-muted-foreground">{"\u0538\u0576\u057F\u0580\u057E\u0561\u056E \u0574\u0578\u0582\u057F\u0584"}</dt>
          <dd className="mt-1 font-medium text-foreground">{plannedEntry || "\u0549\u056F\u0561"}</dd>
        </div>
        <div className="rounded-lg border border-border bg-secondary px-4 py-4">
          <dt className="text-sm text-muted-foreground">{"\u0533\u0580\u0561\u0576\u0581\u057E\u0561\u056E \u0578\u0582\u0572\u0587\u0578\u0580\u0578\u0582\u0569\u0575\u0578\u0582\u0576"}</dt>
          <dd className="mt-1 font-medium text-foreground">{dashboard.tripCount}</dd>
        </div>
        <div className="rounded-lg border border-border bg-secondary px-4 py-4">
          <dt className="text-sm text-muted-foreground">{"\u0538\u0576\u0564\u0570\u0561\u0576\u0578\u0582\u0580 \u0563\u0580\u0561\u0576\u0581\u057E\u0561\u056E \u0585\u0580\u0565\u0580"}</dt>
          <dd className="mt-1 font-medium text-foreground">{dashboard.totalRecorded}</dd>
        </div>
      </dl>
    </div>
  </section>
);

export default HeroSection;
