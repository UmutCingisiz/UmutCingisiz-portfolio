import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const projectDir = path.join(root, "src", "content", "projects");
const blogDir = path.join(root, "src", "content", "blog");

const projectStatuses = new Set([
  "planned",
  "in-progress",
  "live",
  "archived",
  "learning",
]);
const projectCategories = new Set(["frontend", "backend", "full-stack", "devops"]);

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidUrl(value) {
  if (value === undefined) return true;
  if (!isNonEmptyString(value)) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function mdxFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(dir, file));
}

function validateCommon(data, file) {
  const errors = [];
  for (const field of ["title", "description", "date"]) {
    if (!isNonEmptyString(data[field])) {
      errors.push(`${field} is required`);
    }
  }
  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push("tags must include at least one item");
  }
  if (data.coverImage !== undefined && !isNonEmptyString(data.coverImage)) {
    errors.push("coverImage cannot be empty when present");
  }
  if (errors.length > 0) {
    return [`${path.relative(root, file)}: ${errors.join(", ")}`];
  }
  return [];
}

function validateProject(file) {
  const { data } = matter(fs.readFileSync(file, "utf8"));
  const errors = validateCommon(data, file);

  if (!projectCategories.has(data.category)) {
    errors.push(`${path.relative(root, file)}: category is invalid`);
  }
  for (const field of ["problem", "decision", "impact", "status"]) {
    if (!isNonEmptyString(data[field])) {
      errors.push(`${path.relative(root, file)}: ${field} is required`);
    }
  }
  if (!projectStatuses.has(data.status)) {
    errors.push(`${path.relative(root, file)}: status is invalid`);
  }
  for (const field of ["repo", "demo"]) {
    if (!isValidUrl(data[field])) {
      errors.push(`${path.relative(root, file)}: ${field} must be a valid URL when present`);
    }
  }
  if (data.gallery !== undefined) {
    if (!Array.isArray(data.gallery) || data.gallery.length > 8) {
      errors.push(`${path.relative(root, file)}: gallery must be an array with at most 8 items`);
    } else {
      for (const [index, item] of data.gallery.entries()) {
        if (!item || !isNonEmptyString(item.src) || !isNonEmptyString(item.alt)) {
          errors.push(
            `${path.relative(root, file)}: gallery[${index}] needs non-empty src and alt`,
          );
        }
      }
    }
  }

  return errors;
}

function validatePost(file) {
  const { data } = matter(fs.readFileSync(file, "utf8"));
  return validateCommon(data, file);
}

const errors = [
  ...mdxFiles(projectDir).flatMap(validateProject),
  ...mdxFiles(blogDir).flatMap(validatePost),
];

if (errors.length > 0) {
  console.error("\nContent validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Content validation OK");
