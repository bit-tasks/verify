import { exec } from '@actions/exec'

const run = async (skipBuild: boolean, wsdir: string): Promise<void> => {
  await exec('bit status --strict', [], { cwd: wsdir })
  if (!skipBuild) {
    await exec('bit build', [], { cwd: wsdir })
  }
}

export default run
