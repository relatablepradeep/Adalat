const express = require('express');
const router = express.Router();
const getData = require('../apicall/Translate_Text');

router.post('/', async (req, res) => {
  const { source_language, content, target_language } = req.body;
  const serviceId = "ai4bharat/indictrans-v2-all-gpu--t4";

  try {
    const data = await getData(source_language, content, target_language, serviceId);
    const translated = data?.pipelineResponse?.[0]?.output?.[0]?.target;

    if (!translated) {
      return res.status(500).json({
        status_code: 500,
        message: "Invalid translation response",
        translated_content: null
      });
    }

    res.status(200).json({
      status_code: 200,
      message: "success",
      translated_content: translated
    });
  } catch (error) {
    let error_message = error?.detail?.message || "Unknown error";

    if (source_language?.length !== 2 || target_language?.length !== 2) {
      error_message = "Invalid Language Codes";
    }

    res.status(500).json({
      status_code: 500,
      message: error_message,
      translated_content: null
    });
  }
});

module.exports = router;
