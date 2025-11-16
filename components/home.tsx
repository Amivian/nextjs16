async function MovieAlbums(){
    const response = await fetch( "https://jsonplaceholder.typicode.com/photos");
    if(!response.ok) throw new Error("Failed to fetch data.");

    const albums = await response.json();

    return(
      <>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Movie Albums</h2>n
        <div className="grid grid-cols-2 md:grid-cols-3">
            {albums.map((album: {id: number, title: string, url: string}) => (
                <div key={album.id} className="bg-gray-50 shadow-sm rounded-[10px] p-4 transition-all hover:shadow-md">
                    <img src={album.url} alt={album.title} className="w-full h-48 object-cover rounded-t-[10px]" />
                    <h3 className="text-lg font-bold mb-2">{album.title}</h3>
                    <p className="text-sm text-gray-600"> Album ID: {album.id}</p>
                </div>
            ))}
        </div>
      </main>
      </>
    );
}
export default MovieAlbums;

