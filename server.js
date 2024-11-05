const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const lostItemsRoutes = require("./routes/lostItemsRoutes.js");
const foundItemsRoutes = require("./routes/foundItemsRoutes.js");
const claimItemRoutes = require("./routes/claimRoutes.js")
const feedbackRoutes = require("./routes/feedbackRoutes.js");
const reportLostItemsRoutes = require("./routes/ReportFoundRoutes.js")
const foundItemChatRoutes = require('./routes/foundItemChatRoutes.js')
const lostItemChatRoutes = require('./routes/lost-items/lostItemChatRoutes.js')
const FoundItemChatMessageRoutes = require('./routes/foundItemChatMessageRoutes.js')
const LostItemChatMessageRoutes = require('./routes/lost-items/lostItemChatMessageRoutes.js')


dotenv.config();

const app = express()

app.use(express.json())

app.use(
	cors({
		origin: [
			"http://127.0.0.1:5173",
      		"https://127.0.0.1:5173",
			'http://localhost:3000',
			'http://127.0.0.1:3000',
			'https://foundit-xyz.onrender.com',
			'http://foundit-xyz.onrender.com',
			'http://localhost:8081',
		],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

app.use('/api/auth', authRoutes)
app.use('/api/lost-items', lostItemsRoutes)
app.use('/api/found-items', foundItemsRoutes)
app.use('/api/claim', claimItemRoutes)
app.use('/api/feedback', feedbackRoutes)
app.use('/api/report-found', reportLostItemsRoutes)
app.use('/api/found-items-chat', foundItemChatRoutes)
app.use('/api/lost-items-chat', lostItemChatRoutes)
app.use('/api/found-items-chat-message', FoundItemChatMessageRoutes)
app.use('/api/lost-items-chat-message', LostItemChatMessageRoutes)

connectDB()

app.listen(3000, () => {
  console.log("App started!")
})
