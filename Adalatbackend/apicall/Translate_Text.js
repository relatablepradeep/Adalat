const getData = async (src, msg, target, srvId) => {
  const res = await fetch('https://dhruva-api.bhashini.gov.in/services/inference/pipeline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'your_api_key_here'
    },
    body: JSON.stringify({
      inputData: {
        input: [{ source: msg }]
      },
      pipelineTasks: [
        {
          taskType: "translation",
          config: {
            language: {
              sourceLanguage: src,
              targetLanguage: target
            },
            serviceId: srvId
          }
        }
      ]
    })
  });

  return await res.json();
};

module.exports = getData;
