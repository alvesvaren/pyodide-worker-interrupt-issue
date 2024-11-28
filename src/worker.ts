import { loadPyodide } from "pyodide";

let pyodide = await loadPyodide();

self.postMessage({ type: "loaded" });

self.addEventListener("message", async e => {
  pyodide.setInterruptBuffer(e.data);
  pyodide.setStdout({
    batched(output) {
      self.postMessage({ type: "stdout", output });
    },
  });

  pyodide.runPythonAsync(`while 1:
  print("Hello world")`);
});
