import React from 'react';
import moment from 'moment';

function Comment(props) {
  let { id, author, body, createdAt } = props.comment;

  return (
    <>
      <section>
        <div className="comment-section">
          <h2>{body}</h2>
          <div className="flex-sb align-center people-comment comment-div ">
            <div>
              {' '}
              <div className="comment-img ">
                <img src={author.image} alt={author.username} />
              </div>
              <div className="flex  align-center ">
                <p>{author.username}</p>
                <span> {moment(createdAt).format('ddd MMM D YYYY')}</span>
              </div>
            </div>

            {author.username === props.user.username ? (
              <button
                onClick={() => {
                  props.handelDelete(id);
                }}
              >
                delete
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Comment;
