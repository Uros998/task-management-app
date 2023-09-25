export const getAllTasks = async () => {
    // const data = await import( "../mock-data/task-info.json");
    return JSON.parse(localStorage.getItem("taskList")) || [];
}

export const localStorageList = async () => {
    const taskList = JSON.parse(localStorage.getItem("taskList")) || [];
    if (taskList.length < 1) {
        const data = await import( "../mock-data/task-info.json");
        localStorage.setItem("taskList", JSON.stringify(data.default));
    }
}

export const getTaskById = async (taskId) => {
    try {
        const allTasks = await getAllTasks();
        console.log(allTasks, "GETTAASK")
        return allTasks.find(task => task.id === parseInt(taskId));
    } catch (error) {
        console.error("Greška pri dohvatanju zadatka po ID-u:", error);
        return null;
    }
}

export const saveTask = async (task) => {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.push(task)
    localStorage.setItem('taskList', JSON.stringify(taskList));
    return task;
}

export const updateTask = async (task) => {
    console.log("Update task");
    return task;
}

export const deleteTask = async (task) => {
    console.log("Delete task");
}
