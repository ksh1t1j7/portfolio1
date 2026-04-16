import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-mono text-sm uppercase tracking-[0.24em] text-muted-foreground">404</p>
        <h1 className="mt-4 font-display text-[clamp(56px,10vw,120px)] leading-none tracking-wide">
          Not Found
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you were looking for does not exist or may have been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:bg-white hover:text-black"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
}
