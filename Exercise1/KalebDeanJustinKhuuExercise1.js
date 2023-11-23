let courses = [
    { prefix: 'ITIS', id: 4166, title: 'Network based app development' },
    { prefix: 'ITIS', id: 4180, title: 'Mobile application development' },
    { prefix: 'ITCS', id: 4156, title: 'Intro to machine learning' },
    { prefix: 'ITCS', id: 3160, title: 'Database design' },
]

function findById(id) {
    return courses.filter(course => course.id === id)[0]
}

function save({ prefix, id, title }) {
    courses.push({ prefix, id, title })
}

function findByPrefix(prefix) {
    return courses.filter(c => c.prefix === prefix)
}

function updateById(id, title) {
    const course = findById(id)

    if (course) {
        course.title = title
        return true
    }

    return false
}

function removeById(id) {
    const index = courses.indexOf(findById(id))

    if (index) {
        courses.splice(index, 1)
        return true
    }

    return false
}

// save new courses
save({ prefix: 'ITIS', id: 3310, title: 'Software architecture & design' })
save({ prefix: 'ITIS', id: 4250, title: 'Computer forensics' })
save({ prefix: 'ITIS', id: 4420, title: 'Usable security and privacy' })


// output
console.log(courses)

console.log(findById(4166))
console.log(findByPrefix('ITIS'))
console.log(updateById(1, { prefix: 'ITCS', title: 'Gaming' }))
console.log(removeById(1))
console.log(updateById(4166, 'Network-based application development'))
console.log(removeById(4420))
console.log(courses)