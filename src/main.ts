import "./style.css";
import Worker from "./worker?worker";

const worker = new Worker();
const sharedArrayBuffer = new Uint8Array(new SharedArrayBuffer(1));

worker.addEventListener("message", ({ data }) => {
  if (data.type === "loaded") {
    worker.postMessage(sharedArrayBuffer);
  }

  if (data.type === "stdout") {
    console.log(data.output);
  }
});

document.querySelector("#cancel")!.addEventListener("click", () => {
  console.log("Cancelling worker");
  sharedArrayBuffer[0] = 2;
});
