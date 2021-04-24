const { RESTDataSource } = require("apollo-datasource-rest");

class postAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://cdn.c1.amplience.net/cms/content";
  }

  async getUser(id) {
    const user = await this.get(
      `/query?query=%7B%22sys.iri%22%3A%22http%3A%2F%2Fcontent.cms.amplience.com%2F${id}%22%7D&scope=tree&store=valtech`
    );
    const raw = JSON.stringify(user["@graph"][0]);
    const res = JSON.parse(raw);
    return res;
  }
}

module.exports = postAPI;
