# Turnberry HOA — website

## Structure

    turnberry-site/
      index.html            Homepage
      news-events.html      News & notices
      contact-us.html       Contact form + association address
      pool-guidelines.html  Pool, play & picnic area rules
      c-rs.html             Covenants & restrictions + amendments
      financial-information.html  How to request financial records
      board-committees.html Board of Directors + committee rosters
      _page-template.html   Starter for every new page (header + footer already wired)
      assets/
        css/site.css        Shared stylesheet — all pages use this one file
        js/site.js          Sticky header, mobile menu, scroll reveal
        img/                Photography

## Adding a page

1. Copy `_page-template.html` and rename it (e.g. `news-events.html`).
2. Replace every `PAGE TITLE` with the real page name.
3. Write the content inside `.prose`, or build custom sections.
4. Add the page to the nav in **both** `index.html` and the new page,
   and to the footer link lists.

Keep paths relative (`assets/...`) so the folder can be dropped onto any host.

## Design tokens

All colours, fonts and spacing live in `:root` at the top of `site.css`.
Change them there and every page updates.

    --ink       #191512   near-black espresso
    --stone     #F6F3ED   warm page background
    --bronze    #A87C3C   accent / CTAs
    --display   Fraunces  headings, wordmark
    --sans      Jost      body, labels, buttons

## Reusable classes

    .btn .btn--fill / --light / --line / --dark    buttons
    .label                                          small caps section label with rule
    .sec-head                                       section heading + right-hand link
    .notice                                         news / notice card
    .doc-col                                        document list column
    .gal                                            gallery tile
    .rise                                           fades in on scroll
    .on-dark                                        put on any dark section wrapper

## Before launch

- Photography is optimized to ~1500px wide. Swap in higher-resolution
  originals and add `srcset` if the board supplies them.
- Gallery photo counts on the homepage are placeholders.
- Meeting schedule is intentionally not linked anywhere yet.
- The contact form validates in-browser only. Connect it to the association
  mailbox or CMS endpoint before launch.
- Pool guidelines are rebuilt from Rules & Regulations (5/2024). The 2020
  health-emergency restrictions on the old site were NOT carried across.
- The Treasurer's email is deliberately not published; requests route through
  the contact form until the Board confirms the correct address.
- Document links currently point at the existing turnberrywgv.com PDFs.
  Re-upload them into the new CMS and update the paths.
