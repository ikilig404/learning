const http = require("http");
const fs = require("fs");
const url = require("url");

const clientHTML = fs.readFileSync("sse-chat-client.html");

let clients = [];

let server = new http.Server();
server.listen(8080);

server.on("request", (request, response) => {
    let pathname = url.parse(request.url).pathname;

    if (pathname === "/") {
        response.writeHead(200, { "Content-Type": "text/html" }).end(clientHTML);
    }
    else if (pathname !== "/chat" ||
        (request.method !== "GET" && request.method !== "POST")) {
        response.writeHead(404).end();
    }
    else if (request.method === "GET") {
        acceptNewClient(request, response);
    }
    else {
        broadcastNewMessage(request, response);
    }
});

function acceptNewClient(request, response) {
    clients.push(response);

    request.connection.on("end", () => {
        clients.splice(clients.indexOf(response), 1);
        response.end();
    });

    response.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache"
    });
    response.write("event: chat\ndata: Connected\n\n");

    // 注意，这里有意没有调用 response.end()
    // 保持连接打开是 SSR 运行的关键
}

async function broadcastNewMessage(request, response) {
    request.setEncoding("utf8");
    let body = "";
    for await (let chunk of request) {
        body += chunk;
    }

    response.writeHead(200).end();

    let message = "data: " + body.replace("\n", "\ndata: ");

    let event = `event: chat\n${message}\n\n`;

    clients.forEach(client => client.write(event));
}
