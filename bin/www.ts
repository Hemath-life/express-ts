import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import app from '../app';

app.listen(process.env.PORT, () => {
    console.log(`[App] running in ${process.env.NODE_ENV} mode on port: ${process.env.PORT}`)
});
