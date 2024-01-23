## Prerequisites

Before running the project, make sure you have the following installed:

1. **Node.js and npm**: [Installation guide](https://nodejs.org/en/download/)
2. **Angular CLI**: Run `npm install -g @angular/cli` in your terminal.
3. **Git**: [Installation guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. **JSON Server**: Run `npm install -g json-server` for setting up a mock backend.
5. **Code Editor**: Download and install [Visual Studio Code](https://code.visualstudio.com/) or any editor of your choice.
6. **Web Browser**: Ensure you have a modern web browser installed.

(Optional) For Angular development, consider installing Angular DevTools on Chrome for better debugging.

## Cloning the Repository

```
git clone [your-repository-url]
cd [repository-name]
```

## Installing Dependencies

```
npm install
```

## Running the JSON Server

```
npm install -g json-server # If not installed
json-server --watch db.json # Assuming 'db.json' is your file
```

## Running the Angular Application

```
ng serve
```

After running the above command, the application should be accessible at http://localhost:4200/.

## Project Structure

- **src/app:** Main application code.
- **src/app/components:** Angular components.
- **src/assets:** Static assets like images, icons, etc.
- **src/app/scss:** SCSS styles
- **src/app/services:** services like crud and auth
- **db.json:** Mock database file for JSON server.

## Features

Displaying, adding, editing and deleting orders.

## Figma design

`https://www.figma.com/file/m0nNAlTg8zcdwgnwGsG5XE/Aplikacija-za-naro%C4%8Dila?type=design&node-id=0%3A1&mode=design&t=KBWBTFMryKC02LpN-1`
