---
title: "You Were Never Hired to Write Code"
excerpt: "AI hasn't changed how we do engineering, it has only highlighted what we've been doing wrong all this time."
coverImage: "/assets/blog/you-were-not-hired-to-write-code/cover_small.webp"
thumbnailImage: "/assets/blog/you-were-not-hired-to-write-code/cover_thumbnail.webp"
date: "2026-11-07T16:01:37.000Z"
author:
  name: Siôn Abraham
  picture: "/assets/blog/authors/sion_small.webp"
ogImage:
  url: "/assets/blog/you-were-not-hired-to-write-code/cover_big.webp"
tags: 
  - Opinion
  - AI
---

I work at Senvo, where we help shippers audit their carrier invoices and claim money back when carriers overcharge them
or miss what they promised. Not so long ago, I opened a pull request with around 1,400 changed lines, all written by
our favourite coding tool: Claude Code. Everything about it looked great. It delivered a feature a pilot customer had
been asking us for, the code looked fantastic, the types were all there, and all the BDD cases were written in! Win
win win. CEO & COO happy, customers happy (so it seemed), yet Siôn.. unhappy?! I had just released something without
ever thinking through what problem I was actually meant to be solving. (To my wonderful customers: this was our
"Flagged Charges" feature, which grew up to become Custom Audits!)

What am I talking about today? AI hasn't changed the job. It's changed the price of code. Once code is, for all intents
and purposes, free, everything we engineers got away with while it was expensive is suddenly out in the open.

So if you write code, hire people who do, or have to measure the ones you've got, this one's for you.

## Code was always and will always be a liability

Since the good old days, every line you ship has been a line someone will have to read, test, secure, migrate and
finally discard once the next coolest language comes out. The asset is the working behaviour; the code serving that
behaviour is the regular maintenance bill that keeps engineers employed. Every time DHL decides to unify yet another
one of their APIs, chief plumber (yours truly) is the one who has to go in and fix it.

None of this is new, by the way. Tyler Treat wrote
[You Are Not Paid to Write Code](https://bravenewgeek.com/you-are-not-paid-to-write-code/) back in 2016, and it's just
as true today. The difference is that AI has made it impossible to ignore.

So why did we all measure output? Because while code was expensive, output was a decent enough proxy. If a feature
took a week to write, the person shipping loads of features was probably doing something right. Effort was the
bottleneck, so effort and value more or less went hand in hand.

For better or for worse, that's over. An agent will produce a week's worth of code before your coffee goes cold.

## AI is a multiplier, not an adder

Everyone keeps saying AI gives every engineer a nice little boost. Thirty percent here, fifty percent there, everyone
moves up a bit. Honestly? That isn't what I've experienced, or what I see around me.

What I see is multiplication. Roughly:

```text
value delivered = judgement × output

before AI
strong judgement   +3 × 1  =  +3   +++
no judgement        0 × 1  =   0
bad judgement      -1 × 1  =  -1   -

with AI
strong judgement   +3 × 10 = +30   ++++++++++++++++++++++++++++++
no judgement        0 × 10 =   0
bad judgement      -1 × 10 = -10   ----------
```

AI cranks the output up by ten, but your judgement stays exactly where it was. And that's where it gets interesting..

**Ten times zero is zero.** If you were turning tickets into code without ever asking why the ticket existed,
congratulations, you can now do that ten times faster! Heaps of code, absolutely no value. I'd even argue negative
value, because someone (me) has to maintain all of it.

**Bad judgement does damage ten times faster.** The engineer who used to add one unnecessary abstraction a sprint now
adds ten, and every single one of them comes with tests and looks very confident about itself. Bad code used to be held
back by how tedious it was to write. That friction was quietly keeping us safe, and now it's gone. And before anyone
thinks I'm pointing fingers: I've been in that bottom row myself. More on that later!

**Owners get ten times the leverage.** The people who already knew what to build, what to skip and what would break at
3am now basically have a team of super fast juniors who never get tired.

Before, the gap between a strong engineer and a weak one was capped by how fast anyone could type. Not anymore, and
that gap is going to widen, fast.

## The scoreboard built the code monkeys

I don't think the people in the zero row are lazy or stupid. Most of them did exactly what they were rewarded for.

We gave our teams velocity charts. We gave them story points, then compared story points across teams as if they were a
currency. Some places counted commits, some counted lines changed. We burned people out over meaningless topics like
"why is the burndown graph not a straight line??".

I don't think I have ever once been praised for adding "NTDEL_DMGED_ZN" as an event code to our tracking catalogue,
but I was showered with praise every time I could say: we can now track CTT Express, or Poste Italiane is now fully
integrated!

People optimise for whatever the scoreboard says. If it says "close tickets", guess what? You get engineers who are
brilliant at closing tickets, and who never had a single reason to ask whether the ticket should exist in the first
place. Calling them code monkeys is harsh, I know.. but we built the zoo.

## We hired for the skills AI made worthless

Then look at how we hired them.

Reverse a linked list on a whiteboard. Recall the time complexity of a heap insert. Solve a LeetCode medium in forty
five minutes while someone watches. Explain the difference between `==` and `is`.. I mean, I've had HR ask me "what
does the walrus operator do?" despite having managed the entire backend for a department of 30 people.

The issue is, as much as I'd love to show off to everyone that I can write machine code (thank you, electrical and
electronic engineering degree, yes you are finally worth something!), it's just a skill I don't use day to day. Every
single one of these is now a single prompt. It's not that these skills are useless, and it certainly isn't that they
never mattered.. it's just that they were the easiest part to test in under an hour.

