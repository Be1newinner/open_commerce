export default async function loginService(data) {
  console.log("Login Data => ", data);

  try {
    const response = await fetch("http://localhost:3002/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDU3NzUxODliMTBjZjI5ZDMwOTE0ZCIsImlhdCI6MTczMjYwNTg2NCwiZXhwIjoxNzMzMjEwNjY0fQ.BPRP87l1CvQ3xjJqFIvia4l08sHeuXDYRB5zP291XOA`,
      },
      body: JSON.stringify(data),
    });

    // Handle HTTP errors explicitly
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const res = await response.json();
    console.log("Response data => ", res);
    return res;
  } catch (error) {
    console.error("Error in login service =>", error.message);
    throw error;
  }
}
