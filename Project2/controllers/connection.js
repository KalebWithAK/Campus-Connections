const connections = require('../models/connections')
const connection = require('../routes/connection')
const { randomString } = require('../utils')

module.exports.getConnections = () => {
    return connections
}

module.exports.getConnectionById = (id) => {
    const result = connections.filter(c => c.connection_id == id)

    if (result.length) {
        return result[0]
    }

    return false
}

module.exports.getTopics = () => {
    const topics = []

    connections.map(c => {
        if (!topics.includes(c.topic)) {
            topics.push(c.topic)
        }
    })

    return topics
}

module.exports.createConnection = (details) => {
    let connection_id = randomString(8)

    while(this.getConnectionById(connection_id)) {
        connection_id = randomString(8)
    }
    
    details.connection_id = connection_id

    Object.keys(details).forEach(k => {
        if (!details[k]) {
            details[k] = ''
        }
    })

    connections.push(details)
}

module.exports.editConnection = (id, details) => {
    const old_connection = this.getConnectionById(id)

    if (old_connection) {
        Object.keys(details).forEach(k => {
            if (!details[k]) {
                details[k] = old_connection[k]
            }
        })

        details.connection_id = id

        connections[connections.indexOf(old_connection)] = details
    }
}

module.exports.removeConnection = (id) => {
    const index = connections.indexOf(this.getConnectionById(id))

    connections.splice(index, 1)
}