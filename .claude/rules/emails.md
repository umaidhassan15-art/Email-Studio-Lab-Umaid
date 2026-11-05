---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rules

These rules apply to every email file in any campaign. Each email file must follow all of them.

## 1. Subject and preview come first

- The first line is `Subject: ` followed by the subject. The subject text is 50 characters or fewer.
- The second line is `Preview: ` followed by the preview text. The preview text is 90 characters or fewer.
- Count the characters before you finish. If a line is too long, make it shorter.

## 2. Greet the reader by name

Greet the reader with `{{first_name}}`, for example "Hi {{first_name}},". Write the tag exactly like that.

## 3. One main link only

- Each email has exactly one main link.
- Write it as `[Button text](https://kettlebird.example/steep-club)`, with your own button text in the square brackets.
- Don't add other links in the body. (The unsubscribe tag in the footer is not a main link.)

## 4. End with the sign-off, then the footer

Every email ends in this order, with nothing after the footer:

1. **The sign-off** from `brand/voice.md`. The default is:

   Happy steeping,
   Umaid and the Kettlebird team

   Use the variation from `brand/voice.md` when it fits: "Welcome to the club, and happy steeping," for the welcome email, "Happy gifting," for gift orders, and "Warmly," for a cancel or skip confirmation. The name line "Umaid and the Kettlebird team" always stays the same. No P.S.

2. **The footer**, exactly these two lines:

   You're getting this because you joined the Kettlebird Tea waitlist.
   Kettlebird Tea, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Write the sign-off and the footer as plain text in the email file. Don't put them inside a code block, backticks or a quote.
