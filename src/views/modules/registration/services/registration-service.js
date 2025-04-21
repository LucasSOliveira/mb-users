export async function submitRegistration(data) {
  const response = await fetch('/registration', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao enviar os dados.');
  }

  return response.json();
}
