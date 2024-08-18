// A mock function to mimic making an async request for data
export const fetchCount = async (amount = 1) => {
  try {
    const response = await fetch('http://localhost:3000/api/counter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    });
    const result: { data: number } = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return result;
  } catch (e) {
    console.error(e);

    return { data: 1 };
  }
};
