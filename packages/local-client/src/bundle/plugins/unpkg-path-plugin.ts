import { OnResolveArgs, PluginBuild } from "esbuild-wasm";


export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup: (build: PluginBuild) => {
      build.onResolve({ filter: /^(index\.js$)/ }, () => {
        return {
          namespace: "a",
          path: "index.js"
        };
      });
      build.onResolve({ filter: /\.?\.\// }, (args: OnResolveArgs) => {
        return {
          namespace: "a",
          path: new URL(args.path, "https://unpkg.com" + args.resolveDir + "/").href,
        }
      });
      build.onResolve({ filter: /.*/ }, (args: OnResolveArgs) => {
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        }
      });
    },
  };
};