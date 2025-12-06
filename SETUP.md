# 🚀 Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

### Get MongoDB URL
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update `MONGODB_URL`

### Get ImageKit Credentials
1. Sign up at [ImageKit.io](https://imagekit.io)
2. Go to Settings → API Keys
3. Copy `Public Key`, `Private Key`, and `URL Endpoint`
4. Paste them in `.env`

### JWT Secret
Generate a strong random string for `JWT_SECRET`:
```bash
# On Mac/Linux
openssl rand -base64 32

# On Windows PowerShell
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((Get-Random -Count 32 -InputObject (0..255) | ForEach-Object { [char]$_ }) -join ''))
```

## Step 3: Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Server will run on `http://localhost:3000`

## Step 4: Test the App

1. Open `http://localhost:3000` in your browser
2. Click "Sign Up" to create an account
3. Fill in all fields:
   - Full Name
   - Username (unique)
   - Email
   - Password

4. After registration, you'll be logged in
5. Click "New Post" to create your first post
6. Go to Profile to edit your details
7. View home feed to see all posts

## 📋 File Structure Created

```
public/
├── css/style.css              (Pink theme stylesheet)
└── uploads/                   (Temp files directory)

src/
├── app.js                     (Express app setup)
├── config/                    (Configuration files)
├── controller/                (Business logic)
│   ├── auth.controller.js
│   ├── post.controller.js
│   └── profile.controller.js
├── db/db.js                   (MongoDB connection)
├── middleware/
│   ├── auth.middleware.js     (JWT verification)
│   └── upload.middleware.js   (File upload config)
├── model/                     (Database schemas)
│   ├── user.model.js
│   └── post.model.js
├── router/                    (Route handlers)
│   ├── auth.route.js
│   ├── post.route.js
│   └── profile.route.js
└── service/
    └── imagekit.service.js    (Image upload service)

views/
├── partials/
│   ├── header.ejs
│   └── footer.ejs
├── home.ejs
├── login.ejs
├── register.ejs
├── profile.ejs
├── editProfile.ejs
├── compose.ejs
└── error.ejs

.env.example                   (Environment template)
.gitignore                     (Git ignore rules)
package.json                   (Dependencies)
README.md                      (Full documentation)
server.js                      (Server entry point)
```

## 🔗 Available Routes

| Method | Route | Auth Required | Description |
|--------|-------|---------------|-------------|
| GET | `/` | No | Home feed with all posts |
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login user |
| GET | `/auth/logout` | Yes | Logout user |
| GET | `/posts/compose` | Yes | New post page |
| POST | `/posts/create` | Yes | Create new post |
| GET | `/profile` | Yes | View own profile |
| GET | `/profile/edit` | Yes | Edit profile page |
| POST | `/profile/edit` | Yes | Update profile |
| GET | `/profile/:username` | No | View user's profile |

## 🎨 Theme Colors

- **Pink Primary**: `#FF69B4`
- **Light Pink**: `#FFE4E1`
- **Dark Pink**: `#E91E63`
- **Text**: `#2C3E50`
- **Muted**: `#7F8C8D`

## 🔒 Security Notes

✅ Passwords are hashed with bcryptjs (10 rounds)
✅ JWT tokens stored in HTTP-only cookies
✅ File size limit: 5MB
✅ Supported formats: JPG, PNG, GIF, WebP
✅ Protected routes require authentication

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change PORT in .env to 3001, 3002, etc
PORT=3001
```

### MongoDB Connection Failed
- Check internet connection
- Verify connection string in `.env`
- Add your IP to MongoDB Atlas whitelist

### ImageKit Upload Fails
- Verify API keys in `.env`
- Check file size (max 5MB)
- Ensure valid image format

### JWT Cookie Not Being Saved
- Clear browser cookies
- Check if cookies are enabled
- Try in private/incognito mode

## 📚 NPM Scripts

```bash
npm start                    # Start production server
npm run dev                  # Start with nodemon
npm test                     # Run tests (not configured)
npm install                  # Install dependencies
npm install --save-dev dep   # Install dev dependency
npm uninstall pkg            # Remove package
```

## 🚀 Deployment

### Heroku
1. Create `Procfile`: `web: node server.js`
2. Set environment variables in Heroku dashboard
3. Deploy with git push

### Railway/Render
1. Connect GitHub repo
2. Set environment variables
3. Deploy automatically

### Manual Server (VPS/Droplet)
1. SSH into server
2. Git clone your repo
3. Install Node.js and MongoDB
4. Setup `.env` file
5. Run `npm install && npm start`

## 📞 Support

- Check console for error messages
- Read MongoDB logs
- Verify ImageKit setup
- Check network requests in browser DevTools

---

**Happy blogging! 🌸**
