// api/news.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const apiKey = process.env.VITE_REACT_APP_NEWS_API;
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
    const { data } = await axios.get(apiUrl);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
