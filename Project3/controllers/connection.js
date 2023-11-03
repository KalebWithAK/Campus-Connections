const model = require('../models/connections')
const { ObjectId } = require('mongodb')

exports.getConnections = (req, res, next) => { //index
    model.find()
    .then(connections => 
        {
        const topics = []

        connections.forEach(connection => {
            if (!topics.includes(connection.topic)) {
                topics.push(connection.topic)
            }
        })

        res.render('pages/connections', { connections, topics })
    })  
    .catch(err => next(err))
}

exports.getConnection = (req, res, next) => { //show
    const { connection_id } = req.params
    model.findById(connection_id)
    .then(connection => {
        if (connection) {
            res.render('pages/connection', { connection })
        }
    })
    .catch(err => next(err))
}

exports.save = (req, res, next) => { //create
    const { connection_id} = req.params
    // const connection = req.body

    // model.save(connection)
    // .then(() => res.redirect('/connection'))
    // .catch(err => next(err))
    let connection = new model(req.body);
    connection.save(connection)
    .then(connection=> res.redirect('/connection'))
    .catch(err=>{
        if(err.name === 'ValidationError' ){
            err.status = 400;
        }
        next(err);
    });
}

exports.edit = (req, res, next) => {
    const { connection_id } = req.params
    if(!connection_id.match(/^[0-9a-fA-F]{24}$/)) { //matching for characters 0 to 9 and a to f lower or upper and 24 characters long if not match display error below if match goes to next code snippet
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    model.findById(connection_id)
    .then(connection => {
        if (connection) {
            res.render('./pages/editConnection', { connection })
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));

    // const { connection_id } = req.params

    // model.findById(connection_id)
    // .then(connection => {
    //     if (connection) {
    //         res.render('pages/editConnection', { connection })
    //     }
    // })
    // .catch(err => next(err))
}

exports.update = (req, res, next) => {
    let connection = req.body;
    const { connection_id } = req.params;
    if(!connection_id.match(/^[0-9a-fA-F]{24}$/)) { 
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(connection_id, connection, {useFindAndModify: false})
    .then(connection => {
        if (connection) {
            res.redirect('/connection/id/' + connection_id)
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
        .catch(err=> {
            if(err.name === 'ValidationError')
                err.status = 400;
            next(err)
        });
    };
    
//     .then(results => {
//         console.log(results)
//         if (results.modifiedCount == 1) {
//             res.redirect('/connection/id/' + connection_id)
//         }
//         else {
//             const err = new Error('cannot find story with id ' + connection_id)
//             err.status = 404
//             next(err)
//         }
//    })
//    .catch(err => next(err))
// }

exports.delete = (req, res, next) => {
    
    const { connection_id } = req.params
    if(!connection_id.match(/^[0-9a-fA-F]{24}$/)) { 
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    }
    
    model.findByIdAndDelete(connection_id, {useFindAndModify: false})
    .then(connection => {
        if (connection) {
            res.redirect('/connection')
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
      .catch(err=>next(err))
    };

//     model.delete(connection_id)
//     .then(results => {
//         console.log(results)
//         res.redirect('/connection')
//     })
//     .catch(err => next(err))
// }