import React from 'react';
import { articleURL } from '../utils/constant';
import Posts from './Posts';
import { withRouter } from 'react-router';
import ProfileBanner from './ProfileBanner';
import Loader from './Loader';

class Profile extends React.Component {
  state = {
    activeTab: 'author',
    articles: null,
  };

  FetchData = () => {
    const slug = this.props.match.params.username;
    fetch(articleURL + `/?${this.state.activeTab}=${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`can not fetch deta for specific user`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.articles);
        this.setState({
          articles: data.articles,
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to  Fetching article' });
      });
  };
  componentDidMount() {
    this.FetchData();
  }
  handelActive = (tab) => {
    this.setState(
      {
        activeTab: tab,
      },
      () => {
        this.FetchData();
      }
    );
  };

  render() {
    const { activeTab } = this.setState;
    const slug = this.props.match.params.username;
    if (!this.state.articles) {
      <Loader />;
    }

    return (
      <>
        <section>
          <ProfileBanner username={slug} user={this.props.user} />
          <div className="container">
            <div className="profile">
              <div className="buttons-div">
                <button
                  onClick={() => this.handelActive('author')}
                  className={activeTab === 'author' && 'active'}
                >
                  My Article
                </button>
                <button
                  onClick={() => this.handelActive('favorited')}
                  className={activeTab === 'favorited' && 'active'}
                >
                  Favorited Article
                </button>
              </div>

              <Posts articles={this.state.articles} />
              {/* <Pagination /> */}
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default withRouter(Profile);
