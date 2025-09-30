import { Command } from "commander";
import fs from "fs"

const program = new Command();

program
  .name("WebBack-3")
  .description("")
  .version("1.0.0");

program
  .requiredOption("-i, --input <file>", "Input file path")
  .option("-o, --output <file>", "Output file path")
  .option("-d, --display", "Display into console")

program.parse(process.argv);

const options = program.opts();

if(!options.input){
    console.error("Please, specify input file")
    process.exit(1)
}

if(!fs.existsSync(options.input)){
    console.error("Cannot find input file")
    process.exit(1)
}

let jsonData;

try {
    const fileData = fs.readFileSync(options.input, "utf-8")
    const lines = fileData.split(/\r?\n/).filter(Boolean)
    jsonData = lines.map(line => JSON.parse(line))
} catch(err) {
    console.error("Cannot read or parse input file: ", err.message)
    process.exit(1)
}

if(options.output){
    fs.writeFileSync(options.output, JSON.stringify(jsonData, null, 2), "utf-8")
}

if(options.display){
    console.log(JSON.stringify(jsonData, null, 2))
}