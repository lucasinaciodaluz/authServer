require('dotenv').config();
const server = require('./server');

const port = process.env.PORT || 3000;
server.listen(port, () => {
	  console.log(`Environment is ${process.env.NODE_ENV}`);
	  console.log(`App listening to port ${port}....`);
	  console.log('Press Ctrl+C to quit.');
});
