const getServerConfigController = (req, res) => {
  return res.json({
    name: process.env.PROJECT_NAME,
    "path: '/' ": {
      utility: "config-route",
      type: "GET",
    },
    "path: '/upload-file'": {
      utility: "upload a image file",
      type: "POST",
      payload: {
        image: "{file}",
      },
    },
  });
};

module.exports = getServerConfigController;
