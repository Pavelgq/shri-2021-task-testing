const fs = require("fs").promises;
const delay = require("delay");
const { spawn } = require("child_process");

module.exports = (
  hermione,
  options = { command: "node", args: ["./index.js"], delay: 2000 }
) => {
  let project;
  hermione.on(hermione.events.RUNNER_START, async () => {
    // const file = await fs.open("project.log", "w");
    project = spawn(options.command, [...options.args]);
    // console.log("project", project);
    await delay(options.delay);
  });

  hermione.on(hermione.events.RUNNER_END, () => {
    return new Promise((resolve) => {
      project.on("exit", () => resolve());
      // console.log(selenium);
      project.kill();
      // TODO: selenium.kill(-9); // selenium.shutDownSeleniumServer();
    });
  });
};
