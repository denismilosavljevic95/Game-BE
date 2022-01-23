# src/constants/db-init.sql

create table Statuses(
    id int auto_increment primary key,
    name varchar(64) not null,
    createdAt datetime,
    updatedAt datetime
);

INSERT INTO Statuses (name)
VALUES ('Ready'),
('In Progress'),
('Finished');

create table Strategy(
    id int auto_increment primary key,
    name varchar(64) not null,
    createdAt datetime,
    updatedAt datetime
);

INSERT INTO Strategy (name)
VALUES ('Random'),
('Weakest'),
('Strongest');


create table Battle(
    id int auto_increment primary key,
    name varchar(64) not null,
    statusID int not null,
    createdAt datetime,
    updatedAt datetime,
    FOREIGN KEY (statusID) REFERENCES Statuses(id) ON DELETE CASCADE
);

create table Army(
    id int auto_increment primary key,
    name varchar(64) not null,
    units int not null,
    battleUnits int not null,
    battleID int not null,
    strategyID int not null,
    createdAt datetime,
    updatedAt datetime,
    FOREIGN KEY (battleID) REFERENCES Battle(id) ON DELETE CASCADE,
    FOREIGN KEY (strategyID) REFERENCES Strategy(id) ON DELETE CASCADE
);

create table Log(
    id int auto_increment primary key,
    damage int not null,
    battleID int not null,
    attactID int not null,
    defenseID int not null,
    createdAt datetime,
    updatedAt datetime,
    FOREIGN KEY (battleID) REFERENCES Battle(id) ON DELETE CASCADE,
    FOREIGN KEY (attactID) REFERENCES Army(id) ON DELETE CASCADE,
    FOREIGN KEY (defenseID) REFERENCES Army(id) ON DELETE CASCADE
);