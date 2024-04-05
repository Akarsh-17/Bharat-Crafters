const signupSuccessfull = (email) => {
	return `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Signup Successful</title>
    <style>
        body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }

        .logo {
            max-width: 200px;
            // margin-top: 20px;
            margin-bottom: 20px;
        }

        .message {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .body {
            font-size: 18px;
            margin-bottom: 20px;
        }

        .cta {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFD60A;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
            margin-top: 20px;
        }

        .support {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <img class="logo" src="https://logoforemails.vercel.app/onlylogo.png/" alt="Logo">
        <div class="message">Signup Successful!</div>
        <div class="body">
            <p>Congratulations, ${email}</p>
            <p>You have successfully signed up for our service.</p>
            <p>Start exploring now!</p>
        </div>
        <a class="cta" href="#">Explore</a>
        <div class="support">If you have any questions or need assistance, please feel free to reach out to us at
            <a href="mailto:bharatcrafters896@gmail.com">bharatcrafters896@gmail.com</a>. We are here to help!</div>
    </div>
</body>

</html>`;
};
module.exports = signupSuccessfull;
