const getNextId = require("uuid").v1
const store = require("./store")
const Accounts = require("./events/Accounts")
const Bookings = require("./events/Bookings")

const accountId = getNextId()

// Create an account
Accounts.create({ id: accountId, name: "Adrian", email: "email@gmail.com", password: "password" })

// Update it a few times
Accounts.update({ id: accountId, email: "new.email@gmail.com" })
Accounts.update({ id: accountId, email: "adrian@gmail.com" })
Accounts.update({ id: accountId, password: "P@ssw0rd" })

// Earn and spend some points
Accounts.earnPoints(accountId, 100)
Accounts.earnPoints(accountId, 100)
Accounts.earnPoints(accountId, 100)
Accounts.spendPoints(accountId, -100)
Accounts.spendPoints(accountId, -100)

// Become an EFT member
Accounts.changeProgramme(accountId, "EFT")

// Change to an EPP member
Accounts.changeProgramme(accountId, "EPP")

// Block the account
Accounts.block(accountId, "BLOCKED")

// Get the current state of the account
const account = Accounts.getAccount(accountId)
const programme = Accounts.getProgramme(accountId)
const points = Accounts.getPoints(accountId)
const status = Accounts.getStatus(accountId)

console.log(store.accounts.filter(e => e.payload.id === accountId))

// Take a look at that state
console.log("Account:", JSON.stringify(account, null, 2))
console.log("Programme:", JSON.stringify(programme, null, 2))
console.log("Points:", JSON.stringify(points, null, 2))
console.log("Status:", JSON.stringify(status, null, 2))

// Make an annonymous booking
Bookings.create({
  id: getNextId(),
  outbound: { origin: "London", destination: "Paris", date: "2017-08-01" },
  inbound: { origin: "Paris", destination: "London", date: "2017-08-10" }
})

// Make a booking for member we created above
Bookings.create({
  id: getNextId(),
  accountId,
  outbound: { origin: "London", destination: "Paris", date: "2017-08-02" },
  inbound: { origin: "Paris", destination: "London", date: "2017-08-10" }
})

Bookings.create({
  id: getNextId(),
  accountId,
  outbound: { origin: "London", destination: "Lille", date: "2017-09-02" }
})

const bookingIdToUpdateAndThenCancel = getNextId()

Bookings.create({
  id: bookingIdToUpdateAndThenCancel,
  accountId,
  outbound: { origin: "London", destination: "Amsterdam", date: "2018-09-02" }
})

const originalBooking = Bookings.getBooking(bookingIdToUpdateAndThenCancel)
// console.log("Original booking:", JSON.stringify(originalBooking, null, 2))

Bookings.update({
  id: bookingIdToUpdateAndThenCancel,
  outbound: {
    date: "2020-09-02"
  }
})

const updatedBooking = Bookings.getBooking(bookingIdToUpdateAndThenCancel)
// console.log("Updated booking:", JSON.stringify(updatedBooking, null, 2))

Bookings.cancel(bookingIdToUpdateAndThenCancel)

const deletedBooking = Bookings.getBooking(bookingIdToUpdateAndThenCancel)
// console.log("Deleted booking:", JSON.stringify(deletedBooking, null, 2))
