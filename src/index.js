import axios from 'axios';

export const run = async (model, input) => {
    try {
        const response = await axios.post(
            `/api/client/v4/accounts/ec82fee86f90f329ee638b76fccdd924/ai/run/${model}`,
            input,
            {
                headers: {
                    Authorization: "Bearer 7TW6G7Lr3uFdyQe1RF77660zUBVvDX535Xvwo0z0",

                },
                withCredentials: true,
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


