import path from "path";

const { dirname, filename } = import.meta;

// basename
const some_path_1 = path.basename("/foo/bar/cats.html");
const some_path_2 = path.basename("/foo/bar/dogs.html", ".html");
const some_path_3 = path.basename(dirname);
const some_path_4 = path.basename(filename);

console.log("some_path_1:", some_path_1);
console.log("some_path_2:", some_path_2);
console.log("some_path_3:", some_path_3);
console.log("some_path_4:", some_path_4);

// dirname
const directory_path = path.dirname(dirname);
const file_path = path.dirname(filename);

console.log("directory_path:", directory_path);
console.log("file_path:", file_path);

// extname
const file_extension = path.extname(filename);

console.log("file_extension:", file_extension);

// parse
const { dir, root, base, name, ext } = path.parse(filename);

console.log("dir:", dir);
console.log("root:", root);
console.log("base:", base);
console.log("name:", name);
console.log("ext:", ext);

// join
const some_joined_path_1 = path.join(dirname, "test", "helloWorld.html");
const some_joined_path_2 = path.join("/foo", "bar", "baz/asdf", "quux", "..");

console.log("some_joined_path_1:", some_joined_path_1);
console.log("some_joined_path_2:", some_joined_path_2);
