import { connect } from 'mongoose';
import ErrorHandler from '../utils/handlers';
const { DB_URL } = process.env;

const connectDB = async () => {
    try {
        const mongoURI: string = DB_URL!;
        if (DB_URL?.length == 0) throw new Error('mongo url not loaded pls check ');
        else await connect(mongoURI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.log(ErrorHandler(err));
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;
