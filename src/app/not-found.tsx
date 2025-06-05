import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col text-center">
      <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
      <Link href="/students" className="mt-6 text-blue-500 underline">
        Go back home
      </Link>
    </div>
  );
}
