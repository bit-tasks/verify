import { exec, getExecOutput } from "@actions/exec";
import semver from "semver";

const run = async (wsdir: string) => {
  const version = await getExecOutput("bit -v", [], { cwd: wsdir });

  // If the version is lower than 1.11.43, throw an error recommending to downgrade the action version to v1
  // or upgrade Bit to ^1.11.43
  if (semver.lt(version.stdout.trim(), "1.11.43")) {
    throw new Error(
      "Bit version is lower than 1.11.43. Please downgrade the action version to v1, or upgrade Bit to ^1.11.43"
    );
  }

  await exec("bit ci verify", [], { cwd: wsdir });
};

export default run;