For a long time that didn't really matter. We interviewed people to produce code, we paid people to produce code, and
the hard parts (talking to the customer, saying no to a feature, noticing the data looked wrong)
got done by whoever happened to care. Time after time, I'd see one to three people in a whole department doing maybe
90% of the work... and it was because they cared about the problems. The issues. The domain! What problem am I
solving, and how can I use my skills to solve it?

AI has now removed the cover completely. If anyone can produce the code, then the only things left that set engineers
apart are exactly the things we never interviewed for!

## The job was always what happens after the code

Back to Flagged Charges. Almost none of the hard problems at Senvo are code problems, and this one certainly wasn't.
Customers wanted specific charges highlighted to them when they were billed. For example, we
have a customer who knows for sure that they should never be billed for hazardous materials such as lithium batteries.
The feature lets them drop a nice purple flag that highlights the charge when they inspect the invoice.

I'm not sure if I was dealing with other matters or simply hadn't had enough sleep.. but I let it slip through the
gaps. Claude had invented an entirely new chunk of code for doing this. When an invoice loaded via the API, it would
simply pull the flags from the DB and compare each charge's name to the flagged name. Of course, I know that carriers
change the names of their charges all the time, but I hadn't told Claude that. So, feature goes live, and suddenly in
every customer meeting I'm getting this feedback.. "Hey, I already highlighted this", "How can I filter on my flags?",
"Can you just claim all of the flags?"

Inside I'm screaming "AHH I'M SO STUPID, WHY DID I DO THIS??"

The fix was actually sitting with the customers and working out _why_ they wanted this. They essentially wanted custom
audits based on certain filter conditions: if code xyz is applied to account number 123, please claim it.

An entirely different feature to the simple flags I had made. So Flagged Charges turned into Custom Audits: customers
save filters to find the exact parcels they're looking for, built on all the same filters we already use for shipments.
A real two for one, too: every improvement to one improves the other.

That _is_ the job though.. it's to solve _their_ problems, not to make useless SaaS features that don't help anyone.

## What to change on Monday

### If you write code

