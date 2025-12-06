# 🌸 BlogHub - Social Blog Application

A production-quality social blog application built with **Node.js**, **Express**, **MongoDB**, **EJS**, and **ImageKit**. Features JWT authentication, user profiles, and beautiful soft pink UI.

## ✨ Features

### Authentication
- ✅ User registration with email, username, password, and full name
- ✅ Secure login with JWT tokens stored in HTTP-only cookies
- ✅ Password hashing with bcryptjs
- ✅ Protected routes with middleware

### User Profiles
- ✅ Edit profile (username, full name, bio, profile picture)
- ✅ Upload profile picture to ImageKit
- ✅ View own profile with post statistics
- ✅ View other users' profiles and posts
- ✅ Profile picture with placeholder support

### Posts
- ✅ Create posts with title, content, and optional image
- ✅ Upload images to ImageKit (stored as URLs in MongoDB)
- ✅ Home feed displaying all posts from all users (newest first)
- ✅ Click username/profile to view author's profile
- ✅ Posts with author information and creation date

### UI/UX
- ✅ Beautiful light soft pink theme (Instagram aesthetic)
- ✅ Responsive mobile-first design
- ✅ Bootstrap 5 framework
- ✅ Google Fonts (Poppins/Inter)
- ✅ Smooth animations and transitions
- ✅ Clean, modern card layouts
- ✅ Interactive navbar with user avatar

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Image Upload**: ImageKit + Multer (memoryStorage)
- **View Engine**: EJS
- **Frontend**: Bootstrap 5 + Custom CSS
- **Dev Tool**: Nodemon

## 📁 Project Structure

```
project/
├── public/
│   ├── css/
│   │   └── style.css (pink theme)
│   └── uploads/
├── src/
│   ├── config/
│   │   └── imagekit.js
│   ├── controller/
│   │   ├── auth.controller.js
│   │   ├── post.controller.js
│   │   └── profile.controller.js
│   ├── db/
│   │   └── db.js
│   ├── middleware/
│   │   ├── auth.middleware.js (JWT verify)
│   │   └── upload.middleware.js (Multer memoryStorage)
│   ├── model/
│   │   ├── user.model.js
│   │   └── post.model.js
│   ├── router/
│   │   ├── auth.route.js
│   │   ├── post.route.js
│   │   └── profile.route.js
│   ├── service/
│   │   └── imagekit.service.js
│   └── app.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── login.ejs
│   ├── register.ejs
│   ├── profile.ejs
│   ├── editProfile.ejs
│   ├── compose.ejs
│   └── error.ejs
├── .env.example
├── .gitignore
├── package.json
└── server.js
```

## 🚀 Installation & Setup

### 1. Clone/Setup Project

```bash
cd "Backend Project/blog app using ejs"
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your `.env` file:

```env
# MongoDB Connection
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/blog-db?retryWrites=true&w=majority

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# ImageKit Configuration (get from https://imagekit.io)
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

# Server Port
PORT=3000
```

### 3. Start the Server

**Production:**
```bash
npm start
```

**Development (with auto-reload):**
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## 📋 Available Routes

### Authentication Routes (`/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /logout` - Logout user

### Post Routes (`/posts`)
- `GET /compose` - Get compose post page (protected)
- `POST /create` - Create new post (protected)

### Profile Routes (`/profile`)
- `GET /` - View own profile (protected)
- `GET /edit` - Edit profile page (protected)
- `POST /edit` - Update profile (protected)
- `GET /:username` - View other user's profile

### Home Route
- `GET /` - View home feed with all posts

## 🔐 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT authentication with HTTP-only cookies
- ✅ Protected routes with middleware
- ✅ File type validation for image uploads
- ✅ 5MB file size limit
- ✅ Email & username uniqueness validation
- ✅ Proper error handling

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet optimization
- ✅ Desktop layout
- ✅ Touch-friendly buttons
- ✅ Smooth transitions

## 🎨 UI Theme

- **Primary Pink**: #FF69B4
- **Light Pink**: #FFE4E1
- **Dark Pink**: #E91E63
- **Fonts**: Poppins (body) + Poppins (headings)
- **Rounded Cards**: 12px border-radius
- **Soft Shadows**: Smooth elevation

## 🔄 MongoDB Models

### User Model
```javascript
{
  username: String (unique, lowercase),
  fullName: String,
  email: String (unique),
  password: String (hashed),
  bio: String,
  profilePic: String (ImageKit URL),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  title: String,
  content: String,
  imageUrl: String (ImageKit URL),
  author: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

## 📚 API Examples

### Register User
```bash
POST /auth/register
Content-Type: application/x-www-form-urlencoded

username=john_doe&email=john@example.com&password=pass123&fullName=John Doe
```

### Login User
```bash
POST /auth/login
Content-Type: application/x-www-form-urlencoded

email=john@example.com&password=pass123
```

### Create Post
```bash
POST /posts/create
Content-Type: multipart/form-data
Authorization: Cookie (JWT token)

title=My First Post&content=This is my first post&image=<image_file>
```

## 🐛 Troubleshooting

### ImageKit Upload Fails
- Verify ImageKit credentials in `.env`
- Check image file size (max 5MB)
- Ensure file is valid image format (JPG, PNG, GIF, WebP)

### MongoDB Connection Error
- Check MongoDB connection string
- Verify username/password
- Ensure IP is whitelisted in MongoDB Atlas

### JWT Token Errors
- Clear browser cookies
- Regenerate JWT_SECRET in `.env`
- Check HTTP-only cookie settings

## 🚫 What's NOT Included

- ❌ Likes/Comments system
- ❌ Chat/DM functionality
- ❌ Admin roles
- ❌ Followers/Following
- ❌ Post likes/reactions

## 📝 Future Enhancements

- Add post search and filtering
- Implement hashtags
- Add follow/follower system
- Implement likes and comments
- Real-time notifications
- Direct messaging

## 📄 License

ISC

## 🤝 Support

For issues or questions, please check the code comments and error messages in the console.

---

**Built with ❤️ using Poppins font and soft pink aesthetic**
