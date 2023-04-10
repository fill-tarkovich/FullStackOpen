const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const reducer = (a, b) => {
        return a.likes > b.likes ? a : b
    }
    return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
    const sorted = _.countBy(blogs, 'author')
    const index = Object.values(sorted).indexOf(_.max(Object.values(sorted)))
    return {
        author: Object.keys(sorted)[index],
        blogs: _.max(Object.values(sorted))
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}