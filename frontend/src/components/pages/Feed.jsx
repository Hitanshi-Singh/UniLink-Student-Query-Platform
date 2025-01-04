import "./feed.css";

const Feed = () => {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="profile-section">
          <div className="profile-picture"></div>
          <h2>John Cooper</h2>
          <a href="#edit-profile">Edit profile</a>
        </div>
        <div className="stats">
          <div className="stat">
            <span>✅</span>
            <p>Questions answered</p>
            <strong>154</strong>
          </div>
          <div className="stat">
            <span>❓</span>
            <p>Questions posted</p>
            <strong>13</strong>
          </div>
          <div className="stat">
            <span>👍</span>
            <p>Total upvotes</p>
            <strong>1,367</strong>
          </div>
          <div className="stat">
            <span>🏆</span>
            <p>Current rank</p>
            <strong>12</strong>
          </div>
        </div>
        <button className="logout">Log out</button>
      </aside>

      <main className="main-content">
        <header className="navigation">
          <button className="nav-button active">Latest</button>
          <button className="nav-button">Top Rated</button>
          <button className="nav-button">History</button>
          <button className="ask-button">+ Ask Question</button>
        </header>

        <section className="questions">
          
            <div className="question-card">
              <div className="question-header">
                <div className="profile-picture small"></div>
                <div className="question-info">
                  <h4>Sarah Mitchell</h4>
                  <span>2 hours ago</span>
                </div>
              </div>
              <h3>How to implement infinite scrolling in React?</h3>
              <p className="question-description">
                I&apos;m building a social media feed and need to implement infinite scrolling. What&apos;s
                the best approach using React hooks?
              </p>
              <div className="tags">
                <span className="tag react">React</span>
                <span className="tag web-dev">Web Development</span>
              </div>
              <div className="question-footer">
                <div className="actions">
                  <span>👍 165</span>
                  <span>💬 12 answers</span>
                </div>
                <button className="view-answers">View all answers</button>
              </div>
            </div>
        
        </section>
      </main>
    </div>
  );
};

export default Feed;
