import React from 'react';
import { tagURL } from '../utils/constant';
import Loader from './Loader';

class Sidebar extends React.Component {
  state = {
    tags: '',
    error: '',
  };
  componentDidMount() {
    fetch(tagURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(({ tags }) => {
        console.log(tags);
        if (tags.length > 1) {
          this.setState({ tags });
        }
      })
      .catch((err) => {
        this.setState({ error: 'Not able to  Fetching tags' });
      });
  }
  render() {
    const { tags, error } = this.state;
    if (!tags) {
      return <Loader />;
    }
    if (error) {
      return <p>{error}</p>;
    }
    return (
      <>
        <aside className="aside">
          <h3>Popular Tag</h3>
          {tags.map((tag) => (
            <button
              className="button"
              key={tag}
              onClick={() => this.props.addTab(tag)}
            >
              {tag}
            </button>
          ))}
        </aside>
      </>
    );
  }
}

export default Sidebar;
