import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { articleURL } from '../utils/constant';
import Loader from './Loader';
import moment from 'moment';
import AddComment from './AddComment';
class Singlepost extends React.Component {
  state = {
    article: '',
    error: '',
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;
    console.log(slug);
    fetch(articleURL + '/' + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.article);
        this.setState({
          article: data.article,
          error: '',
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to  Fetching article' });
      });
  }

  handelDelete = (slug) => {
    fetch(articleURL + '/' + slug, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to delete!');
        }
      })
      .then((data) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    if (this.state.error) {
      return <p>{this.state.error}</p>;
    }
    if (!this.state.article) {
      return <Loader />;
    }
    let { author, title, createdAt, description, body, tagList, slug } =
      this.state.article;
    return (
      <>
        <section className="container">
          <div className="singleArticle">
            <h1>{title}</h1>
            <div className="flex align-center">
              <div className="single-img">
                <img className="" src={author.image} alt={author.username} />
              </div>

              <div className="time">
                <h2>{author.username}</h2>
                <time dateTime="">
                  {moment(createdAt).format('ddd MMM D YYYY')}
                </time>
              </div>
              {this.props.user &&
              this.props.user.username === author.username ? (
                <div className="edit-delete-btns">
                  <button className=" button-2 edit-btn">
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: 'rgb(190, 190, 190)',
                      }}
                      to={`/editArticle/${slug}`}
                    >
                      Edit Article
                    </Link>
                  </button>
                  <button
                    className="button-2 delete-btn"
                    onClick={() => this.handelDelete(slug)}
                  >
                    Detele Article
                  </button>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
          <div className="detail-article">
            <h3>{description}</h3>
            <p>{body}</p>
            <div className="tags">
              {tagList.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>

          <div>
            {this.props.user === null ? (
              <footer>
                <div>
                  <p>
                    <Link to="/signup">Sign up</Link> or{' '}
                    <Link to="/login"> Log in</Link>
                    or add to comments on this article
                  </p>
                </div>
              </footer>
            ) : (
              <AddComment slug={slug} user={this.props.user} />
            )}
          </div>
        </section>
      </>
    );
  }
}

export default withRouter(Singlepost);
