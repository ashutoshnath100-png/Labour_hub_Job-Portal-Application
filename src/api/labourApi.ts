const BASE_URL = import.meta.env.VITE_API_URL;

export const getLabours = async () => {
    const res = await fetch(`${BASE_URL}/api/labour`);
    return res.json();
};

export const getLabourById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/labour/${id}`);
    return res.json();
};