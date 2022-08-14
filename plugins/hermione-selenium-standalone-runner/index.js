const fs = require("fs").promises;
const delay = require("delay");
const { spawn } = require("child_process");

module.exports = (hermione, options = { delay: 2000 }) => {
  let selenium;
  hermione.on(hermione.events.RUNNER_START, async () => {
    const file = await fs.open("selenium.log", "w");
    selenium = spawn("selenium-standalone", ["start"], {
      stdio: ["ignore", file, file],
    });
    await delay(options.delay);
  });

  hermione.on(hermione.events.RUNNER_END, () => {
    return new Promise((resolve) => {
      selenium.on("exit", () => resolve());
      // console.log(selenium);
      selenium.kill();
      // TODO: selenium.kill(-9); // selenium.shutDownSeleniumServer();
      //kill(selenium.pid, 'SIGNKILL'); (kill 'tree-kill')
    });
  });
};
