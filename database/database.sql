CREATE DATABASE creativemind;

CREATE TABLE users(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL CHECK (name <> ''),
    lastname TEXT NOT NULL CHECK (lastname <> ''),
    email TEXT NOT NULL CHECK (email <> ''),
    password TEXT NOT NULL CHECK (password <> '')
);
insert into users(name, lastname, email, password)
values('john', 'north', 'john@mail.com', '12345');
CREATE TABLE profiles(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    userid INT NOT NULL,
    gender TEXT NOT NULL CHECK (gender <> ''),
    country TEXT NOT NULL CHECK (country <> ''),
    language TEXT NOT NULL CHECK (language <> ''),
    CONSTRAINT fk_user_profile foreign key (userid) references users(id) on delete no action on update cascade
);
insert into profiles(userid, gender, country, language)
values('1', 'male', 'United State', 'English');
CREATE TABLE posts(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    userid INT NOT NULL,
    title TEXT,
    content TEXT,
    
    CONSTRAINT fk_user foreign key (userid) references users(id) on delete no action on update cascade
);
insert into posts(userid,title, content)
values('1', 'Wales are cool!', 'I think they`re cool!');
CREATE TABLE comments(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    postid INT NOT NULL,
    content TEXT,
    userid INT NOT NULL,
    CONSTRAINT fk_post foreign key (postid) references posts(id) on delete no action on update cascade,
    CONSTRAINT fk_user foreign key (userid) references users(id) on delete no action on update cascade
);
insert into comments(postid, content)
values('1',  'Not sure though!');