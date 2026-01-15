import { admin } from "../config/firebase.js";

export const verifyToken = async (req, res, next) => {
  try {
    // Expect: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify Firebase ID token using Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);

    // ✅ Attach user info to request
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

