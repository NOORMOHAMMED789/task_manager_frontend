import { getHeader } from "./GetHeaders";

export async function getSingleTask(taskId) {
  const headers = await getHeader();
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/singletask?taskId=${taskId}`,
    {
      method: "GET",
      headers,
    }
  );
}

export async function getAllTasks() {
  const headers = await getHeader();
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/all`,
    {
      method: "GET",
      headers,
    }
  );
}

export async function createNewTask(inputBody) {
  const headers = await getHeader();
  const body = JSON.stringify(inputBody);
  return fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/new`,
    {
      method: "POST",
      headers,
      body
    }
  );
}

export async function updateTask(taskId,inputBody) {
  const headers = await getHeader();
  const body = JSON.stringify(inputBody);
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tasks/update?taskId=${taskId}`, {
    method: "PUT",
    headers,
    body,
  });
}



