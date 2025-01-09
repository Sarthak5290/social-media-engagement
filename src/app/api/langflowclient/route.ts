import { LangflowClient } from "../../utils/langflowclient";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const {inputValue} = body;

    // const inputValue = "Reel"
    
    const flowIdOrName = "5349ae69-15b9-40cf-b14b-0132b9713261";
    const langflowId = "ee13790e-31a6-4a84-b0fb-71e361a4803e";
    const applicationToken =
      "AstraCS:WnUIsipLxBhTvPZJmTROPXPW:c805da488c169c7c8d9cf69c54321ede31c4e7d6aca6b864b86f17fdb9fab7bd";
    const langflowClient = new LangflowClient(
      "https://api.langflow.astra.datastax.com",
      applicationToken
    );

    try {
      const tweaks = {
        "Agent-vOMAL": {},
        "AstraDBToolComponent-9dkr2": {},
        "ChatOutput-b1urs": {},
        "ChatInput-RjrKR": {},
        "PythonREPLTool-BcQBJ": {},
      };

      const inputType = 'chat';
      const outputType = 'chat';
      const stream = false;
      
    //   console.log(inputValue);
      
      const response = await langflowClient.runFlow(
        flowIdOrName,
        langflowId,
        inputValue,
        inputType,
        outputType,
        tweaks,
        stream,
        // (data: { chunk: any }) => console.log("Received:", data.chunk), // onUpdate
        // (message: string) => console.log("Stream Closed:", message), // onClose
        // (error: Error) => console.log("Stream Error:", error) // onError
      );
      if (!stream && response && response.outputs) {
        const flowOutputs = response.outputs[0];
        const firstComponentOutputs = flowOutputs.outputs[0];
        const output = firstComponentOutputs.outputs.message;
        const textMessage = output.message.text;
        console.log("Final Output:", output.message.text);

        return NextResponse.json(textMessage);
      }
    } catch (error ) {
      console.error("Main Error", error);
      return NextResponse.json(error)
    }

}