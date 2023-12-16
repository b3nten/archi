import * as fs from "fs/promises";

const NAME = "Jon Schlinkert";

export default async function main() {
  const files = await fs.readdir("node_modules", { recursive: true });

  const packages = files.filter((file) => file.endsWith("package.json"));

  const jons: string[] = [];

  for (const pkg of packages) {
    const content = await fs.readFile("node_modules/" + pkg, "utf-8");
    const json = JSON.parse(content);
    if (
      (typeof json.author === "string" && json.author.includes(NAME)) ||
      (typeof json.author === "object" && json.author.name.includes(NAME))
    ) {
      jons.push(json.name);
    }
  }

  const uniqueJons = [...new Set(jons)];

  console.log(
    `\nYou are using ${uniqueJons.length} packages written by Jon:\n`,
  );
  for (let i = 0; i < uniqueJons.length; i += 3) {
    console.log(uniqueJons.slice(i, i + 3).join(", ") + ",");
  }
  console.log(
    `\nThese packages appear ${jons.length} times in your node_modules folder.`,
  );

  uniqueJons.includes("is-number") &&
    console.log(
      "\nYou are using is-number! You should try is-even instead, it's better!\n",
    );

  uniqueJons.includes("is-even") &&
    console.log("You are using is-even! Did you know it relies on is-odd?!?\n");

  uniqueJons.includes("is-odd") &&
    console.log(
      "You are using is-odd! number % 2 === 0 is very hard to test.\n",
    );
}
