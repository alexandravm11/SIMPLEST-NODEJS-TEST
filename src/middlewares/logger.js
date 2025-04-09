const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../../logs', 'requests.log');

if (!fs.existsSync(path.dirname(logFile))) {
  fs.mkdirSync(path.dirname(logFile), { recursive: true });
}

const logger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const elapsed = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${elapsed}ms)\n`;

    
    console.log(log.trim());

    
    fs.appendFile(logFile, log, (err) => {
      if (err) console.error('Failed to write log:', err);
    });
  });

  next();
};

module.exports = logger;
