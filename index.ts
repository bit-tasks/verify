import * as core from "@actions/core";
import { DefaultArtifactClient } from "@actions/artifact";
import run from "./scripts/verify";

async function uploadBitLog() {
  try {
    const { getExecOutput } = await import("@actions/exec");
    const output = await getExecOutput("bit", ["globals", "--json"], { silent: true });
    const globals = JSON.parse(output.stdout);
    const logFile = globals["Log file"];
    if (!logFile) return;
    const fs = await import("fs");
    if (!fs.existsSync(logFile)) return;
    const path = await import("path");
    const artifact = new DefaultArtifactClient();
    await artifact.uploadArtifact(
      "bit-debug-log-verify",
      [logFile],
      path.dirname(logFile),
      { retentionDays: 5 }
    );
    core.info(`Uploaded Bit log: ${logFile}`);
  } catch (e) {
    core.warning(`Failed to upload Bit log: ${(e as Error).message}`);
  }
}

const shouldUploadLog = core.getInput("upload-bit-log") === "true";

async function main() {
  const wsDir: string = core.getInput("ws-dir") || process.env.WSDIR || "./";
  await run(wsDir);
}

main()
  .catch((error) => core.setFailed((error as Error).message))
  .finally(async () => {
    if (shouldUploadLog) await uploadBitLog();
  });
