const { RESTDataSource } = require("apollo-datasource-rest");

class postsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://cdn.c1.amplience.net/cms/content";
  }

  async getUser() {
    const user = await this.get(process.env.AMPLIENCE_ALL_POSTS_QUERY);
    const raw = JSON.stringify(user["@graph"][0].allPosts);
    const res = JSON.parse(raw);
    return res;
  }
}

module.exports = postsAPI;
