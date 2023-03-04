const { createClient, SchemaFieldTypes } = require('redis')
const createConnection = async () => {
    let client = await createDBClient()
    try {
        // We only want to sort by these 3 values
        await client.ft.create(
            'idx:homes',
            {
                '$.id': {
                    type: SchemaFieldTypes.TEXT,
                    sortable: true,
                    AS: 'id',
                },
                '$.beds': {
                    type: SchemaFieldTypes.NUMERIC,
                    sortable: true,
                    AS: 'beds',
                },
                '$.bath': {
                    type: SchemaFieldTypes.NUMERIC,
                    sortable: true,
                    AS: 'bath',
                },
                '$.price': {
                    type: SchemaFieldTypes.NUMERIC,
                    sortable: true,
                    AS: 'price',
                },
            },
            {
                ON: 'JSON',
                PREFIX: 'homes',
            }
        )
        await client.ft.create(
            'idx:users',
            {
                '$.userId': {
                    type: SchemaFieldTypes.TEXT,
                    AS: 'userId',
                },
                '$.password': {
                    type: SchemaFieldTypes.TEXT,
                    AS: 'password',
                },
                '$.additionalInfo': {
                    type: SchemaFieldTypes.NUMERIC,
                    sortable: true,
                    AS: 'bath',
                },
            },
            {
                ON: 'JSON',
                PREFIX: 'users',
            }
        )
    } catch (e) {
        if (e.message === 'Index already exists') {
            console.log('Skipping index creation as it already exists.')
        } else {
            console.error(e)
            process.exit(1)
        }
    }
}

const createDBClient = async () => {
    let client = createClient({
        password: 'qccflej2mi9iUK3MF30dEx4ActGsWuf9',
        socket: {
            host: 'redis-19242.c83.us-east-1-2.ec2.cloud.redislabs.com',
            port: 19242,
        },
    })
    ;(async () => {
        await client.connect()
        const pingCommandResult = await client.ping()
        console.log('Ping command result: ', pingCommandResult)
    })()
    return client
}

module.exports = { createDBClient, createConnection }
