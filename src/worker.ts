import { loadPyodide } from "pyodide";

console.log("Worker loaded");
let pyodide = await loadPyodide();
console.log("Pyodide loaded");

self.postMessage({ type: "loaded" });

self.addEventListener("message", async e => {
  console.log("Set interrupt buffer");
  pyodide.setInterruptBuffer(e.data);
  pyodide.setStdout({
    batched(output) {
      self.postMessage({ type: "stdout", output });
    },
  });

  pyodide.runPythonAsync(`while 1:
  print("Hello world")`);
});
