
export default class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
  }

  buildUrl(endpoint) {
    const url = `${this.baseUrl}${endpoint}?api_key=${this.apiKey}`;
    console.log('Constructed URL:', url); // Debugging line
    return url;
  }

  async postComment(comment) {
    console.log('Posting comment:', comment); // Debugging line

    try {
      const response = await axios.post(this.buildUrl('comments'), comment, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Post Comment Response:', response.data); // Debugging line
      return response.data;
    } catch (error) {
      console.error('Error in postComment:', error);
    }
  }

  async getComments() {
    try {
      const response = await axios.get(this.buildUrl('comments'));
      let comments = response.data;
      console.log('Fetched Comments:', comments); // Debugging line
  
      //comments are sorted from newest to oldest based on timestamp
      comments.sort((a, b) => b.timestamp - a.timestamp);
  
      return comments;
    } catch (error) {
      console.error('Error in getComments:', error);
    }
  }

  async getShows() {
    try {
      const response = await axios.get(this.buildUrl('showdates'));
      return response.data;
    } catch (error) {
      console.error('Error in getShows:', error);
    }
  }
}
