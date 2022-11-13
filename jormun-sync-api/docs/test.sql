/* 001-setup.sql */
CREATE TABLE user(
  id INTEGER PRIMARY KEY, 
  username STRING NOT NULL, 
  hash STRING NOT NULL, 
  size INT NOT NULL, 
  isAdmin BOOLEAN NOT NULL, 
  UNIQUE(username)
);
CREATE TABLE token(
  id INTEGER PRIMARY KEY,
  hash STRING NOT NULL,
  app STRING NOT NULL,
  user INT NOT NULL,
  FOREIGN KEY(user) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE data(
  id INTEGER PRIMARY KEY, 
  app STRING NOT NULL, 
  fragment STRING NOT NULL, 
  value NOT NULL, 
  timestamp INT NOT NULL, 
  user INT NOT NULL, 
  public INTEGER NOT NULL,
  UNIQUE(app, user, fragment),  
  FOREIGN KEY(user) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE share(
  id INTEGER PRIMARY KEY, 
  user INT NOT NULL, 
  data INT NOT NULL, 
  FOREIGN KEY(user) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY(data) REFERENCES data(id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(user, data)
);

/* 002-guests.sql */
CREATE TABLE invitation(
  id INTEGER PRIMARY KEY,
  hash STRING NOT NULL,
  data INT NOT NULL, 
  FOREIGN KEY(data) REFERENCES data(id) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(hash, data)
);

/* Dummy data */

PRAGMA foreign_keys = true;
INSERT INTO user(username, hash, size, isAdmin) VALUES
("admin", "a", 20, true), 
("bob", "b", 20, false), 
("charlie", "c", 20, false);

INSERT INTO token(hash, app, user) VALUES
("hash1", "app", 1),
("hash2", "app", 2),
("hash3", "app", 3);

INSERT INTO data(app, fragment, value, timestamp, user, public) VALUES
("app", "alpha", "one", 1, 1, 0),
("app", "beta", "two", 2, 2, 1),
("app", "gamma", "three", 3, 3, 2),
("app", "alpha2", "four", 4, 1, 0);

INSERT INTO share(user, data) VALUES
(2, 1),
(3, 2);

INSERT INTO invitation(hash, data) VALUES
("hash1", 1),
("hash2", 4);