**Own something end to end.** Not a ticket, a _thing_. A service, an integration, a report someone actually relies
on. Be the person who knows it's broken before the customer does, and who can tell you why it exists in the first
place. For me that's our carrier integrations, and honestly, most of what I know about them has never been written down
in a ticket. Which also means none of it ends up in Claude's context unless I put it there (lesson learned!).

**Read more than you generate.** I like to think that if I had properly read that 1,400 line PR, I would have spotted
it matching charges by name. For every PR an agent writes for you, you should be able to explain every line to a
colleague without peeking at the prompt. If you can't.. sorry, but you didn't write it, you just delivered it. And read
beyond the code too: the carrier docs, the logs, the invoices, the support tickets. That's where the real problems are
hiding.

### If you hire or lead engineers

**Change the metrics.** Stop counting the things AI makes free: lines, PRs, story points, tickets closed. (And please,
stop worrying about whether the burndown graph is a straight line.) Start counting the things it doesn't: problems
caught before a customer noticed, features cut or never built, how long it takes to get from "this looks wrong" to
"this is fixed". Yes, these are harder to measure. That's kind of the point.

**Change the interviews.** If I were running interviews tomorrow, here's what I'd do instead of asking what the walrus
operator does:

1. **Review an AI-written PR with a subtle bug in it.** Make it look great, well tested, and wrong in a way you'd only
   catch if you understand the domain. Basically, give them my Flagged Charges PR! How someone reads code tells you
   far more than how they write it.
2. **Cut the scope.** Hand over a feature request that's three times too big, and ask what they'd ship first and what
   they'd never ship at all. Good engineers remove work.
3. **Watch for "why".** Throughout the whole interview, keep an eye on how often they ask _why_ something is needed
   before jumping into how to build it. That's the thing you're actually hiring for.

## Where the next good engineers come from

There's an obvious hole in all of this, and plenty of better minds than my own have already spoken about it. Steve
Yegge wrote about [the death of the junior developer](https://sourcegraph.com/blog/the-death-of-the-junior-developer)
back in 2024, then argued the opposite a year later in
[Revenge of the Junior Developer](https://sourcegraph.com/blog/revenge-of-the-junior-developer). Stanford's Digital
Economy Lab found that employment for 22 to 25 year olds in the most AI-exposed jobs is now
[19% behind where it would have been](https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine),
while experienced workers haven't taken the same hit. And AWS's CEO, Matt Garman, called replacing juniors with AI one
of the dumbest things he'd ever heard, asking
["how's that going to work when ten years in the future you have no one that has learned anything?"](https://www.theregister.com/2025/08/21/aws_ceo_entry_level_jobs_opinion/)

Judgement comes from experience, and a lot of that experience comes from doing exactly the work agents do now. Writing
the boring CRUD endpoint. Debugging your own bad migration. Being the junior who broke production on a Friday (and if
you haven't yet, your time will come!). So if agents do all the junior work, where do the next seniors get their
scars?

I don't have a perfect answer, but I do have some hope. We hired a junior, and he has been great. He took
responsibility early, he's eager to learn, and he is always asking questions. He reads all the material I send him,
picks up every challenge I throw his way, and I always see him posting the latest AI news in Slack. He's attentive,
and every Friday he presents his feature to the team. The presentations are amazing!

Now notice what's _not_ on that list: how fast he types, or how many tickets he closes. Claude can do that bit!
Everything on that list is the stuff Claude can't do: ownership, curiosity, actually caring about the problem. And
you can't stand up every Friday and present a feature you don't understand. Funnily enough, those are exactly the
things we never interviewed for, and they're what turns a junior into a senior.

So maybe the answer isn't protecting juniors from AI at all. Maybe it's hiring for curiosity, and giving them something
to own from day one. But I'd be lying if I said it's solved. Get it wrong, and in ten years we'll have tonnes of
output and nobody who knows what any of it is for.

---

You were hired to make problems go away. Code was just the pathway to do it.
