export default async function loginService(data) {
  console.log("Login Data => ", data);

  try {
    const response = await fetch("http://localhost:3004/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTJmYzk0ZWVhNTJjOWQ2NDNkZDU0NiIsImlhdCI6MTczMzQ5MTkxMiwiZXhwIjoxNzM0MDk2NzEyfQ.bvqCscRRPqVmpaalZo2_5-LcFjSTB_IB6C6zb1AyoSw`,
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
