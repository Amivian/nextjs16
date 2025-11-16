// app/movie-albums/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

// ---------- Skeleton Loader ----------
function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-xl p-4">
      <div className="w-full h-40 bg-gray-300 rounded-md" />
      <div className="h-4 bg-gray-300 rounded mt-3 w-3/4" />
      <div className="h-3 bg-gray-300 rounded mt-2 w-1/2" />
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// ---------- Data Fetchers ----------
async function getAlbums() {
  const res = await fetch("https://jsonplaceholder.typicode.com/albums");
  return res.json();
}

async function getPhotos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  return res.json();
}

// ---------- Async Child Component ----------
async function AlbumGrid({ page }: { page: number }) {
  const pageSize = 12;
  const [albumsData] = await Promise.all([getAlbums(), getPhotos()]);

  const albums = albumsData.map((album: any) => ({
    ...album,
    thumbnailUrl: `https://picsum.photos/seed/album-${album.id}/300/200`,
  }));

  const paginated = albums.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {paginated.map((album: any) => (
        <div key={album.id} className="bg-gray-600 rounded-[10px] shadow p-4 w-[400px] justify-center items-center text-center ">
          <Image
            src={album.thumbnailUrl}
            alt={album.title}
            width={400}
            height={300}
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold mt-2">{album.title}</h3>
          <p className="text-sm text-gray-500">Album ID: {album.id}</p>
        </div>
      ))}
    </div>
  );
}

// ---------- Page Component ----------
export default function MovieAlbums({
  searchParams = {},
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams.page ?? 1);
  const pageSize = 12;
  const totalAlbums = 100; // JSONPlaceholder always returns 100 albums
  const totalPages = Math.ceil(totalAlbums / pageSize);

  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Movie Albums</h2>

      {/* Skeleton + Suspense */}
      <Suspense fallback={<SkeletonGrid />}>
        <AlbumGrid page={page} />
      </Suspense>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-4">
        {page > 1 && (
          <Link
            href={`/movie-albums?page=${page - 1}`}
            className="px-4 py-2 rounded-md bg-gray-200"
          >
            Prev
          </Link>
        )}

        <span className="px-4 py-2 font-medium">
          Page {page} of {totalPages}
        </span>

        {page < totalPages && (
          <Link
            href={`/movie-albums?page=${page + 1}`}
            className="px-4 py-2 rounded-md bg-gray-200"
          >
            Next
          </Link>
        )}
      </div>
    </main>
  );
}
