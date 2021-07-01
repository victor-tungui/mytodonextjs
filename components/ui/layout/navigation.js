import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

function Navigation() {
  const [session, loading] = useSession();
  const isLoggedIn = session && !loading;

  function logOutHandler(event) {
    event.preventDefault();

    signOut();
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='/'>
          TODO App
        </a>
        <div className='collapse navbar-collapse' id='navbarCollapse'>
          <ul className='navbar-nav me-auto mb-2 mb-md-0'>
            {isLoggedIn && (
              <li className='nav-item'>
                <Link href='/activities'>
                  <a className='nav-link'>My Activities </a>
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className='nav-item'>
                <Link href='/profile'>
                  <a className='nav-link'>Profile</a>
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className='nav-item'>
                <a className='nav-link' href='#' onClick={logOutHandler}>
                  Log Out
                </a>
              </li>
            )}
            {!isLoggedIn && (
              <li className='nav-item'>
                <Link href='/authentication'>
                  <a className='nav-link'>Log In</a>
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li className='nav-item'>
                <Link href='/authentication/register'>
                  <a className='nav-link'>Register</a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
