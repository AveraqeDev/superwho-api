CREATE TABLE favorites (
  user 
      INTEGER
      REFERENCES users(id) ON DELETE CASCADE
      NOT NULL,
  hero
      INTEGER
      NOT NULL,
  added_at
      TIMESTAMP 
      NOT NULL 
      DEFAULT now()
);