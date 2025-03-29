const pathToRoutesFile = new URL('../routes/*.js' , import.meta.url).pathname;
console.log(pathToRoutesFile)
// import lol from "../routes/"
export const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: '🐢',
        version: '1.0.0',
        description:'this is description'
      },
      servers:[
        {
          url:'http://localhost:6969/'
        }
      ],
    },
    apis: [pathToRoutesFile], // Path to route files with annotations
  };

