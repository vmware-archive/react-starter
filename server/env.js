try {
  Object.entries(require('../.env.json'))
    .filter(([key]) => !(key in process.env))
    .forEach(([key, value]) => process.env[key] = value);
} catch(e) {
}