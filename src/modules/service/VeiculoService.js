import { insert, getAll, update, remove } from "@/modules/data/VeiculoDAO.js"

const handleInsert = async (veiculo) => {
    const result = {
        status: 200,
        data: {}
    }

    try {
        result.data = await insert(veiculo.data)
    } catch (error) {
        result.status = 500
        result.data = error.message
    }

    return result;
}

const handleGetAll = async () => {
    const result = {
        status: 200,
        data: {}
    }

    try {
        result.data = await getAll()
    } catch (error) {
        result.status = 500
        result.data = error.message
    }

    return result;
}

const handleUpdate = async (veiculo) => {
    const result = {
        status: 200,
        data: {}
    }

    try {
        result.data = await update(veiculo.data)
    } catch (error) {
        result.status = 500
        result.data = error.message
    }

    return result;
}

const handleRemove = async (id) => {
    const result = {
        status: 200,
        data: {}
    }

    try {
        result.data = await remove(id)
    } catch (error) {
        result.status = 500
        result.data = error.message
    }

    return result;
}

const acceptedMethods = {
    POST: handleInsert,
    PUT: handleUpdate,
    DELETE: handleRemove,
    GET: handleGetAll
}

const handleRequest = async (reqParams) => {
    if (acceptedMethods[reqParams.method] !== undefined) {
        let requestMetod = acceptedMethods[reqParams.method]
        return await requestMetod(reqParams)
    } else {
        return {
            status: 404,
            data: {}
        }
    }
}

export { handleRequest }