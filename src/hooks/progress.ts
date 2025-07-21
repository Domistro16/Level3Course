export async function getProgress(address: string, courseId: number) {
  const response = await fetch(
    `https://seal-app-zivs6.ondigitalocean.app/api/progress/${address}/${courseId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await response.json();
  return data;
}

export async function updateProgress(
  address: string,
  courseId: number,
  lessonIndex: number
) {
  await fetch("https://seal-app-zivs6.ondigitalocean.app/api/progress/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: address,
      courseId,
      lessonIndex,
    }),
  });
}
