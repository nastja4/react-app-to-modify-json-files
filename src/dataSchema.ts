import { JSONSchema7 } from 'json-schema';

// The schema (the TypeScript code) matches the structure and types of the JSON 
// file, ensuring that the data conforms to the expected format and types

export const dataSchema: JSONSchema7 = {
  type: "object",
  properties: {
    SystemConfig: {
      type: "object",
      properties: {
        cloud: {
          type: "object",
          properties: {
            certPath: { type: "string" }
          },
          required: ["certPath"]
        },
        hardware: {
          type: "object",
          properties: {
            lte: { type: "object", properties: { use: { type: "boolean" } } },
            adc: { type: "object", properties: { batteryI2cAddr: { type: "string" } } }
          },
          required: ["lte", "adc"]
        },
        voltage: {
          type: "object",
          properties: {
            battery: {
              type: "object",
              properties: {
                min: { type: "number" },
                max: { type: "number" },
                default: { type: "number" }
              },
              required: ["min", "max", "default"]
            }
          },
          required: ["battery"]
        },
        dataParsers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              sensor: { 
                type: "object",
                properties: { hwid: { type: "string" } }
              },
              use: { type: "boolean" },
              position: {
                type: "array",
                items: { type: "number" },
                minItems: 4, 
                maxItems: 4
              }
            },
            required: ["id", "sensor", "use", "position"]
          }
        }
      },
      required: ["cloud", "hardware", "voltage", "dataParsers"]
    }
  },
  required: ["SystemConfig"]
};
