const { Client } = require('pg')

const client = new Client({
    user: 'vmuqvcwbukevgi',
    host: 'ec2-54-83-61-142.compute-1.amazonaws.com',
    database: 'dccntc4qkcldkt',
    password: 'a562a5181b5f9af532c2a0879f39a3aa54b92c4ee91988ad6a2fea4119a2f7ee',
    port: 5432,
    ssl: true
})
client.connect()

const queryDB = async(queryString, values=null)=>{
    try{
        let res = await client.query(queryString)
        return(res.rows)
    }catch(e){console.error(e)}
}

const getUsers = async () => {
    let queryString = 'SELECT * FROM public.users;'
    let users = await queryDB(queryString)
    return users
    // console.log(users)
}

const emailExists = async (email) => {
    let queryString = `SELECT * FROM public.users WHERE email_address = '${email}';`
    let user = await queryDB(queryString)
    return user.length ? true : false
}

const addUser = async({firstName=null, lastName=null, email, username, password}) =>{
    let queryString = `INSERT INTO public.users VALUES`
}

const validateUsers = async (emailaddr, pwd) => {
	// Added by Daniel M: Returns 0 if invalid uid / pwd and a 1 if it is valid
	// based on front end, it looks like it is using the email as the user id.
    let queryString = `select count(*) from public.users where email_address = '${emailaddr}' and password='${pwd}';`
    let usercount = await queryDB(queryString)
    return usercount
    // console.log(users)
}

const closeConnection = async()=>{
    try{
        await client.end()
    }catch(e){console.error(e)}
}

(async()=>{
    closeConnection()
})()



