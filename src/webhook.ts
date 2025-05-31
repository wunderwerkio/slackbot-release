export async function postWebhook(webhookUrl: string, payload: unknown) {
  const jsonPayload = JSON.stringify(payload);

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonPayload,
  });

  if (!response.ok) {
    throw new Error(`Failed to post webhook: ${response.statusText}`);
  }

  return response;
}
