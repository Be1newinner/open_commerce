import "dotenv/config";

const ConfigCB = () => {
  if (!process.env.MONGODB_URI) {
    throw Error("MongoDB URI Not Defined");
  }

  if (!process.env.JWT_SECRET) {
    throw Error("JWT Secret Not Defined");
  }

  return {
    MONGO_DB_URI: process.env.MONGODB_URI || "",
    PORT: process.env.PORT || 3000,
    JWT_SECRET: process.env.JWT_SECRET || "",
  };
};

const CONFIG = ConfigCB();

export default CONFIG;
