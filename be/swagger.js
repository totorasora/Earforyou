// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API 문서입니다.",
    },
    servers: [
      {
        url: "http://localhost:3001", // 서버 URL 설정
      },
    ],
  },
  apis: ["./server.js"], // API 라우터 파일 경로
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
