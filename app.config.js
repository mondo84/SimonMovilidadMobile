import "dotenv/config";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      API_URL: process.env.API_URL || "http://192.168.1.2:5010",
    },
  };
};
