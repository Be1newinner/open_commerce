import "dotenv/config";

const CONFIG = {
  MONGO_DB_URI: process.env.MONGODB_URI || "",
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "",
};

export default CONFIG;
