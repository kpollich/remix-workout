import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'remix';
import type { MetaFunction } from 'remix';

import styles from './tailwind.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: 'Remix Workout Manager' };
};

const navLinks = [
  {
    label: 'Exercises',
    href: '/exercises',
  },
  {
    label: 'Templates',
    href: '/templates',
  },
  {
    label: 'History',
    href: '/history',
  },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="p-8 border-solid">
          <h1 className="text-4xl font-semibold mb-4">Remix Workouts</h1>
          <nav>
            <ul className="flex space-x-4 text-xl">
              {navLinks.map(({ label, href }) => (
                <li key={`nav-${href}`}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      isActive
                        ? 'bg-violet-300 p-2 rounded-md'
                        : 'p-2 rounded-md'
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main>
          <Outlet />
        </main>

        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}
