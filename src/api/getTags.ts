export const getTags = async () => {
  try {
    const response = await fetch('/api/tags');

    if (!response.ok) {
      throw new Error('서버로부터 데이터를 가져오는데 실패하였습니다.');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return { error: '서버로부터 데이터를 가져오는데 실패하였습니다.' };
  }
};
