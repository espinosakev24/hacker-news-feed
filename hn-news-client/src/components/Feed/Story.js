import iconTrash from "./iconTrash.svg";
import moment from "moment";

export function Story({ story, deleteStory, ...props }) {
  const handleDeleteStory = (event, storyId) => {
    event.preventDefault();
    deleteStory(storyId);
  };

  const formatDate = (dateString) => {
    const [day, , hours, meridiem] = moment(dateString).calendar().split(" ");
    const [fDay, fMonth] = moment(dateString).format("ll").split(" ");
    let date = "";

    if (day === "Today") date = `${hours} ${meridiem}`;
    else if (day === "Yesterday") date = day;
    else date = `${fDay} ${fMonth.replace(",", "")}`;

    return date;
  };

  return (
    <a href={story.storyUrl} target="_blank" rel="noreferrer" key={story.key}>
      <li id={story.storyId}>
        <p>
          {story.title} <span className="hn-author"> - {story.author} -</span>
        </p>
        <div className="hn-time-and-trash">
          <p className="hn-time-text">{formatDate(story.createdDate)}</p>
          <img
            src={iconTrash}
            alt="Trash icon"
            className="hn-trash-icon"
            onClick={(event) => handleDeleteStory(event, story.storyId)}
          />
        </div>
      </li>
    </a>
  );
}
