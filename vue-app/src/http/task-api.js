import api from "./api"

const apiPath = import.meta.env.VITE_API_PATH
const resource = apiPath + "/tasks"

export const allTasks = () => api.get(resource)