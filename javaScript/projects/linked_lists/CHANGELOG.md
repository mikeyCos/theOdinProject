# Changelog
---
### 00 JAN 2024
- 
---
### 14 JAN 2024
- The `find` method will return the index of the query if found and null if the query is not found.
- The `toString` method will print out the structure of the linked list; for example, a linked list of size 3: `( value ) -> ( value ) -> ( value ) -> null` and a linked list of size 0: `null`.
- The `insertAt` method can insert nodes in between nodes and in the beginning, but not yet insert nodes at the end.
- The `removeAt` method removes a node at given index.
- The `prepend` method will point the linked list's tail to the newly created node.
---
### 12 JAN 2024
- Implemented private properties: `head`/`tail`/`size`.
- Implemented object methods `append`/`prepend`/`size`/`head`/`tail`/`atIndex`/`contains`.
- The linked list size property is incremented by one whenever a node is added.
- The linked list size property is decremented by one whenever a node is removed.
---
### 11 JAN 2024
- Initial commit for `/linked_lists`.
---
### 27 OCT 2023
- Initial `module-webpack-starter` structure created.
- ESLint and Prettier enabled for the module.
- Configuration files for ESLint and Prettier created.
- `README.md` included with instructions and notes.
- Placeholder directories created in components.
- Added `.eslintrc.json` to `.prettierignore`.  
---