export default function requireAll(req) {
  return req.keys().map(p => req(p).default)
}
