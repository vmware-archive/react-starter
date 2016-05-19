const FakePostsApi = require('../api/fake_posts_api');

const ApiDispatcher = {
  fetchPosts(){
    return FakePostsApi.fetch().then((data) => {
      this.dispatch({type: 'updatePosts', data});
    });
  },
  updatePosts({data}){
    this.$store.merge({posts: data});
  }
};

module.exports = ApiDispatcher;
