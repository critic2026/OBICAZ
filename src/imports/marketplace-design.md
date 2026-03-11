Design a modern marketplace web platform focused on local second-hand objects displayed on a geographic map.

The concept is “objects around me”.

The interface must be extremely simple and visual. The homepage is a map, not a list.

STYLE
Clean modern UI, mobile-first, light background, minimalist interface similar to Airbnb or modern map applications. Use rounded cards, soft shadows, and large photos.

PRIMARY FEATURE
A geographic map interface.

Two types of markers must appear on the map:

• Red circular marker → objects for sale
• Blue circular marker → objects people are searching for

Markers display a small price label when zoomed in.

When clicking a marker, a small card appears with:

object photo

title

price

distance from user

button “View listing”

HOMEPAGE

Top area:

search bar: “Search objects around you”

filter button

radius selector (5 km, 10 km, 25 km, region)

Main area:
Interactive map centered on the user's location.

Bottom floating action button:
“Publish an object”

USER FLOW – FIRST VISIT

When arriving on the site, the user must choose:

“I want to sell an object”

“I am looking for an object”

Two large cards with icons.

If the user selects SELLER → publish flow opens.
If the user selects BUYER → search mode opens.

PUBLISH OBJECT FLOW

Very fast posting process:

Step 1
Take or upload photo (minimum 1 photo required)

Step 2
Price field

Step 3
Short title

Step 4
Location automatically detected

Step 5
Publish

The listing then appears on the map as a red marker.

SEARCH REQUEST FLOW

Users can publish a request.

Fields:

object searched

budget

optional photo

location

This appears on the map as a blue marker.

USER PROFILE

Profile page includes:

username

profile photo

rating system

number of successful transactions

response time indicator

SECURITY SYSTEM AT REGISTRATION

Registration form includes:

email

phone number (SMS verification required)

password

Security elements:

• SMS code verification
• email verification
• limit of multiple accounts per phone number
• captcha to prevent bots

Profile verification badges:

✔ email verified
✔ phone verified
✔ active user

MESSAGING SYSTEM

Internal chat system between buyer and seller.

Chat interface includes:

send message

send photo

quick replies

button “Reserve item”

If an item is reserved, the marker shows “Reserved”.

FILTER SYSTEM

Filters must update the map dynamically.

Filters include:

price range

distance

category

condition

newest listings

MAP FEATURES

Cluster markers when zoomed out.

Show price labels when zoomed in.

Display approximate location only (not exact address) for privacy.

ADDITIONAL FEATURES

Notification system when a new object appears nearby.

Toggle option:
“Show items I might miss” (expands search radius).

DESIGN SCREENS TO CREATE

Create UI mockups for:

Homepage map interface

Sell object flow

Search request flow

Listing detail page

User profile

Chat interface

Registration and security verification screens

Ensure the UI works well on desktop