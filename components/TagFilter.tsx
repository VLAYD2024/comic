'use client';

type Props = {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
};

export function TagFilter({ tags, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={`px-3 py-1 rounded-full text-sm border transition ${
          active === null
            ? 'bg-accent text-paper border-accent shadow-card'
            : 'bg-paper/60 border-ink/15 text-ink/70 hover:border-accent hover:text-ink'
        }`}
      >
        Все
      </button>
      {tags.map((tag) => {
        const isActive = active === tag;
        return (
          <button
            key={tag}
            onClick={() => onChange(isActive ? null : tag)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              isActive
                ? 'bg-accent text-paper border-accent shadow-card'
                : 'bg-paper/60 border-ink/15 text-ink/70 hover:border-accent hover:text-ink'
            }`}
          >
            #{tag}
          </button>
        );
      })}
    </div>
  );
}
