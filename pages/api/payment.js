import nextConnect from 'next-connect'
const { HandCashConnect } = require('@handcash/handcash-connect')

const makePayment = async (req, res) => {
    try {
        const handCashConnect = new HandCashConnect({
            appId: process.env.HCC_APP_ID,
            appSecret: process.env.HCC_APP_SECRET,
        })

        const handcash = handCashConnect.getAccountFromAuthToken(req.body.authToken)

        const paymentParameters = {
            description: 'Prost! 🍺',
            payments: [{ to: 'deggen@signavera.com', currencyCode: 'EUR', amount: 0.01 }],
            attachment: { format: 'base64', value: req.body.dataToBroadcast }
        }

        const response = await handcash.wallet.pay(paymentParameters)
        console.log(response)
        return res.json({ response })
    } catch (error) {
        return res.json({ error })
    }
}

const handler = nextConnect()

handler.post(makePayment)
export default handler
