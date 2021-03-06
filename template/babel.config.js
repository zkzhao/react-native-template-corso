module.exports = {
  presets: [
    "module:metro-react-native-babel-preset",
    "module:react-native-dotenv",
  ],
  plugins: [
    ["import", { libraryName: "@ant-design/react-native" }],
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          "@": "./src",
        },
      },
    ],
  ],
};
