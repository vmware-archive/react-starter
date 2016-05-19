const {Actions} = require('p-flux');
const React = require('react');
const types = React.PropTypes;

class ApiPage extends React.Component {
  static propTypes = {
    posts: types.array
  };

  componentDidMount() {
    Actions.fetchPosts();
  }

  render() {
    const {posts = []} = this.props;
    const titles = posts.map(({title, id}) => <div key={id}>{title}</div>);
    return (
      <div className="api-page">
        <h3>This page talks to an api</h3>
        <h4>The api has posts with titles:</h4>
        {titles}
      </div>
    );
  }
}

module.exports = ApiPage;