import { BookOpen, ShieldCheck, Clock3 } from "lucide-react";

const AppGuide = () => {
  return (
    <section className="rounded-3xl bg-card border border-border p-6 md:p-8" style={{ boxShadow: "var(--shadow-card)" }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
          <BookOpen size={18} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Ինչպես օգտագործել</h2>
          <p className="text-xs text-muted-foreground">Արագ ուղեցույց 90/180 հաշվարկի համար</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-2xl border border-border bg-muted/20 p-3.5">
          <p className="text-sm font-semibold text-foreground">1) Նշեք պլանավորված մուտքի օրը</p>
          <p className="text-xs text-muted-foreground mt-1">Հաշվարկը կատարվում է հենց այդ օրվա համար:</p>
        </div>
        <div className="rounded-2xl border border-border bg-muted/20 p-3.5">
          <p className="text-sm font-semibold text-foreground">2) Ավելացրեք նախորդ ուղևորությունները</p>
          <p className="text-xs text-muted-foreground mt-1">Մուտք/ելք օրերը նշեք հնարավորինս ճշգրիտ:</p>
        </div>
        <div className="rounded-2xl border border-border bg-muted/20 p-3.5">
          <p className="text-sm font-semibold text-foreground">3) Տեսեք թույլատրելի մնալու օրերը</p>
          <p className="text-xs text-muted-foreground mt-1">Կտեսնեք նաև վերջին թույլատրելի օրը և 180-օրյա պատուհանը:</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4">
        <div className="rounded-xl border border-border px-3 py-2.5 text-xs text-muted-foreground flex items-center gap-2">
          <Clock3 size={14} className="text-primary" />
          Տվյալները պահվում են ձեր սարքում
        </div>
        <div className="rounded-xl border border-border px-3 py-2.5 text-xs text-muted-foreground flex items-center gap-2">
          <ShieldCheck size={14} className="text-primary" />
          Հաշվարկը ավտոմատ թարմացվում է
        </div>
        <div className="rounded-xl border border-border px-3 py-2.5 text-xs text-muted-foreground flex items-center gap-2">
          <BookOpen size={14} className="text-primary" />
          Միշտ ստուգեք նաև պաշտոնական աղբյուրները
        </div>
      </div>
    </section>
  );
};

export default AppGuide;
