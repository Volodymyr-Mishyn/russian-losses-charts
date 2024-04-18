export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <h1 className="sm:text-2xl">Russian losses according to Ministry of Defense of Ukraine</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#">Full version</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
