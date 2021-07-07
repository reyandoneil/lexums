const getPagination = (page, size) => {
    const limit = size ? +size : 10
    const offset = page ? page * limit : 0

    return { limit, offset }
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: dataUser } = data
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)

    return { totalItems, dataUser, totalPages, currentPage }
};

module.exports = {
    getPagination,
    getPagingData
}