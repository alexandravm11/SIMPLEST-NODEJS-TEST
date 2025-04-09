const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const initializeDatabase = require('./config/init-db'); 
const logger = require('./middlewares/logger');


dotenv.config();
const app = express();

app.use(express.json());

app.use(logger);

app.use('/api/users', userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Swagger docs on http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('[ERROR] Error initializing database:', err);
  });

