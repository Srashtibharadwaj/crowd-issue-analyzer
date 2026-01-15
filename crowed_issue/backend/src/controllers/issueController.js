import { db, bucket, admin } from "../config/firebase.js";

export const createIssue = async (req, res) => {
  try {
    // ✅ Auth check
    if (!req.user?.uid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // ✅ File validation
    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }

    const { type, description, latitude, longitude } = req.body;

    if (!type || !description || !latitude || !longitude) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const file = req.file;
    const fileName = `issues/${Date.now()}-${file.originalname}`;
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    // ❌ Upload error
    blobStream.on("error", (error) => {
      console.error("Upload error:", error);
      return res.status(500).json({ error: "Image upload failed" });
    });

    // ✅ Upload success
    blobStream.on("finish", async () => {
      try {
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        const issue = {
          userId: req.user.uid,
          type,
          description,
          location: {
            latitude: Number(latitude),
            longitude: Number(longitude),
          },
          imageUrl,
          status: "Open",
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        await db.collection("issues").add(issue);

        return res.status(201).json({
          message: "Issue reported successfully",
          imageUrl,
        });
      } catch (dbError) {
        console.error("Firestore error:", dbError);
        return res.status(500).json({ error: "Failed to save issue" });
      }
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error("Create issue error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


