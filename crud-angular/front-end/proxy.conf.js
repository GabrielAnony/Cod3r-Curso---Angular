const PROXY_CONFIG = [
  {
    context: ["/produtos"],
    target: "http://localhost:8088/",
    secure: false,
    logLevel: "debug",
  },
];

module.exports = PROXY_CONFIG;
