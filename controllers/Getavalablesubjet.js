const Upload = require("../models/Upload");

exports.Getavailablesubject = async (req, res) => {
    try {
        const subjectsWithResources = await Upload.aggregate([
            {
                $match: {
                    $or: [
                        { notesfileUrls: { $exists: true, $not: { $size: 0 } } },
                        { booksfileUrls: { $exists: true, $not: { $size: 0 } } },
                        { youtubeLinks: { $exists: true, $not: { $size: 0 } } },
                    ]
                }
            },
            {
                $group: {
                    _id: "$subject"
                }
            },
            {
                $project: {
                    _id: 0,
                    subject: "$_id"
                }
            }
        ]);

        const subjectarray = subjectsWithResources.map((items) => items.subject);

        res.status(200).json({
            success: true,
            message: "Available subjects fetched successfully",
            subjectarray
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch subjects"
        });
    }
}
