export default async function loadUserService(token) {
  try {
    const response = await fetch(
      `http://localhost:3001/api/login?token=${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    console.log("Response all data is => ", res);
    return res;
  } catch (error) {
    console.error("Error in loadUserService:", error);
    throw error;
  }
}
