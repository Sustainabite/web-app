--Accounts table
CREATE TABLE app.account
(
    account_id              SERIAL PRIMARY KEY,
    account_number          UUID REFERENCES auth.users (id),
    account_name            TEXT,
    country                 TEXT,
    currency                TEXT,
    completed_onboarding    BOOLEAN,
    address                 TEXT,
    parent_account_number   uuid,
    account_status          TEXT,
    created_at              TIMESTAMPTZ DEFAULT NOW(),
    closed_at               TIMESTAMPTZ 
);

ALTER TABLE app.account
    ENABLE ROW LEVEL SECURITY;

ALTER TABLE app.account
    ADD CONSTRAINT unique_account UNIQUE (account_number);

CREATE INDEX index_account_id ON app.account (account_id);

CREATE POLICY "Users can view their own account info" ON app.account
    FOR SELECT USING (auth.uid() = account_number)

    -- FOR SELECT USING (user_tele_id = current_setting('request.jwt.claim.telegram_id', true)::integer);


--Feedback and support requests table
-- CREATE TABLE support_ticket
-- (   
--    support_requests_pk  SERIAL PRIMARY KEY,
--    category             TEXT,
--    support_text         TEXT,
--    ticket_status        TEXT,
--    created_at           timestamptz default now()
-- );

-- ALTER TABLE public.support_requests
--     ENABLE ROW LEVEL SECURITY;
 