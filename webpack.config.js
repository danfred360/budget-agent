import path from "path";
import fs from "fs";

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = path.resolve();

const agentsDir = path.resolve(__dirname, "src", "agents");
const outputDir = path.resolve(__dirname, "dist");

const getEntries = (specificDir) => {
  if (specificDir) {
    return {
      [specificDir]: path.resolve(agentsDir, specificDir, "index.ts"),
    };
  }

  const entries = {};
  const directories = fs.readdirSync(agentsDir).filter((file) => fs.statSync(path.join(agentsDir, file)).isDirectory());

  directories.forEach((dir) => {
    entries[dir] = path.resolve(agentsDir, dir, "index.ts");
  });

  return entries;
};

const specificDir = process.env.AGENT_DIR;
const entries = getEntries(specificDir);

export default {
  entry: entries,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "[name]/bundle.js",
    path: outputDir,
    libraryTarget: "module",
  },
  target: "node",
  experiments: {
    outputModule: true,
  },
};
