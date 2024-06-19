export async function Album() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums = await response.json();
  return (
    <div>
      <h1>Albums</h1>
      <ul>
        {albums.map((album: any) => (
          <li key={album.id}>{album.title}</li>
        ))}
      </ul>
    </div>
  );
}
