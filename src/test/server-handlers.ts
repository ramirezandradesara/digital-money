import { rest } from 'msw';

const handlers = [
    rest.post("/api/login", async (req, res, ctx) => {
        let singIn = await req.json();
        let { credentials } = singIn;
        console.log(credentials);
        
        const mail = `${credentials.email}`;
        const pass = `${credentials.password}`;
        if (mail === "test@gmail.com" && pass == "test123") {
            return (
                res(
                    ctx.status(200),
                    ctx.json({
                        token: "elToken"
                    })))
        }

        throw Error('internal server error - 500')

    })

]

export { handlers }