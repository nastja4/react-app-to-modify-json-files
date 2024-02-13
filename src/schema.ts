import { JSONSchema7 } from 'json-schema';


// Define the JSON schema for configuration
export const schema: JSONSchema7 = {
  type: "object",
  properties: {
    SystemConfig: {
      type: "object",
      properties: {
        cloud: {
          type: "object",
          properties: {
            certPath: { type: "string" },
          },
        },
        hardware: {
          type: "object",
          properties: {
            lte: { type: "object", properties: { use: { type: "boolean" } } },
            adc: { type: "object", properties: { batteryI2cAddr: { type: "string" } } },
          },
        },
        voltage: {
          type: "object",
          properties: {
            battery: {
              type: "object",
              properties: {
                min: { type: "number" },
                max: { type: "number" },
                default: { type: "number" },
              },
            },
          },
        },
        dataParsers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              sensor: {
                type: "object",
                properties: {
                  hwid: { type: "string" },
                },
                required: ["hwid"]                   // required
              },
              use: { type: "boolean" },
              position: {
                type: "array",
                items: { type: "number" },
                minItems: 4,
                maxItems: 4,
              },
            },
            required: ["id", "sensor", "use", "position"]  // 'required' due to keys' necessity
          },
        },
      },
    },
  },
};
