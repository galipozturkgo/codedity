import axios from "axios";
import localForage from "localforage";
import { OnLoadArgs, OnLoadResult, PluginBuild } from "esbuild-wasm";

const fileCache = localForage.createInstance({
  name: "filecache"
})

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup: (build: PluginBuild) => {
      build.onLoad({ filter: /^(index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
        const cachedResult = await fileCache.getItem<OnLoadResult>(args.path);

        if (cachedResult) return cachedResult;
      });

      build.onLoad({ filter: /.css$/ }, async (args: OnLoadArgs) => {
        const { data, request } = await axios.get(args.path);

        const espaced = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")

        const contents = `const style = document.createElement('style');
            style.innerText = '${espaced}';
            document.head.appendChild(style);
        `;

        const result: OnLoadResult = {
          loader: "jsx",
          contents: contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      })

      build.onLoad({ filter: /.*/ }, async (args: OnLoadArgs) => {
        const { data, request } = await axios.get(args.path);

        const result: OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
}