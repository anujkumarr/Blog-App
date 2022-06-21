import { Link, NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="flex-sb">
            <Link style={{ textDecoration: 'none' }} to="/">
              <h1>BLOG APP</h1>
            </Link>

            {props.isLoggedIn ? (
              <AuthHeader user={props.user} />
            ) : (
              <NonAuthHeader />
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

function NonAuthHeader() {
  return (
    <ul className="flex">
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/"
        exact
      >
        <li>Home</li>
      </NavLink>

      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/signup"
      >
        <li>Signup</li>
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/login"
      >
        <li>Login</li>
      </NavLink>
    </ul>
  );
}
function AuthHeader(props) {
  let { username } = props.user;
  return (
    <ul className="flex">
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/"
        exact
      >
        <li>Home</li>
      </NavLink>

      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/new-post"
      >
        <li>NewArticle</li>
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/setting"
      >
        <li>
          <i className="fa-solid fa-gear"></i>Settings
        </li>
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to={`/profile/${username}`}
      >
        <li>Profile</li>
      </NavLink>
    </ul>
  );
}

export default Header;
