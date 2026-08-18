import Link from "./Link";

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col items-center justify-center gap-2 pb-4 text-sm leading-4.5 text-white sm:flex-row sm:gap-3">
      <p>
        Coded by{" "}
        <Link
          href="https://www.linkedin.com/in/ferdinandogeografo/"
          aria-label="Check my profile on LinkedIn"
        >
          Ferdinando Geografo
        </Link>
        .
      </p>

      <p className="hidden sm:block">
        Visit my projects on my{" "}
        <Link
          href="https://github.com/FerdinandoGeografo"
          aria-label="Check my profile on GitHub"
        >
          GitHub
        </Link>
        .
      </p>
    </footer>
  );
}
