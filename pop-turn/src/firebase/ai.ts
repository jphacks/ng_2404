export const convert = async (event: string) => {
  const response = await fetch("https://jphacks2024.web.app/process-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: "サンプルメッセージ" }),
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};
