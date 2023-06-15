function App() {
  return (
    <div>
      <Tweet
        name="John Doe"
        username="JohnDoe"
        date={new Date().toDateString()}
        message="I'm a human, duh!"
      />
      <Tweet
        name="Jane Doe"
        username="JaneDoe"
        date={new Date().toDateString()}
        message="What does this button do?"
      />
      <Tweet
        name="Jacky Doe"
        username="JackyDoe"
        date={new Date().toDateString()}
        message="Watch me tweet!"
      />
    </div>
  );
}
