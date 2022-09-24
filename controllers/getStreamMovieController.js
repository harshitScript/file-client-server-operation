const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/root-dir");

//* LARGER FILES MUST ALWAYS BE STREAMED INSTEAD OF PRELOADING.

const getStreamMovieController = (req, res, next) => {
  const { movie_name } = req.params;

  const moviePath = path.join(rootDir, "public", "stream-movies", movie_name);

  if (!fs.existsSync(moviePath)) {
    throw new Error("Movie not found.");
  }

  //* Preloading(async)
  /* fs.readFile(moviePath, (err, data) => {
    if (err) return next(err);

    res.setHeader("Content-Type", `video/${movie_name.split(".")[1]}`);

    res.setHeader("Content-Disposition", `attachment; filename=${movie_name}`);

    return res.send(data);
  }); */

  //* Streaming(sync)
  const movieBUffer = fs.createReadStream(moviePath);

  res.setHeader("Content-Type", `video/${movie_name.split(".")[1]}`);

  res.setHeader("Content-Disposition", `attachment; filename=${movie_name}`);

  movieBUffer.pipe(res);
};

module.exports = getStreamMovieController;
