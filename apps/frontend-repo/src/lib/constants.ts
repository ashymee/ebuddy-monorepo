export const constants = {
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://ebuddy-monorepo-backend.vercel.app"
      : "http://localhost:5500",
};
