import * as dfd from "danfojs";
import * as sk from "scikitjs";

let initialized = false;
let initializing: Promise<void> | null = null;

export async function initScikitjs(): Promise<void> {
  if (initialized) return;
  if (initializing) return initializing;

  initializing = (async () => {
    sk.setBackend(dfd.tensorflow);
    initialized = true;
  })();

  try {
    await initializing;
  } catch (err) {
    // Allow retry on failure
    initializing = null;
    throw err;
  }
}

export { sk };
