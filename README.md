<p align="center">
    <img src="https://i.imgur.com/yFu8WBx.png" width="500">
</p>
<h1 align="center">
	Minecraft: Twitch Whitelister
</h1>
Minecraft: Twitch Whitelister is a handy tool designed for streamer or groups of streamers to streamline the process of managing viewer access to their Minecraft servers. By linking their Twitch accounts, the tool can authenticate viewers and grant whitelist access based on their Twitch follow or subscription status. 🎮🔒

## Features

- **Sleek Design**: Simple but sleek design using tailwindcss. 😎
- **Stream Follower Verification**: Easily check if a user follows your stream or any of your group of streamers. ✔️
- **Stream Subscription Verification**: Easily check if a user is subscribed to your stream or any of your group of streamers. ✔️
- **Effortless Whitelisting**: Viewers can seamlessly whitelist themselves by logging in through Twitch and entering their Minecraft username. 📝
- **Database Integration**: Prevent viewers from whitelisting multiple Minecraft accounts with a single Twitch account by utilizing a robust database system. 🗃️
- **Simple Setup**: Utilize the convenience of a .env file for easy configuration and setup. ⚙️

## How It Works

1. **Twitch Authentication**: Viewers log in through Twitch to authenticate their identity.
2. **Follow Status Check**: The tool verifies if the viewer follows the broadcaster's stream or any of the designated group of streamers.
3. **Whitelisting**: Verified viewers can whitelist themselves by entering their Minecraft username.
4. **Database Management**: The system ensures that each Twitch account can whitelist only one Minecraft username, maintaining fairness and integrity.
5. **Access Granted**: Authenticated and whitelisted viewers gain access to the Minecraft server, fostering a community-driven gaming experience.

## Get Started

It is pretty easy to get started with this Project. Just follow the Steps bellow!

### 1. Fork the Repository

First things first, fork this repository to your GitHub account. Click the "Fork" button at the top-right corner of the repository page. This will create a copy of the project in your GitHub account that you can freely experiment with.

### 2. Clone the Repository

Once you've forked the repository, clone it to your local machine using the following command:
```bash
git clone https://github.com/your-username/[project-name].git
```

Replace `your-username` with your GitHub username and `[project-name]` with the name of the project.

### 3. Install Dependencies

Navigate to the project directory and install any necessary dependencies:
```bash
cd [project-name]
npm install
```

### 4. Edit the .env

Now that you have the project set up locally, it's time to start editing the enveirment file! First you will need to rename it into <span style="color:blue">.env</span>, after that you can edit the file like the example bellow:
```env
# Application Settings
APP_URL="http://localhost:3000" #url of the app
CHECK_FOLLOWED=true #check if the twitch user is following the channel/s
CHECK_SUBSCRIBED=false #check if the twitch user is subscribed to the channel/s

# Twitch APP Settings
TWITCH_CLIENT_ID="123" #get this from https://dev.twitch.tv/console/apps
TWITCH_CLIENT_SECRET="123" #get this from https://dev.twitch.tv/console/apps
CHANNEL_LIST="1337, 8008, 707" #comma separated list of twitch channel ids. You can convert channel names to ids using https://www.streamweasels.com/tools/convert-twitch-username-to-user-id/

# Minecraft Server Settings
RCON_HOST="localhost" #host of the minecraft server
RCON_PORT=25575 #rcon port of the minecraft server
RCON_PASSWORD="password" #rcon password of the minecraft server
```

### 5. Push Changes

Once you've made your changes, commit them and push to your forked repository:
```bash
git add .
git commit -m "Your commit message here"
git push origin master
```

### 6. Host Your Project on Cloudflare

Consider hosting your project on Cloudflare for improved performance, security, and scalability. Cloudflare offers a suite of services including CDN, DDoS protection, and SSL/TLS encryption.

To host your project on Cloudflare, follow these steps:

1. Sign up for a Cloudflare account at [cloudflare.com](https://www.cloudflare.com).
2. Go into the Dashboard, and click on the left site on "Workers & Pages"
3. Click on the Blue "Create application" Button
4. Select in the Tab-Navigation "Pages"
5. Click on "Connect to Git" and Connect you GitHub Account
6. Select the Forked Repository and click "Begin Setup"
7. Deceide for a Project Name (if you don't have a Domain, this will be the subdomain ex. my-cool-project.pages.dev)
8. Keep the branch on master
9. Select Nuxt.js as Framework preset
10. If not already add "npm run build" into Build command
11. Open "Environment variables (advanced)"
12. Add for each Variable inside the .env file the Name aswell as the Value
13. Click "Save and Deploy"
<img src="https://i.imgur.com/OL95j9v.png" width="500">

For detailed instructions on hosting your project on Cloudflare, check out the [Cloudflare documentation](https://developers.cloudflare.com/pages/platform/).

If you have any questions or need assistance, feel free to reach out to me on [Discord](https://discord.com/users/140866067588317184).

Happy playing!
