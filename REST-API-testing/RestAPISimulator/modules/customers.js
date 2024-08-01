import { createRequire } from "module";
const require = createRequire(import.meta.url)
const data = require('./../data/customers.json');
const originalData = [];
data.forEach(el => originalData.push(el));
console.log("originalData: ", originalData);

class Customers{
    async get (req){
        //Query Parameters
        let first_name = req.query.first_name;
        let last_name = req.query.last_name;
        let age = req.query.age;
        let address = req.query.address;

        //Filter
        let res = data;
        if (first_name){
            res = res.filter(el=> el.first_name===first_name );
        }
        if (last_name){
            res = res.filter(el=> el.last_name===last_name );
        }
        if (age){
            res = res.filter(el=> el.age===age );
        }
        if (address){
            res = res.filter(el=> el.address===address );
        }
        return res;
    }

    async add(rec){
        try{
            const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
            rec["ID"] = id;
            data.push(rec);
        
            return rec;
        }catch(err){
            throw err;
        }
    }

    async delete(id){
        try{
            const indexToRemove = data.findIndex((pl) => pl.ID === id);
            if (indexToRemove ==-1){
                throw {message:`there is no record with id '${id}'`};
            }
            else{
                data.splice(indexToRemove, 1);
            }
        }catch(err){
            throw err;
        }
    }

    async update(id,rec){
        try{
            const index = data.findIndex((pl) => pl.ID === id);
            if (index ==-1){
                throw {message:`there is no record with id '${id}'`};
            }
            else{
                data[index].first_name = rec.first_name;
                data[index].last_name = rec.last_name;
                data[index].age = rec.age;
                data[index].address = rec.address;
            }
        }catch(err){
            throw err;
        }
    }

    async reset(){
        data.length = 0;
        originalData.forEach(el => data.push(el));
    }
}

export default new Customers()