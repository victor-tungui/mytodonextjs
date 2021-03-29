import Link from 'next/link';

function Navigation() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          TODO App
        </a>
        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <ul className='navbar-nav me-auto mb-2 mb-md-0'>
            <li className='nav-item'>
              <Link href='/activities'>
                <a className='nav-link'>My Activities </a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/profile'>
                <a className='nav-link'>Profile</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
