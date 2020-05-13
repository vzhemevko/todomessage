create extension if not exists "uuid-ossp" schema pg_catalog;

create table board (
  id UUID default uuid_generate_v4 (),
  name character varying not null,
  key character varying not null,
  time_zone character varying not null,
  constraint board_pkey primary key (id)
);

create table card (
  id UUID default uuid_generate_v4 (),
  day date not null,
  board_id uuid not null,
  constraint card_pkey primary key (id),
  constraint card_board_fkey foreign key (board_id) references board (id)
);


create table todo (
  id UUID default uuid_generate_v4 (),
  name character varying not null,
  due_time time not null,
  ready boolean not null,
  done boolean not null,
  position integer not null,
  card_id uuid not null,
  constraint todo_pkey primary key (id),
  constraint todo_card_fkey foreign key (card_id) references card (id)
);

insert into board values ('eb239fae-b4eb-4a23-8f19-e721fd767184', 'Default Board', 'Default Board Key', 'UTC');
insert into card values ('c1715699-678a-4120-b476-b7ec68b0ee13', now(), 'eb239fae-b4eb-4a23-8f19-e721fd767184');
insert into todo values ('e7e723ea-a2a2-4367-8483-1f32b16b4a7e', 'Buy Milk', now(), true, false, 0, 'c1715699-678a-4120-b476-b7ec68b0ee13');
insert into todo values ('e7e723ea-a2a2-4367-8483-1f32b16b5a7e', 'Call Mom', now(), true, false, 1, 'c1715699-678a-4120-b476-b7ec68b0ee13');