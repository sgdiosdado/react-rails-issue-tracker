function Badge({ label }: { label: string }) {
  return (
    <div className="inline-block rounded-full border border-slate-300 bg-slate-200 px-2.5 py-0.5 text-xs font-semibold">
      <p>{label}</p>
    </div>
  )
}

export function Card({ title, badgeLabel, assignee }: { title: string, badgeLabel: string, assignee: string }) {
  return (
    <article className="rounded-md bg-white p-4 flex flex-col gap-8 items-start">
      <p className="w-full">{title}</p>
      <footer className="flex items-center justify-between w-full">
        <Badge label={badgeLabel} />
        <p className="text-xs text-slate-500">{ assignee }</p>
      </footer>
    </article>
  )
}
