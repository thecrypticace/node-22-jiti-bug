let { createJiti } = require("jiti");
let jiti = createJiti(__filename, { interopDefault: true });

async function run() {
  // 1. Require an file with ESM syntax
  // 2. The require MUST fail *due to a failed import*
  // 3. Then we try to import it with Jiti
  let result;
  try {
    result = require("./files/esm.js");
  } catch (err) {
    // The sync version is also broken:
    // result = jiti("./files/esm.js");
    result = await jiti.import("./files/esm.js");
  }

  // Pull out the default export
  result = result.default;

  // See if fn was imported correctly
  if (typeof result.fn === "function") {
    console.log("Works!");
    return;
  }

  console.log("broken");
  console.log(result);
}

run();
