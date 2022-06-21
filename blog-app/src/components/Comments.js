import React from 'react';
import { articleURL } from '../utils/constant';
import Comment from './Comment';


class Comments extends React.Component {
  componentDidMount() {
    this.props.fetchComment();
  }

  handelDelete = (id) => {
    fetch(articleURL + `/${this.props.slug}/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
    }).then(this.props.fetchComment);
  };

  render() {
    if (!this.props.state.comment) {
      return <h2> No Comment Added</h2>;
    }
    return (
      <>
        <section>
          <ul>
            {this.props.state.comment.map((singleComment) => {
              console.log(singleComment);
              return (
                <Comment
                  key={singleComment.id}
                  comment={singleComment}
                  handelDelete={this.handelDelete}
                  user={this.props.user}
                />
              );
            })}
          </ul>
        </section>
      </>
    );
  }
}

export default Comments;
