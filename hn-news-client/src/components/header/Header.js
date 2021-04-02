import "./header.scss";

/**
 * Header component that holds the main title of the app.
 */
export function Header() {
  return (
    <header className="hn-header">
      <h1>HN Feed</h1>
      <span className="hn-subtitle">
        <h3>We &#60;&#51; hacker news!</h3>
      </span>
    </header>
  );
}
