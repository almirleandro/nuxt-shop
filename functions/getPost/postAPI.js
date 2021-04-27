const { RESTDataSource } = require("apollo-datasource-rest");

class postAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://cdn.c1.amplience.net/cms/content";
  }

  async getUser(id) {
    const user = await this.get(
      process.env.AMPLIENCE_QUERY_START +
        id +
        process.env.AMPLIENCE_QUERY_ENDING
    );
    const raw = JSON.stringify(user["@graph"][0]);
    const res = JSON.parse(raw);
    return res;
  }
}

module.exports = postAPI;
