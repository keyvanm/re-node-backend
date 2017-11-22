const CONTEXT_TO_BLOCK_MAP = {
    'get-user-mood': "get user mood",
    'explain-feature': "explain features"
};
const DEFAULT_BLOCK = "explain features";

const redirectByContext = (req, res) => {
    const block = CONTEXT_TO_BLOCK_MAP[req.body.context]?
        CONTEXT_TO_BLOCK_MAP[req.body.context] : DEFAULT_BLOCK;
    res.json({ "redirect_to_blocks": [block] });
}

export { redirectByContext };
