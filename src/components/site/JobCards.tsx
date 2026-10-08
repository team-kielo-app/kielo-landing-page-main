import type { JobCard } from "@/lib/language-pages";

/** "Does any of this sound like your week?": a situation, what Kielo does about it, and where. */
export default function JobCards({ jobs, tinted = false }: { jobs: JobCard[]; tinted?: boolean }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
      {jobs.map((j) => (
        <div
          key={j.push}
          className={`flex flex-col gap-3 rounded-[22px] p-6 ${tinted ? "bg-[var(--tint)]" : "border border-[#E4E2EE] bg-white"}`}
        >
          <span className="text-xl font-extrabold leading-tight text-[#1F2330]">“{j.push}”</span>
          <span className="text-base leading-normal text-[#4A5060]">{j.answer}</span>
          <span className="mt-auto text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--ink,#4F52B8)]">{j.feature}</span>
        </div>
      ))}
    </div>
  );
}
