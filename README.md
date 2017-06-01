# AUTOBOOK GraphQL Server

This is a work in progress. It will eventually be the API for the AutoBook project.

This iteration of the repo has a GraphQL server in Node.js using Express, MongoDB and Mongoose. 

This get started guide was used: https://www.sitepoint.com/creating-graphql-server-nodejs-mongodb/ 

You can run it locally with Docker:

```bash
docker-compose up
```

Use Postman to debug and develop the API (as per the get started doc). Demo data: https://www.getpostman.com/collections/4a2b6fe97174396c522e


# Models info & terminology [updated July 01 2017]

We've tried to generalise the system as much as possible in order to accomodate various sectors. Therefore som terminology of models & objects may be a bit confusing:

* VENUE       : aka 'studio'. This is a physical location that contains bookable PODs. It also contains generic venue info for a promo web front end
* POD         : aka 'room'. This is a physical space within a venue that can be booked out. It contains availibility hours, pricing, equipment etc
* BLOCK       : a session of time at a POD. Each BLOCK has its own time and pricing data. Promos should work too.
* BLOCKPROMO  : a modular way to manage varying prices for a BLOCK. Can be set to reoccur on certain days/dates, or times.
* BOOKING     : a record of a confirmed booking (upcoming or past). Contains info on POD and GROUP that will use this booking 
* PAYMENT     : a record of any payments in the system. Stores total and deposit etc.
* GROUPPAYMENT: collection of payments (deposit) from each MEMBER of a band tagged as billable
* GROUP       : aka 'bands'. These are a group of MEMBERs. A GROUP will have a PrimaryContact, aka Manager. Also allows a list of billable members
* MEMBER      : aka 'people' within a band/group; has info about their role and requirements in the GROUP. Used for arrange BOOKING of a POD
* USER        : aka 'person'. This is the user profile for a MEMBER. It stores contact info and payment etc. 
* PAYMENTINFO : payment info for making transactions for deposit to VENUE and for booking fee from VENUE OWNER to us


## Model data map and methods [updated July 01 2017]
[fk]: Foreign Key / [m2m]: Many to Many / italic: method / [TBC]: To be confirmed

* __VENUE__
  * ID
  * Name
  * Address
  * City
  * Email
  * Tel
  * Admin : USER [fk]
  * Staff : USER [m2m]
  * Info [TBC: info/fields for web storefront]
  * _getPodList()_
  * _getOpeningHours()_
  * _getPricingInfo()_
  * _getAllBookingList()_

* __POD__
  * ID
  * Name
  * BelongsToVenue : VENUE [fk]
  * Blocks : BLOCK [m2m]
  * _getBlockList()_
  * _getBlockPromoList()_
  * _getBookingList()_

* __BLOCK__
  * ID
  * TimeStampStart
  * TimeStampEnd
  * Price
  * _getBlockDuration()_
  * _getBlockPromoList()_
  * _applySpecificPromo()_

* __BLOCKPROMO__
  * ID
  * Block : BLOCK [fk]
  * TimeStampValidStart
  * TimeStampValidEnd
  * Reoccurance
  * Discount

* __BOOKING__
  * ID
  * Block : BLOCK [fk]
  * Promo : BLOCKPROMO [fk]
  * Group : GROUP [fk]
  * PaymentRecieved : GROUPPAYMENT [fk]
  * _getFullBookingDetails()_

* __PAYMENT__
  * ID
  * TimeStampDate
  * Total
  * AmountPaid
  * User : USER [fk]

* __GROUPPAYMENT__
  * ID
  * PayeeList : GROUP.MembersBillable [m2m]

* __GROUP__
  * ID
  * Admin : USER [fk]
  * Members : MEMBER [m2m]
  * MembersBillable : MEMBER [m2m]
  * Name
  * Info
  * PrimaryContact : MEMBER [fk]
  * _getPreferredVenueList()_
  * _getBookingList()_
  * _emailAllMembers()_

* __MEMBER__
  * ID
  * User : USER [fk]
  * Role
  * BookingPreferences

* __USER__
  * ID
  * Email
  * Password
  * Tel
  * Active
  * PaymentInfo : PAYMENTINFO [fk]

* __PAYMENTINFO__
  * ID
  * User : USER [fk]
  * Card / payment details etc [TBC]






