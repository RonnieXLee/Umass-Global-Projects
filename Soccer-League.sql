-- create tables for teams, players, referees, matches, goals, and seasons
CREATE TABLE teams (
  team_id INT PRIMARY KEY,
  team_name VARCHAR(50) NOT NULL
);

CREATE TABLE players (
  player_id INT PRIMARY KEY,
  player_name VARCHAR(50) NOT NULL,
  team_id INT NOT NULL,
  FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

CREATE TABLE referees (
  referee_id INT PRIMARY KEY,
  referee_name VARCHAR(50) NOT NULL
);

CREATE TABLE matches (
  match_id INT PRIMARY KEY,
  home_team_id INT NOT NULL,
  away_team_id INT NOT NULL,
  referee_id INT NOT NULL,
  season_id INT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  FOREIGN KEY (home_team_id) REFERENCES teams(team_id),
  FOREIGN KEY (away_team_id) REFERENCES teams(team_id),
  FOREIGN KEY (referee_id) REFERENCES referees(referee_id)
);

CREATE TABLE goals (
  goal_id INT PRIMARY KEY,
  match_id INT NOT NULL,
  player_id INT NOT NULL,
  team_id INT NOT NULL,
  goal_time TIME NOT NULL,
  FOREIGN KEY (match_id) REFERENCES matches(match_id),
  FOREIGN KEY (player_id) REFERENCES players(player_id),
  FOREIGN KEY (team_id) REFERENCES teams(team_id)
);

CREATE TABLE seasons (
  season_id INT PRIMARY KEY,
  season_name VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL
);
