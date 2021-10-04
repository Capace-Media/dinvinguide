const handler = async (_, res) => {
  try {
    await res.clearPreviewData();
    res.end();
  } catch (error) {
    console.log(error);
    return;
  }
};

export default handler;
