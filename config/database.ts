import { connect } from 'mongoose';
import { createClient } from 'redis';
const { DB_URL, REDIS_PORT, REDIS_PASSWORD, REDIS_HOST } = process.env;

const connectDB = async (): Promise<any> => {
    if (DB_URL?.length === 0) throw new Error('mongo url not loaded pls check ');

    await createClient({
        socket: {
            host: REDIS_HOST,
            port: parseInt(REDIS_PORT!),
        },
        password: REDIS_PASSWORD,
    });
    return await connect(DB_URL!);
};

export default connectDB;
