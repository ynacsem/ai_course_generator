const { default: axios } = require("axios")

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3/search"

const getVideos = async(query)=>{
    const params = {
        part: "snippet",
        maxResults: 1,
        q: query,
        type: "video",
        key: process.env.YOUTUBE_API_KEY || "AIzaSyDs43YezpOocPsfo1Ae0g2uB5eyblGAdgg"
    }
    const resp = await axios.get(YOUTUBE_BASE_URL, {params})
    return resp.data.items
}
export default getVideos