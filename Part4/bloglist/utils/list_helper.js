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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}