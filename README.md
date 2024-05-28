# JavaScript Azure OpenAi Samples

## Samples

* Azure Functions
    * generateDescription - Generates basic descriptions for an image url.

    Example HTTP call to Function:

    ``` 
        curl -X POST \
        -H "Content-Type: application/json" \
        -d '{"imageUrl": "https://barnesfoundation.imgix.net/galleryImages/BF949.jpeg"}' \
        <FUNCTION_URL>
    ```

    Example `local.settings.json`

    ```
        {
            "IsEncrypted": false,
            "Values": {
                    "AzureWebJobsStorage": "<your-storage>",
                    "FUNCTIONS_WORKER_RUNTIME": "node",
                    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
                    "AzureOpenAIKey": "<api-key>",
                    "AzureOpenAIDeploymentName": "<your-aoai-deployment-name>",
                    "AzureOpenAIEndpoint": "<you-aoai-endpoint>"
                }
            }
    ```
