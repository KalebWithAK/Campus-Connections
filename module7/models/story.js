const { ObjectId } = require('mongodb')

/*const stories = [
{
    id: ,
    title: 'A funny story',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat lectus et ullamcorper posuere.',
    author: 'Lijuan',
    createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
},
{
    id: '2',
    title: 'It is rainning',
    content: 'Cras eget urna non quam tempor fermentum ac nec risus. Morbi ornare condimentum accumsan.',
    author: 'Michael',
    createdAt: DateTime.local(2021, 2, 12, 18, 0).toLocaleString(DateTime.DATETIME_SHORT)
}
];*/

// needs reference variable to stories collection in db
let stories
exports.getCollection = (db) => {
    stories = db.collection('stories')
}

exports.find = () => stories.find().toArray()

exports.findById = id => stories.findOne({ _id: new ObjectId(id) })

exports.save = (story) => stories.insertOne(story)

exports.updateById = (id, newStory) => stories.updateOne({ _id: new ObjectId(id) }, { $set: { title: newStory.title, content: newStory.content }})

exports.deleteById = id => stories.deleteOne({ _id: new ObjectId(id)})