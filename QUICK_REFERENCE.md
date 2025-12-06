# 🎯 Quick Reference Card

## 🚀 Quick Start (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env

# 3. Edit .env with your credentials
nano .env  # or use your editor

# 4. Start development server
npm run dev

# 5. Open browser
# http://localhost:3000
```

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Full project documentation |
| `SETUP.md` | Installation & setup guide |
| `CHECKLIST.md` | Verification checklist |
| `DEPLOYMENT.md` | Deployment options |
| `IMPLEMENTATION_SUMMARY.md` | What was built |

## 🗂️ Key Files

| Path | Purpose |
|------|---------|
| `server.js` | Main entry point |
| `src/app.js` | Express configuration |
| `src/db/db.js` | MongoDB connection |
| `package.json` | Dependencies |
| `.env.example` | Environment template |

## 🛣️ API Routes

### Authentication
- `POST /auth/register` - Register
- `POST /auth/login` - Login
- `GET /auth/logout` - Logout

### Posts
- `GET /posts/compose` - New post form
- `POST /posts/create` - Create post

### Profile
- `GET /profile` - My profile
- `GET /profile/edit` - Edit form
- `POST /profile/edit` - Update
- `GET /profile/:username` - View profile

### Home
- `GET /` - Home feed

## 🔧 Environment Variables

```env
MONGODB_URL=mongodb+srv://user:pass@cluster.mongodb.net/blog-db
JWT_SECRET=your-secret-key
IMAGEKIT_PUBLIC_KEY=your-public-key
IMAGEKIT_PRIVATE_KEY=your-private-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/yourid
PORT=3000
```

## 📊 Project Structure

```
src/
├── controller/     (3 files - Business logic)
├── middleware/     (2 files - Auth, Upload)
├── model/          (2 files - User, Post)
├── router/         (3 files - Routes)
├── service/        (1 file - ImageKit)
├── db/             (1 file - MongoDB)
└── app.js

views/
├── partials/       (2 files - Header, Footer)
└── 7 templates

public/
└── css/style.css   (Pink theme - 1000+ lines)
```

## 🎨 Color Palette

```
Primary Pink:   #FF69B4
Light Pink:     #FFE4E1
Dark Pink:      #E91E63
Text:           #2C3E50
Muted:          #7F8C8D
```

## 📱 Responsive Breakpoints

- Desktop: Full layout
- Tablet (768px): Adjusted spacing
- Mobile (576px): Single column

## 🔐 Security Features

✅ Password hashing (bcryptjs)
✅ JWT authentication
✅ HTTP-only cookies
✅ Protected routes
✅ File validation
✅ Input sanitization

## 🐛 Common Issues

### Port in use
```bash
# Change PORT in .env
PORT=3001
```

### MongoDB won't connect
```bash
# Check connection string
# Add IP to MongoDB Atlas whitelist
```

### Images won't upload
```bash
# Verify ImageKit credentials
# Check file size (max 5MB)
# Check file format (JPG, PNG, GIF, WebP)
```

## 🚀 Deployment

Quick deployment options:
- Heroku: `git push heroku main`
- Railway: Connect GitHub repo
- Render: Connect GitHub repo
- DigitalOcean: SSH and setup

See `DEPLOYMENT.md` for details.

## 📈 Monitoring

```bash
# Check logs
npm run dev

# Monitor database
mongosh "your-connection-string"

# Check API health
curl http://localhost:3000
```

## 🔄 NPM Commands

```bash
npm install          # Install dependencies
npm start            # Start production
npm run dev          # Start with auto-reload
npm install -g pkg   # Install global package
npm update           # Update packages
npm audit            # Check vulnerabilities
npm audit fix        # Fix vulnerabilities
```

## 💾 Database Models

### User
```javascript
{
  username,      // unique, lowercase
  fullName,      // required
  email,         // unique
  password,      // hashed
  bio,           // optional
  profilePic,    // ImageKit URL
  timestamps
}
```

### Post
```javascript
{
  title,         // required
  content,       // required
  imageUrl,      // optional, ImageKit
  author,        // ref: User
  timestamps
}
```

## 🎯 Features

### Done ✅
- Register/Login/Logout
- Profile viewing & editing
- Post creation & browsing
- Image upload to ImageKit
- Mobile responsive
- Pink theme UI
- JWT authentication

### Not Included 🚫
- Likes/Comments
- Chat/DM
- Admin panel
- Two-factor auth
- Followers
- Search

## 📞 Support Resources

- Code comments throughout
- Documentation in README.md
- Setup guide in SETUP.md
- Error messages in console
- Check browser DevTools

## ✨ Next Steps

1. Read `README.md` for full docs
2. Follow `SETUP.md` to start
3. Use `CHECKLIST.md` to verify setup
4. Check `DEPLOYMENT.md` when ready to deploy
5. Refer to `IMPLEMENTATION_SUMMARY.md` for details

## 🎉 You're All Set!

Everything is configured and ready to go.
Just add your credentials and start coding! 🚀

---

**Built with ❤️ for production-ready blogging**
