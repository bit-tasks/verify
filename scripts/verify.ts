import { exec } from "@actions/exec";

const run = async (skipBuild: boolean, wsdir: string) => {
  if (skipBuild) {
    await exec("bit ci verify", [], { cwd: wsdir });
  } else {
    await exec("bit ci verify --build", [], { cwd: wsdir });
  }
};

export default run;
