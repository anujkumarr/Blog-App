import React from 'react';
import { Link } from 'react-router-dom';

function FeedNav(props) {
  return (
    <nav className="feedNav">
      <ul className="flex">
        <li onClick={props.deleteTab}>
          <Link
            style={{ textDecoration: 'none' }}
            className={props.activeTab === '' && 'active'}
            to="/"
          >
            <h2 className="globle">Globle Feed</h2>
          </Link>
        </li>
        {props.activeTab && (
          <li>
            <Link
              style={{ textDecoration: 'none' }}
              className={props.activeTab && 'active'}
              to="/"
            >
              #{props.activeTab}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default FeedNav;
