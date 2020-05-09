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
insert into todo values ('1eae9db8-67e2-4951-a667-99d33cdd3558', 'eb239fae-b4eb-4a23-8f19-e721fd767184', 'Get milk', now(), now(), 'true');
insert into todo values ('e9580f8c-14e2-4a7c-a1f8-a21f502c7955', 'eb239fae-b4eb-4a23-8f19-e721fd767184', 'Wash dishes', now(), now(), 'true');
insert into todo values ('45f0367c-a2fe-4751-ac67-0af2ac46c0fc', 'eb239fae-b4eb-4a23-8f19-e721fd767184', 'Clean car', now(), now(), 'true');
insert into todo values ('ef553472-ea71-422d-a42c-534ee3428493', 'eb239fae-b4eb-4a23-8f19-e721fd767184', 'Call Mom', now(), now(), 'true');