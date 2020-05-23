create extension if not exists "uuid-ossp" schema pg_catalog;

create table board (
  id UUID default uuid_generate_v4 (),
  name character varying not null,
  key character varying(60) not null,
  time_zone character varying not null,
  emails character varying not null,
  theme smallint not null,
  update_at date not null,
  constraint board_pkey primary key (id),
  unique(name)
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
  position smallint not null,
  card_id uuid not null,
  update_at date not null,
  constraint todo_pkey primary key (id),
  constraint todo_card_fkey foreign key (card_id) references card (id)
);

insert into board values ('eb239fae-b4eb-4a23-8f19-e721fd767184', 'demo', '$2a$10$Vm6yawDILpCJ.QP5eh0Wo.4UoxctG93kzZ2oNO0JGAYGo80Kxj14C', 'UTC', '', 1, now());
insert into card values ('c1715699-678a-4120-b476-b7ec68b0ee13', now(), 'eb239fae-b4eb-4a23-8f19-e721fd767184');