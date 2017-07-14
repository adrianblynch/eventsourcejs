const store = require("../store")

module.exports = {

  create: (payload) => {
    store.accounts.push({
      type: "CREATE",
      payload
    })
  },

  update: (payload) => {
    store.accounts.push({
      type: "UPDATE",
      payload
    })
  },

  delete: (id) => {
    const payload = { id }

    store.accounts.push({
      type: "DELETE",
      payload
    })
  },

  earnPoints: (id, points) => {
    store.accounts.push({
      type: "EARN_POINTS",
      payload: {
        points
      }
    })
  },

  spendPoints: (id, points) => {
    store.accounts.push({
      type: "SPEND_POINTS",
      payload: {
        points
      }
    })
  },

  changeProgramme: (id, programme) => {
    store.accounts.push({
      type: "CHANGE_PROGRAMME",
      payload: {
        programme
      }
    })
  },

  block: (id) => {
    store.accounts.push({
      type: "BLOCK",
      payload: {
        id
      }
    })
  },

  // Queries

  getAccount: (id) => {
    const events = store.accounts.filter(event => event.payload.id === id)
    const account = events.reduce((account, event) => {
      const status = event.type === "BLOCK" ? "BLOCKED" : "ACTIVE"
      console.log("status", status)
      return Object.assign({}, account, event.payload, { status })
    }, {})
    return account
  },

  getPoints: (id) => {
    const events = store.accounts.filter(event => event.type.endsWith("_POINTS"))
    return events.reduce((total, event) => total + event.payload.points, 0)
  },

  getProgramme: (id) => {
    const events = store.accounts.filter(event => event.type === "CHANGE_PROGRAMME")
    return events.length ? events[events.length - 1].payload.programme : null
  },

  getStatus: (id) => {
    const events = store.accounts.filter(event => event.type === "CHANGE_STATUS")
    const lastEvent = events[events.length - 1]
    const status = lastEvent && lastEvent.payload.status
    return status || "ACTIVE"
  }
}
