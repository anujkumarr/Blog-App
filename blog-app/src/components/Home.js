import React from 'react';
import Posts from './Posts';
import Sidebar from './Sidebar';
import { articleURL } from '../utils/constant';
import Pagination from './Pagination';
import FeedNav from './FeedNav';

class Home extends React.Component {
  state = {
    articles: '',
    error: '',
    articleCount: 0,
    articleperpage: 10,
    activePage: 1,
    activeTab: '',
  };

  deleteTab = () => {
    this.setState({
      activeTab: '',
    });
  };

  addTab = (value) => {
    this.setState({
      activeTab: value,
    });
  };

  componentDidMount() {
    this.fetchData();
  }
  componentDidUpdate(_prevProps, prevState) {
    console.log(prevState);
    if (
      prevState.activePage !== this.state.activePage ||
      prevState.activeTab !== this.state.activeTab
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const limit = this.state.articleperpage;
    const offset = (this.state.activePage - 1) * limit;
    const tag = this.state.activeTab;
    fetch(
      articleURL + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`)
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.articles);
        this.setState({
          articles: data.articles,
          error: '',
          articleCount: data.articlesCount,
        });
      })
      .catch((err) => {
        this.setState({ error: 'Not able to  Fetching article' });
      });
  };
  updateCurrentPageIndex = (index) => {
    this.setState({
      activePage: index,
    });
  };
  render() {
    const {
      articles,
      error,
      articleCount,
      articleperpage,
      activePage,
      activeTab,
    } = this.state;
    console.log(articleCount);
    return (
      <>
        <div className="container  flex-sb">
          <div className="flex-70">
            <FeedNav activeTab={activeTab} deleteTab={this.deleteTab} />
            <Posts articles={articles} error={error} />
            <Pagination
              articleCount={articleCount}
              articleperpage={articleperpage}
              activePage={activePage}
              updateCurrentPageIndex={this.updateCurrentPageIndex}
            />
          </div>
          <div className="flex-25">
            <Sidebar addTab={this.addTab} />
          </div>
        </div>
      </>
    );
  }
}
export default Home;
