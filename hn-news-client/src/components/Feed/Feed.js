import "./feed.scss";
import { useEffect, useState } from "react";
import { Story } from "./Story";
import axios from "axios";

const APIEndPoint = "http://localhost:4000/stories";

/**
 * Component that wraps the list of stories and handles main app state.
 */
export function Feed() {
  const [stories, setStories] = useState([]);

  const getStories = async () => {
    const response = await axios.get(APIEndPoint);
    setStories(response.data);
  };

  const deleteStory = async (storyId) => {
    await axios.put(`${APIEndPoint}/${storyId}`);
    getStories();
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <section className="hn-feed-wrapper">
      <ul className="hn-stories-container">
        {stories.map((story, key) => (
          <Story story={story} deleteStory={deleteStory} key={key} />
        ))}
      </ul>
    </section>
  );
}
