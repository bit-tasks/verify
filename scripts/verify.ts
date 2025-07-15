import { exec, getExecOutput } from "@actions/exec";
import semver from "semver";

const run = async (wsdir: string) => {
  const version = await getExecOutput("bit -v", [], { cwd: wsdir });

  // If the version is lower than 1.11.42, throw an error recommending to downgrade the action version to v1
  // or upgrade Bit to ^1.11.42
  if (semver.lt(version.stdout.trim(), "1.11.42")) {
    throw new Error(
      "Bit version is lower than 1.11.42. Please downgrade the action version to v1, or upgrade Bit to ^1.11.42"
    );
  }

  await exec("bit ci verify", [], { cwd: wsdir });
};

export default run;
