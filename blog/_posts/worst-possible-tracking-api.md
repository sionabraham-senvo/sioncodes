---
title: "How to Build the Worst Possible Tracking API (and Make Your Customers Hate You)"
excerpt: "A step-by-step playbook for parcel carriers who want their integration partners to suffer. Every rule comes from a real API; only the names have been removed."
coverImage: "/assets/blog/worst-possible-tracking-api/cover_small.webp"
thumbnailImage: "/assets/blog/worst-possible-tracking-api/cover_thumbnail.webp"
date: "2026-11-12T17:48:40.000Z"
author:
  name: Siôn Abraham
  picture: "/assets/blog/authors/sion_small.webp"
ogImage:
  url: "/assets/blog/worst-possible-tracking-api/cover_big.webp"
tags:
  - Opinion
  - APIs
  - Logistics
---

So you're a parcel carrier, and you've been asked to build a tracking API. Congratulations! You've been handed a
golden opportunity to ruin the week of thousands of engineers you will never meet, and actively damage your nation's
GDP by wasting measurable amounts of people's time.

I work at [Senvo](https://www.senvo.ai/), where we audit parcel carrier invoices and recover overcharges and eligible
refunds for shippers. That means turning inconsistent tracking data from hundreds of carriers into reliable shipment
records, and someone has to plug all of those tracking APIs in. That someone is chief plumber (yours truly). After two
and a half years of it, I'm convinced every carrier is working from the same playbook. Today I'm publishing it, so the
next carrier doesn't have to work it all out from scratch.

> **Note**
>
> Every rule in this post comes from a real tracking API we integrate with. The names have been removed to protect
> the guilty, and the code examples are illustrative.

## Rule 1: Make getting access a quest

Nobody can misuse an API they can't log in to, and equally no customer can complain about tracking they can't
reach! Your first job is to make sure a single successful response takes at least a month, a meeting, a
spreadsheet and one moment of genuine self-doubt.

Here's the route one carrier set for us, presumably while consulting Satan. Feel free to make notes:

1. Spend three weeks passing the customer between different parts of your company. Make sure their account manager
   has never heard of the API, and neither has the account manager's manager.
2. When someone in customer support finally picks it up, have the customer create an app on your developer portal
   and add the tracking API to it.
3. Let them try the sandbox. Then have them email you again, so you can organise a meeting, so you can add a
   subscription tier to the API. (For extra spice, never reply in the same thread; always start a new one!)
4. Send them a spreadsheet. In it, they test every single endpoint and promise to follow your rules: "we won't track
   a parcel once it's in a terminal status", "we'll only track each parcel once a day", no polling before
   collection or after 30 days.
5. Check with your internal systems that they really did make all those requests, even though they intend to only
   use one of the endpoints.
6. Upgrade them to a tier with a third of the quota they need to track their parcels.
7. When they ask for more, reject it for "not having enough shipments". Repeat four times, then proceed to ignore
   all future requests.

For context, a customer of ours spends over a million euros a month with this carrier. This is clearly not enough, 
cough up e-commerce!

## Rule 2: Make logging in a second quest

Once the customer has access, they'll expect to use it. Don't let the paperwork do all the work; the credentials
themselves can be a puzzle too.

Make the "access key" a JWT with the API user's password inside it, in plain text. Anyone who uses it as a bearer
token gets a 401. First they have to trade it for a second JWT, from a token endpoint that only accepts `GET` (a
`POST` returns a 404). That second JWT keeps its expiry in a custom claim instead of the standard `exp`.

The decoded payload of that first JWT:

```json
{
  "username": "api-user",
  "password": "yes-this-is-the-real-password"
}
```

More ideas for your roadmap:

- Leave half the login out of the docs. Document the API-key header, then have the gateway also demand HTTP Basic
  auth with the same key and secret.
- Require two logins on two layers: a developer-portal key, plus a username and password from a completely different
  business portal.
- Label the credentials "Username / Password", and put an API key in the password field. Using it as a password
  fails.
- Hand the password over URL-encoded, with `%XX` inside it. Sent exactly as received, it fails with "Log-in failed",
  the same response as a wrong password.
- Answer a wrong password and a user that was never activated with the same "A technical error has occurred."
- Return the same 401 for "you're not subscribed to this product" as for a key you made up.
- Reject live credentials on the sandbox with a 401.
- Ship two APIs with two specs and two auth schemes. The one that looks like tracking returns a status and no
  history. The one with the events is the other one.
- Expire the password on your side, without notice. Ours went at 11:00 UTC one day, and about 45k tracking requests
  piled up before anyone noticed.

## Rule 3: Make "tracking number" a philosophical question

A tracking number is the number you use to track a parcel. Or is it? Your customers should never be quite sure.

**Give every shipment two numbers.** Hand merchants the piece ID, put the waybill on your invoices, and have the
tracking API accept one and answer with the other. One carrier's invoices matched none of the roughly 2,100
shipments we were tracking.

- Let shipments be booked under one reference and come back from tracking under a different unit number, so your
  customers get to rename or merge them.
- Add a check character, sometimes. Warehouse systems send it on about 60% of parcels and invoices never do. That's
  45k duplicate shipments.
- For multi-piece shipments, only return events for the lead package. An unused lead label with delivered siblings
  looks like the whole shipment never shipped.
- Rotate your shipment numbers, tracking numbers and references, staggered and at completely random times. Never
  give your customers the chance to backdate their tracking!

**Give returns a fresh start.**

- Send returns back under a brand-new tracking number. The original parcel stays "in transit" forever. We flagged
  thousands of them as lost.
- Relabel some returns. The old number's history ends with "reconsigned", and the new number sits in a side field.

**Make the right number unfindable.**

- Name the wrong ID in the docs. Say the tracking endpoint takes the customer's shipment ID, when it really needs
  your internal one. Order ID, reference and tracking number all return `200 []`. The only way in is to search by
  tracking number first, which does partial matching, so they have to filter for the exact one too.
- Make some numbers untrackable by design. Make others need the recipient's postcode, or a depot code worked out from
  the number itself.
- Split one parcel-number range across two APIs. Move traffic to a new account on 1 July, and watch about 100k
  parcels land on the key that can't see them.

## Rule 4: Treat HTTP status codes as suggestions

HTTP gives you dozens of status codes. You only need one of them: `200 OK`. Every other answer can go in the body,
where your customers will enjoy finding it.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": 500
}
```

My favourite trick: when someone asks for a parcel their key can't see, don't tell them. Return an empty event list,
which looks exactly like a parcel that hasn't been scanned yet. They'll keep politely asking, every day, forever. We
did: about 85–98k wasted calls a day.

And if you really must say "not found", say it three different ways:

1. A 404 with an empty body.
2. A 200 with a zero-length body, for older parcels.
3. The documented error JSON, also with a 200.

More ideas for your roadmap:

- Build an XML API that returns 200 for everything. The real answer is a code inside the XML: `0` means OK, `5`
  means login failed, and `100` means no data.
- Use a 403 to mean "this ID belongs to another merchant". Every merchant's shipment IDs come from one global
  sequence, so a typo in your own ID lands on somebody else's parcel, and "forbidden" is the only hint that it did.
- Put a typo in the documented error message. Now nobody can match on it, in case you fix it one day.
- Support SOAP 1.1, and only 1.1. Send the SOAP 1.2 content type and you get a 415, the one time a status code means
  exactly what it says.
- Change the payload shape without warning, and send some responses with no status data at all.

## Rule 5: Make time a social construct

Time zones are hard, so don't use any. Stamp every scan in the local time of wherever it happened, and leave the
offset off. To find out *when* a scan happened, your customers first have to work out *where* it happened. Two
puzzles for the price of one!

We proved it with flight times: the departure and landing times of a parcel's flight only made sense in the
two cities' own local times.

```json
[
  { "event": "Departed facility", "location": "Hub A", "timestamp": "2026-03-14 22:40:00" },
  { "event": "Arrived at facility", "location": "Hub B", "timestamp": "2026-03-14 21:55:00" }
]
```

Read naïvely, that parcel lands 45 minutes before it takes off.

Once your customers have worked all that out, change it. For one day, one carrier stamped every event worldwide with
`+02:00`, including scans in Finland, Greece and the UK, then quietly switched back. About 10k of our shipments ended
up with every scan stored twice, two hours apart.

More ideas for your roadmap:

- Run two APIs that disagree about the clock. Since the two never agree on a timestamp, nothing deduplicates: merging
  them doubled every event and turned delivered parcels back into in-transit ones.
- Have an integrator label local wall-clock time as `+00:00`, so deliveries sort before "out for delivery".
- Use a space instead of the ISO `T`, and mix offsets within a single parcel's history.
- Sort events newest-first (three of our carriers), oldest-first (others) or, for the true artist, not at all
  (one).
- Leave the time off some delivery events entirely.
- Scan parcels at the hub at 00:46 when they were handed over the evening before, so the delivery-promise
  calculation lands on the wrong day.

## Rule 6: Make the event stream a mystery novel

A good tracking history reads like a detective novel: a big cast, plenty of red herrings, and the ending only
revealed at the very last moment. Ideally in a footnote.

Use one "Delivered" code for everything: delivered, dropped at a shop, and a failed attempt where the parcel went back
to the depot. The only clue that it failed is a trailing `*` on the description.

```json
[
  { "code": "DELIVERED", "description": "Delivered" },
  { "code": "DELIVERED", "description": "Delivered*" }
]
```

**Make sure there are far too many codes.**

- Build each code from type × reason × status × resolution. We maintain 1,985 mapping rows for one carrier alone, and
  new combinations keep appearing. Do not document this.
- Leave the code off entirely and put the per-shipment details in the text instead: "The preferred day delivery on
  10.08.2026 was ordered by Recipient". Every date is a brand-new "unknown status". We've collected 386 variants, in
  multiple languages.
- Use a generic "partner scan" code, with the real meaning in an alternative-code field.
- Share one code list between two divisions, so mapping a code for one means mapping it for the other. There is no
  way to tell which division the code comes from.
- Write some status texts only in the local language.

**Add events that shouldn't exist.**

- Events with every field empty.
- A junk event after "Delivered". Or a "Label created" event after delivery.
- "Delivery note printed" arriving hours after delivery. "Customs cleared" arriving about two weeks after.
- A phantom handover: "Parcel handed over by shipper", generated in an end-of-day batch at about 18:05 from shipping
  data, including for parcels nobody ever handed over.
- HTML in the status descriptions, `<a>` tags and all.

**Let a middleman help.**

- An aggregator that adds its own events: "Delivered" twice at the same second, three variants of "hub scan", and
  "1st delivery attempt succeeded" when the parcel is dropped at a pickup point.
- An integrator that turns "Arrived at Facility" into "In Transit". The original text is gone, and the integrator's
  own event IDs don't resolve through its own metadata endpoint.
- Multi-parcel shipments through an integrator, with every scan repeated once per parcel (×9).

**Keep the setting vague.** Give the city field four shapes: "Krefeld", "Krefeld, Germany", "DORMAGEN - GERMANY" and
"DUESSELDORF - NR-Westph. - GERMANY". Sometimes the city is an airport code. Even better: "Arrived at Depot A32". Under no
circumstances should there be a public list of what these depots are.

**Never quite finish the story.**

- "Handed to a third party, no further details expected". Tracking stops by design, and the parcel looks lost.
- Have a code for "investigation opened" and one for "claim paid", and none for an investigation that closed
  without a payout. About a third of them do, and every one of those looks open forever.
- After a shop drop-off scan, let the parcel sit before its first real scan: a median of 18 to 37 hours, depending on
  the network.

## Rule 7: Make the data quietly wrong

Errors are loud, and loud gets noticed. Wrong data is quiet. Quiet data can sit in your customers' database for months
before anyone spots it.

Have the tracking response say the parcel went by an express service with a delivery guarantee, while the invoice
bills a cheaper service without one. When the parcel turns up late and the customer claims, reject the claim as
"without guarantee". That's 142 late-delivery claims rejected for us.

Or send dimensions in metres, and label them "cm". Read as centimetres, a perfectly ordinary box becomes denser than
solid metal. We now reject any parcel whose implied density is higher than that.

More ideas for your roadmap:

- Return "measured dimensions" as a free-text string, with no documented format.
- Make your estimated delivery date depend on the account: present on 5%, 64% or 95% of shipments, depending on whose
  they are.
- Have your transit-time API say Saturday while your own schedule says Monday. Have it return nothing for some
  postcodes unless the city is sent too, and nothing at all between some pairs of countries.
- Include the recipient's email address and phone number in the tracking response. Your customers get to strip them
  out before storing anything, or else anger the compliance gods.

## Rule 8: Let your rate limits design their architecture

Why let your customers choose their own architecture when you can choose it for them? Remember the quota from
Rule 1? That was only the beginning.

- Set the default quota to 250 calls a day. To raise it, the customer emails you.
- Allow 1 request every 5 seconds. Rebuilding one customer's tracking history takes hours.
- Accept batches of at most 10 parcels, with the occasional 10-second timeout against a normal 0.4–1.7 seconds.
- Apply quotas, rate limits and auth failures per API key. Do not tell them what their quota is, and do not put it
  in the response headers. What, you're expected to hold their hands? They can work it out!

## Rule 9: Make push worse than pull

By now your customers will be begging for webhooks so they can stop polling. Give them something that technically
counts as push, and is somehow worse than polling.

Send a webhook with no data in it, just an ID:

```json
{
  "id": "4f9c2e71"
}
```

That's it. That's the webhook. To get the actual tracking data, the customer calls you back to fetch a file, and the
download link expires in 20 minutes. There's no API to register a webhook, either, so the customer pastes the URL into
a portal by hand.

Or skip the webhook and deliver tracking as a daily semicolon-separated CSV, in Windows-1252. Make sure neither the
file nor the API is complete on its own: about 130 deliveries appeared only in the API, and 6 "lost" parcels turned
out to be delivered according to the file. Needless to say, do not add an extension to the file. Just a plain,
randomly named file.

## Rule 10: The best API is no API

Every rule so far assumes you have an API. The truly committed carrier goes one step further. Here's how one did it.

1. Start with a public tracking API that anyone can use. Then start tracking IPs and banning them. Then turn it off
   completely.
2. Offer a private tracking API instead. When late-delivery claims start landing, turn that off as
   well. Tell them they can track behind your login-only tracking page, one shipment at a time. What, you thought all
   the shipments you created would be in said portal? No no no. How naïve!
3. From now on, only send tracking as "EDI". It's actually a custom CSV format, uploaded to an SFTP server. You'll
   only send it to one SFTP server, so if your customer has more than one integration or TMS, good luck to them.
4. Don't send all the events.
5. When the customer complains, tell them you sent everything. The events are spread across thousands of files, so
   to prove you wrong they have to scan every one of them, write down which shipment number turns up in which file,
   and show you exactly what's missing.
6. When they send you the proof, don't reply.

That's the final level: no API to call, data you can't trust, and nobody to complain to.

## What your customers will build

Follow all ten rules, and here's what your customers will end up building just to answer "where's my parcel?":

- A store for event descriptions nobody has mapped yet.
- Keyword rules to classify event text, where the longest match wins.
- A machine-learning classifier for event text.
- Timezone inference from airport arrival codes.
- Number reconcilers that rename and merge shipments.
- A sanity check based on the density of solid metal.

That's where the GDP from the first paragraph went.

If you recognise your API in this post: it's not about you. It's about all of you.

## The serious bit

Jokes aside, this is the job. Every refund we recover depends on the tracking being right: when a parcel was handed
over, when it was delivered, and whether the service it travelled on matches the one on the invoice. So at
[Senvo](https://www.senvo.ai/) we
take tracking from hundreds of carriers, in every shape described above, and turn it into one reliable record per
shipment: one set of statuses, timestamps you can actually compare, and invoice lines matched to the right parcel. Our
customers don't have to build any of the list above themselves, and when we tell a carrier a parcel was late, we can
prove it.
