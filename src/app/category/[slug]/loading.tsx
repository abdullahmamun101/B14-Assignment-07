export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="skeleton mb-6 h-10 w-48" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-36 w-full" />
        ))}
      </div>
    </div>
  );
}