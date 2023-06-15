function App() {
  return (
    <div>
      <Person
        name="John Doe"
        age={35}
        hobbies={["jiujitsu", "UFC", "video games"]}
      />
     
      <Person
        name="Jane Doe"
        age={34}
        hobbies={["reading", "shopping", "chatting"]}
      />
      <Person
        name="Jacky Doe"
        age={12}
        hobbies={["instagram", "tik tok", "twitter"]}
      />
    </div>
  );
}
