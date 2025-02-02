import API from "./httpConfig";



export const create = async (url: string, data?: FormData) => {
    try {
        const res = await API.post(url, data)
        return { success: true }
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}


export const update = async (url: string, data?: FormData) => {
    try {
        const res = await API.put(url, data)
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}

export const deleted = async (url: string, id: string) => { 
    try {
        const path = url + `/${id}`
        const res = await API.delete(path)
        return { success: true, data: res.data }
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}