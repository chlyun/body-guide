export const postProductClickData = async (productId: number) => {
  try {
    const response = await fetch('/api/productClick', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }), // Send productId as JSON body
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Failed to fetch data' };
  }
};
