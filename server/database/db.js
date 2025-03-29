import pg from 'pg';

const {Pool} = pg;

const dockerPoolConfig = {
    user: 'postgres',
    password: '1423',
    host: 'postgres',
    port: '5432',
    database: 'nova'
};

const pool = new Pool(dockerPoolConfig);

export default pool;