# Automatic Completion of Tasks in Wrapup Status

This Flex plugin adds a timeout to automatically complete tasks in wrapup status. 

<p align="center">
    <img src="screenshots/example2.png?raw=true" width="800" >
</p>

## How to use

1. Clone this repository

2. Copy .env.example to .env and populate the appropriate environment variables.

3. cd into ./serverless/ then run `npm install` and then `twilio serverless:deploy` (optionally you can run locally with `twilio serverless:start --ngrok=""`

4. Copy `public/appConfig.example.js` to `public/appConfig.js`

5. Run `npm install`

6. cd back to the root folder and run `npm start` to run locally or `npm run-script build` and deploy the generated ./build/plugin-dialpad.js to [twilio assests](https://www.twilio.com/console/assets/public) to include plugin with hosted Flex. Also, you want to use Twilio Serverless, just run `npm run deploy` to send your plugin directly to your Flex.