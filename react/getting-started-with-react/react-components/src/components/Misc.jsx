export default function Navbar() {
  return (
    <nav>
      <ul className="nav_left">
        <li>
          <a href="#">
            <img src="#" alt="#" />
            <h1>Heading 1</h1>
          </a>
        </li>
      </ul>
      <ul className="nav_right">
        <li>
          <a href="#">home</a>
        </li>
        <li>
          <a href="#">about</a>
        </li>
      </ul>
    </nav>
  );
}

export function Main() {
  return (
    <main>
      <div>
        <h2>Heading 2</h2>
      </div>
    </main>
  );
}
