async function fetchUserPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "Ahmed", email: "ahmed@example.com" });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}

async function getUser(userId) {
  try {
    const user = await fetchUserPromise(userId);
    return user;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

console.log(await getUser(1));
