import { ChevronRight } from 'lucide-react';
import { navigate } from '@/components/Navbar';

export type Crumb = {
  label: string;
  path?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-semibold text-navy/50 mb-6 flex-wrap">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1.5">
            {item.path && !isLast ? (
              <button
                onClick={() => navigate(item.path!)}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className={isLast ? 'text-navy' : ''} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <ChevronRight className="w-4 h-4 text-navy/30" />}
          </span>
        );
      })}
    </nav>
  );
}
