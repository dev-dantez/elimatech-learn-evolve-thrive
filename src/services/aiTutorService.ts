
export async function askAITutor(prompt: string, context?: string) {
  try {
    const response = await fetch('/api/ai-tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, context }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from AI tutor');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error asking AI tutor:', error);
    throw error;
  }
}
