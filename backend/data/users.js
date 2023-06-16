import bcrypt from 'bcryptjs'

const users=[
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123',10),
        isAdmin: true,
    },
    {
        name: 'Swopnil Shrestha',
        email: 'swopnil@example.com',
        password: bcrypt.hashSync('123',10),
    },
    {
        name: 'Raj Shrestha',
        email: 'raj@example.com',
        password: bcrypt.hashSync('123',10),
    },
]

export default users;