import { program } from "commander";
import { serveCommands } from './commands/serve';

program
  .addCommand(serveCommands);

program.parse(process.argv);
