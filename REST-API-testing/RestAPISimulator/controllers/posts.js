import { createRequire } from "module";
const require = createRequire(import.meta.url);
import customers from './../modules/customers.js'

//Customers module
export const getCustomers = async (req,res) => {
    console.log("listing customers");
    try {
        let response = await customers.get(req);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({"success":false,message:error.message});
    }
}

export const addCustomers = async (req,res) => {
    console.log("Adding customer");
    try {
        let response = await customers.add(req.body)
        console.log("Added customer: " + response.ID );
        res.status(200).json({"success":true , response});
    } catch (error) {
        res.status(404).json({"success":false,message:error.message});
    }
}

export const updateCustomers = async (req,res) => {
    try {
        let id = req.query.id;
        console.log("Updating customer %s", id);
        if (id){
            let response = await customers.update(id, req.body);
            res.status(200).json({"success":true});
        }else{
            res.status(200).json({"success":false, "message":"There is no parameter named id, please verify your query parameters" });
        }
    } catch (error) {
        res.status(404).json({"success":false,message:error.message});
    }
}

export const deleteCustomers = async (req,res) => {
    try {
        let id = req.query.id;
        if (id){
            let response = await customers.delete(id);
            console.log("Deleting customer %s", id)
            res.status(200).json({"success":true});
        }else{
            res.status(200).json({"success":false, "message":"There is no parameter named id, please verify your query parameters" });
        }
    } catch (error) {
        res.status(404).json({"success":false,message:error.message});
    }
}

export const resetCustomerData = async (req,res) => {
    console.log("Resetting customer data");
    await customers.reset();
    res.status(200).json({"success":true, "message":"Customer data reset"});
}

export const indexPage = async(req,res) => {
    res.send(`
        <html><head><title>Rest API Test Server</title></head><body>
        <h1>API Test Server</h1>
        <a href="/customers">Current Customer List (json)</a>
        </body></html>
        `);
}