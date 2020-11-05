# Disauth
A Discord authentication platform to link to mulitple accounts (Minecraft), with more coming soon.
## Structure
- `web`: A NextJS app that runs the UI and then the backend authentication.
- `minecraft`: The minecraft plugin that will allow your users to authenticate their minecraft accounts.
- `discord-bot`: A Discord Bot that helps for authentication, but can also be used for mangement.
## Flow
1. Log in with your Discord Account, using OAuth2
2. Create a user account in our database with the refresh token to update image, and get their profile from Discord.
3. Offer up option to link following accounts:
- Minecraft
