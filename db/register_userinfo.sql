insert into user_info
(first_name, last_name, alt_name, location, user_id)
values
(${first_name}, ${last_name}, ${alt_name}, ${location}, ${user_id})
returning *;