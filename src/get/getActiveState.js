/**
 * 获取云托管的接口状态
 */
const getActiveState = async (req, res) => {
  try {
    res.json({
      body: true,
    });
  } catch (error) {
    console.log("getActiveState Error", error);
    res.json({ body: error });
  }
};

module.exports = getActiveState;
