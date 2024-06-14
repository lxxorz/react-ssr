export default function Page() {
  return (
    <div>
      <h1>Hello World!</h1>
      <p>It's a page!</p>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Path</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Home</td>
            <td>/</td>
          </tr>
          <tr>
            <td>Page</td>
            <td>/page</td>
          </tr>
          <tr>
            <td>404</td>
            <td>/404</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
