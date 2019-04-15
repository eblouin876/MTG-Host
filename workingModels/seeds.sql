-- seed data for test and troubleshooting
insert into user (username, password) values ('ned stark','WinterComes'), ('jonSNOW333','Knows nothing'), 
('DanyDragons','khaleesi'), ('KINGJOFFREY','KING'), ('reek','RhymeWithTeak'),('Tyrion Lanniser','theHand');

insert into player (user_id, name) values (1, 'ned stark'), (2, 'jonSNOW333'), (3, 'DanyDragons'), 
(4, 'KINGJOFFREY'), (5, 'reek'),(6, 'Tyrion Lanniser');

insert into game (player1_id, player2_id, player3_id, player4_id,life1, life2, life3, life4, duration, winner_id)    
values (6,4,null, null, 12,0,null,null,'00:20:30',6), (6,2,null, null, 5,0,null,null,'00:23:00',6),
(6,1,null, null, 1,0,null,null,'00:45:30',6), (3,2,null, null, 0,20,null,null,'00:20:30',2), 
(2,4,null, null, 12,0,null,null,'00:20:30',2), (6,4,null, null, 7,0,null,null,'00:20:30',6),
(4,1,null, null, 0,5,null,null,'00:20:30',1),(4,1,6,5,0,0,3,0,'01:12:30',6),
(6,1,null, null, 1,0,null,null,'00:45:30',6), (3,2,null, null, 0,20,null,null,'00:20:30',2), 
(2,4,null, null, 12,0,null,null,'00:20:30',2), (6,4,null, null, 7,0,null,null,'00:20:30',6),
(4,1,null, null, 0,5,null,null,'00:20:30',1),(4,1,6,5,0,0,3,0,'01:12:30',6)
;

insert into token (name, color, type, pt, abilities, icon) 
values ('Boar','Green','Creature>Beast','2/2','Curse of the Swine','https://tokens.mtg.onl/tokens/THS_8-Boar.jpg'),
('Dragon','Green','Creature>Dragon','6/6','Flying','https://tokens.mtg.onl/tokens/C17_007-Dragon.jpg'),
('Eldrazi','Black','Creature>Eldrazi','10/10','Creeper','https://tokens.mtg.onl/tokens/BFZ_001-Eldrazi.jpg'),
('Goblin','Black','Creature>Goblin','1/1','Kneecapper','https://tokens.mtg.onl/tokens/EVG_T3-Goblin.jpg')
;

insert into token_log (game_id, player_id, token_id)
values (1,4,3),(1,4,4),(1,4,4),(2,2,1),(2,2,4),(4,3,3),(4,3,1),(4,2,4),(5,2,1),(5,4,4),(5,2,4);

insert into result (game_id, player_id, outcome, life, duration)
values (1,4,'W', 12,'00:25:30'),(1,4,'L', 0,'00:17:45'),(1,4,'W', 15,'00:25:30'),(2,2,'L', 0,'00:18:00'),(2,2,'W', 12,'00:17:45'),
(4,3,'L', 0,'00:18:00'),(4,3,'W', 19,'00:18:00'),(4,2,'L', 0,'00:25:30'),(5,2,'W', 5,'00:17:45'),(5,4,'L',0,'00:25:30'),(5,2,'L', 0,'00:18:00');

select * from user;
select * from player;
select * from game;
select * from token;
select * from token_log;
select * from result;