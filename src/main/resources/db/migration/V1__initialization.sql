create extension if not exists "uuid-ossp" schema pg_catalog;

create table board (
  id UUID default uuid_generate_v4 (),
  name character varying not null,
  key character varying not null,
  constraint board_pkey primary key (id)
);

create table todo (
  id UUID default uuid_generate_v4 (),
  board_id uuid not null,
  name character varying not null,
  day date not null,
  due_time time not null,
  done boolean not null,
  constraint todo_pkey primary key (id),
  constraint todo_board_fkey foreign key (board_id) references board (id)
);

insert into board values ('eb239fae-b4eb-4a23-8f19-e721fd767184', 'Default Board', 'Default Board Key');