export const getAllTasks = async () => {
    const data = await import( "../mock-data/task-info.json");
    return data.default;
}


export const saveTask = async (task) => {
    task.id = Math.random();
    console.log("Save task");
    return task;
}


export const deleteTask = async (task) => {
    console.log("Delete task");
}
