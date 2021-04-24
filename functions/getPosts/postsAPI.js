const { RESTDataSource } = require("apollo-datasource-rest");

class postsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://cdn.c1.amplience.net/cms/content";
  }

  async getUser() {
    const user = await this.get(
      `/query?query=%7B%22sys.iri%22%3A%22http%3A%2F%2Fcontent.cms.amplience.com%2Fbecde1d4-843d-456f-a702-c2f3a9188ea2%22%7D&scope=tree&store=valtech`
    );
    const raw = JSON.stringify(user["@graph"][0].allPosts);
    const res = JSON.parse(raw);
    return res;
  }
}

module.exports = postsAPI;
