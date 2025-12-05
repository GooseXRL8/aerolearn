// api/gemini.js
export default async function handler(req, res) {
    // A chave fica segura aqui no servidor da Vercel
    const apiKey = process.env.GEMINI_API_KEY; 

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { contents, systemInstruction } = req.body;

        // O backend chama o Google, ninguém vê a chave
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents,
                systemInstruction: systemInstruction
            })
        });

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro interno ao processar IA' });
    }
}
