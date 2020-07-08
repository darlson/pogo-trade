select * from users u
full join user_info ui
on u.id = ui.user_id  
where username = $1 or email = $1