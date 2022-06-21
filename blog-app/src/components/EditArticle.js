import React from 'react';
import { articleURL } from '../utils/constant';
import { withRouter } from 'react-router';
class EditArticle extends React.Component {
  state = {
    title: '',
    description: '',
    body: '',
    tagList: '',
    error: '',
    errors: {
      title: '',
      description: '',
      body: '',
      tagList: '',
    },
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(articleURL + '/' + slug)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        let { title, description, body, tagList } = data.article;

        this.setState({
          title: title,
          description: description,
          body: body,
          tagList: tagList,
        });
      })
      .catch((error) => {
        this.setState({ error: 'article is not fetch' });
      });
  }

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.error };
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    let slug = this.props.match.params.slug;
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    fetch(articleURL + '/' + slug, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.split(',').map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Can not create new Article');
        }
        return res.json();
      })
      .then(({ article }) => {
        // console.log(article);
        this.setState({
          title: '',
          description: '',
          body: '',
          tagList: '',
        });
        this.props.history.push(`/article/${this.props.match.params.slug}`);
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    let { title, description, body, tagList } = this.state;
    return (
      <>
        <div>
          <form action="" className="form-control">
            <h3>Update Article</h3>
            <input
              type="text"
              name="title"
              placeholder="Article Title"
              onChange={this.handleChange}
              value={title}
            />

            <input
              type="text"
              name="description"
              placeholder="what's  this article is all about "
              onChange={this.handleChange}
              value={description}
            />

            <textarea
              type="text"
              name="body"
              rows="6"
              placeholder="write your article"
              onChange={this.handleChange}
              value={body}
            />

            <input
              type="text"
              name="tagList"
              placeholder="Enter Tags"
              onChange={this.handleChange}
              value={tagList}
            />
            <div>
              <button
                className="publish-btn"
                type="submit"
                onClick={this.handleSubmit}
              >
                Update Article
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
export default withRouter(EditArticle);
