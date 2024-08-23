-- Function to insert a row into app.account
create function app.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into app.account (account_id, account_number, account_status)
  values (nextval('app.account_account_id_seq'),new.id, 'Active');
  return new;
end;
$$;

-- Trigger to execute the function after a new user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure app.handle_new_user();