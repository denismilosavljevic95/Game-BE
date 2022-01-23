# src/constants/db-init.sql

create table User(
    id int auto_increment primary key,
    email varchar(64) not null,
    password varchar(64) not null,
    createdAt datetime,
    updatedAt datetime
);