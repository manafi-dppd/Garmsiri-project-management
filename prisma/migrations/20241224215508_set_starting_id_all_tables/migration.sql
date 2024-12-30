-- This is an empty migration.
DELETE FROM sqlite_sequence WHERE name = 'Position';
INSERT INTO sqlite_sequence (name, seq) VALUES ('Position', 0);

DELETE FROM sqlite_sequence WHERE name = 'Menu';
INSERT INTO sqlite_sequence (name, seq) VALUES ('Menu', 0);

DELETE FROM sqlite_sequence WHERE name = 'AccessLevel';
INSERT INTO sqlite_sequence (name, seq) VALUES ('AccessLevel', 0);
