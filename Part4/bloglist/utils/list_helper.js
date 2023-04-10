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

const mostLikes = (blogs) => {
    const sorted = Object.entries(_.groupBy(blogs, 'author'))
    const likes = []
    sorted.forEach(element => {
        likes.push({ author: element[0], likes: _.sumBy(element[1], 'likes') })
    });
    return _.maxBy(likes, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}