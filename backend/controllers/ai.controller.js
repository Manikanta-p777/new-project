import dotenv from "dotenv"
dotenv.config();

export const askAi = async (req, res) => {
    try {
        const { message } = req.body

        const url = "https://router.huggingface.co/v1/chat/completions";
        const options = {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${process.env.AI_API}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "meta-llama/Llama-3.1-8B-Instruct:novita",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant. Reply in plain text only. No markdown. No stars, no hashtags. Use simple sentences."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            }),
        }
        const response = await fetch(url, options);

        if (!response.ok) {
            const errText = await response.text();
            console.error("HuggingFace error:", errText);
            return res.status(response.status).json({ error: errText });
        }

        const data = await response.json();

        const reply = data?.choices?.[0]?.message?.content?.trim() ?? "No response";
        res.json({ reply });

    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}