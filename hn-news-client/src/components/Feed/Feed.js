import "./feed.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const APIEndPoint = "http://localhost:4000/stories";

export function Feed() {
  const [stories, setStories] = useState([]);

  const getStories = async () => {
    const response = await axios.get(APIEndPoint);
    setStories(response.data.stories);
  };
  const deleteStory = async (event, storyId) => {
    event.preventDefault();
    await axios.delete(`${APIEndPoint}/${storyId}`);
    getStories();
  };

  useEffect(() => {
    getStories();
  }, []);

  return (
    <section className="hn-feed-wrapper">
      <ul className="hn-stories-container">
        {stories.map((story, key) => (
          <a href={story.storyUrl} target="_blank" rel="noreferrer" key={key}>
            <li id={story.storyId}>
              <p>
                {story.title}{" "}
                <span className="hn-author"> - {story.author} -</span>
              </p>
              <div className="hn-time-and-trash">
                <p className="hn-time-text">Yesterday</p>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAt0lEQVRIS2NkoDFgpLH5DAQtMDIySmBkZJyPzSH///9PPHfu3AJ8jsRrgampqcG/f//O4zOAiYnJ8PTp0xdwqUGxwNjY+D81guzs2bNwc+lrATVcj24G1jggN6iQgwZm0QiwAOZt9GDDJk5WEI1aQDAVjQbRCAgiUgpAUjLaBwYGBn5SDGdgYHh49uxZBaJKUxMTE4f///+DqkJ5Ii15yMjImHDmzJkDRFlApKFEKSNY6RNlCh5FAOc1ohlFAuuMAAAAAElFTkSuQmCC"
                  alt="Trash icon"
                  className="hn-trash-icon"
                  onClick={(event) => deleteStory(event, story.storyId)}
                />
              </div>
            </li>
          </a>
        ))}
      </ul>
    </section>
  );
}
