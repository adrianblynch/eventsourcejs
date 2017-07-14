const _ = require("lodash")
const store = require("../store")

module.exports = {

  create: payload => {
    store.bookings.push({
      type: "CREATE",
      payload
    })
  },

  update: payload => {
    store.bookings.push({
      type: "UPDATE",
      payload
    })
  },

  cancel: id => {
    const payload = { id }

    store.bookings.push({
      type: "CANCEL",
      payload
    })
  },

  // Queries

  getBooking: (id) => {
    const events = store.bookings.filter(event => event.payload.id === id)
    return events.reduce((booking, event) => {
      const status = event.type === "CANCEL" ? "CANCELLED" : "ACTIVE"
      return _.merge(booking, event.payload, { status })
    }, {})
  },

  getAccountBookings: (id) => {
    return store.bookings.filter(event => event.payload.booking.accountId === id)
  }
}
