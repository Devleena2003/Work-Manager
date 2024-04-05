import { httpsAxios } from "../helper/httpHelper";
export async function addTask(task) {
  const result = await httpsAxios
    .post("/api/tasks", task)
    .then((response) => response.data);
  return result;
}

export async function getTasksOfUser(userId) {
  const result = await httpsAxios
    .get(`/api/user/${userId}/tasks`)
    .then((response) => response.data);
  return result;
}
export async function deleteTask(taskId) {
  const result = await httpsAxios
    .delete(`/api/tasks/${taskId}`)
    .then((response) => response.data);
  return result;
}
