import { type FunctionDeclaration, SchemaType } from '@google/generative-ai';
import { useEffect, useRef, useState } from 'react';
import vegaEmbed from 'vega-embed';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';

export const declaration: FunctionDeclaration = {
  name: 'render_altair',
  description: 'Displays an altair graph in json format.',
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      json_graph: {
        type: SchemaType.STRING,
        description: 'JSON STRING representation of the graph to render. Must be a string, not a json object',
      },
    },
    required: ['json_graph'],
  },
};

export function Altair() {
  const [jsonString, setJSONString] = useState<string>('');
  const { client, setConfig } = useLiveAPIContext();

  useEffect(() => {
    setConfig({
      model: 'models/gemini-2.0-flash-exp',
      systemInstruction: {
        parts: [
          {
            text: 'You are a helpful design assistant. When asked for visualizations, call the "render_altair" function.',
          },
        ],
      },
      tools: [{ googleSearch: {} }, { functionDeclarations: [declaration] }],
    });
  }, [setConfig]);

  useEffect(() => {
    const onToolCall = (toolCall: any) => {
      console.log(`got toolcall`, toolCall);
      const fc = toolCall.functionCalls.find(
        (fc: any) => fc.name === declaration.name
      );
      if (fc) {
        const str = fc.args.json_graph;
        setJSONString(str);
      }
    };
    
    if (client) {
      client.on('toolcall', onToolCall);
      return () => {
        client.off('toolcall', onToolCall);
      };
    }
  }, [client]);

  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (embedRef.current && jsonString) {
      vegaEmbed(embedRef.current, JSON.parse(jsonString));
    }
  }, [embedRef, jsonString]);

  return <div className="vega-embed h-96 w-full" ref={embedRef} />;
}