const { app } = require('@azure/functions');
const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");

// Define the OpenAI environment variables
const deploymentName = process.env.AzureOpenAIDeploymentName;
const openAIEndpoint = process.env.AzureOpenAIEndpoint;
const apiKey = process.env.AzureOpenAIKey;

// Create an OpenAI client
const openAIClient = new OpenAIClient(openAIEndpoint, new AzureKeyCredential(apiKey));

app.http('generateDescription', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const body = await request.json();
        context.log("request.body: ", body);

        // get imageUrl from the request body 
        const imageUrl = body.imageUrl;
        context.log(`imageUrl: ${imageUrl}`);

        if (!imageUrl) {
            return { status: 400, body: "Please provide an image url." };
        }

        const messages = [
            { 
                role: "user", 
                content: [
                    {
                        type: "image_url",
                        imageUrl: imageUrl
                    },
                    {
                        type: "text",
                        text: "Describe this work of art."
                    }
                ]
            }
        ];

        try {
            const result = await openAIClient.getChatCompletions(deploymentName, messages);
            return { body: `Image description: ${result.choices[0].message.content}` };
        } catch (error) {
            context.log(`Error: ${error.message}`);
            return { status: 500, body: "An error occurred while calling Azure OpenAI." };
        }
    }
});
