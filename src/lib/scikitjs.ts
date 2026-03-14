import * as tf from "@tensorflow/tfjs";
import * as sk from "scikitjs";

let initialized = false;

export async function initScikitjs(): Promise<void> {
  if (initialized) return;
  sk.setBackend(tf);
  initialized = true;
}

export { sk };
