import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-gray-800 text-white p-4 mb-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/ranking" className="hover:text-gray-300 transition-colors">Ranking</Link>
        </div>
        <Link
          to="/admin"
          className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Adicionar Pizzaria
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;