import { nav } from "@/content";

// centered section links, md+ only. green only on hover / keyboard focus.
// smooth scroll + header offset come from css (scroll-behavior on html, scroll-margin-top on section[id]).
export function HeaderNav() {
  return (
    <nav aria-label="sections" className="max-md:hidden">
      <ul className="flex items-center gap-[clamp(16px,2vw,36px)]">
        {nav.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="text-[14px] whitespace-nowrap text-bone transition-[color] duration-150 hover:text-signal focus-visible:text-signal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bone"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
