import axios from 'axios';

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
export const run = async (model, input) => {
    try {
        const response = await axios.post(
            `/api/client/v4/accounts/ec82fee86f90f329ee638b76fccdd924/ai/run/${model}`,
            input,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`
                },
                // withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        if (error.response) {
            console.error('Error Response:', error.response.data);
        }
    }
}


