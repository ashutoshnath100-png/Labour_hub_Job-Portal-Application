const BASE_URL = "http://localhost:4000";

export const getLabours = async () => {
    const res = await fetch(`${BASE_URL}/api/labour`);
    return res.json();
};

export const getLabourById = async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/labour/${id}`);
    return res.json();
};