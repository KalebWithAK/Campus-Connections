const connections = require('../models/connections')

function getConnections() {
    return connections
}

function getConnectionById(id) {
    return connections[id - 1] ? connections[id - 1] : false
}

function getTopics() {
    const connections = getConnections()

    const topics = []
    
    connections.forEach((c) => {
        if (!topics.includes(c.topic)) {
            topics.push(c.topic)
        }
    })

    return topics
}

function getConnectionsByTopic(topic) {
    const connections = getConnections()

    connection.filter((c) => c.topic === topic)
}

function createConnection({ connection_name, topic, details, date, start_time, end_time, host_name, img, location }) {
    connections.push({ connection_id: connections.length, connection_name, topic, details, date, start_time, end_time, host_name, img, location })
}

function editConnection(connection_id, { connection_name, topic, details, date, start_time, end_time, host_name, img, location }) {
    const connection = getConnectionById(connection_id)

    if (connection) {
        if (connection_name) {
            connections[connections.indexOf(connection)].connection_name = connection_name
        }
        if (topic) {
            connections[connections.indexOf(connection)].topic
        }
        if (details) {
            connections[connections.indexOf(connection)].details = details
        }
        if (date) {
            connections[connections.indexOf(connection)].date = date
        }
        if (start_time) {
            connections[connections.indexOf(connection)].start_time = start_time
        }
        if (end_time) {
            connections[connections.indexOf(connection)].end_time = end_time
        }        
        if (host_name) {
            connections[connections.indexOf(connection)].host_name = host_name
        }
        if (img) {
            connections[connections.indexOf(connection)].img = img
        }
        if (location) {
            connections[connections.indexOf(connection)].location = location
        }

        return true
    }

    return false
}

function removeConnection(id) {
    const index = connections.indexOf(getConnectionById(id))

    if (index != -1) {
        connections.splice(index, 1)
        return true
    }

    return false
}

module.exports = { getConnections, getConnectionById, createConnection, editConnection, removeConnection, getTopics, getConnectionsByTopic }