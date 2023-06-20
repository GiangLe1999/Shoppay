const fs = require("fs");

export const imgMiddleware = async (req, res, next) => {
  try {
    //Kiểm tra có file được gửi về không, nếu không có thì return
    if (!req.files) {
      return res.status(400).json({ message: "No files were chosen." });
    }

    //Extract các file từ request
    let files = Object.values(req.files).flat();

    for (const file of files) {
      //Kiểm tra định dạng của file, không hợp lệ thì xoá khỏi folder tmp sau đó return hàm
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message:
            "File format is incorrect, only JPEG, PNG, WEBP are allowed.",
        });
      }

      //Kiểm tra dung lượng của file, nếu > 10MB thì xoá khỏi folder tmp sau đó return hàm
      if (file.size > 1024 * 1024 * 10) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          message: "File size is too large, maximum 10MB allowed.",
        });
      }
    }
    //Gọi next để tiếp tục execute các tác vụ khác sau Middleware
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeTmp = (path) => {
  fs.unlink(path, (error) => {
    if (error) throw error;
  });
};
