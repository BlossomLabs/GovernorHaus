import { Connect } from "./Connect";

export function Header() {
  return (
    <header className="navbar flex justify-between p-4 pt-0 pb-0 bg-violet-700">
      <a href="/">
        <img
          src="/logo.svg"
          alt="Logo"
          className="h-20 w-20"
          width={20}
          height={20}
        />
      </a>

      <div className="flex gap-2 items-center">
        <Connect />
      </div>
    </header>
  );
}
