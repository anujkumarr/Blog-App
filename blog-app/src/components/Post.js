import { Link } from 'react-router-dom';
import React from 'react';
import moment from 'moment';

function Post(props) {
  const { author, createdAt, title, description, slug } = props;

  return (
    <>
      <article className="article">
        <header className="flex align-center">
          <div className="article-img">
            <Link to="/profile">
              <img src={author.image} alt={author.username} />
            </Link>
          </div>
          <div className="author">
            <Link
              style={{ textDecoration: 'none' }}
              to={`/profile/${author.username}`}
            >
              <p>{author.username}</p>
            </Link>
            <time dateTime="">
              {moment(createdAt).format('ddd MMM D YYYY')}
            </time>
          </div>
        </header>
        <Link style={{ textDecoration: 'none' }} to={`/article/${slug}`}>
          <div className="article-tilte">
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </Link>
        <footer>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/article/${slug}`}
            className="read-more-btn"
          >
            Read More ...
          </Link>
        </footer>
      </article>
    </>
  );
}

export default Post;
