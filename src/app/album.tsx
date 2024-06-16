import Like from "./like";
export async function Album() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/albums/1/photos"
  );
  const photos = await response.json();

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-lg">Album</h1>
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo: any) => (
          <div key={photo.id} className="flex flex-col items-center gap-1">
            <p className="text-center">{photo.title}</p>
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              className="w-48 h-48 object-cover rounded-lg shadow-lg"
            />
            <Like />
          </div>
        ))}
      </div>
    </div>
  );
}
