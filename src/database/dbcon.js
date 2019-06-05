/*THIS FILE WILL NEED TO BE MOVED TO A BACKEND SERVER AS REACT CLIENTS CANNOT DIRECTLY INTERFACE
WITH POSTGRESQL */
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

const queryDB = async (queryString, values = null) => {
    try {
        const res = await client.query(queryString)
        return (res.rows)
    } catch (e) { console.error(e) }
}

const getUsers = async () => {
    const queryString = 'SELECT * FROM public.users;'
    const users = await queryDB(queryString)
    return users
    // console.log(users)
}

//Totally testing
const getCompanies = async () => {
    const queryString = 'SELECT name FROM public.companies;'
    const companies = await queryDB(queryString)
    return companies
    // console.log(companies)
}

const emailExists = async (email) => {
    const queryString = `SELECT * FROM public.users WHERE email_address = '${email}';`
    const users = await queryDB(queryString)
    console.log(users.length ? true : false)
    return users.length ? true : false
}

const addUser = async (firstName = null, lastName = null, email, username, password) => {
    if (!await emailExists(email)) {
        const queryString = `INSERT INTO public.users 
    (
        first_name, 
        last_name,
        email_address, 
        username,
        password, 
        last_update
    ) 
    VALUES (
        '${firstName}',
        '${lastName}',
        '${email}',
        '${username}',
        '${password}', 
        '${new Date().toLocaleString()}')
    RETURNING id`
        let user = await (queryDB(queryString))
        console.log(user)
        return(user)
    }
    else
        throw new Error('Email already registered')
}

const getCompanies = async() =>{
    const queryString = `SELECT * FROM public.companies`
    const companies = queryDB(queryString)
    return companies
}

const validateUsers = async (emailaddr, pwd) => {
    // Added by Daniel M: Returns 0 if invalid uid / pwd and a 1 if it is valid
    // based on front end, it looks like it is using the email as the user id.
    let queryString = `select count(*) from public.users where email_address = '${emailaddr}' and password='${pwd}';`
    let usercount = await queryDB(queryString)
    return usercount
    // console.log(users)
}

const closeConnection = async () => {
    try {
        await client.end()
    } catch (e) { console.error(e) }
}
module.exports = {
    addUser:addUser, 
    getCompanies:getCompanies
}
// (async () => {
//     // let x = await emailExists('js@me.com')
//     // console.log(x)
//     // try{let user= await addUser('John', 'Smithson', 'json@me.com', 'json1994', 'object')}catch(e){console.error(e)}
//     // console.log(user)
//     closeConnection()
// })()



