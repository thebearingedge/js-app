const login = () => (req, res) => {
  res.json({ hello: 'world' })
}

export const handleLogin = () => [
  login()
]
