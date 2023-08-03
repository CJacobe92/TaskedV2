
export const fetchUserData = async(session) => {
    try {
        const id = session.user.uid
        const token = session.user.token
        const baseURL = `${process.env.API_URL}/users/${id}`
        const requestOption = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }

        const response = await fetch(baseURL, requestOption)
       
        if (response.ok) {
            const data = await response.json()
            return data.data
        } else {
            console.error('Failed to fetch')
        }
    } catch(error) {
        console.error(error)
    }
}


export const fetchCreateTask = async(session, formData, category_id) => {
    try {
        const id = session.user.uid
        const token = session.user.token
        const baseURL = `${process.env.API_URL}/users/${id}/categories/${category_id}/tasks`
        console.log(baseURL)
        const requestOption = {
            method: 'POST',
            headers: {   
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body:JSON.stringify({'task': {'name': formData, 'urgent': 'false', 'completed':'false'}})
        }

        const response = await fetch(baseURL, requestOption)
       
        if (response.ok) {
            console.log('Task created')
        } else {
            console.error('Failed to create task')
        }
    } catch(error) {
        console.error(error)
    }
}

export const fetchUpdateTask = async(session, formData, category_id, task_id) => {
    try {
        const id = session.user.uid
        const token = session.user.token
        const baseURL = `${process.env.API_URL}/users/${id}/categories/${category_id}/tasks/${task_id}`
        console.log(baseURL)
        const requestOption = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body:JSON.stringify({'task': {'name': formData}})
        }

        const response = await fetch(baseURL, requestOption)
       
        if (response.ok) {
            console.log('Task updated')
        } else {
            console.error('Failed to update tasks')
        }
    } catch(error) {
        console.error(error)
    }
}

export const fetchDeleteTask = async(session, category_id, task_id) => {
    try {
        const id = session.user.uid
        const token = session.user.token
        const baseURL = `${process.env.API_URL}/users/${id}/categories/${category_id}/tasks/${task_id}`
        console.log(baseURL)
        const requestOption = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }

        const response = await fetch(baseURL, requestOption)
       
        if (response.ok) {
            console.log('Task deleted')
        } else {
            console.error('Failed to delete tasks')
        }
    } catch(error) {
        console.error(error)
    }
}