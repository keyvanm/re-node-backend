const createSession = (req, res) => {
  res.json({
    "set_attributes": { "sessionId": Math.random().toString().slice(2) }
  });
}

export { createSession };
