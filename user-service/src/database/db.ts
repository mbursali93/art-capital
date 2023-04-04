import { Pool } from "pg"
import fs from "fs"
import path from "path"


class Database {
    pool: Pool
    constructor() {

        this.pool = new Pool({
            host: "postgres",
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            port: 5431
        
        });
  
    }
    
    private createTable():void {
        
        const tablePath = path.join(__dirname, 'models/user-table.sql')
        const sql: string = fs.readFileSync(tablePath, 'utf8');
        this.pool.query(sql)
        
    }

    async connect():Promise<void> {
        let client;
        try {
           client = await this.pool.connect()
            this.createTable()
            console.log("Database connection is successful")
        } catch(e:any) {
            console.log(e.message)
            process.exit(1)
        } finally {
            //if(client) client.release()
        }
        
    }

}

export default Database