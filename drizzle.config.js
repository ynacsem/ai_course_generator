/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://yacinedb_owner:mJa4EfAU1xpX@ep-sweet-shape-a2eg20xv.eu-central-1.aws.neon.tech/AI-COURSE-GENERATOR?sslmode=require',
    }
  };